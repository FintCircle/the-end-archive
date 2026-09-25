import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { isAdmin, requireUser, supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Scruttin" }, { name: "description", content: "Scruttin moderation workspace." }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

type Queue = { id: string; title?: string; name?: string; status: string; created_at: string; body?: string; message?: string };

function Admin() {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [tab, setTab] = useState("archive");
  const [items, setItems] = useState<Queue[]>([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name: "", slug: "", organization: "", category: "", description: "", status: "draft" });

  async function load() {
    const user = await requireUser();
    const admin = Boolean(user && (await isAdmin(user.id)));
    setAllowed(admin);
    if (!admin) return;
    if (tab === "archive") {
      const { data } = await supabase.from("archive_items").select("id,name,slug,status,organization,created_at").order("created_at", { ascending: false });
      setItems((data ?? []) as Queue[]);
    } else if (tab === "stories") {
      const { data } = await supabase.from("community_stories").select("id,title,status,body,created_at").eq("status", "pending").order("created_at", { ascending: false });
      setItems((data ?? []) as Queue[]);
    } else if (tab === "corrections") {
      const { data } = await supabase.from("corrections").select("id,message,status,created_at").eq("status", "open").order("created_at", { ascending: false });
      setItems((data ?? []) as Queue[]);
    } else {
      const { data } = await supabase.from("reports").select("id,reason,status,created_at").eq("status", "open").order("created_at", { ascending: false });
      setItems((data ?? []) as Queue[]);
    }
  }

  useEffect(() => { void load(); }, [tab]);

  async function saveItem(event: FormEvent) {
    event.preventDefault();
    const user = await requireUser();
    if (!user) return setMessage("Sign in with Google to continue.");
    const { error } = await supabase.from("archive_items").insert({ ...form, created_by: user.id, ended_on: null });
    setMessage(error ? "Could not save this entry." : "Entry saved. Publish it from the archive queue.");
    if (!error) { setForm({ name: "", slug: "", organization: "", category: "", description: "", status: "draft" }); await load(); }
  }

  async function moderate(id: string, table: string, status: string) {
    const user = await requireUser();
    if (!user) return;
    await supabase.from(table as "reports").update({ status, reviewed_by: user.id, reviewed_at: new Date().toISOString() }).eq("id", id);
    await load();
  }

  if (allowed === null) return <main className="mx-auto max-w-6xl px-4 py-24"><p className="font-mono text-xs uppercase">Checking admin access…</p></main>;
  if (!allowed) return <main className="mx-auto max-w-xl px-4 py-24"><h1 className="font-display text-5xl font-bold">Admin access only</h1><p className="mt-4 text-muted-foreground">This workspace is reserved for the archive administrator.</p></main>;

  return <main className="mx-auto max-w-6xl px-4 py-12">
    <div className="border-t border-foreground pt-6"><p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Control room</p><h1 className="mt-3 font-display text-5xl font-bold">Admin</h1><p className="mt-3 max-w-2xl text-muted-foreground">Manage the canonical archive, publish entries, and review community submissions before they go live.</p></div>
    <nav className="mt-10 flex flex-wrap gap-2">{[["archive","Archive entries"],["stories","Stories"],["corrections","Corrections"],["reports","Reports"]].map(([value,label]) => <button key={value} onClick={() => setTab(value ?? "archive")} className={`border px-4 py-2 font-mono text-xs uppercase ${tab === value ? "bg-foreground text-background" : ""}`}>{label}</button>)}</nav>
    {tab === "archive" && <form onSubmit={saveItem} className="mt-8 grid gap-3 border-t border-foreground/30 pt-6 md:grid-cols-2">{Object.entries(form).map(([key,value]) => key === "description" ? <textarea key={key} rows={4} value={value} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={key} className="border border-foreground/30 bg-card px-3 py-2 md:col-span-2" /> : <input key={key} value={value} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={key} className="border border-foreground/30 bg-card px-3 py-2" />)}<button className="bg-foreground px-5 py-3 font-mono text-xs uppercase text-background md:col-span-2">Add archive entry</button></form>}
    {message && <p className="mt-4 font-mono text-xs uppercase">{message}</p>}
    <section className="mt-10 space-y-3">{items.map(item => <article key={item.id} className="border-t border-foreground/30 py-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="font-display text-2xl">{item.name ?? item.title ?? item.message ?? "Report"}</h2><p className="mt-1 text-sm text-muted-foreground">{item.status} · {new Date(item.created_at).toLocaleDateString()}</p></div>{tab !== "archive" && <div className="flex gap-2"><button onClick={() => moderate(item.id, tab === "stories" ? "community_stories" : tab === "corrections" ? "corrections" : "reports", tab === "stories" ? "approved" : tab === "corrections" ? "accepted" : "reviewed")} className="border px-3 py-2 font-mono text-xs uppercase">Approve</button><button onClick={() => moderate(item.id, tab === "stories" ? "community_stories" : tab === "corrections" ? "corrections" : "reports", tab === "stories" ? "rejected" : tab === "corrections" ? "rejected" : "dismissed")} className="border px-3 py-2 font-mono text-xs uppercase">Reject</button></div>}</div></article>)}</section>
  </main>;
}
