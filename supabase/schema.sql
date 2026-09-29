-- Workout tracker schema.
-- Paste this whole file into the Supabase SQL editor and run it once.

-- ---------------------------------------------------------------------------
-- exercises
-- One row per movement. Names are unique per user and case-insensitively
-- deduplicated, so "Bench Press", "bench press" and "BENCH PRESS" cannot
-- become three separate exercises and split your history.
-- ---------------------------------------------------------------------------
create table if not exists public.exercises (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  name        text not null check (length(trim(name)) between 1 and 80),
  created_at  timestamptz not null default now()
);

-- The case-insensitive uniqueness guard.
create unique index if not exists exercises_user_name_unique
  on public.exercises (user_id, lower(trim(name)));

-- ---------------------------------------------------------------------------
-- sets
-- One row per set performed. performed_at is when you did it, which is what
-- every chart is keyed on; created_at is when the row was written, so a set
-- back-filled later is still ordered correctly on the chart.
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

create index if not exists sets_user_performed_idx
  on public.sets (user_id, performed_at desc);

create index if not exists sets_exercise_performed_idx
  on public.sets (exercise_id, performed_at);

-- ---------------------------------------------------------------------------
-- heartbeat
-- The weekly backup job writes here. A write (rather than only a read) is the
-- safer signal that the project is active, so it does not get paused.
-- ---------------------------------------------------------------------------
create table if not exists public.heartbeat (
  id        integer primary key default 1,
  beat_at   timestamptz not null default now(),
  constraint heartbeat_single_row check (id = 1)
);

insert into public.heartbeat (id) values (1) on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Row level security
-- Without this the anon key would let anyone read and write your log. With it,
-- every query is scoped to the logged-in user, which is why the anon key is
-- safe to ship in client-side JavaScript.
-- ---------------------------------------------------------------------------
alter table public.exercises enable row level security;
alter table public.sets      enable row level security;

drop policy if exists "own exercises" on public.exercises;
create policy "own exercises" on public.exercises
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "own sets" on public.sets;
create policy "own sets" on public.sets
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- heartbeat is only ever touched by the backup job using the service_role key,
-- which bypasses RLS. Enabling RLS with no policy means the anon key cannot
-- read or write it at all.
alter table public.heartbeat enable row level security;

-- ---------------------------------------------------------------------------
-- A flat view for the Google Sheets backup, so the job does not have to join.
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
    s.created_at
  from public.sets s
  join public.exercises e on e.id = s.exercise_id
  order by s.performed_at desc;
