import { createFileRoute, Link } from "@tanstack/react-router";
import { formatDate, upcoming } from "@/lib/data";
import { PageTitle, StatusBadge } from "@/components/ui-bits";

export const Route = createFileRoute("/ending-soon")({
  head: () => ({ meta: [
    { title: "Ending Soon — Scruttin" },
    { name: "description", content: "Products and services with confirmed shutdown dates, and what users should do before they go." },
    { property: "og:title", content: "Ending Soon — Scruttin" },
    { property: "og:description", content: "Confirmed upcoming shutdowns and what you need to know." },
  ] }),
  component: EndingSoon,
});

function EndingSoon() {
  const now = Date.now();
  return (
    <main className="mx-auto max-w-4xl px-4 pb-24">
      <PageTitle title="Ending Soon" sub="Confirmed future shutdowns — what is ending, when, and what you should do." />
      {upcoming.map((t) => {
        const days = Math.ceil((new Date(t.end).getTime() - now) / 864e5);
        return (
          <Link key={t.slug} to="/thing/$slug" params={{ slug: t.slug }} className="block border-b border-border py-6">
            <StatusBadge status={t.status} />
            <h3 className="mt-2 font-display text-3xl font-bold">{t.name}</h3>
            <p className="font-mono text-sm">Ends {formatDate(t.end)} · <span className="text-primary">{days} days remaining</span></p>
            <p className="mt-2 font-mono text-xs uppercase">What you need to know →</p>
          </Link>
        );
      })}
      {!upcoming.length && (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">No confirmed upcoming shutdowns in the archive right now.</p>
          <Link to="/add" className="mt-4 inline-block underline">Know of one? Add it →</Link>
        </div>
      )}
    </main>
  );
}
