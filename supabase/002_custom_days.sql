-- Custom workout categories.
-- The five day names were pinned by CHECK constraints; they become rows you
-- own instead, so you can add your own. Additive: no table is dropped.

create table if not exists public.days (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  name        text not null check (length(trim(name)) between 1 and 30),
  position    integer not null default 0,
  created_at  timestamptz not null default now()
);

create unique index if not exists days_user_name_unique
  on public.days (user_id, lower(trim(name)));

alter table public.days enable row level security;

drop policy if exists "own days" on public.days;
create policy "own days" on public.days
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Seed the existing five for every account that has none yet.
insert into public.days (user_id, name, position)
select u.id, d.name, d.pos
from auth.users u
cross join (values ('Legs', 0), ('Shoulders', 1), ('Chest', 2), ('Back', 3), ('Arms', 4))
  as d(name, pos)
on conflict do nothing;

-- Any category the exercises already reference but that is missing as a row
-- (should be none, but keeps the two in step).
insert into public.days (user_id, name, position)
select distinct e.user_id, e.day, 99
from public.exercises e
on conflict do nothing;

-- Free the columns so custom names are allowed.
alter table public.exercises drop constraint if exists exercises_day_valid;
alter table public.exercises drop constraint if exists exercises_day_check;
alter table public.workouts  drop constraint if exists workouts_day_check;
