import { createFileRoute } from "@tanstack/react-router";
import { STATUSES, things } from "@/lib/data";
import { PageTitle, ResultRow } from "@/components/ui-bits";

const label = (y: string, m: string) =>
  new Date(`${y}-${m}-01T00:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

export const Route = createFileRoute("/end-list/$year/$month")({
  head: ({ params }) => {
    const t = `The End List: ${label(params.year, params.month)} — Scruttin`;
    return { meta: [
      { title: t },
      { name: "description", content: `Everything discontinued, shut down or cancelled in ${label(params.year, params.month)}.` },
      { property: "og:title", content: t },
      { property: "og:description", content: `What ended in ${label(params.year, params.month)}.` },
    ], links: [{ rel: "canonical", href: `/end-list/${params.year}/${params.month}` }] };
  },
  component: Month,
});

function Month() {
  const { year, month } = Route.useParams();
  const list = things.filter((t) => t.end.startsWith(`${year}-${month}`));
  return (
    <main className="mx-auto max-w-4xl px-4 pb-24">
      <PageTitle title={label(year, month)} sub="The End List" />
      <div className="mt-6 space-y-1 font-mono text-sm">
        {STATUSES.map((s) => { const n = list.filter((t) => t.status === s).length; return n ? <p key={s}>{n} {s.toLowerCase()}.</p> : null; })}
      </div>
      <div className="mt-6">{list.map((t) => <ResultRow key={t.slug} t={t} />)}</div>
      {!list.length && <p className="py-10 text-muted-foreground">Nothing recorded for this month.</p>}
    </main>
  );
}
