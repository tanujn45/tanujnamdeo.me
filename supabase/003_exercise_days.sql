-- An exercise can belong to several categories.
-- exercises.day held exactly one, which breaks as soon as a category like
-- Push overlaps a body-part one. The column stays put (harmless, and it is
-- the seed for this table); membership is read from here from now on.

create table if not exists public.exercise_days (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  exercise_id  uuid not null references public.exercises (id) on delete cascade,
  day          text not null,
  created_at   timestamptz not null default now(),
  unique (exercise_id, day)
);

create index if not exists exercise_days_user_day_idx
  on public.exercise_days (user_id, day);

alter table public.exercise_days enable row level security;

drop policy if exists "own exercise_days" on public.exercise_days;
create policy "own exercise_days" on public.exercise_days
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Seed from whatever each exercise is currently filed under.
insert into public.exercise_days (user_id, exercise_id, day)
select e.user_id, e.id, e.day
from public.exercises e
on conflict do nothing;
