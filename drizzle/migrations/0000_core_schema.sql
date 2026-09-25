create type public.app_role as enum ('admin','moderator','user');

create table public.profiles (
  id uuid primary key,
  display_name text,
  username text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.profiles to anon, authenticated;
grant insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "Profiles are public" on public.profiles for select using (true);
create policy "Users insert own profile" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users see own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email,'@',1)));
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create table public.archive_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  organization text,
  category text,
  description text,
  ended_on date,
  status text not null default 'draft',
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.archive_items to anon, authenticated;
grant insert, update, delete on public.archive_items to authenticated;
grant all on public.archive_items to service_role;
alter table public.archive_items enable row level security;
create policy "Published entries are public" on public.archive_items for select using (status = 'published' or public.has_role(auth.uid(),'admin'));
create policy "Admins manage entries" on public.archive_items for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.community_stories (
  id uuid primary key default gen_random_uuid(),
  thing_slug text not null,
  user_id uuid not null default auth.uid(),
  relationship text not null,
  body text not null,
  title text,
  status text not null default 'pending',
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
grant select on public.community_stories to anon, authenticated;
grant insert, update, delete on public.community_stories to authenticated;
grant all on public.community_stories to service_role;
alter table public.community_stories enable row level security;
create policy "Approved stories public, own and admin visible" on public.community_stories for select using (status = 'approved' or auth.uid() = user_id or public.has_role(auth.uid(),'admin'));
create policy "Users submit own stories" on public.community_stories for insert to authenticated with check (auth.uid() = user_id and status = 'pending');
create policy "Users delete own stories" on public.community_stories for delete to authenticated using (auth.uid() = user_id);
create policy "Admins moderate stories" on public.community_stories for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.corrections (
  id uuid primary key default gen_random_uuid(),
  thing_slug text,
  user_id uuid not null default auth.uid(),
  message text not null,
  source_url text,
  status text not null default 'open',
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.corrections to authenticated;
grant all on public.corrections to service_role;
alter table public.corrections enable row level security;
create policy "Own or admin read corrections" on public.corrections for select to authenticated using (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));
create policy "Users submit corrections" on public.corrections for insert to authenticated with check (auth.uid() = user_id and status = 'open');
create policy "Admins review corrections" on public.corrections for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  target_type text not null,
  target_id text not null,
  user_id uuid not null default auth.uid(),
  reason text not null,
  status text not null default 'open',
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.reports to authenticated;
grant all on public.reports to service_role;
alter table public.reports enable row level security;
create policy "Own or admin read reports" on public.reports for select to authenticated using (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));
create policy "Users file reports" on public.reports for insert to authenticated with check (auth.uid() = user_id and status = 'open');
create policy "Admins review reports" on public.reports for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.saves (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  thing_slug text not null,
  created_at timestamptz not null default now(),
  unique (user_id, thing_slug)
);
grant select, insert, delete on public.saves to authenticated;
grant all on public.saves to service_role;
alter table public.saves enable row level security;
create policy "Users manage own saves" on public.saves for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);