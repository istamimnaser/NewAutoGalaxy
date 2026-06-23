# Supabase Setup Guide

## 1. Create a Supabase project
1. Go to https://supabase.com → New Project
2. Choose a name (e.g. "newautogalaxy"), set a strong DB password, pick a region close to Bangladesh (Singapore)
3. Wait ~2 minutes for the project to spin up

---

## 2. Run this SQL in the SQL Editor

Go to **SQL Editor** in the Supabase dashboard and run:

```sql
-- Cars table
create table cars (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  brand        text not null,
  model        text not null,
  year         integer not null,
  price        bigint not null,
  category     text check (category in ('brand-new','reconditioned','used')) not null,
  images       text[] default '{}',
  specs        jsonb default '{}',
  features     text[] default '{}',
  description  text default '',
  is_featured  boolean default false,
  created_at   timestamptz default now()
);

-- Gallery table
create table gallery (
  id         uuid primary key default gen_random_uuid(),
  url        text not null,
  caption    text default '',
  created_at timestamptz default now()
);

-- Allow public read access to both tables
alter table cars    enable row level security;
alter table gallery enable row level security;

create policy "Public can read cars"    on cars    for select using (true);
create policy "Public can read gallery" on gallery for select using (true);

-- Admin (authenticated) full access
create policy "Admin full access cars"    on cars    for all using (auth.role() = 'authenticated');
create policy "Admin full access gallery" on gallery for all using (auth.role() = 'authenticated');
```

---

## 3. Create Storage Buckets

In **Storage** → New Bucket:

1. Name: `car-images`  → toggle **Public bucket** ON
2. Name: `gallery-images` → toggle **Public bucket** ON

Then in each bucket's **Policies** tab, add:
- **SELECT** → allow for everyone (anon)
- **INSERT / UPDATE / DELETE** → allow for `authenticated` role only

---

## 4. Create an Admin User

Go to **Authentication → Users → Invite User**
Enter the client's email address. They'll receive an email to set their password.

OR use **Add User** and set the password manually, then share it with the client.

---

## 5. Add env variables

### Local development
Edit `.env.local`:
```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```
Find both values in **Settings → API** in Supabase.

### Vercel
1. Go to **vercel.com → your project → Settings → Environment Variables**
2. Add both variables for **Production**, **Preview**, and **Development**:
```
VITE_SUPABASE_URL      = https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJ...
```
3. After adding them, go to **Deployments → the latest deployment → Redeploy** so the new env vars take effect.

---

## 6. Access the Admin Portal

- **URL**: yoursite.com/admin  (not linked anywhere on the site)
- **Secret shortcut**: Press `Ctrl + Shift + G` anywhere on the site
- Login with the email/password you created in step 4

---

## Admin Portal Routes

| URL                      | Purpose                  |
|--------------------------|--------------------------|
| /admin                   | Login page               |
| /admin/dashboard         | Stats overview           |
| /admin/cars              | List all cars            |
| /admin/cars/new          | Add a new car            |
| /admin/cars/edit/:id     | Edit an existing car     |
| /admin/gallery           | Upload/delete gallery photos |
