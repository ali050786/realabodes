-- Create projects table
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text not null,
  category text,
  status text default 'active',
  featured boolean default false,
  location text,
  price_range text,
  details jsonb default '{}'::jsonb,
  
  -- Add constraints
  constraint projects_slug_key unique (slug)
);

-- Enable Row Level Security (RLS)
alter table public.projects enable row level security;

-- Create policies (modify as needed for your auth setup)
-- Drop existing policies first to allow re-running the script
drop policy if exists "Public projects are viewable by everyone" on public.projects;
drop policy if exists "Enable insert for all users" on public.projects;
drop policy if exists "Enable update for all users" on public.projects;
drop policy if exists "Enable delete for all users" on public.projects;
drop policy if exists "Authenticated users can insert projects" on public.projects;
drop policy if exists "Authenticated users can update projects" on public.projects;
drop policy if exists "Authenticated users can delete projects" on public.projects;

-- Allow public read access
create policy "Public projects are viewable by everyone" 
  on public.projects for select 
  using (true);

-- Allow authenticated users to insert/update/delete (adjust if you have specific admin roles)
-- FOR DEVELOPMENT: Allowing public access. Revert to auth.role() = 'authenticated' for production.
create policy "Enable insert for all users" 
  on public.projects for insert 
  with check (true);

create policy "Enable update for all users" 
  on public.projects for update 
  using (true);

create policy "Enable delete for all users" 
  on public.projects for delete 
  using (true);

-- Create storage bucket for project images if it doesn't exist
insert into storage.buckets (id, name, public) 
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

-- Storage policies
drop policy if exists "Project images are publicly accessible" on storage.objects;
-- drop policy if exists "Authenticated users can upload project images" on storage.objects; -- In case it exists with the old name
drop policy if exists "Enable public upload for project images" on storage.objects;

create policy "Project images are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'project-images' );

-- FOR DEVELOPMENT: Allowing public uploads. Revert to auth access for production.
create policy "Enable public upload for project images"
  on storage.objects for insert
  with check ( bucket_id = 'project-images' );
