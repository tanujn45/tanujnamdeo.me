-- Daily single-value logs: steps and body weight.
-- One table rather than two, because they share a shape (one value per day
-- per metric) and so a third metric later costs nothing.

create table if not exists public.daily_entries (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  day         date not null,
  metric      text not null check (metric in ('steps', 'weight')),
  value       numeric(8, 2) not null check (value >= 0 and value < 1000000),
  -- lbs/kg for weight; steps are unitless.
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
