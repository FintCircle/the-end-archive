import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { STATUSES, byEndDesc } from "@/lib/data";
import { PageTitle, ResultRow } from "@/components/ui-bits";

export const Route = createFileRoute("/recent")({
  head: () => ({ meta: [
    { title: "Recently Ended — Scruttin" },
    { name: "description", content: "Products, companies, services and projects that recently reached the end." },
    { property: "og:title", content: "Recently Ended — Scruttin" },
    { property: "og:description", content: "Products, companies, services and projects that recently reached the end." },
  ] }),
  component: Recent,
});

const RANGES = { All: 99999, "This month": 31, "This year": 365 } as const;

function Recent() {
  const [status, setStatus] = useState("All");
  const [range, setRange] = useState<keyof typeof RANGES>("All");
  const now = Date.now();
  const list = byEndDesc.filter((t) => (status === "All" || t.status === status)
    && (now - new Date(t.end).getTime()) / 864e5 <= RANGES[range]);
  const chip = (on: boolean) => `border px-3 py-1 font-mono text-xs uppercase ${on ? "border-foreground bg-foreground text-background" : "border-border"}`;
  return (
    <main className="mx-auto max-w-4xl px-4 pb-24">
      <PageTitle title="Recently Ended" sub="Products, companies, services and projects that recently reached the end." />
      <div className="mt-6 flex flex-wrap gap-2">
        {["All", ...STATUSES].map((s) => <button key={s} className={chip(s === status)} onClick={() => setStatus(s)}>{s}</button>)}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {(Object.keys(RANGES) as (keyof typeof RANGES)[]).map((r) => <button key={r} className={chip(r === range)} onClick={() => setRange(r)}>{r}</button>)}
      </div>
      <div className="mt-6">{list.map((t) => <ResultRow key={t.slug} t={t} />)}</div>
      {!list.length && <p className="py-10 text-muted-foreground">No records match these filters.</p>}
    </main>
  );
}
