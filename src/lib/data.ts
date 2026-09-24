export type Status =
  | "Discontinued"
  | "Shut Down"
  | "Cancelled"
  | "Abandoned"
  | "Failed"
  | "Acquired & Ended"
  | "Merged"
  | "Replaced"
  | "Changed Direction"
  | "Shutting Down Soon"
  | "Inactive"
  | "Unknown";

export type ThingType =
  | "Product"
  | "Company"
  | "App"
  | "Website"
  | "Service"
  | "Game"
  | "Film"
  | "TV project"
  | "Technology"
  | "Physical product"
  | "Organization"
  | "Project"
  | "Feature"
  | "Publication"
  | "Other";

export type SourceType =
  | "Official announcement"
  | "Company documentation"
  | "Public record"
  | "Direct statement"
  | "Reporting"
  | "Other";

export interface Source {
  title: string;
  url: string;
  publisher: string;
  type: SourceType;
}
export interface GalleryImage {
  id: string;
  src: string;
  caption?: string;
  date?: string;
  source?: string;
}
export interface TimelineEvent {
  date: string;
  title: string;
  sourced?: boolean;
}

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
  gallery?: GalleryImage[];
  updated: string;
}

export const STATUSES: Status[] = [
  "Discontinued",
  "Shut Down",
  "Cancelled",
  "Abandoned",
  "Replaced",
  "Acquired & Ended",
];

