# Petsin Mobile App — Starter

This repository contains a React Native (Expo) starter app scaffolded with a simple folder structure and Supabase wiring.

What I added:
- `src/lib/supabase.ts` — Supabase client
- `src/constants/supabase.ts` — placeholder for your Supabase URL and anon key
- `src/navigation` — navigation stack (Login, Signup, Home)
- `src/screens` — example screens
- `src/components/common` — small Input and Button components
- `src/services/authService.ts` — simple auth wrappers for signup/signin
- `src/hooks/useAuth.ts` — basic hook to observe auth state

Quick setup

1. Install dependencies (run from project root):

```powershell
npm install
# if you prefer yarn:
# yarn install
```

2. Add your Supabase credentials: open `src/constants/supabase.ts` and replace the placeholder values with your project's URL and anon key.

3. Run the app with Expo:

```powershell
npm start
# or
# yarn start
```

Notes and next steps
- Replace the placeholder UI with your designs.
- Use `useAuth` or a context to manage signed-in state and protected routes.
- For production, keep Supabase keys out of source control and use environment variables or a secrets manager.