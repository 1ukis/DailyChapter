-- DailyChapter initial schema
-- Tables: profiles, book_categories, books, logs, streaks, backlog, stoic_tasks,
--         stoic_task_completions, reading_identity_levels

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type public.book_difficulty as enum ('easy', 'medium', 'hard');
create type public.log_difficulty as enum ('easy', 'medium', 'hard', 'difficult');

-- ---------------------------------------------------------------------------
-- Utility: updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  timezone text not null default 'America/Toronto',
  base_goal integer not null default 30 check (base_goal > 0),
  selected_book_id uuid,
  default_log_difficulty public.log_difficulty not null default 'easy',
  setup_completed boolean not null default false,
  avatar_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- book_categories (user-customizable)
-- ---------------------------------------------------------------------------
create table public.book_categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  color text,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, name)
);

create index book_categories_user_id_idx on public.book_categories (user_id);

create trigger book_categories_set_updated_at
before update on public.book_categories
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- books (user curriculum)
-- ---------------------------------------------------------------------------
create table public.books (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  category_id uuid references public.book_categories (id) on delete set null,
  title text not null,
  author text,
  pages integer not null default 0 check (pages >= 0),
  month integer check (month is null or (month >= 1 and month <= 24)),
  month_label text,
  theme text,
  description text,
  focus_question text,
  icon text not null default 'book',
  gradient text,
  book_difficulty public.book_difficulty not null default 'easy',
  sort_order integer not null default 0,
  completed_at timestamptz,
  is_companion boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index books_user_id_idx on public.books (user_id);
create index books_user_sort_idx on public.books (user_id, sort_order);

create trigger books_set_updated_at
before update on public.books
for each row execute function public.set_updated_at();

alter table public.profiles
  add constraint profiles_selected_book_id_fkey
  foreign key (selected_book_id) references public.books (id) on delete set null;

-- ---------------------------------------------------------------------------
-- logs (daily reading logs)
-- ---------------------------------------------------------------------------
create table public.logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  log_date date not null,
  pages integer not null default 0 check (pages >= 0),
  target_pages integer not null check (target_pages > 0),
  difficulty public.log_difficulty not null default 'easy',
  book_id uuid references public.books (id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, log_date)
);

create index logs_user_id_log_date_idx on public.logs (user_id, log_date desc);

create trigger logs_set_updated_at
before update on public.logs
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- streaks (denormalized for fast reads)
-- ---------------------------------------------------------------------------
create table public.streaks (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  current_streak integer not null default 0 check (current_streak >= 0),
  longest_streak integer not null default 0 check (longest_streak >= 0),
  last_log_date date,
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger streaks_set_updated_at
before update on public.streaks
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- backlog (TBR)
-- ---------------------------------------------------------------------------
create table public.backlog (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  category_id uuid references public.book_categories (id) on delete set null,
  title text not null,
  author text,
  pages integer not null default 0 check (pages >= 0),
  difficulty public.book_difficulty not null default 'easy',
  assigned_month integer check (assigned_month is null or (assigned_month >= 1 and assigned_month <= 24)),
  notes text,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index backlog_user_id_idx on public.backlog (user_id);

create trigger backlog_set_updated_at
before update on public.backlog
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- stoic_tasks (customizable sidebar checklist items)
-- ---------------------------------------------------------------------------
create table public.stoic_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index stoic_tasks_user_id_idx on public.stoic_tasks (user_id);

create trigger stoic_tasks_set_updated_at
before update on public.stoic_tasks
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- stoic_task_completions (per-day completion tracking)
-- ---------------------------------------------------------------------------
create table public.stoic_task_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  task_id uuid not null references public.stoic_tasks (id) on delete cascade,
  completion_date date not null,
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, task_id, completion_date)
);

create index stoic_task_completions_user_date_idx
  on public.stoic_task_completions (user_id, completion_date desc);

