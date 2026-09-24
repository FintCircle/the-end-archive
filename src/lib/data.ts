export type Status =
  | "Discontinued" | "Shut Down" | "Cancelled" | "Abandoned" | "Failed"
  | "Acquired & Ended" | "Merged" | "Replaced" | "Changed Direction"
  | "Shutting Down Soon" | "Inactive" | "Unknown";

export type ThingType =
  | "Product" | "Company" | "App" | "Website" | "Service" | "Game" | "Film"
  | "TV project" | "Technology" | "Physical product" | "Organization" | "Project"
  | "Feature" | "Publication" | "Other";

export type SourceType = "Official announcement" | "Company documentation" | "Public record" | "Direct statement" | "Reporting" | "Other";

export interface Source { title: string; url: string; publisher: string; type: SourceType }
export interface TimelineEvent { date: string; title: string; sourced?: boolean }

export interface Thing {
  slug: string;
  name: string;
  description: string;
  type: ThingType;
  status: Status;
  organization: string;
  launch: string; // YYYY or YYYY-MM-DD
  announced?: string;
  end: string;
  whatHappened: string;
  officialReason?: string;
  reportedFactors?: string[];
  userImpact?: string[];
  replacedBy?: string;
  alternatives?: string[];
  timeline: TimelineEvent[];
  sources: Source[];
  updated: string;
}

export const STATUSES: Status[] = ["Discontinued", "Shut Down", "Cancelled", "Abandoned", "Replaced", "Acquired & Ended"];

