import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/ui-bits";

export const Route = createFileRoute("/about")({ component: About });

const sections = [
  ["Built out of curiosity", "Scruttin comes from a builder. Some ideas work, some do not, and some never become what we imagined. When something disappears, we want to understand why—not celebrate another failure. There were people behind it, decisions, experiments, mistakes, circumstances, customers and competitors. There is something to learn there."],
  ["The people who were there", "Official announcements only tell part of a story. News articles tell another part. The person who built it, the employee who worked there, the customer who used it every day, the early adopter, investor, competitor or witness may know something the archive does not. That is why you will see the question: Were you there?"],
  ["Facts, memories and theories", "Scruttin is not here to manufacture explanations. We document what we know, show where it came from, preserve what people involved have said, collect first-hand experiences and leave room for discussion. If we do not know something, we would rather say we do not know."],
  ["Failure is not the point", "Not everything documented here is a failure. Some products were acquired and closed, replaced, transformed or simply reached their natural end. Scruttin is not a graveyard. It is an archive of things people tried to make—and what happened to them."],
  ["Maybe we can build better by looking backward", "Success stories are useful. So are stories where things went wrong. Understanding why people left a product, why a business model struggled, why an idea arrived too early or why a community disappeared might help the next person make a different decision. Not every story needs a lesson, but we should not lose the opportunity to learn."],
  ["Let's document what happened", "There are thousands of stories scattered across old blogs, shutdown announcements, forgotten websites, interviews, archives and people's memories. We want to bring those pieces together. One product. One project. One story at a time. Before the domains expire, before the old posts disappear, before all that is left is a broken link."],
];

function About() {
  return <main className="mx-auto max-w-3xl px-4 pb-24"><PageTitle title="About Scruttin" sub="We want to know what happened." /><div className="mt-10 space-y-10">{sections.map(([title, text]) => <section key={title}><h2 className="font-display text-3xl font-semibold">{title}</h2><p className="mt-3 text-lg leading-relaxed text-muted-foreground">{text}</p></section>)}</div></main>;
}
