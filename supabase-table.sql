create table if not exists app_ideas (
  id uuid primary key default gen_random_uuid(),
  name text,
  contact text,
  idea_title text not null,
  problem text not null,
  target_users text not null,
  usage_frequency text not null,
  features text not null,
  similar_app text,
  will_use text not null,
  extra_details text,
  created_at timestamp with time zone default now()
);

alter table app_ideas enable row level security;

create policy "Anyone can submit app ideas"
on app_ideas
for insert
to anon
with check (true);
