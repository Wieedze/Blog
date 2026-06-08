export type Project = {
  slug: string;
  name: string;
  tagline: string;
  status: "live" | "building" | "shipped" | "exploring";
  role: string;
  stack: string[];
  description: string;
  highlights: string[];
  links: { label: string; url: string }[];
  featured: boolean;
  year: string;
};

// Order = display order. Sofia first: the only real product in prod.
export const projects: Project[] = [
  {
    slug: "sofia",
    name: "Sofia",
    tagline: "A behavioral reputation layer, on-chain.",
    status: "live",
    role: "Co-creator — full-stack & smart contracts (two-dev team)",
    stack: ["React", "TypeScript", "Node.js", "Solidity", "Intuition Protocol", "Base L3"],
    description:
      "A behavioral reputation platform and Chrome extension built on Intuition Protocol. Sofia turns a user's activity signals into on-chain attestations via Intuition's atom/triple model. It started as our graduation project for a web-dev degree — built by two developers — and grew into my only product truly in production, with real users and an Intuition grant.",
    highlights: [
      "Started as our web-dev degree graduation project (two devs)",
      "Live platform with real users",
      "On-chain attestations (Intuition atom/triple model)",
      "Intuition grant secured",
      "+2000 commits",
    ],
    links: [
      { label: "Repo", url: "https://github.com/intuition-box/Sofia" },
      {
        label: "Grant application",
        url: "https://atlas.discourse.group/t/sofia-grant-application-december-2025/1177",
      },
    ],
    featured: true,
    year: "2025–2026",
  },
  {
    slug: "intuition-fee-proxy",
    name: "Intuition Fee Proxy Factory",
    tagline: "DAO contract: a proxy factory for businesses on Intuition.",
    status: "building",
    role: "Solidity contract + webapp (paid contract, Intuition DAO)",
    stack: ["Solidity", "UUPS Proxy", "Foundry", "TypeScript", "SDK"],
    description:
      "A contract landed with a DAO in the Intuition ecosystem. The goal: a proxy factory that lets any business launching on Intuition prove its engagement metrics on-chain and manage fee collection. UUPS proxy pattern on Intuition's MultiVault, with an SDK, a webapp, and a Forge deployment system.",
    highlights: [
      "Paid contract for a DAO",
      "UUPS proxy pattern on Intuition MultiVault",
      "Four packages: contracts, sdk, safe-tx, webapp",
      "Engagement-metrics proof + fee collection",
    ],
    links: [],
    featured: true,
    year: "2026",
  },
  {
    slug: "arp",
    name: "ARP — Agent Reputation Protocol",
    tagline: "A decentralized trust graph for AI agents.",
    status: "building",
    role: "Creator — protocol & MVP",
    stack: ["Solidity", "Intuition Protocol", "The Graph", "Noir (ZK)", "React"],
    description:
      "A vectorized, multi-dimensional reputation infrastructure for AI agents (agent × tool × category × period, modeled as Intuition triples). ZK proofs make it possible to attest to a reputation threshold without revealing the full history. MVP in progress for the MetaMask Snap Smart Wallet hackathon.",
    highlights: [
      "MVP shipped this week (MetaMask Snap hackathon)",
      "Multi-dimensional reputation on-chain",
      "Threshold ZK proofs (Noir)",
      "Target: ETHGlobal Lisbon 2026",
    ],
    links: [],
    featured: true,
    year: "2026",
  },
  {
    slug: "wispear",
    name: "WisPear",
    tagline: "Community wisdom, whispered to your agent.",
    status: "shipped",
    role: "Hackathon build — team of 5 (ETHGlobal Cannes 2026)",
    stack: ["TypeScript", "React", "Intuition Protocol", "AI agents"],
    description:
      "A community-curated marketplace and discovery layer for AI-agent tools, built on Intuition. Tell it what you want your agent to do — say, \"find me job offers\" — and WisPear returns the tools the community recommends for that exact context, ranked by what performs best today, plus a ready-to-paste meta-prompt so your own AI builds the tool just the way you want it. Tool quality lives on-chain as Intuition attestations, so the picks are community-verified rather than guessed. Built with a team of five at ETHGlobal Cannes 2026.",
    highlights: [
      "Community-curated marketplace for AI-agent tools",
      "Describe a goal → the right tools for that context, ranked by performance",
      "Returns a ready-to-paste meta-prompt to build the tool",
      "Tool quality verified on-chain via Intuition attestations",
      "Built at ETHGlobal Cannes 2026 with a team of five",
    ],
    links: [{ label: "Repo", url: "https://github.com/intuition-box/WisPear" }],
    featured: true,
    year: "2026",
  },
  {
    slug: "trackhunter",
    name: "TrackHunter",
    tagline: "A digging platform for DJs, rekordbox-style.",
    status: "live",
    role: "Creator — full-stack",
    stack: ["React", "TypeScript", "Beatport API", "Spotify API"],
    description:
      "A rekordbox-inspired SPA for DJs, integrating Beatport and Spotify around a \"Pioneer blue\" design system. My playground on the music side, at the intersection of my background in live performance and production.",
    highlights: [
      "Beatport + Spotify integrations",
      "Design system inspired by Pioneer gear",
      "Long-running project",
    ],
    links: [
      { label: "Site", url: "https://track-hunter.com/" },
      { label: "Repo", url: "https://github.com/Wieedze/TrackHunter" },
    ],
    featured: false,
    year: "2024–2026",
  },
  {
    slug: "thekitty",
    name: "TheKitty",
    tagline: "On-chain group pots / tontine, CRC-native.",
    status: "live",
    role: "Creator — full-stack & smart contracts",
    stack: ["React", "Solidity", "Gnosis Chain", "Circles (CRC)"],
    description:
      "On-chain group pots and tontines built on the Circles / Gnosis ecosystem, CRC-native. Started as an extension of the Sofia × Circles thinking (a semantic trust layer on top of Circles' sybil-resistant identity), it shipped live and is being pushed through a 6-week Gnosis hackathon — weekly prizes, then a grand finale. It took 2nd place in week 2, and I re-enter every week with new progress, building toward the finale.",
    highlights: [
      "2nd place in week 2 of a 6-week Gnosis hackathon",
      "Iterating weekly toward the grand finale",
      "Live on Gnosis Chain, CRC-native",
      "On-chain group pots & tontines",
      "Possible tie-in with Sofia",
    ],
    links: [{ label: "Repo", url: "https://github.com/gnosis-box/TheKitty" }],
    featured: true,
    year: "2026",
  },
];

export const statusLabel: Record<Project["status"], string> = {
  live: "In production",
  building: "Building",
  shipped: "Shipped",
  exploring: "Exploring",
};
