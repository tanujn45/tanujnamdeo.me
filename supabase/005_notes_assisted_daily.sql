-- Three changes plus the daily table, which never got run.

-- 1. Daily step and weight log. One row per day per metric, so saving again
--    edits rather than adding.
create table if not exists public.daily_entries (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  day         date not null,
  metric      text not null check (metric in ('steps', 'weight')),
  value       numeric(8, 2) not null check (value >= 0 and value < 1000000),
  unit        text check (unit is null or unit in ('lbs', 'kg')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (user_id, day, metric)
);

create index if not exists daily_entries_user_metric_day_idx
  on public.daily_entries (user_id, metric, day desc);

alter table public.daily_entries enable row level security;

drop policy if exists "own daily entries" on public.daily_entries;
create policy "own daily entries" on public.daily_entries
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 2. Assisted work carries a negative load, which the old check rejected.
alter table public.sets drop constraint if exists sets_weight_check;
alter table public.sets drop constraint if exists sets_weight_sane;
alter table public.sets
  add constraint sets_weight_sane check (weight > -5000 and weight < 5000);

-- 3. Notes that show on the exercise every time you train it.
alter table public.exercises add column if not exists notes text;
