import { createFileRoute, Link } from "@tanstack/react-router";
import { things } from "@/lib/data";
import { PageTitle } from "@/components/ui-bits";

export const Route = createFileRoute("/end-list/")({
  head: () => ({ meta: [
    { title: "The End List — Scruttin" },
    { name: "description", content: "A monthly record of everything that was discontinued, shut down or cancelled." },
    { property: "og:title", content: "The End List — Scruttin" },
    { property: "og:description", content: "What disappeared, month by month." },
  ] }),
  component: EndListIndex,
});

function EndListIndex() {
  const months = [...new Set(things.filter((t) => t.end.length > 4).map((t) => t.end.slice(0, 7)))].sort().reverse();
  return (
    <main className="mx-auto max-w-4xl px-4 pb-24">
      <PageTitle title="The End List" sub="What disappeared, month by month." />
      <ul>
        {months.map((m) => {
          const y = m.slice(0, 4), mo = m.slice(5, 7);
          const n = things.filter((t) => t.end.startsWith(m)).length;
          return (
            <li key={m} className="border-b border-border">
              <Link to="/end-list/$year/$month" params={{ year: y, month: mo }} className="flex justify-between py-4">
                <span className="font-display text-2xl">{new Date(`${m}-01T00:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}</span>
                <span className="font-mono text-sm text-muted-foreground">{n} record{n > 1 ? "s" : ""}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
