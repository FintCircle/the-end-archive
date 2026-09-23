import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { getThing } from "@/lib/data";
import { PageTitle } from "@/components/ui-bits";

export const Route = createFileRoute("/add")({
  validateSearch: (s: Record<string, unknown>): { correction?: string; story?: string } => ({
    correction: typeof s["correction"] === "string" ? s["correction"] : undefined,
    story: typeof s["story"] === "string" ? s["story"] : undefined,
  }),
  head: () => ({ meta: [
    { title: "Contribute — Scruttin" },
    { name: "description", content: "Add something that ended, suggest a correction, or share a first-hand story." },
    { property: "og:title", content: "Contribute — Scruttin" },
    { property: "og:description", content: "Help document what happened." },
  ] }),
  component: Add,
});

const RELATIONSHIPS = ["I created it", "I worked on it", "I was involved", "I used it", "I witnessed it", "I researched it"];
const field = "w-full border border-foreground/30 bg-card px-3 py-2 outline-none focus:border-foreground";

function Add() {
  const { correction, story } = Route.useSearch();
  const thing = getThing(correction ?? story ?? "");
  const [sent, setSent] = useState(false);
  const mode = story ? "story" : correction ? "correction" : "add";
  const title = mode === "story" ? `Tell your story${thing ? `: ${thing.name}` : ""}` : mode === "correction" ? `Suggest a correction${thing ? `: ${thing.name}` : ""}` : "Add something that ended";

  if (sent) return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-bold">Thank you.</h1>
      <p className="mt-4 text-muted-foreground">Your submission will be reviewed before anything is published.</p>
    </main>
  );

  return (
    <main className="mx-auto max-w-2xl px-4 pb-24">
      <PageTitle title={title} sub="All contributions are reviewed by moderators before publishing." />
      <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-8 space-y-5">
        {mode === "add" && <>
          <input required placeholder="Name" className={field} />
          <input placeholder="Short description" className={field} />
          <input placeholder="Organization responsible" className={field} />
          <input placeholder="End date (e.g. 2025-07-08)" className={field} />
          <textarea rows={4} placeholder="What happened?" className={field} />
          <input type="url" required placeholder="Source URL (official announcement preferred)" className={field} />
        </>}
        {mode === "correction" && <>
          <textarea required rows={5} placeholder="What should change, and why?" className={field} />
          <input type="url" required placeholder="Supporting source URL" className={field} />
        </>}
        {mode === "story" && <>
          <select required className={field} defaultValue="">
            <option value="" disabled>Your relationship</option>
            {RELATIONSHIPS.map((r) => <option key={r}>{r}</option>)}
          </select>
          <input required placeholder="Title" className={field} />
          <textarea required rows={12} className={`${field} font-display text-lg`}
            placeholder={"What was it? When did you realize something was changing? What did outsiders misunderstand? (optional prompts)"} />
          <p className="text-sm text-muted-foreground">Stories are published as your personal account. Relationships are not verified automatically.</p>
        </>}
        <button className="bg-foreground px-6 py-3 font-mono text-sm uppercase text-background">Submit for review</button>
      </form>
    </main>
  );
}
