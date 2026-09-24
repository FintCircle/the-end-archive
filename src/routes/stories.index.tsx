import { createFileRoute } from "@tanstack/react-router";
import { allStories } from "@/lib/data";
import { StoryEntry } from "@/components/stories";

const title = "Stories from people who were there — Scruttin";
const desc = "Firsthand experiences from the products, projects, platforms and companies documented on Scruttin.";

export const Route = createFileRoute("/stories/")({
  head: () => ({
    meta: [
      { title }, { name: "description", content: desc },
      { property: "og:title", content: title }, { property: "og:description", content: desc },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/stories" }],
  }),
  component: StoriesPage,
});

function StoriesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-24">
      <div className="border-b border-foreground pb-6 pt-12">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Were you there?</p>
        <h1 className="mt-2 font-display text-5xl font-bold md:text-6xl">Stories from people who were there</h1>
        <p className="mt-3 text-lg text-muted-foreground">{desc}</p>
      </div>
      <div className="mt-8 space-y-10">
        {allStories.map((s) => <StoryEntry key={s.id} s={s} showSubject />)}
      </div>
      <p className="mt-10 font-mono text-[11px] text-muted-foreground">Personal accounts, separate from Scruttin's reporting. Connections are self-declared.</p>
    </main>
  );
}
