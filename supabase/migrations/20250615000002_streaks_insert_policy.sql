-- Allow users to insert their own streak row (fallback if trigger missed)
create policy "Users can insert own streaks"
  on public.streaks for insert
  with check (auth.uid() = user_id);
