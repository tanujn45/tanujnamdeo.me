-- Snapshot taken 2026-10-06 before 005, when the project held 67 sets across
-- 5 workouts. Supabase's free tier keeps no backups of its own, so this is
-- the only copy. RLS is on with no policy, which is what keeps the
-- publishable key from reading them.
--
-- Drop them once you are satisfied nothing was lost:
--   drop table public.bak20261006_sets, public.bak20261006_workouts,
--     public.bak20261006_workout_exercises, public.bak20261006_exercises,
--     public.bak20261006_exercise_days, public.bak20261006_days;

create table if not exists public.bak20261006_sets as select * from public.sets;
create table if not exists public.bak20261006_workouts as select * from public.workouts;
create table if not exists public.bak20261006_workout_exercises as select * from public.workout_exercises;
create table if not exists public.bak20261006_exercises as select * from public.exercises;
create table if not exists public.bak20261006_exercise_days as select * from public.exercise_days;
create table if not exists public.bak20261006_days as select * from public.days;

alter table public.bak20261006_sets enable row level security;
alter table public.bak20261006_workouts enable row level security;
alter table public.bak20261006_workout_exercises enable row level security;
alter table public.bak20261006_exercises enable row level security;
alter table public.bak20261006_exercise_days enable row level security;
alter table public.bak20261006_days enable row level security;
