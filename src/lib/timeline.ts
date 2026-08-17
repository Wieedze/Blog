// Timeline milestones, ordered oldest first. The arc: music producer, tool
// builder, dev, Intuition ecosystem, and the music thread coming back around
// (TrackHunter mid-journey, Loka now). Bodies stay short: 2-3 sentences max.
//
// Note: `context` intentionally avoids a personal location; event names
// (ETHGlobal Cannes / Lisbon) are fine, they're already public in projects.ts.

export type Milestone = {
  year: string;
  title: string;
  context: string; // a setting or frame, e.g. "The Hacking Project", "The origin"
  body: string; // 2-3 sentences max
  link?: string;
};

export const timeline: Milestone[] = [
  {
    year: "",
    title: "Music production & live performance",
    context: "The origin",
    body: "I produced my own music in Ableton Live and performed it live, professionally, on stages around the world. What hooked me as much as the music was building the machinery behind it (processing chains, racks, presets), and that urge to build my own tools is what eventually pushed me toward code.",
  },
  {
    year: "",
    title: "The Hacking Project",
    context: "Learning to build",
    body: "The switch into dev. A bootcamp where I discovered the web, then web3, and recognized the thing I already loved in music: small composable pieces wired into bigger systems.",
  },
  {
    year: "2024",
    title: "TrackHunter",
    context: "Music side project",
    body: "Built in the middle of everything else, for the DJ side of me: paste a playlist and hunt its tracks across Spotify, Bandcamp, Beatport and Discogs from a single input. Proof the music thread never stopped, it just changed shape.",
    link: "/projects/trackhunter",
  },
  {
    year: "2025",
    title: "Sofia",
    context: "Graduation project turned product",
    body: "Started with a schoolmate as our graduation project, then a $20k Intuition grant pushed us to keep going. It grew into a full ecosystem around personal data and trust circles enforced on-chain: extension, explorer, mobile app, docs, landing. Still live, still the flagship.",
    link: "/projects/sofia",
  },
  {
    year: "2026",
    title: "WisPear",
    context: "First hackathon (ETHGlobal Cannes)",
    body: "Our first hackathon. Describe the task you need done and WisPear assembles the agent for it (MCPs, model, prompt, metaprompt), guided by community feedback and votes. It left me with a question I couldn't drop: what is an agent, really?",
    link: "/projects/wispear",
  },
  {
    year: "2026",
    title: "ARP: Agent Reputation Protocol",
    context: "Reputation for AI agents",
    body: "My answer to the WisPear question: an agent isn't just a model, it's a wrapper of components that should be enumerated, then weighted by the agents that use them. The POC shows one agent hiring another and rating the delivered work, while the hired agent rates the tools it used, growing an autonomous registry of agent and tool value.",
    link: "/projects/arp",
  },
  {
    year: "2026",
    title: "Intuition FeeProxy",
    context: "Paid DAO mission (intuition.box)",
    body: "In parallel I was assigned the official affiliate webapp for Intuition's FeeProxy singleton, a paid intuition.box mission on the protocol's audited contract, with support from the core team. Delivered: registration, fee schedules, on-chain stats and an agent integration guide.",
    link: "/projects/intuition-fee-proxy",
  },
  {
    year: "2026",
    title: "Hourglass",
    context: "Value delegation",
    body: "Deeper into value delegation with intuition.box: a non-custodial system where a beneficiary pulls their revenue directly at the source, from the account that pays them, via the MetaMask Delegation Framework (ERC-7710). We then took the idea to ETHGlobal Lisbon and built the automated version.",
    link: "/projects/ourglass",
  },
  {
    year: "2026",
    title: "Liquid Democracy",
    context: "Current mission (intuition.box)",
    body: "What I'm working on right now: a POC showing that governance responsibility itself can be delegated, scoped and enforced by ERC-7710 caveat enforcers. The same delegation thread as Hourglass, pointed at voting.",
    link: "/projects/liquid-democracy",
  },
  {
    year: "2026",
    title: "Loka",
    context: "Music, full circle",
    body: "The sound work kept running alongside the code and brought in a new client: Loka, a board game built around meditation. I'm designing their companion app, the place where all the audio plays and the guidance happens.",
    link: "/projects/loka",
  },
];