export const things: Thing[] = [
  {
    slug: "pocket", name: "Pocket", description: "Read-it-later service for saving articles and videos.",
    type: "Service", status: "Discontinued", organization: "Mozilla",
    launch: "2007", announced: "2025-05-22", end: "2025-07-08",
    whatHappened: "Mozilla shut down Pocket on July 8, 2025. Saved items could be exported until October 2025, after which user data was deleted.",
    officialReason: "Mozilla said the way people save and consume content on the web had changed and it would focus resources on Firefox and other projects.",
    reportedFactors: ["Declining usage relative to its peak", "Mozilla's broader cost-cutting and product consolidation"],
    userImpact: ["App and browser extension stopped working on July 8, 2025", "Export available until October 8, 2025", "Premium subscriptions were cancelled and prorated refunds issued", "Accounts and data deleted after the export window"],
    alternatives: ["Instapaper", "Raindrop.io", "Readwise Reader"],
    timeline: [
      { date: "2007", title: "Launches as Read It Later." },
      { date: "2012", title: "Rebrands as Pocket." },
      { date: "2017", title: "Acquired by Mozilla.", sourced: true },
      { date: "May 2025", title: "Shutdown announced.", sourced: true },
      { date: "July 2025", title: "Service discontinued.", sourced: true },
    ],
    sources: [{ title: "Important updates to Pocket", url: "https://support.mozilla.org/kb/future-of-pocket", publisher: "Mozilla Support", type: "Official announcement" }],
    updated: "2026-09-01",
  },
  {
    slug: "google-domains", name: "Google Domains", description: "Domain registration service run by Google.",
    type: "Service", status: "Acquired & Ended", organization: "Google",
    launch: "2014", announced: "2023-06-15", end: "2023-09-07",
    whatHappened: "Google sold its domain registration business to Squarespace. Customer domains were migrated to Squarespace Domains during 2023 and 2024.",
    officialReason: "Google said the sale let it sharpen its focus on other products.",
    userImpact: ["Domains were transferred to Squarespace automatically", "Customers could transfer to another registrar instead", "Existing pricing honored for at least 12 months"],
    replacedBy: "Squarespace Domains",
    alternatives: ["Cloudflare Registrar", "Porkbun", "Namecheap"],
    timeline: [
      { date: "2014", title: "Launches in invite-only beta." },
      { date: "2022", title: "Leaves beta." },
      { date: "June 2023", title: "Sale to Squarespace announced.", sourced: true },
      { date: "Sept 2023", title: "Sale completes; migration begins." },
    ],
    sources: [{ title: "Google Domains FAQ", url: "https://support.google.com/domains", publisher: "Google", type: "Company documentation" }],
    updated: "2026-08-12",
  },
  {
    slug: "vine", name: "Vine", description: "Six-second looping video app.",
    type: "App", status: "Discontinued", organization: "Twitter",
    launch: "2013", announced: "2016-10-27", end: "2017-01-17",
    whatHappened: "Twitter discontinued the Vine app in January 2017, turning it into a camera-only app and later an archive of existing videos.",
    officialReason: "Twitter announced it was discontinuing the mobile app without giving a detailed public reason.",
    reportedFactors: ["Creators leaving for platforms with monetization", "Competition from Instagram and Snapchat", "Twitter cost-cutting at the time"],
    userImpact: ["Users could download their vines", "An archive remained viewable for a period afterward"],
    replacedBy: "Vine Camera (short-lived)",
    alternatives: ["TikTok", "Instagram Reels", "YouTube Shorts"],
    timeline: [
      { date: "2012", title: "Acquired by Twitter before launch." },
      { date: "Jan 2013", title: "App launches." },
      { date: "Oct 2016", title: "Discontinuation announced.", sourced: true },
      { date: "Jan 2017", title: "App discontinued." },
    ],
    sources: [], updated: "2026-07-20",
  },
  {
    slug: "google-stadia", name: "Google Stadia", description: "Cloud gaming platform.",
    type: "Service", status: "Shut Down", organization: "Google",
    launch: "2019", announced: "2022-09-29", end: "2023-01-18",
    whatHappened: "Google shut down Stadia on January 18, 2023 and refunded hardware and game purchases.",
    officialReason: "Google said Stadia had not gained the traction with users it expected.",
    userImpact: ["Refunds for Stadia hardware and games", "Controllers later gained a Bluetooth mode", "Game saves lost unless the publisher supported transfer"],
    alternatives: ["Xbox Cloud Gaming", "GeForce Now"],
    timeline: [
      { date: "Nov 2019", title: "Launches." },
      { date: "Feb 2021", title: "Internal game studios closed." },
      { date: "Sept 2022", title: "Shutdown announced.", sourced: true },
      { date: "Jan 2023", title: "Service shut down." },
    ],
    sources: [], updated: "2026-06-02",
  },
  {
    slug: "skype", name: "Skype", description: "Video calling and messaging software.",
    type: "App", status: "Replaced", organization: "Microsoft",
    launch: "2003", announced: "2025-02-28", end: "2025-05-05",
    whatHappened: "Microsoft retired Skype on May 5, 2025 and moved users to the free version of Microsoft Teams.",
    officialReason: "Microsoft said it was streamlining its consumer communications around Teams.",
    userImpact: ["Users could sign in to Teams Free with their Skype account", "Chats and contacts carried over", "Data export offered for a limited time"],
    replacedBy: "Microsoft Teams (free)",
    alternatives: ["Zoom", "Google Meet", "WhatsApp"],
    timeline: [
      { date: "2003", title: "Launches." },
      { date: "2011", title: "Acquired by Microsoft." },
      { date: "Feb 2025", title: "Retirement announced.", sourced: true },
      { date: "May 2025", title: "Service retired." },
    ],
    sources: [], updated: "2026-09-10",
  },
  {
    slug: "batgirl", name: "Batgirl", description: "DC feature film intended for HBO Max.",
    type: "Film", status: "Cancelled", organization: "Warner Bros. Discovery",
    launch: "2021", end: "2022-08-02",
    whatHappened: "Warner Bros. Discovery shelved the nearly finished film in August 2022. It was never released.",
    officialReason: "The studio cited a strategic shift for DC films after its merger.",
    reportedFactors: ["Tax write-down after the merger"],
    timeline: [
      { date: "2021", title: "Production begins." },
      { date: "Aug 2022", title: "Film shelved." },
    ],
    sources: [], updated: "2026-05-14",
  },
  {
    slug: "humane-ai-pin", name: "Humane AI Pin", description: "Screenless wearable AI device.",
    type: "Physical product", status: "Shut Down", organization: "Humane",
    launch: "2024", announced: "2025-02-18", end: "2025-02-28",
    whatHappened: "Humane's servers were shut down on February 28, 2025 after HP acquired parts of the company. The devices stopped working for most functions.",
    userImpact: ["Cloud features, calls and messages stopped", "Refunds offered only to recent buyers"],
    timeline: [
      { date: "Nov 2023", title: "Announced." },
      { date: "Apr 2024", title: "Ships to customers." },
      { date: "Feb 2025", title: "HP deal and shutdown announced.", sourced: true },
      { date: "Feb 28, 2025", title: "Servers shut down." },
    ],
    sources: [], updated: "2026-04-03",
  },
  {
    slug: "quibi", name: "Quibi", description: "Short-form mobile streaming service.",
    type: "Company", status: "Shut Down", organization: "Quibi Holdings",
    launch: "2020", announced: "2020-10-21", end: "2020-12-01",
    whatHappened: "Quibi shut down about six months after launch. Its content library was later sold to Roku.",
    officialReason: "The founders said the idea was not strong enough to justify a standalone service, or the timing was wrong.",
    replacedBy: "Content moved to The Roku Channel",
    timeline: [
      { date: "Apr 2020", title: "Launches." },
      { date: "Oct 2020", title: "Shutdown announced.", sourced: true },
      { date: "Dec 2020", title: "Service ends." },
    ],
    sources: [], updated: "2026-03-22",
  },
];

