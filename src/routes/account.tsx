import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { appOrigin, signInWithGoogle, supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/use-auth";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — Scruttin" },
      { name: "description", content: "Sign in or create an account to contribute to the Scruttin archive." },
      { property: "og:title", content: "Account — Scruttin" },
      { property: "og:description", content: "Sign in to contribute to the Scruttin archive." },
    ],
  }),
  component: Account,
});

type Mine = { id: string; thing_slug: string; status: string; created_at: string };

function Account() {
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [mine, setMine] = useState<Mine[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("display_name").eq("id", user.id).maybeSingle().then(({ data }) => setName(data?.display_name ?? ""));
    supabase.from("community_stories").select("id,thing_slug,status,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).then(({ data }) => setMine(data ?? []));
  }, [user]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    if (mode === "up") {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${appOrigin()}/account` } });
      setMsg(error ? error.message : data.session ? "" : "Check your email to confirm your account.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg(error.message);
    }
    setBusy(false);
  }

  if (loading) return <main className="mx-auto max-w-xl px-4 py-24 font-mono text-xs uppercase">Loading…</main>;

  if (user)
    return (
      <main className="mx-auto max-w-xl px-4 py-16">
        <section className="border-t border-foreground pt-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Signed in</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-none">{name || user.email}</h1>
          <p className="mt-3 text-muted-foreground">{user.email}</p>
          <form
            className="mt-6 flex gap-2"
            onSubmit={async (e) => {
              e.preventDefault();
              const { error } = await supabase.from("profiles").update({ display_name: name }).eq("id", user.id);
              setMsg(error ? "Could not save." : "Saved.");
            }}
          >
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Display name" className="flex-1 border border-foreground/30 bg-card px-3 py-2" />
            <button className="border border-foreground px-4 font-mono text-xs uppercase">Save</button>
          </form>
          {msg && <p className="mt-3 font-mono text-xs uppercase">{msg}</p>}
          <h2 className="mt-10 font-display text-2xl font-semibold">Your stories</h2>
          {mine.length ? (
            <ul className="mt-3 space-y-2">
              {mine.map((s) => (
                <li key={s.id} className="flex justify-between border-t border-foreground/20 pt-2 font-mono text-xs uppercase">
                  <Link to="/thing/$slug" params={{ slug: s.thing_slug }} className="underline">{s.thing_slug}</Link>
                  <span className="text-muted-foreground">{s.status}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-muted-foreground">You haven't shared a story yet.</p>
          )}
          <button onClick={() => supabase.auth.signOut()} className="mt-10 border border-foreground px-5 py-3 font-mono text-xs uppercase">
            Sign out
          </button>
        </section>
      </main>
    );

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4 py-16">
      <section className="w-full border-t border-foreground pt-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">The archive is participatory</p>
        <h1 className="mt-4 font-display text-5xl font-bold leading-none">{mode === "in" ? "Sign in" : "Create account"}</h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
          Sign in to save things, share stories, suggest corrections and report entries.
        </p>
        <button
          type="button"
          onClick={async () => { const err = await signInWithGoogle(); if (err) setMsg(err); }}
          className="mt-8 flex w-full items-center justify-center gap-3 border border-foreground bg-foreground px-5 py-3 font-mono text-sm uppercase text-background hover:opacity-85"
        >
          Continue with Google
        </button>
        <p className="my-6 text-center font-mono text-[11px] uppercase text-muted-foreground">or with email</p>
        <form onSubmit={submit} className="space-y-3">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-foreground/30 bg-card px-3 py-2" />
          <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border border-foreground/30 bg-card px-3 py-2" />
          <button disabled={busy} className="w-full border border-foreground px-5 py-3 font-mono text-sm uppercase disabled:opacity-50">
            {mode === "in" ? "Sign in" : "Create account"}
          </button>
        </form>
        {msg && <p className="mt-3 font-mono text-xs">{msg}</p>}
        <button onClick={() => setMode(mode === "in" ? "up" : "in")} className="mt-4 font-mono text-xs uppercase underline">
          {mode === "in" ? "New here? Create an account" : "Have an account? Sign in"}
        </button>
      </section>
    </main>
  );
}
