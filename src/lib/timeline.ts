// Timeline milestones. Structure only: bodies are TODO(maxime) on purpose (the
// brief says the narrative text is written by hand, not generated). Titles and
// dates are filled where verified, TODO(maxime) otherwise. Ordered oldest first.
//
// Note: `context` intentionally avoids a location (per the no-location rule);
// use a setting/frame, or leave TODO(maxime) if you want to add a place.

export type Milestone = {
  year: string;
  title: string;
  context: string; // a setting or frame, e.g. "The Hacking Project", "Crypto winter"
  body: string; // 2-3 sentences max, written by hand
  link?: string;
};

export const timeline: Milestone[] = [
  {
    year: "TODO(maxime)",
    title: "Music production & live performance",
    context: "The origin",
    body: "TODO(maxime): the sound-and-composability angle (processing chains, modules, presets) that nobody else in this ecosystem has.",
  },
  {
    year: "TODO(maxime)",
    title: "The Hacking Project",
    context: "Learning to build",
    body: "TODO(maxime): the switch into dev.",
  },
  {
    year: "TODO(maxime)",
    title: "Into the Intuition ecosystem",
    context: "web3",
    body: "TODO(maxime): how you landed in Intuition and started building in public.",
  },
  {
    year: "2025",
    title: "Sofia",
    context: "Graduation project turned product",
    body: "TODO(maxime): two devs, a web-dev graduation project that became a live product with real users, an Intuition grant, and 2000+ commits.",
    link: "/projects/sofia",
  },
  {
    year: "2026",
    title: "Intuition FeeProxy",
    context: "Paid DAO mission (intuition.box)",
    body: "TODO(maxime): the paid mission you delivered, the affiliate webapp for Intuition's FeeProxy singleton.",
    link: "/projects/intuition-fee-proxy",
  },
  {
    year: "2026",
    title: "OurGlass",
    context: "Safe treasuries",
    body: "TODO(maxime): recurring payments for Safe treasuries, ERC-7710, plus the independent IPFS verifier.",
    link: "/projects/ourglass",
  },
  {
    year: "2026",
    title: "ARP: Agent Reputation Protocol",
    context: "Reputation for AI agents",
    body: "TODO(maxime): on-chain reputation for agents (ERC-8004 + Intuition), SDK published as @arp-protocol/sdk.",
    link: "/projects/arp",
  },
  {
    year: "2024",
    title: "TrackHunter",
    context: "Music side project",
    body: "TODO(maxime): the DJ / crate-digging tool, tie it back to the music angle.",
    link: "/projects/trackhunter",
  },
];