export interface Story {
  id: string;
  slug: string; // thing slug
  relationship: string; // one of the RELATIONSHIPS on /add
  title: string;
  body: string;
  author: string; // display name or "Anonymous"
  date: string; // YYYY-MM-DD
}

export const stories: Story[] = [
  {
    id: "st-pocket-1", slug: "pocket", relationship: "I used it",
    title: "A decade of articles I never read, gone",
    author: "Marta K.", date: "2025-07-20",
    body: "I started saving to Read It Later in 2010, on a jailbroken iPod Touch. Over fifteen years I saved around 4,000 articles — a private library of things I meant to read. When Mozilla announced the shutdown I exported everything, but the export was just a CSV of links. The tags, the highlights, the reading streaks: none of that came out. I spent a weekend re-saving a few hundred links into Raindrop and gave up on the rest. What I miss most is the little dopamine hit of the save button. Nothing else made saving feel that good.",
  },
  {
    id: "st-pocket-2", slug: "pocket", relationship: "I worked on it",
    title: "We always knew the recommendations were the product",
    author: "Anonymous (former Mozilla)", date: "2025-08-02",
    body: "Inside the company, Pocket's value was never the save button — it was the recommendation data feeding the Firefox new tab. Once that contract changed internally, the standalone app's days were numbered. The team still shipping Pocket features in 2024 knew they were maintaining something whose owner had moved on. I don't blame anyone; I blame the fact that a tool used by millions became a line item in a strategy deck.",
  },
  {
    id: "st-stadia-1", slug: "google-stadia", relationship: "I used it",
    title: "It actually worked, and that was the tragedy",
    author: "Devon R.", date: "2025-01-14",
    body: "I played Red Dead Redemption 2 on Stadia on a five-year-old laptop, over hotel wifi, and it just worked. That's the thing people who never tried it don't understand: the tech was genuinely good. What killed it was trust. Everyone I knew said the same thing — 'I'm not buying games on a Google platform, they'll kill it.' And then they did, and refunded us, which was almost worse, because it proved we'd been right all along.",
  },
  {
    id: "st-vine-1", slug: "vine", relationship: "I created it",
    title: "The six seconds were never the problem",
    author: "Anonymous (former Vine creator, ~1M followers)", date: "2026-02-11",
    body: "People blame the format, but the format was fine — TikTok proved that. Vine died because Twitter never let us earn anything. In 2015, twenty of the biggest creators went to a meeting at Vine's office and asked for monetization and basic product changes. Nothing came of it. Within a year most of us were posting on Instagram and YouTube instead. When the shutdown announcement came, nobody I knew was surprised. The surprise was that it took that long.",
  },
  {
    id: "st-skype-1", slug: "skype", relationship: "I used it",
    title: "Skype was how I talked to my grandmother",
    author: "Petra S.", date: "2025-05-06",
    body: "My grandmother in Poland learned one piece of software in her life, and it was Skype. For twelve years, every Sunday, the sound of that ringtone meant family. When Microsoft retired it I moved her to WhatsApp, and it took her months to stop saying 'call me on Skype.' The account migration to Teams technically worked, but Teams is an office. Skype was a kitchen table. That's the difference no migration tool can carry over.",
  },
  {
    id: "st-humane-1", slug: "humane-ai-pin", relationship: "I used it",
    title: "I paid $700 for a brick with a laser",
    author: "J. Okafor", date: "2025-03-04",
    body: "I bought the AI Pin at launch because the demo was beautiful and I wanted to believe. In practice: the projector was invisible in daylight, the battery ran hot against my chest, and every query took ten seconds. I wore it maybe nine times. When the HP deal was announced and they said the servers would shut down in ten days, I wasn't even angry anymore. It's in a drawer now. A $700 reminder that the demo is not the product.",
  },
];

export const getThing = (slug: string) => things.find((t) => t.slug === slug);
export const getStories = (slug: string) => stories.filter((s) => s.slug === slug);
export const year = (d: string) => d.slice(0, 4);
export const byEndDesc = [...things].sort((a, b) => b.end.localeCompare(a.end));
export const upcoming = things.filter((t) => t.status === "Shutting Down Soon");

export function formatDate(d: string) {
  if (d.length === 4) return d;
  return new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export function search(q: string) {
  const s = q.toLowerCase().replace(/what happened to|why did|shut down|\?/g, "").trim();
  if (!s) return [];
  return things.filter((t) =>
    [t.name, t.description, t.type, t.status, t.organization, year(t.end)].join(" ").toLowerCase().includes(s)
    || s.split(/\s+/).every((w) => [t.name, t.description, t.type, t.status, t.organization, year(t.end)].join(" ").toLowerCase().includes(w)));
}
