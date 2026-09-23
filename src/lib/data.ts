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

export const getThing = (slug: string) => things.find((t) => t.slug === slug);
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
