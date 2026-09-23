import { createFileRoute } from "@tanstack/react-router";
import { search } from "@/lib/data";
import { PageTitle, ResultRow } from "@/components/ui-bits";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): { q?: string } => (typeof s["q"] === "string" ? { q: s["q"] } : {}),
  head: () => ({ meta: [
    { title: "Search the archive — Scruttin" },
    { name: "description", content: "Search discontinued products, closed companies, cancelled projects and more." },
    { property: "og:title", content: "Search — Scruttin" },
    { property: "og:description", content: "Find out what happened to any product, company or project." },
  ] }),
  component: SearchPage,
});

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const results = search(q);
  return (
    <main className="mx-auto max-w-4xl px-4 pb-24">
      <PageTitle title={q ? `“${q}”` : "Search"} sub={`${results.length} record${results.length === 1 ? "" : "s"}`} />
      {results.map((t) => <ResultRow key={t.slug} t={t} />)}
      {q && !results.length && <p className="py-10 text-muted-foreground">Nothing found. It may not be in the archive yet.</p>}
    </main>
  );
}