export const things: Thing[] = [
  {
    slug: "pocket",
    name: "Pocket",
    description: "Read-it-later service for saving articles and videos.",
    type: "Service",
    status: "Discontinued",
    organization: "Mozilla",
    launch: "2007",
    announced: "2025-05-22",
    end: "2025-07-08",
    whatHappened:
      "Mozilla shut down Pocket on July 8, 2025. Saved items could be exported until October 2025, after which user data was deleted.",
    officialReason:
      "Mozilla said the way people save and consume content on the web had changed and it would focus resources on Firefox and other projects.",
    reportedFactors: [
      "Declining usage relative to its peak",
      "Mozilla's broader cost-cutting and product consolidation",
    ],
    userImpact: [
      "App and browser extension stopped working on July 8, 2025",
      "Export available until October 8, 2025",
      "Premium subscriptions were cancelled and prorated refunds issued",
      "Accounts and data deleted after the export window",
    ],
    alternatives: ["Instapaper", "Raindrop.io", "Readwise Reader"],
    timeline: [
      { date: "2007", title: "Launches as Read It Later." },
      { date: "2012", title: "Rebrands as Pocket." },
      { date: "2017", title: "Acquired by Mozilla.", sourced: true },
      { date: "May 2025", title: "Shutdown announced.", sourced: true },
      { date: "July 2025", title: "Service discontinued.", sourced: true },
    ],
    sources: [
      {
        title: "Important updates to Pocket",
        url: "https://support.mozilla.org/kb/future-of-pocket",
        publisher: "Mozilla Support",
        type: "Official announcement",
      },
    ],
    updated: "2026-09-01",
  },
  {
    slug: "google-domains",
    name: "Google Domains",
    description: "Domain registration service run by Google.",
    type: "Service",
    status: "Acquired & Ended",
    organization: "Google",
    launch: "2014",
    announced: "2023-06-15",
    end: "2023-09-07",
    whatHappened:
      "Google sold its domain registration business to Squarespace. Customer domains were migrated to Squarespace Domains during 2023 and 2024.",
    officialReason: "Google said the sale let it sharpen its focus on other products.",
    userImpact: [
      "Domains were transferred to Squarespace automatically",
      "Customers could transfer to another registrar instead",
      "Existing pricing honored for at least 12 months",
    ],
    replacedBy: "Squarespace Domains",
    alternatives: ["Cloudflare Registrar", "Porkbun", "Namecheap"],
    timeline: [
      { date: "2014", title: "Launches in invite-only beta." },
      { date: "2022", title: "Leaves beta." },
      { date: "June 2023", title: "Sale to Squarespace announced.", sourced: true },
      { date: "Sept 2023", title: "Sale completes; migration begins." },
    ],
    sources: [
      {
        title: "Google Domains FAQ",
        url: "https://support.google.com/domains",
        publisher: "Google",
        type: "Company documentation",
      },
    ],
    updated: "2026-08-12",
  },
  {
    slug: "vine",
    name: "Vine",
    description: "Six-second looping video app.",
    type: "App",
    status: "Discontinued",
    organization: "Twitter",
    launch: "2013",
    announced: "2016-10-27",
    end: "2017-01-17",
    whatHappened:
      "Twitter discontinued the Vine app in January 2017, turning it into a camera-only app and later an archive of existing videos.",
    officialReason:
      "Twitter announced it was discontinuing the mobile app without giving a detailed public reason.",
    reportedFactors: [
      "Creators leaving for platforms with monetization",
      "Competition from Instagram and Snapchat",
      "Twitter cost-cutting at the time",
    ],
    userImpact: [
      "Users could download their vines",
      "An archive remained viewable for a period afterward",
    ],
    replacedBy: "Vine Camera (short-lived)",
    alternatives: ["TikTok", "Instagram Reels", "YouTube Shorts"],
    timeline: [
      { date: "2012", title: "Acquired by Twitter before launch." },
      { date: "Jan 2013", title: "App launches." },
      { date: "Oct 2016", title: "Discontinuation announced.", sourced: true },
      { date: "Jan 2017", title: "App discontinued." },
    ],
    sources: [],
    gallery: [
      {
        id: "vine-01",
        src: "/gallery/vine-01.png",
        caption: "The looping video feed that made six seconds feel infinite.",
        date: "2013",
        source: "Vine archive",
      },
      {
        id: "vine-02",
        src: "/gallery/vine-02.png",
        caption: "Creators built entire visual languages inside the six-second limit.",
        date: "2014",
        source: "Vine archive",
      },
      {
        id: "vine-03",
        src: "/gallery/vine-03.png",
        caption: "The creator economy arrived before the platform was ready for it.",
        date: "2015",
        source: "Vine archive",
      },
      {
        id: "vine-04",
        src: "/gallery/vine-04.png",
        caption: "Vine announced the end of its mobile app in October 2016.",
        date: "October 27, 2016",
        source: "Twitter announcement",
      },
    ],
    updated: "2026-07-20",
  },
  {
    slug: "google-stadia",
    name: "Google Stadia",
    description: "Cloud gaming platform.",
    type: "Service",
    status: "Shut Down",
    organization: "Google",
    launch: "2019",
    announced: "2022-09-29",
    end: "2023-01-18",
    whatHappened:
      "Google shut down Stadia on January 18, 2023 and refunded hardware and game purchases.",
    officialReason: "Google said Stadia had not gained the traction with users it expected.",
    userImpact: [
      "Refunds for Stadia hardware and games",
      "Controllers later gained a Bluetooth mode",
      "Game saves lost unless the publisher supported transfer",
    ],
    alternatives: ["Xbox Cloud Gaming", "GeForce Now"],
    timeline: [
      { date: "Nov 2019", title: "Launches." },
      { date: "Feb 2021", title: "Internal game studios closed." },
      { date: "Sept 2022", title: "Shutdown announced.", sourced: true },
      { date: "Jan 2023", title: "Service shut down." },
    ],
    sources: [],
    updated: "2026-06-02",
  },
  {
    slug: "skype",
    name: "Skype",
    description: "Video calling and messaging software.",
    type: "App",
    status: "Replaced",
    organization: "Microsoft",
    launch: "2003",
    announced: "2025-02-28",
    end: "2025-05-05",
    whatHappened:
      "Microsoft retired Skype on May 5, 2025 and moved users to the free version of Microsoft Teams.",
    officialReason: "Microsoft said it was streamlining its consumer communications around Teams.",
    userImpact: [
      "Users could sign in to Teams Free with their Skype account",
      "Chats and contacts carried over",
      "Data export offered for a limited time",
    ],
    replacedBy: "Microsoft Teams (free)",
    alternatives: ["Zoom", "Google Meet", "WhatsApp"],
    timeline: [
      { date: "2003", title: "Launches." },
      { date: "2011", title: "Acquired by Microsoft." },
      { date: "Feb 2025", title: "Retirement announced.", sourced: true },
      { date: "May 2025", title: "Service retired." },
    ],
    sources: [],
    updated: "2026-09-10",
  },
  {
    slug: "batgirl",
    name: "Batgirl",
    description: "DC feature film intended for HBO Max.",
    type: "Film",
    status: "Cancelled",
    organization: "Warner Bros. Discovery",
    launch: "2021",
    end: "2022-08-02",
    whatHappened:
      "Warner Bros. Discovery shelved the nearly finished film in August 2022. It was never released.",
    officialReason: "The studio cited a strategic shift for DC films after its merger.",
    reportedFactors: ["Tax write-down after the merger"],
    timeline: [
      { date: "2021", title: "Production begins." },
      { date: "Aug 2022", title: "Film shelved." },
    ],
    sources: [],
    updated: "2026-05-14",
  },
  {
    slug: "humane-ai-pin",
    name: "Humane AI Pin",
    description: "Screenless wearable AI device.",
    type: "Physical product",
    status: "Shut Down",
    organization: "Humane",
    launch: "2024",
    announced: "2025-02-18",
    end: "2025-02-28",
    whatHappened:
      "Humane's servers were shut down on February 28, 2025 after HP acquired parts of the company. The devices stopped working for most functions.",
    userImpact: [
      "Cloud features, calls and messages stopped",
      "Refunds offered only to recent buyers",
    ],
    timeline: [
      { date: "Nov 2023", title: "Announced." },
      { date: "Apr 2024", title: "Ships to customers." },
      { date: "Feb 2025", title: "HP deal and shutdown announced.", sourced: true },
      { date: "Feb 28, 2025", title: "Servers shut down." },
    ],
    sources: [],
    updated: "2026-04-03",
  },
  {
    slug: "quibi",
    name: "Quibi",
    description: "Short-form mobile streaming service.",
    type: "Company",
    status: "Shut Down",
    organization: "Quibi Holdings",
    launch: "2020",
    announced: "2020-10-21",
    end: "2020-12-01",
    whatHappened:
      "Quibi shut down about six months after launch. Its content library was later sold to Roku.",
    officialReason:
      "The founders said the idea was not strong enough to justify a standalone service, or the timing was wrong.",
    replacedBy: "Content moved to The Roku Channel",
    timeline: [
      { date: "Apr 2020", title: "Launches." },
      { date: "Oct 2020", title: "Shutdown announced.", sourced: true },
      { date: "Dec 2020", title: "Service ends." },
    ],
    sources: [],
    updated: "2026-03-22",
  },
  {
    slug: "google-reader",
    name: "Google Reader",
    description: "Web-based feed reader for subscribing to blogs and news sites.",
    type: "Service",
    status: "Discontinued",
    organization: "Google",
    launch: "2005",
    announced: "2013-03-13",
    end: "2013-07-01",
    whatHappened:
      "Google Reader was retired on July 1, 2013. Google provided a short export window so people could download their subscriptions and reading data.",
    officialReason: "Google cited declining usage and a desire to focus on fewer products.",
    userImpact: ["Subscriptions could be exported through Google Takeout", "The Reader website and API stopped serving feeds"],
    alternatives: ["Feedly", "Inoreader", "NewsBlur"],
    timeline: [
      { date: "2005", title: "Google Reader launches." },
      { date: "Mar 2013", title: "Retirement announced.", sourced: true },
      { date: "July 2013", title: "Service shuts down.", sourced: true },
    ],
    sources: [
      { title: "A second spring of cleaning", url: "https://googleblog.blogspot.com/2013/03/a-second-spring-of-cleaning.html", publisher: "Google Blog", type: "Official announcement" },
    ],
    updated: "2026-09-24",
  },
  {
    slug: "google-plus",
    name: "Google+",
    description: "Google's social network built around circles, communities, and collections.",
    type: "Service",
    status: "Discontinued",
    organization: "Google",
    launch: "2011",
    announced: "2018-10-08",
    end: "2019-04-02",
    whatHappened:
      "Google shut down the consumer version of Google+ on April 2, 2019. Users were given a window to download their photos and other account data before the service closed.",
    officialReason: "Google cited low usage, engagement, and a review that found challenges in maintaining a successful consumer product.",
    userImpact: ["Consumer profiles, pages, communities, and collections were removed", "Users could download data through Google Takeout"],
    alternatives: ["Mastodon", "Facebook", "Reddit"],
    timeline: [
      { date: "2011", title: "Google+ launches." },
      { date: "Oct 2018", title: "Consumer shutdown announced.", sourced: true },
      { date: "Apr 2019", title: "Consumer service shuts down.", sourced: true },
    ],
    sources: [
      { title: "An update on Google+", url: "https://blog.google/technology/safety-security/project-strobe/", publisher: "Google Blog", type: "Official announcement" },
    ],
    updated: "2026-09-24",
  },
  {
    slug: "google-inbox",
    name: "Inbox by Gmail",
    description: "Experimental email client that organized messages into bundles and reminders.",
    type: "App",
    status: "Discontinued",
    organization: "Google",
    launch: "2014",
    announced: "2018-09-12",
    end: "2019-04-02",
    whatHappened:
      "Google ended Inbox by Gmail in April 2019 and directed users toward Gmail features that had adopted ideas first tested in Inbox.",
    officialReason: "Google said it was focusing on Gmail and incorporating popular Inbox features into the main product.",
    userImpact: ["Inbox users were directed to Gmail", "Reminders, snoozes, bundles, and other workflows changed or moved"],
    replacedBy: "Gmail",
    alternatives: ["Gmail", "HEY", "Fastmail"],
    timeline: [
      { date: "2014", title: "Inbox launches by invitation." },
      { date: "2018", title: "Shutdown announced.", sourced: true },
      { date: "Apr 2019", title: "Inbox is retired.", sourced: true },
    ],
    sources: [
      { title: "Inbox by Gmail is moving to Gmail", url: "https://blog.google/products/gmail/inbox-gmail-moving-gmail/", publisher: "Google Blog", type: "Official announcement" },
    ],
    updated: "2026-09-24",
  },
  {
    slug: "google-play-music",
    name: "Google Play Music",
    description: "Google's music store and streaming service.",
    type: "Service",
    status: "Replaced",
    organization: "Google",
    launch: "2011",
    announced: "2020-08-04",
    end: "2020-12-04",
    whatHappened:
      "Google retired Google Play Music in late 2020 and moved its music subscription and uploaded-library strategy to YouTube Music.",
    officialReason: "Google positioned YouTube Music as its single music destination and provided migration tools for libraries and playlists.",
    userImpact: ["Libraries and playlists could be transferred to YouTube Music", "Music purchases and uploads required migration or download before the service ended"],
    replacedBy: "YouTube Music",
    alternatives: ["Spotify", "Apple Music", "Tidal"],
    timeline: [
      { date: "2011", title: "Google Music launches." },
      { date: "Aug 2020", title: "Shutdown timeline announced.", sourced: true },
      { date: "Dec 2020", title: "Service fully retires.", sourced: true },
    ],
    sources: [
      { title: "YouTube Music and Google Play Music", url: "https://blog.youtube/news-and-events/youtube-music-google-play-music/", publisher: "YouTube Official Blog", type: "Official announcement" },
    ],
    updated: "2026-09-24",
  },
  {
    slug: "periscope",
    name: "Periscope",
    description: "Live video broadcasting app acquired and operated by Twitter.",
    type: "App",
    status: "Discontinued",
    organization: "Twitter",
    launch: "2015",
    announced: "2020-12-15",
    end: "2021-03-31",
    whatHappened:
      "Twitter shut down the Periscope app in March 2021. Its live video capabilities had already been integrated into Twitter, where broadcasts could continue through other tools.",
    officialReason: "Twitter said the standalone app was in an unsustainable maintenance state and much of its core functionality was already available in Twitter.",
    userImpact: ["The app became view-only before shutting down", "Public broadcasts and data could be downloaded for a limited time"],
    replacedBy: "Twitter Live",
    alternatives: ["YouTube Live", "Twitch", "Instagram Live"],
    timeline: [
      { date: "2015", title: "Periscope launches and is acquired by Twitter." },
      { date: "Dec 2020", title: "App shutdown announced.", sourced: true },
      { date: "Mar 2021", title: "Standalone app shuts down.", sourced: true },
    ],
    sources: [
      { title: "Farewell, Periscope", url: "https://blog.twitter.com/en_us/topics/product/2020/farewell-periscope", publisher: "Twitter Blog", type: "Official announcement" },
    ],
    updated: "2026-09-24",
  },
  {
    slug: "amazon-drive",
    name: "Amazon Drive",
    description: "Cloud storage service for files, photos, and videos.",
    type: "Service",
    status: "Discontinued",
    organization: "Amazon",
    launch: "2011",
    announced: "2022-07-29",
    end: "2023-12-31",
    whatHappened:
      "Amazon discontinued Amazon Drive at the end of 2023 and focused its consumer photo storage experience on Amazon Photos.",
    officialReason: "Amazon said it was focusing on Amazon Photos for photo and video storage rather than general-purpose file storage.",
    userImpact: ["Files became read-only before the final shutdown", "Customers were told to download files before the service ended"],
    replacedBy: "Amazon Photos for photos and videos",
    alternatives: ["Google Drive", "Dropbox", "OneDrive"],
    timeline: [
      { date: "2011", title: "Amazon Drive launches." },
      { date: "July 2022", title: "Shutdown announced.", sourced: true },
      { date: "Dec 2023", title: "Service ends." },
    ],
    sources: [
      { title: "Amazon Drive service update", url: "https://www.amazon.com/gp/help/customer/display.html?nodeId=TBqL8hU4xLxQz8x9", publisher: "Amazon Help", type: "Company documentation" },
    ],
    updated: "2026-09-24",
  },
  {
    slug: "google-podcasts",
    name: "Google Podcasts",
    description: "Podcast listening app and directory from Google.",
    type: "App",
    status: "Replaced",
    organization: "Google",
    launch: "2018",
    announced: "2023-09-26",
    end: "2024-07-02",
    whatHappened: "Google ended Google Podcasts in 2024 and directed listeners and creators toward YouTube Music, where podcast subscriptions and shows could be migrated.",
    officialReason: "Google said YouTube Music was becoming its single destination for podcasts and music.",
    userImpact: ["Listeners could migrate subscriptions to YouTube Music", "The Google Podcasts website and apps stopped playing shows", "Creators were asked to manage podcast presence through YouTube and RSS tools"],
    replacedBy: "YouTube Music",
    alternatives: ["Apple Podcasts", "Pocket Casts", "Overcast"],
    timeline: [
      { date: "2018", title: "Google Podcasts launches." },
      { date: "Sept 2023", title: "Shutdown and migration plan announced.", sourced: true },
      { date: "Apr 2024", title: "Access begins ending in the United States.", sourced: true },
      { date: "July 2024", title: "Service fully closes." },
    ],
    sources: [{ title: "Google Podcasts is moving to YouTube Music", url: "https://blog.youtube/news-and-events/podcast-listening-on-youtube-music/", publisher: "YouTube Official Blog", type: "Official announcement" }],
    updated: "2026-09-24",
  },
  {
    slug: "microsoft-mixer",
    name: "Mixer",
    description: "Live-streaming platform for games and interactive broadcasts.",
    type: "Service",
    status: "Discontinued",
    organization: "Microsoft",
    launch: "2016",
    announced: "2020-06-22",
    end: "2020-07-22",
    whatHappened: "Microsoft shut down Mixer after deciding the service could not scale its audience and community quickly enough. Mixer partners were offered pathways to Facebook Gaming.",
    officialReason: "Microsoft said the time required to grow Mixer’s community did not match its vision and redirected its live-streaming partnership with Facebook Gaming.",
    userImpact: ["Channels stopped streaming on July 22, 2020", "Partner agreements ended or moved to Facebook Gaming", "Viewers had to find creators on other platforms"],
    replacedBy: "Facebook Gaming partnership",
    alternatives: ["Twitch", "YouTube Live", "Facebook Gaming"],
    timeline: [
      { date: "2016", title: "Beam is acquired by Microsoft and later renamed Mixer." },
      { date: "June 2020", title: "Shutdown announced.", sourced: true },
      { date: "July 2020", title: "Mixer shuts down.", sourced: true },
    ],
    sources: [{ title: "The future of Mixer", url: "https://news.xbox.com/en-us/2020/06/22/the-future-of-mixer/", publisher: "Xbox Wire", type: "Official announcement" }],
    updated: "2026-09-24",
  },
  {
    slug: "adobe-flash-player",
    name: "Adobe Flash Player",
    description: "Browser plug-in used for interactive websites, games, animation, and video.",
    type: "Technology",
    status: "Discontinued",
    organization: "Adobe",
    launch: "1996",
    announced: "2017-07-25",
    end: "2020-12-31",
    whatHappened: "Adobe ended distribution and support for Flash Player on December 31, 2020. Flash content was blocked from running in Flash Player beginning January 12, 2021.",
    officialReason: "Adobe cited the maturation of open web standards such as HTML5, WebGL, and WebAssembly, which could provide capabilities without a proprietary plug-in.",
    userImpact: ["Browsers removed or disabled Flash support", "Flash games and interactive sites required preservation or emulation", "Adobe stopped issuing security updates"],
    replacedBy: "HTML5, WebGL, and WebAssembly",
    alternatives: ["HTML5", "WebGL", "WebAssembly"],
    timeline: [
      { date: "1996", title: "FutureWave SmartSketch technology becomes Flash after acquisition." },
      { date: "July 2017", title: "Adobe announces end of life.", sourced: true },
      { date: "Dec 2020", title: "Distribution and support end.", sourced: true },
      { date: "Jan 2021", title: "Flash content is blocked." },
    ],
    sources: [{ title: "Adobe Flash Player End of Life", url: "https://www.adobe.com/products/flashplayer/end-of-life.html", publisher: "Adobe", type: "Official announcement" }],
    updated: "2026-09-24",
  },
  {
    slug: "google-cloud-print",
    name: "Google Cloud Print",
    description: "Cloud-based printing service that connected printers to Google accounts and web apps.",
    type: "Service",
    status: "Discontinued",
    organization: "Google",
    launch: "2010",
    announced: "2019-11-21",
    end: "2020-12-31",
    whatHappened: "Google Cloud Print was retired at the end of 2020. Google recommended moving to native operating-system and printer-manufacturer printing workflows.",
    officialReason: "Google said Cloud Print had been in beta since 2011 and recommended using platform-native printing infrastructure instead.",
    userImpact: ["Saved printers and print queues stopped working", "Organizations needed to configure native printing or another print-management product", "ChromeOS and other devices moved toward built-in printing"],
    replacedBy: "Native ChromeOS and operating-system printing",
    alternatives: ["CUPS", "PaperCut", "Printer manufacturer cloud services"],
    timeline: [
      { date: "2010", title: "Cloud Print launches in beta." },
      { date: "Nov 2019", title: "Retirement announced.", sourced: true },
      { date: "Dec 2020", title: "Service shuts down.", sourced: true },
    ],
    sources: [{ title: "Cloud Print support ends in December 2020", url: "https://support.google.com/chrome/a/answer/9633006", publisher: "Google Support", type: "Company documentation" }],
    updated: "2026-09-24",
  },
  {
    slug: "apple-ipod-touch",
    name: "iPod touch",
    description: "Pocket media player and iOS device that brought the iPhone software experience without cellular service.",
    type: "Physical product",
    status: "Discontinued",
    organization: "Apple",
    launch: "2007",
    announced: "2022-05-10",
    end: "2022-05-10",
    whatHappened: "Apple discontinued the iPod touch in May 2022. The final generation remained available while supplies lasted, ending the iPod product line.",
    officialReason: "Apple said the spirit of iPod lived on across the iPhone, Apple Watch, iPad, and Mac, which provide music access and broader capabilities.",
    userImpact: ["No replacement iPod model followed", "Existing devices continued to work but were no longer sold by Apple", "Music listening shifted toward iPhone and other Apple devices"],
    replacedBy: "iPhone and Apple Watch",
    alternatives: ["iPhone", "iPad mini", "Sony Walkman digital music players"],
    timeline: [
      { date: "2001", title: "Original iPod launches." },
      { date: "2007", title: "First iPod touch launches alongside the iPhone era." },
      { date: "May 2022", title: "iPod touch discontinued.", sourced: true },
    ],
    sources: [{ title: "The music lives on", url: "https://www.apple.com/newsroom/2022/05/the-music-lives-on/", publisher: "Apple Newsroom", type: "Official announcement" }],
    updated: "2026-09-24",
  },
];