-- ---------------------------------------------------------------------------
-- reading_identity_levels (user-customizable gamification tiers)
-- ---------------------------------------------------------------------------
create table public.reading_identity_levels (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  min_streak integer not null default 0 check (min_streak >= 0),
  min_total_pages integer not null default 0 check (min_total_pages >= 0),
  description text,
  icon text,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index reading_identity_levels_user_id_idx
  on public.reading_identity_levels (user_id, sort_order);

create trigger reading_identity_levels_set_updated_at
before update on public.reading_identity_levels
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- New user bootstrap (empty curriculum, editable defaults)
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, timezone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'timezone', 'America/Toronto')
  );

  insert into public.streaks (user_id) values (new.id);

  insert into public.reading_identity_levels (user_id, name, min_streak, min_total_pages, description, sort_order)
  values
    (new.id, 'Curious Reader', 0, 0, 'You have started your reading journey.', 1),
    (new.id, 'Steady Reader', 3, 150, 'You read consistently for three days.', 2),
    (new.id, 'Dedicated Reader', 7, 500, 'A full week of reading momentum.', 3),
    (new.id, 'Focused Scholar', 14, 1200, 'Two weeks of disciplined reading.', 4),
    (new.id, 'Master Reader', 30, 3000, 'A month-long reading habit.', 5);

  insert into public.book_categories (user_id, name, sort_order)
  values
    (new.id, 'Fiction & Literature', 1),
    (new.id, 'Learning & Habits', 2),
    (new.id, 'Productivity & Focus', 3),
    (new.id, 'Philosophy', 4),
    (new.id, 'General Backlog', 5);

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.book_categories enable row level security;
alter table public.books enable row level security;
alter table public.logs enable row level security;
alter table public.streaks enable row level security;
alter table public.backlog enable row level security;
alter table public.stoic_tasks enable row level security;
alter table public.stoic_task_completions enable row level security;
alter table public.reading_identity_levels enable row level security;

-- profiles
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- book_categories
create policy "Users can view own categories"
  on public.book_categories for select
  using (auth.uid() = user_id);

create policy "Users can insert own categories"
  on public.book_categories for insert
  with check (auth.uid() = user_id);

create policy "Users can update own categories"
  on public.book_categories for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own categories"
  on public.book_categories for delete
  using (auth.uid() = user_id);

-- books
create policy "Users can view own books"
  on public.books for select
  using (auth.uid() = user_id);

create policy "Users can insert own books"
  on public.books for insert
  with check (auth.uid() = user_id);

create policy "Users can update own books"
  on public.books for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own books"
  on public.books for delete
  using (auth.uid() = user_id);

-- logs
create policy "Users can view own logs"
  on public.logs for select
  using (auth.uid() = user_id);

create policy "Users can insert own logs"
  on public.logs for insert
  with check (auth.uid() = user_id);

create policy "Users can update own logs"
  on public.logs for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own logs"
  on public.logs for delete
  using (auth.uid() = user_id);

-- streaks
create policy "Users can view own streaks"
  on public.streaks for select
  using (auth.uid() = user_id);

create policy "Users can update own streaks"
  on public.streaks for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- backlog
create policy "Users can view own backlog"
  on public.backlog for select
  using (auth.uid() = user_id);

create policy "Users can insert own backlog"
  on public.backlog for insert
  with check (auth.uid() = user_id);

create policy "Users can update own backlog"
  on public.backlog for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own backlog"
  on public.backlog for delete
  using (auth.uid() = user_id);

-- stoic_tasks
create policy "Users can view own stoic tasks"
  on public.stoic_tasks for select
  using (auth.uid() = user_id);

create policy "Users can insert own stoic tasks"
  on public.stoic_tasks for insert
  with check (auth.uid() = user_id);

create policy "Users can update own stoic tasks"
  on public.stoic_tasks for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own stoic tasks"
  on public.stoic_tasks for delete
  using (auth.uid() = user_id);

-- stoic_task_completions
create policy "Users can view own stoic completions"
  on public.stoic_task_completions for select
  using (auth.uid() = user_id);

create policy "Users can insert own stoic completions"
  on public.stoic_task_completions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own stoic completions"
  on public.stoic_task_completions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own stoic completions"
  on public.stoic_task_completions for delete
  using (auth.uid() = user_id);

-- reading_identity_levels
create policy "Users can view own identity levels"
  on public.reading_identity_levels for select
  using (auth.uid() = user_id);

create policy "Users can insert own identity levels"
  on public.reading_identity_levels for insert
  with check (auth.uid() = user_id);

create policy "Users can update own identity levels"
  on public.reading_identity_levels for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own identity levels"
  on public.reading_identity_levels for delete
  using (auth.uid() = user_id);
