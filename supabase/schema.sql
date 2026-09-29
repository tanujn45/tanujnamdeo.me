-- Workout tracker schema.
-- Run this whole file in the Supabase SQL editor. It is additive and
-- idempotent: no table is ever dropped, so re-running it cannot lose data.

-- ---------------------------------------------------------------------------
-- exercises
-- The movement library. Each exercise belongs to exactly one day, so the day
-- screen is just a filter. Names are unique per user and case-insensitively
-- deduplicated, so "Bench Press", "bench press" and "BENCH PRESS" cannot
-- become three exercises and split your history.
-- ---------------------------------------------------------------------------
create table if not exists public.exercises (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  name        text not null check (length(trim(name)) between 1 and 80),
  created_at  timestamptz not null default now()
);

alter table public.exercises
  add column if not exists day text,
  -- Archived exercises keep their history but stop appearing in the picker.
  add column if not exists archived boolean not null default false;

update public.exercises set day = 'Chest' where day is null;

alter table public.exercises
  alter column day set not null;

alter table public.exercises
  drop constraint if exists exercises_day_valid;
alter table public.exercises
  add constraint exercises_day_valid
  check (day in ('Legs', 'Shoulders', 'Chest', 'Back', 'Arms'));

create unique index if not exists exercises_user_name_unique
  on public.exercises (user_id, lower(trim(name)));

create index if not exists exercises_user_day_idx
  on public.exercises (user_id, day);

-- ---------------------------------------------------------------------------
-- workouts
-- One row per session. started_at/ended_at drive the elapsed timer, and a
-- null ended_at is what marks a session as still in progress.
-- ---------------------------------------------------------------------------
create table if not exists public.workouts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  day         text not null check (day in ('Legs', 'Shoulders', 'Chest', 'Back', 'Arms')),
  started_at  timestamptz not null default now(),
  ended_at    timestamptz,
  created_at  timestamptz not null default now(),
  constraint workout_ends_after_it_starts
    check (ended_at is null or ended_at >= started_at)
);

create index if not exists workouts_user_started_idx
  on public.workouts (user_id, started_at desc);

-- Only one session open at a time, so reopening the page resumes the right
-- one instead of guessing between several.
create unique index if not exists workouts_one_open_per_user
  on public.workouts (user_id) where (ended_at is null);

-- ---------------------------------------------------------------------------
-- workout_exercises
-- Which movements are part of this session, in order. Kept separate from sets
-- so an exercise can sit in the session before it has any sets logged.
-- ---------------------------------------------------------------------------
create table if not exists public.workout_exercises (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  workout_id   uuid not null references public.workouts (id) on delete cascade,
  exercise_id  uuid not null references public.exercises (id) on delete cascade,
  position     integer not null default 0,
  created_at   timestamptz not null default now(),
  unique (workout_id, exercise_id)
);

create index if not exists workout_exercises_workout_idx
  on public.workout_exercises (workout_id, position);

-- ---------------------------------------------------------------------------
-- sets
-- One row per set. set_number is the slot within this exercise in this
-- session, which is what "what did I do for this set last time" compares on.
-- performed_at is when you did it (charts key on this); created_at is when the
-- row was written, so a backfilled set still lands on the right day.
-- ---------------------------------------------------------------------------
create table if not exists public.sets (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  exercise_id  uuid not null references public.exercises (id) on delete cascade,
  weight       numeric(6, 2) not null check (weight >= 0 and weight < 5000),
  unit         text not null default 'lbs' check (unit in ('lbs', 'kg')),
  reps         integer not null check (reps > 0 and reps <= 1000),
  performed_at timestamptz not null default now(),
  created_at   timestamptz not null default now()
);

alter table public.sets
  add column if not exists workout_id uuid references public.workouts (id) on delete cascade,
  add column if not exists set_number integer;

alter table public.sets
  drop constraint if exists sets_set_number_sane;
alter table public.sets
  add constraint sets_set_number_sane
  check (set_number is null or (set_number > 0 and set_number <= 100));

create unique index if not exists sets_slot_unique
  on public.sets (workout_id, exercise_id, set_number);

create index if not exists sets_user_performed_idx
  on public.sets (user_id, performed_at desc);

create index if not exists sets_exercise_history_idx
  on public.sets (user_id, exercise_id, performed_at desc);

create index if not exists sets_workout_idx on public.sets (workout_id);

-- ---------------------------------------------------------------------------
-- heartbeat
-- The backup job writes here. A write (rather than only a read) is the safer
-- signal that the project is active, so it does not get paused.
-- ---------------------------------------------------------------------------
create table if not exists public.heartbeat (
  id       integer primary key default 1,
  beat_at  timestamptz not null default now(),
  constraint heartbeat_single_row check (id = 1)
);

insert into public.heartbeat (id) values (1) on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Row level security
-- Without this the publishable key would let anyone read and write the log.
-- With it, every query is scoped to the signed-in user, which is what makes
-- shipping that key in client-side JavaScript safe.
-- ---------------------------------------------------------------------------
alter table public.exercises         enable row level security;
alter table public.workouts          enable row level security;
alter table public.workout_exercises enable row level security;
alter table public.sets              enable row level security;
alter table public.heartbeat         enable row level security;

drop policy if exists "own exercises" on public.exercises;
create policy "own exercises" on public.exercises
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own workouts" on public.workouts;
create policy "own workouts" on public.workouts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own workout_exercises" on public.workout_exercises;
create policy "own workout_exercises" on public.workout_exercises
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own sets" on public.sets;
create policy "own sets" on public.sets
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- heartbeat deliberately has no policy: RLS on with none means the
-- publishable key cannot touch it at all. Only the secret key, which bypasses
-- RLS, can — and that lives solely in Apps Script.

-- ---------------------------------------------------------------------------
-- Flat view for the Google Sheets backup, so the job does not have to join.
-- New columns are appended at the end so this can be replaced in place.
-- ---------------------------------------------------------------------------
create or replace view public.sets_export as
  select
    s.id,
    s.user_id,
    e.name as exercise,
    s.weight,
    s.unit,
    s.reps,
    round(s.weight * s.reps, 2) as volume,
    s.performed_at,
    s.created_at,
    w.day,
    w.started_at as workout_started_at,
    s.set_number
  from public.sets s
  join public.exercises e on e.id = s.exercise_id
  left join public.workouts w on w.id = s.workout_id
  order by s.performed_at desc;
