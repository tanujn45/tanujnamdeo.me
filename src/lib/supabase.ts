import { createClient } from "@supabase/supabase-js";

// These are PUBLIC_ on purpose: they ship to the browser. The anon key is
// designed for that, and row-level security is what actually protects the
// data. The service_role key must never appear in this file.
const url = import.meta.env.PUBLIC_SUPABASE_URL;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const isConfigured = Boolean(url && anonKey);

export const supabase = isConfigured
  ? createClient(url, anonKey)
  : (null as unknown as ReturnType<typeof createClient>);

export type Exercise = {
  id: string;
  name: string;
};

export type WorkoutSet = {
  id: string;
  exercise_id: string;
  weight: number;
  unit: "lbs" | "kg";
  reps: number;
  performed_at: string;
};
