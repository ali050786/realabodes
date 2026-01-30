-- Create blogs table
create table if not exists public.blogs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text not null,
  excerpt text,
  content text,
  cover_image text,
  date text,
  author text,
  category text,
  tags text[],
  read_time text,
  published boolean default false,

  -- Add constraints
  constraint blogs_slug_key unique (slug)
);

-- Enable Row Level Security (RLS)
alter table public.blogs enable row level security;

-- Create policies
-- Drop existing policies first to allow re-running the script
drop policy if exists "Public blogs are viewable by everyone" on public.blogs;
drop policy if exists "Enable insert for all users" on public.blogs;
drop policy if exists "Enable update for all users" on public.blogs;
drop policy if exists "Enable delete for all users" on public.blogs;

-- Allow public read access
create policy "Public blogs are viewable by everyone" 
  on public.blogs for select 
  using (true);

-- Allow authenticated users to insert/update/delete (adjust if you have specific admin roles)
-- FOR DEVELOPMENT: Allowing public access. Revert to auth.role() = 'authenticated' for production.
create policy "Enable insert for all users" 
  on public.blogs for insert 
  with check (true);

create policy "Enable update for all users" 
  on public.blogs for update 
  using (true);

create policy "Enable delete for all users" 
  on public.blogs for delete 
  using (true);

-- Create storage bucket for blog images if it doesn't exist
insert into storage.buckets (id, name, public) 
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Storage policies
drop policy if exists "Blog images are publicly accessible" on storage.objects;
drop policy if exists "Enable public upload for blog images" on storage.objects;

create policy "Blog images are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'blog-images' );

-- FOR DEVELOPMENT: Allowing public uploads. Revert to auth access for production.
create policy "Enable public upload for blog images"
  on storage.objects for insert
  with check ( bucket_id = 'blog-images' );