export const CONNECTIONS = [
  { value: "Built it", label: "I built it" },
  { value: "Worked there", label: "I worked there" },
  { value: "Used it", label: "I used it" },
  { value: "Invested in it", label: "I invested in it" },
  { value: "Witnessed it", label: "I witnessed it" },
  { value: "Other connection", label: "Other" },
] as const;
export type Connection = (typeof CONNECTIONS)[number]["value"];

export interface Story {
  id: string;
  slug: string; // thing slug
  num: number; // permanent public id: /stories/[slug]/[num]
  relationship: Connection;
  title: string;
  body: string;
  author: string; // display name or "Anonymous"
  date: string; // YYYY-MM-DD
}

export const stories: Story[] = [
  {
    id: "st-pocket-1",
    num: 8201,
    slug: "pocket",
    relationship: "Used it",
    title: "A decade of articles I never read, gone",
    author: "Marta K.",
    date: "2025-07-20",
    body: "I started saving to Read It Later in 2010, on a jailbroken iPod Touch. Over fifteen years I saved around 4,000 articles — a private library of things I meant to read. When Mozilla announced the shutdown I exported everything, but the export was just a CSV of links. The tags, the highlights, the reading streaks: none of that came out. I spent a weekend re-saving a few hundred links into Raindrop and gave up on the rest. What I miss most is the little dopamine hit of the save button. Nothing else made saving feel that good.",
  },
  {
    id: "st-pocket-2",
    num: 8214,
    slug: "pocket",
    relationship: "Worked there",
    title: "We always knew the recommendations were the product",
    author: "Anonymous (former Mozilla)",
    date: "2025-08-02",
    body: "Inside the company, Pocket's value was never the save button — it was the recommendation data feeding the Firefox new tab. Once that contract changed internally, the standalone app's days were numbered. The team still shipping Pocket features in 2024 knew they were maintaining something whose owner had moved on. I don't blame anyone; I blame the fact that a tool used by millions became a line item in a strategy deck.",
  },
  {
    id: "st-stadia-1",
    num: 8107,
    slug: "google-stadia",
    relationship: "Used it",
    title: "It actually worked, and that was the tragedy",
    author: "Devon R.",
    date: "2025-01-14",
    body: "I played Red Dead Redemption 2 on Stadia on a five-year-old laptop, over hotel wifi, and it just worked. That's the thing people who never tried it don't understand: the tech was genuinely good. What killed it was trust. Everyone I knew said the same thing — 'I'm not buying games on a Google platform, they'll kill it.' And then they did, and refunded us, which was almost worse, because it proved we'd been right all along.",
  },
  {
    id: "st-vine-1",
    num: 8392,
    slug: "vine",
    relationship: "Built it",
    title: "The six seconds were never the problem",
    author: "Anonymous (former Vine creator, ~1M followers)",
    date: "2026-02-11",
    body: "People blame the format, but the format was fine — TikTok proved that. Vine died because Twitter never let us earn anything. In 2015, twenty of the biggest creators went to a meeting at Vine's office and asked for monetization and basic product changes. Nothing came of it. Within a year most of us were posting on Instagram and YouTube instead. When the shutdown announcement came, nobody I knew was surprised. The surprise was that it took that long.",
  },
  {
    id: "st-skype-1",
    num: 8156,
    slug: "skype",
    relationship: "Used it",
    title: "Skype was how I talked to my grandmother",
    author: "Petra S.",
    date: "2025-05-06",
    body: "My grandmother in Poland learned one piece of software in her life, and it was Skype. For twelve years, every Sunday, the sound of that ringtone meant family. When Microsoft retired it I moved her to WhatsApp, and it took her months to stop saying 'call me on Skype.' The account migration to Teams technically worked, but Teams is an office. Skype was a kitchen table. That's the difference no migration tool can carry over.",
  },
  {
    id: "st-humane-1",
    num: 8133,
    slug: "humane-ai-pin",
    relationship: "Used it",
    title: "I paid $700 for a brick with a laser",
    author: "J. Okafor",
    date: "2025-03-04",
    body: "I bought the AI Pin at launch because the demo was beautiful and I wanted to believe. In practice: the projector was invisible in daylight, the battery ran hot against my chest, and every query took ten seconds. I wore it maybe nine times. When the HP deal was announced and they said the servers would shut down in ten days, I wasn't even angry anymore. It's in a drawer now. A $700 reminder that the demo is not the product.",
  },
];

