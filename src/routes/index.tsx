import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { byEndDesc, things } from "@/lib/data";
import { ThingCard } from "@/components/ui-bits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Scruttin — What happened?" },
      { name: "description", content: "A searchable archive of products, companies, apps and projects that were discontinued, shut down or cancelled." },
      { property: "og:title", content: "Scruttin — What happened?" },
      { property: "og:description", content: "Things disappear. Scruttin documents what happened." },
    ],
  }),
  component: Home,
});

function Section({ title, items, to }: { title: string; items: typeof things; to?: "/recent" }) {
  if (!items.length) return null;
  return (
    <section className="mt-16">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em]">{title}</h2>
        {to && <Link to={to} className="font-mono text-xs uppercase">See all →</Link>}
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{items.map((t) => <ThingCard key={t.slug} t={t} />)}</div>
    </section>
  );
}

function Home() {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  return (
    <main className="mx-auto max-w-6xl px-4 pb-24">
      <section className="py-20 text-center md:py-28">
        <p className="font-display text-sm font-bold tracking-[0.4em]">SCRUTTIN</p>
        <h1 className="mt-6 font-display text-6xl font-bold md:text-8xl">What happened?</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Things disappear. Products are discontinued. Companies close. Projects get cancelled. Scruttin documents what happened.
        </p>
        <form onSubmit={(e) => { e.preventDefault(); nav({ to: "/search", search: { q } }); }} className="mx-auto mt-10 flex w-full max-w-2xl flex-col border-2 border-foreground bg-card md:flex-row">
          <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search the archive"
            placeholder="Search a product, company, app, service, project…"
            className="min-w-0 flex-1 bg-transparent px-5 py-4 text-lg outline-none" />
          <button className="w-full shrink-0 bg-foreground px-6 py-4 font-mono text-sm uppercase tracking-wider text-background md:w-auto md:py-0">Search</button>
        </form>
      </section>
      <Section title="Recently ended" items={byEndDesc.slice(0, 4)} to="/recent" />
      <Section title="Recently cancelled" items={byEndDesc.filter((t) => t.status === "Cancelled").slice(0, 4)} />
      <Section title="Companies that closed" items={byEndDesc.filter((t) => t.type === "Company").slice(0, 4)} />
      <Section title="Recently updated" items={[...things].sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, 4)} />
    </main>
  );
}
