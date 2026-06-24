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

// Order = display order. Sofia first (flagship: real users + grant).
export const projects: Project[] = [
  {
    slug: "sofia",
    name: "Sofia",
    tagline: "Turn your browsing into certified knowledge, on-chain.",
    status: "live",
    role: "Co-creator — full-stack & smart contracts (two-dev team)",
    stack: ["TypeScript", "React", "Chrome Extension", "Node.js", "Solidity", "Intuition Protocol", "Base", "MCP"],
    description:
      "A monorepo — Chrome extension, reputation dashboard, workflows and an MCP server — that turns your browsing into certified knowledge on Intuition Protocol. Sofia maps a user's activity signals to on-chain attestations via Intuition's atom/triple model on Base. It started as our graduation project for a web-dev degree (two of us) and grew into my only product truly in production, with real users and an Intuition grant. Currently shipping the v1.0.x extension alpha.",
    highlights: [
      "Started as our web-dev degree graduation project (two devs)",
      "Live with real users — extension v1.0.3 (alpha) + reputation dashboard",
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
    name: "ARP — Agent Reputation Protocol",
    tagline: "Weighted, on-chain reputation for AI agents.",
    status: "building",
    role: "Creator — protocol, SDK & app",
    stack: ["TypeScript", "Solidity", "Intuition Protocol", "ERC-8004", "React"],
    description:
      "A protocol bridging ERC-8004 agent identity with Intuition's semantic graph to give autonomous agents domain-modular, weighted reputation. The thesis (worked out in two posts — the wrapper problem, then attribution as graph traversal): an agent is a wrapper around tools, so reputation should flow through the tools it uses. Tools become atoms an agent takes an economic position on, usage is recorded as immutable triples, and attribution becomes a graph traversal weighted by stake. The MVP — a self-serve tool registry, stake-to-vouch, and one-click agent runtime — is live as a demo, built for the MetaMask Snap Smart Wallet hackathon.",
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
    name: "TheKitty",
    tagline: "Onchain group pots & a services marketplace, CRC-native.",
    status: "live",
    role: "Creator — full-stack & smart contracts",
    stack: ["TypeScript", "React", "Solidity", "Gnosis Chain", "Circles (CRC)"],
    description:
      "A Circles miniapp on Gnosis Chain, CRC-native. It started as onchain group pots & tontines and grew, week by week, into a small services marketplace: a provider board with ratings and trust badges, a pay sheet, an onchain reward pool, and a \"recommended by your circle\" panel that's really a traversal over the Circles trust graph — the same primitive behind Sofia and ARP. Pushed through a 6-week Gnosis hackathon: 2nd in week 2, iterating weekly toward the finale.",
    highlights: [
      "2nd in week 2 of a 6-week Gnosis hackathon (iterating weekly toward the finale)",
      "Onchain group pots & tontines, CRC-native on Gnosis",
      "Services marketplace: providers, ratings, trust badges, pay sheet",
      "Onchain reward pool + a trust-graph \"recommended by your circle\" recommender",
      "ServiceRegistry contract, Sourcify-verified",
    ],
    links: [{ label: "Repo", url: "https://github.com/gnosis-box/TheKitty" }],
    featured: true,
    year: "2026",
  },
  {
    slug: "ourglass",
    name: "OurGlass",
    tagline: "Recurring payments for Safe treasuries — sign once, capped on-chain.",
    status: "live",
    role: "Creator — Safe App + smart-account integration",
    stack: ["TypeScript", "React", "Solidity", "Safe App", "ERC-7710", "MetaMask Delegation Framework", "IPFS"],
    description:
      "A Safe App for recurring on-chain payments. A DAO treasury (or any Safe) signs one agreement — a service retainer, payroll, or a subscription — and the payee charges itself each period, never above an on-chain cap and never twice in the same period. No escrow, no streaming contract, no relayer: funds stay in the treasury until they're charged, and the Safe can revoke unilaterally at any time. Built on the MetaMask Delegation Framework (ERC-7710) + Smart Accounts Kit, with each agreement pinned to IPFS and the EIP-712 signature cryptographically bound to the exact terms. A separate, independent verifier — its own repo, deployed to IPFS and reachable at the ENS verify.ourglass.eth — lets anyone check an agreement's provenance without trusting any server I run; the app also exposes a public /verify page that deep-links into it.",
    highlights: [
      "Sign once → the payee charges itself each period (no monthly multisig round)",
      "Hard on-chain cap via ERC-7710 — never above the amount, never twice per period",
      "Funds stay in the treasury until charged — no escrow, no streaming, no relayer",
      "Agreement pinned to IPFS; EIP-712 signature bound to the exact terms",
      "Independent verifier (separate repo, deployed to IPFS) at ENS verify.ourglass.eth",
      "Revocable unilaterally on-chain at any time — live as a Safe App",
    ],
    links: [
      { label: "Site", url: "https://ourglass.intuition.box" },
      { label: "Verifier", url: "https://verify.ourglass.eth" },
      { label: "Repo", url: "https://github.com/intuition-box/OurGlass" },
    ],
    featured: true,
    year: "2026",
  },
  {
    slug: "intuition-fee-proxy",
    name: "Intuition FeeProxy",
    tagline: "A delivered DAO mission: permissionless fee routing for Intuition.",
    status: "shipped",
    role: "Delivered DAO mission — Solidity contract + affiliate webapp (intuition.box)",
    stack: ["Solidity", "Foundry", "TypeScript", "React", "wagmi/viem", "ERC-7936"],
    description:
      "A paid mission for the intuition.box DAO — the hub where Intuition missions and their solutions live — that I've delivered. It's the Intuition FeeProxy singleton: one shared, permissionless ERC-7936 fee-routing contract that anyone can route through. On top of it, an affiliate webapp lets you register as an affiliate, set your per-call fees, and track on-chain stats (React + wagmi/viem), with a copy-paste agent integration guide and a minimal demo dApp that routes a fee through an affiliate end to end. The deliverables are done and it's live on Intuition's official testnet; I'm finishing the design — in public, with a designer — before it ships to production.",
    highlights: [
      "Paid mission delivered for the intuition.box DAO",
      "The Intuition FeeProxy singleton — one shared, permissionless ERC-7936 fee router",
      "Affiliate webapp: register, set per-call fees, track on-chain stats",
      "Copy-paste agent integration guide + a demo dApp",
      "Live on the official testnet; design polish (in public) before mainnet",
    ],
    links: [{ label: "Repo", url: "https://github.com/intuition-box/FeeProxy" }],
    featured: true,
    year: "2025–2026",
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
    links: [
      { label: "Site", url: "https://wispear.ai" },
      { label: "Repo", url: "https://github.com/intuition-box/WisPear" },
    ],
    featured: true,
    year: "2026",
  },
  {
    slug: "trackhunter",
    name: "TrackHunter",
    tagline: "Search & compare tracks across every platform, from one playlist.",
    status: "live",
    role: "Creator — full-stack",
    stack: ["React", "TypeScript", "Spotify API", "Beatport API", "Bandcamp", "Discogs"],
    description:
      "A web app for DJs and crate-diggers: paste a playlist and search and compare its tracks across Spotify, Bandcamp, Beatport, Discogs and more — from a single input. My long-running playground on the music side, where my background in live performance meets code.",
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
  live: "In production",
  building: "Building",
  shipped: "Shipped",
  exploring: "Exploring",
};
