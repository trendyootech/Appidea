# App Idea Portal

A simple public form to collect app ideas from friends and the public.

## 1. Supabase setup

1. Create a Supabase project.
2. Go to SQL Editor.
3. Run the code from `supabase-table.sql`.
4. Go to Project Settings > API.
5. Copy:
   - Project URL
   - anon public key

## 2. Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Update `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 3. Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repo in Vercel.
3. Add the same environment variables in Vercel.
4. Deploy.

## 4. View submitted ideas

Open Supabase > Table Editor > `app_ideas`.