export const getThing = (slug: string) => things.find((t) => t.slug === slug);
export const getStories = (slug: string) =>
  stories.filter((s) => s.slug === slug).sort((a, b) => b.date.localeCompare(a.date));
export const getStory = (slug: string, num: string) =>
  stories.find((s) => s.slug === slug && String(s.num) === num);
export const allStories = [...stories].sort((a, b) => b.date.localeCompare(a.date));
export const STORY_PREVIEW = 280;

export function timeAgo(d: string, now = new Date()) {
  const days = Math.floor((now.getTime() - new Date(d + "T00:00:00Z").getTime()) / 86400000);
  if (days < 1) return "today";
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const m = Math.floor(days / 30);
  if (m < 12) return `${m} month${m === 1 ? "" : "s"} ago`;
  const y = Math.floor(days / 365);
  return `${y} year${y === 1 ? "" : "s"} ago`;
}
export const year = (d: string) => d.slice(0, 4);
export const byEndDesc = [...things].sort((a, b) => b.end.localeCompare(a.end));
export const upcoming = things.filter((t) => t.status === "Shutting Down Soon");

export function formatDate(d: string) {
  if (d.length === 4) return d;
  return new Date(d + "T00:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function search(q: string) {
  const s = q
    .toLowerCase()
    .replace(/what happened to|why did|shut down|\?/g, "")
    .trim();
  if (!s) return [];
  return things.filter(
    (t) =>
      [t.name, t.description, t.type, t.status, t.organization, year(t.end)]
        .join(" ")
        .toLowerCase()
        .includes(s) ||
      s
        .split(/\s+/)
        .every((w) =>
          [t.name, t.description, t.type, t.status, t.organization, year(t.end)]
            .join(" ")
            .toLowerCase()
            .includes(w),
        ),
  );
}
