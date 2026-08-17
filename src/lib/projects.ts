export type Project = {
  slug: string;
  domain: "web3" | "music";
  name: string;
  tagline: string;
  status: "live" | "building" | "exploring";
  role: string;
  stack: string[];
  description: string;
  highlights: string[];
  links: { label: string; url: string }[];
  featured: boolean;
  year: string;
};

// Order = display order. Sofia first (flagship: real users + grant).
export const projects: Project[] = [
  {
    slug: "sofia",
    domain: "web3",
    name: "Sofia",
    tagline: "Turn your browsing into certified knowledge, on-chain.",
    status: "live",
    role: "Co-creator: full-stack & smart contracts (two-dev team)",
    stack: ["TypeScript", "React", "Chrome Extension", "Node.js", "Solidity", "Intuition Protocol", "Base", "MCP"],
    description:
      "A monorepo (Chrome extension, reputation dashboard, workflows and an MCP server) that turns your browsing into certified knowledge on Intuition Protocol. Sofia maps a user's activity signals to on-chain attestations via Intuition's atom/triple model on Base. It started as our graduation project for a web-dev degree (two of us) and grew into my only product truly in production, with real users and an Intuition grant. Now on the v1.2 extension, with an \"Add to Sofia\" right-click capture flow (auto-minting context atoms) and a guided explorer onboarding.",
    highlights: [
      "Started as our web-dev degree graduation project (two devs)",
      "Live with real users: extension v1.2 + reputation dashboard + \"Add to Sofia\" capture",
      "On-chain attestations on Base (Intuition atom/triple model)",
      "Intuition grant secured",
      "Chrome extension + dashboard + workflows + MCP server in one monorepo",
    ],
    links: [
      { label: "Site", url: "https://sofia.intuition.box" },
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
    slug: "arp",
    domain: "web3",
    name: "ARP: Agent Reputation Protocol",
    tagline: "Weighted, on-chain reputation for AI agents.",
    status: "building",
    role: "Creator: protocol, SDK & app",
    stack: ["TypeScript", "Solidity", "Intuition Protocol", "ERC-8004", "React"],
    description:
      "A protocol bridging ERC-8004 agent identity with Intuition's semantic graph to give autonomous agents domain-modular, weighted reputation. The thesis (worked out in two posts, the wrapper problem, then attribution as graph traversal): an agent is a wrapper around tools, so reputation should flow through the tools it uses. Tools become atoms an agent takes an economic position on, usage is recorded as immutable triples, and attribution becomes a graph traversal weighted by stake. The MVP, a self-serve tool registry, stake-to-vouch, and one-click agent runtime, is live as a demo, built for the MetaMask Snap Smart Wallet hackathon.",
    highlights: [
      "Bridges ERC-8004 agent identity with Intuition's semantic graph",
      "Tools as atoms: stake to vouch, usage recorded as triples",
      "Self-serve tool registry + one-click agent runtime (live demo)",
      "Reputation model written up in two essays (wrapper problem → attribution traversal)",
      "MVP built for the MetaMask Snap Smart Wallet hackathon",
    ],
    links: [
      { label: "Live demo", url: "https://arp-app-flax.vercel.app" },
      { label: "Repo", url: "https://github.com/Wieedze/ARP" },
    ],
    featured: true,
    year: "2026",
  },
  {
    slug: "thekitty",
    domain: "web3",
    name: "TheKitty",
    tagline: "Onchain group pots & a services marketplace, CRC-native.",
    status: "live",
    role: "Creator: full-stack & smart contracts",
    stack: ["TypeScript", "React", "Solidity", "Gnosis Chain", "Circles (CRC)"],
    description:
      "A Circles miniapp on Gnosis Chain, CRC-native. It started as onchain group pots & tontines and grew, week by week, into a small services marketplace: a provider board with ratings and trust badges, a pay sheet, an onchain reward pool, and a \"recommended by your circle\" panel that's really a traversal over the Circles trust graph, the same primitive behind Sofia and ARP. Pushed through the 6-week Gnosis Circles hackathon, where it finished 2nd overall.",
    highlights: [
      "2nd place overall in the Gnosis Circles hackathon (official)",
      "Onchain group pots & tontines, CRC-native on Gnosis",
      "Services marketplace: providers, ratings, trust badges, pay sheet",
      "Onchain reward pool + a trust-graph \"recommended by your circle\" recommender",
      "ServiceRegistry contract, Sourcify-verified",
    ],
    links: [
      { label: "2nd place", url: "https://garage.aboutcircles.com/leaderboard" },
      { label: "Repo", url: "https://github.com/gnosis-box/TheKitty" },
    ],
    featured: true,
    year: "2026",
  },
  {
    slug: "ourglass",
    domain: "web3",
    name: "Hourglass",
    tagline: "On-chain scoped permission for Safe treasuries: recurring payments and agent-run DeFi.",
    status: "live",
    role: "Creator: Safe App + smart-account integration",
    stack: ["TypeScript", "React", "Solidity", "Safe App", "ERC-7710", "MetaMask Delegation Framework", "AI agents", "IPFS"],
    description:
      "Formerly OurGlass. A Safe App that turns one signature into scoped, revocable on-chain permission for a Safe treasury, built on the MetaMask Delegation Framework (ERC-7710). Two things run on it. Recurring payments: sign once and the payee charges itself each period, never above an on-chain cap, funds staying in the treasury until charged, revocable anytime, each agreement pinned to IPFS. And Agent DeFi: you delegate a bounded permission to an AI agent that runs a yield or investment plan for you (deposits, liquidity positions, limit orders) strictly within the caveats you sign, with the mandates discoverable on Intuition. Presented at ETHGlobal Lisbon.",
    highlights: [
      "One signature = scoped, revocable on-chain permission for a Safe (ERC-7710)",
      "Recurring payments: charged per period, capped on-chain, no escrow or relayer",
      "Agent DeFi: an AI agent runs a yield plan within the caveats you sign",
      "Mandates discoverable on Intuition; agreements pinned to IPFS",
      "Presented at ETHGlobal Lisbon",
    ],
    links: [
      { label: "Site", url: "https://hourglass.box" },
      { label: "Repo", url: "https://github.com/intuition-box/Hourglass" },
    ],
    featured: true,
    year: "2026",
  },
  {
    slug: "intuition-fee-proxy",
    domain: "web3",
    name: "Intuition FeeProxy",
    tagline: "The affiliate webapp for Intuition's FeeProxy singleton.",
    status: "live",
    role: "Delivered DAO mission (intuition.box): affiliate webapp + SDK / Safe tooling",
    stack: ["TypeScript", "React", "Vite", "wagmi/viem", "Tailwind", "Intuition MultiVault"],
    description:
      "A paid mission for the intuition.box DAO (the hub where Intuition missions and their solutions live) which I delivered. It's the affiliate webapp for Intuition's FeeProxy singleton: a multi-tenant fee layer in front of the Intuition MultiVault. One shared contract per network (no factory, no per-affiliate deploy) so any dApp builder registers once as an affiliate (their wallet is the id), sets a fee schedule, and points their app at it. The proxy takes their fee on every routed deposit / atom creation and pushes it to their recipient instantly: no pool, no withdraw. The webapp covers registration, fee config, on-chain stats (read directly, no indexer), an affiliate directory, and a copy-paste agent integration guide. Built with React + wagmi/viem, live on Intuition's testnet. An earlier per-affiliate factory design was retired in favor of this singleton, and the FeeProxy contract itself is Intuition's audited one; my deliverable is the affiliate webapp (plus SDK/Safe tooling). Finishing the design now, in public, with a designer, ahead of mainnet.",
    highlights: [
      "Paid mission delivered for the intuition.box DAO",
      "Affiliate webapp for Intuition's FeeProxy singleton (one shared contract per network)",
      "Register once (wallet = affiliate id) → fees pushed instantly per routed deposit/atom creation; no pool, no withdraw",
      "On-chain stats with no indexer + copy-paste agent integration guide + demo dApp",
      "Earlier per-affiliate factory/proxy design retired for the singleton",
      "Live on Intuition testnet; design polish (in public) ahead of mainnet",
    ],
    links: [{ label: "Repo", url: "https://github.com/intuition-box/FeeProxy" }],
    featured: true,
    year: "2025–2026",
  },
  {
    slug: "wispear",
    domain: "web3",
    name: "WisPear",
    tagline: "Community wisdom, whispered to your agent.",
    status: "live",
    role: "Hackathon build: team of 5 (ETHGlobal Cannes 2026)",
    stack: ["TypeScript", "React", "Intuition Protocol", "AI agents"],
    description:
      "A community-curated marketplace and discovery layer for AI-agent tools, built on Intuition. Tell it what you want your agent to do (say, \"find me job offers\") and WisPear returns the tools the community recommends for that exact context, ranked by what performs best today, plus a ready-to-paste meta-prompt so your own AI builds the tool just the way you want it. Tool quality lives on-chain as Intuition attestations, so the picks are community-verified rather than guessed. Built with a team of five at ETHGlobal Cannes 2026.",
    highlights: [
      "Community-curated marketplace for AI-agent tools",
      "Describe a goal → the right tools for that context, ranked by performance",
      "Returns a ready-to-paste meta-prompt to build the tool",
      "Tool quality verified on-chain via Intuition attestations",
      "Built at ETHGlobal Cannes 2026 with a team of five",
    ],
    links: [
      { label: "Site", url: "https://wispear.ai" },
      { label: "Repo", url: "https://github.com/intuition-box/WisPear" },
    ],
    featured: true,
    year: "2026",
  },
  {
    slug: "oddwave-studio",
    domain: "music",
    name: "OddWave Studio",
    tagline: "A studio brand and site, designed and built end to end.",
    status: "live",
    role: "Solo: brand identity, art direction, design & build",
    stack: ["Brand identity", "Art direction", "TypeScript", "React", "Vite"],
    description:
      "A mastering and sound-design studio (tied to Sleeping Tracks Records) where I owned the whole thing, not just the implementation: the visual identity and graphic charter, the art direction, and the build. A Spotify-embedded portfolio wiring dozens of releases to their covers, a sound-design reel, and a scrollytelling section that reveals text over an IPFS feedback video. Built on my music background, and likely to grow into a studio-management SaaS.",
    highlights: [
      "Full visual identity and graphic charter, designed by me end to end",
      "Art direction, design and build, not just the code",
      "Spotify-embedded portfolio + sound-design reel",
      "Scrollytelling over an IPFS feedback video",
      "Planned to evolve into a studio-management SaaS",
    ],
    links: [{ label: "Repo", url: "https://github.com/Wieedze/OddWave-Studio-" }],
    featured: true,
    year: "2026",
  },
  {
    slug: "liquid-democracy",
    domain: "web3",
    name: "Liquid Democracy for intuition.box",
    tagline: "A liquid-democracy mission for the intuition.box DAO.",
    status: "building",
    role: "Paid mission (intuition.box)",
    stack: ["Intuition", "TODO(maxime): stack"],
    description:
      "A new paid mission for the intuition.box DAO, around liquid democracy: delegated, revocable voting where you can hand your voting weight to someone you trust and take it back at any time. TODO(maxime): expand once the repo is public.",
    highlights: [
      "Paid mission for the intuition.box DAO",
      "Liquid democracy: delegated, revocable voting",
      "TODO(maxime): details and links once the repo is pushed",
    ],
    links: [],
    featured: false,
    year: "2026",
  },
  {
    slug: "loka",
    domain: "music",
    name: "Loka",
    tagline: "A platform for an initiatory meditation board game.",
    status: "building",
    role: "Creator: platform (sound / music mission)",
    stack: ["TODO(maxime): stack"],
    description:
      "A platform for Loka, an initiatory board game built around meditation. A sound-and-music mission, in the same vein as my audio background. TODO(maxime): expand once the repo is public.",
    highlights: [
      "Platform for an initiatory meditation board game",
      "A sound / music-side mission",
      "TODO(maxime): details and links once the repo is pushed",
    ],
    links: [],
    featured: false,
    year: "2026",
  },
  {
    slug: "trackhunter",
    domain: "music",
    name: "TrackHunter",
    tagline: "Search & compare tracks across every platform, from one playlist.",
    status: "live",
    role: "Creator: full-stack",
    stack: ["React", "TypeScript", "Spotify API", "Beatport API", "Bandcamp", "Discogs"],
    description:
      "A web app for DJs and crate-diggers: paste a playlist and search and compare its tracks across Spotify, Bandcamp, Beatport, Discogs and more, from a single input. My long-running playground on the music side, where my background in live performance meets code.",
    highlights: [
      "Compare a track across Spotify, Bandcamp, Beatport, Discogs",
      "Single playlist input → cross-platform results",
      "Long-running solo project",
    ],
    links: [
      { label: "Site", url: "https://track-hunter.com/" },
      { label: "Repo", url: "https://github.com/Wieedze/TrackHunter" },
    ],
    featured: false,
    year: "2024–2026",
  },
];

export const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  building: "Building",
  exploring: "Exploring",
};
