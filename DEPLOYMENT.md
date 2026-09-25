# Deploying Scruttin to Vercel (backend stays on Lovable Cloud)

Lovable → GitHub → Vercel. Lovable Cloud remains the only backend (auth, database, storage). Vercel only serves the frontend.

## Vercel environment variables
Project → Settings → Environment Variables (copy values from the project's `.env`):

| Name | Notes |
| --- | --- |
| `VITE_SUPABASE_URL` | Public backend URL (browser) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public publishable key (browser) |
| `VITE_SUPABASE_PROJECT_ID` | Public |
| `SUPABASE_URL` | Same URL, for server rendering |
| `SUPABASE_PUBLISHABLE_KEY` | Same key, for server rendering |
| `NITRO_PRESET` | `vercel` — builds the server output for Vercel instead of the default edge target |

Never add a service-role key to any `VITE_*` variable. The app does not need one.

## Auth redirects
- Redirects use `window.location.origin` at runtime — nothing is hard-coded, so preview, `*.vercel.app` and a custom domain all work.
- Add every production origin to the backend's allowed redirect URLs (Cloud → Users → Auth Settings → URL configuration), e.g. `https://your-app.vercel.app/**` and `https://yourdomain.com/**`.

## Google sign-in off Lovable hosting
On Lovable domains, Google sign-in uses Lovable's managed broker. On Vercel/custom domains the app falls back to a direct OAuth redirect, which requires your own Google OAuth client:
1. Google Cloud Console → Credentials → OAuth Client ID (Web).
2. Authorized redirect URI: the callback URL shown in Cloud → Users → Auth Settings → Google (ends in `/auth/v1/callback`).
3. Paste the client ID/secret into that same Google settings panel.

## Security model
- `profiles`: public read, owner-only write.
- `community_stories`: approved stories public; pending visible only to author and admins; only admins approve.
- `corrections`, `reports`: visible only to submitter and admins.
- `saves`: owner-only.
- `archive_items`: published entries public; admin-only writes.
- Admin checks use the `has_role()` database function and a separate `user_roles` table.
- To make someone admin: insert `(user_id, 'admin')` into `user_roles` via Cloud → Database.
