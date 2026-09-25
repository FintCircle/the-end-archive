// Single source of truth: the generated Lovable Cloud client reads
// VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY from the environment,
// so the same code works on Lovable hosting, Vercel, or a custom domain.
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export { supabase };

export async function requireUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

/** Server-side role check via the has_role() database function (never client storage). */
export async function isAdmin(userId: string) {
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  return data === true;
}

/** Current origin — never hard-coded, so redirects follow whatever domain serves the app. */
export function appOrigin() {
  const configured = import.meta.env["VITE_SITE_URL"] as string | undefined;
  if (typeof window !== "undefined") return window.location.origin;
  return configured ?? "";
}

/** Lovable-hosted domains support the managed Google sign-in broker. */
function isLovableHost() {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  return h.endsWith(".lovable.app") || h.endsWith(".lovableproject.com") || h === "localhost" || window.self !== window.top;
}

export async function signInWithGoogle() {
  if (isLovableHost()) {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: appOrigin() });
    return r.error ? r.error.message : null;
  }
  // Non-Lovable hosting (e.g. Vercel): standard OAuth redirect straight to the backend.
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${appOrigin()}/account` },
  });
  return error ? error.message : null;
}
