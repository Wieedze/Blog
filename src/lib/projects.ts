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
  // Live site shown as a scaled iframe preview (SitePreview). Only set it
  // for sites verified to allow framing (no X-Frame-Options / frame-ancestors).
  preview?: string;
  featured: boolean;
  year: string;
};

// Order = display order. Sofia first (flagship: real users + grant).
export const projects: Project[] = [
  {
    slug: "sofia",
    domain: "web3",
    name: "Sofia",
    tagline: "The web, recommended by people.",
    status: "live",
    role: "Co-creator: full-stack and smart contracts (two-dev team)",
    stack: ["TypeScript", "React", "Plasmo (Chrome MV3)", "Hono", "Bun", "Prisma", "Intuition Protocol", "GraphQL"],
    description:
      "Sofia is a community-curated map of the web, built on Intuition Protocol. People recommend web pages by taking an on-chain position on them, and every recommendation is public, dated and owned by the person who made it. Sofia then shows which pages people back, who spotted them first, and which pages credible accounts follow. It started as our graduation project for a web-dev degree (two of us) and grew into my only product truly in production, with real users and an Intuition grant. The autumn 2026 repositioning narrowed it to that one gesture, recommending a page: a right-click in the extension, often free, because signed-in users (email, Google or a wallet) no longer need to sign or hold TRUST. Sofia's relayer pays and the position stays theirs. Around it, the explorer shows what the community recommends and what's trending, and Spotters turns finding good pages early into a monthly game with a TRUST pool for the top ten.",
    highlights: [
      "Repositioned in autumn 2026: one gesture, recommend a page, one market per page",
      "Free Recommends: sign in with email, Google or a wallet, Sofia's relayer pays, the position stays yours",
      "Explorer: what the community backs, what's trending, your positions, pages waiting for a second opinion",
      "Spotters: a monthly game of finding pages first, top ten share a TRUST pool",
      "Live with real users and an Intuition grant; started as our web-dev degree graduation project",
      "Monorepo: extension, explorer, landing, share cards, write relayer, reputation API, team handbook",
    ],
    links: [
      { label: "Site", url: "https://sofia.intuition.box" },
      { label: "Explorer", url: "https://explorer.sofia.intuition.box" },
      { label: "Repo", url: "https://github.com/intuition-box/Sofia" },
      {
        label: "Grant application",
        url: "https://atlas.discourse.group/t/sofia-grant-application-december-2025/1177",
      },
    ],
    preview: "https://sofia.intuition.box",
    featured: true,
    year: "2025–2026",
  },
  {
    slug: "arp",
    domain: "web3",
    name: "ARP: Agent Reputation Protocol",
    tagline: "Stars show who looked. ARP shows who used it.",
    status: "building",
    role: "Creator: protocol, SDK, runtime hook and app",
    stack: ["TypeScript", "Bun", "Solidity", "Intuition Protocol", "ERC-8004", "ERC-7710", "MCP", "React"],
    description:
      "ARP makes money flow to the tools agents actually use. An agent records each tool call that works on an open graph anyone can read (Intuition), next to stars, installs, uptime and paid calls. Nobody is scored: every figure shown is a deposit someone made, and every position can be withdrawn, so what you read is current rather than accumulated. An agent is an ERC-8004 identity with an Intuition atom; declaring a tool costs a small non-recoverable fee; a tool's atom derives from its URL, so two people registering the same tool land on the same market. The thesis came out of two essays (the wrapper problem, then attribution as graph traversal) and an early demo for the MetaMask hackathon, since set aside. The core is now rebuilt as a monorepo on testnet: CLI, runtime hook, MCP server, probe, and Claude Code and Gemini plugins. Getting close to MVP, with a demo aimed at EthCC 2027. No users and no metrics yet, said plainly.",
    highlights: [
      "Usage = utility = reputation: a hook at discovery and at call time records what an agent really uses",
      "A market, not a score: positions are deposits, withdrawable, so the figures stay current",
      "One atom per tool URL, one ERC-8004 identity per agent, both on Intuition",
      "Core rebuilt as a monorepo on testnet: CLI, hook, MCP server, probe, Claude Code and Gemini plugins",
      "Approaching MVP; demo aimed at EthCC 2027",
      "Reputation model written up in two essays (wrapper problem → attribution traversal)",
    ],
    links: [
      { label: "Repo", url: "https://github.com/Wieedze/ARP" },
      { label: "Early hackathon demo", url: "https://arp-app-flax.vercel.app" },
    ],
    featured: true,
    year: "2026",
  },
  {
    slug: "thekitty",
    domain: "web3",
    name: "TheKitty",
    tagline: "Onchain group pots and a services marketplace, CRC-native.",
    status: "live",
    role: "Creator: full-stack and smart contracts",
    stack: ["TypeScript", "React", "Solidity", "Gnosis Chain", "Circles (CRC)"],
    description:
      "A Circles miniapp on Gnosis Chain, CRC-native. It started as onchain group pots and tontines and grew, week by week, into a small services marketplace: a provider board with ratings and trust badges, a pay sheet, an onchain reward pool, and a \"recommended by your circle\" panel that's really a traversal over the Circles trust graph, the same primitive behind Sofia and ARP. Pushed through the 6-week Gnosis Circles hackathon, where it finished 2nd overall.",
    highlights: [
      "2nd place overall in the Gnosis Circles hackathon (official)",
      "Onchain group pots and tontines, CRC-native on Gnosis",
      "Services marketplace: providers, ratings, trust badges, pay sheet",
      "Onchain reward pool + a trust-graph \"recommended by your circle\" recommender",
      "ServiceRegistry contract, Sourcify-verified",
    ],
    links: [
      { label: "Site", url: "https://thekitty.gnosis.box/services" },
      { label: "2nd place", url: "https://garage.aboutcircles.com/leaderboard" },
      { label: "Repo", url: "https://github.com/gnosis-box/TheKitty" },
    ],
    preview: "https://thekitty.gnosis.box/services",
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
    preview: "https://hourglass.box",
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
    links: [
      { label: "Site", url: "https://proxy.intuition.box" },
      { label: "Repo", url: "https://github.com/intuition-box/FeeProxy" },
    ],
    preview: "https://proxy.intuition.box",
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
    preview: "https://wispear.ai",
    featured: true,
    year: "2026",
  },
  {
    slug: "transubtil-records",
    domain: "music",
    name: "Transubtil Records",
    tagline: "The new home of an independent psytrance label, now live.",
    status: "live",
    role: "Label member: design and full-stack build",
    stack: ["React", "TypeScript", "Vite", "Tailwind", "Cloudflare Pages", "D1", "Email Workers", "Resend", "SSR prerender"],
    description:
      "The site of Transubtil Records, the independent psytrance label (darkpsy, forest, night psy) I'm part of. I rebuilt it from scratch as both the label's showcase and a booking tool: the international roster of DJs and live acts, each with its own page and a booking request, the full Bandcamp catalogue, a demo submission form and a contact page. Behind it, it runs on Cloudflare: Pages Functions for every form, a D1 database for subscribers and submissions, and a newsletter with double opt-in through Resend. The part I like most is the release watcher, an Email Worker that reads Bandcamp's \"new release\" notifications and turns each one into a draft newsletter plus an alert to the label. Every public page is prerendered with structured data, so search engines and AI assistants read real HTML.",
    highlights: [
      "Live: label showcase + artist booking for an international psytrance roster",
      "Full catalogue wired to Bandcamp players, a page per artist, demo and contact forms",
      "Cloudflare stack: Pages Functions, D1, Email Routing on the label's own domain",
      "Release watcher: a Bandcamp notification becomes a draft newsletter automatically",
      "Prerendered pages + JSON-LD, readable by crawlers and AI assistants",
    ],
    links: [
      { label: "Site", url: "https://transubtil-record.com" },
      { label: "Bandcamp", url: "https://transubtilrec.bandcamp.com" },
      { label: "Repo", url: "https://github.com/Wieedze/SPA-TransubtilRecord-website-" },
    ],
    featured: true,
    year: "2025–2026",
  },
  {
    slug: "moodzfilter",
    domain: "music",
    name: "MoodzFilter",
    tagline: "My first VST: a multi-model filter with drive and a tempo-synced LFO.",
    status: "building",
    role: "Creator: DSP, plugin and tooling (C++)",
    stack: ["C++23", "JUCE", "VST3", "CMake", "sst-filters", "Catch2", "pluginval"],
    description:
      "My first audio plugin, built for my own productions as Radikal Moodz and open source under AGPL. A filter effect with several analog-style models, an input drive and an LFO synced to the host tempo, VST3 on Windows only, tested in Ableton Live. It's also my first real C++, so the method matters as much as the sound: a separate knowledge base of rules and decisions written before the first line, a pure DSP layer kept out of JUCE, golden audio references compared in CI, a RealtimeSanitizer job that fails the build if the audio thread allocates, and pluginval on every push. The filters themselves come from sst-filters (Surge's library) rather than my own code: reuse what's proven, spend the time on listening. Right now the plugin loads in Live and I'm auditioning seven low pass candidates on my own tracks to pick the four models it will ship with.",
    highlights: [
      "First VST: multi-model filter + drive + BPM-synced LFO, VST3, Windows",
      "Open source (AGPL), built for my own psytrance productions",
      "Filters from sst-filters (Surge) instead of hand-rolled DSP",
      "CI: golden audio references, RealtimeSanitizer on the audio path, pluginval",
      "Gate passed: loads and reloads in Ableton Live; now choosing 4 of 7 filter models by ear",
      "Rules and decisions kept in a public knowledge base, reusable for the next plugins",
    ],
    links: [
      { label: "Repo", url: "https://github.com/Wieedze/MoodzFilter" },
      { label: "Roadmap and knowledge base", url: "https://wieedze.github.io/VstKnowledgeBase-/" },
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
    role: "Solo: brand identity, art direction, design and build",
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
    links: [
      { label: "Site", url: "https://oddwavestudio.com" },
      { label: "Repo", url: "https://github.com/Wieedze/OddWave-Studio-" },
    ],
    preview: "https://oddwavestudio.com",
    featured: true,
    year: "2026",
  },
  {
    slug: "liquid-democracy",
    domain: "web3",
    name: "Liquid Democracy",
    tagline: "Delegate your vote by domain, and let the Intuition graph decide what that domain covers.",
    status: "live",
    role: "Paid mission (intuition.box): Mission 10, built solo",
    stack: ["Solidity", "Foundry", "ERC-7710", "MetaMask Delegation Framework", "OpenZeppelin Governor", "Intuition MultiVault", "TypeScript", "React"],
    description:
      "A proof of concept of liquid democracy for DAOs, delivered as Mission 10 for the intuition.box DAO. Delegating a vote today is all or nothing; here an account hands its weight to someone on one domain only (say treasury), and the Intuition knowledge graph decides what that domain covers: payroll, grants, micro-grants, but not events. Add a sub-domain to the graph and every delegation already signed covers it, with no redeploy and no new signature. It's anchored at the protocol level, not in an app: the scope lives in a signed ERC-7710 delegation (custom caveat GraphDomainScope) and in the graph the DAO curates, where only edges the curator has staked on count. And it's built to plug into any DAO running OpenZeppelin's Governor, the base most on-chain DAOs use: nothing is forked, the integration is an override of the _getVotes hook OpenZeppelin exposes for exactly this, a vote entry point for delegated voices, and a domain resolver beside the governor. The caveat scopes, the governor counts. Live on Intuition testnet.",
    highlights: [
      "Per-domain vote delegation: the Intuition graph decides what a domain covers",
      "A new sub-domain extends every signed delegation, no re-signing, no redeploy",
      "Plugs into any OpenZeppelin Governor DAO: nothing forked, one _getVotes override + a domain resolver",
      "Anchored at the protocol level: ERC-7710 delegation + curated graph, usable from any interface or wallet",
      "Only edges the curator has staked on authorize anything; a free fake edge is worthless",
      "Chains (A → B → C), narrowing and revocation from the standard; every voice cast is logged on-chain under its owner",
      "Live on Intuition testnet; the domain vocabulary is chain-independent and ports to mainnet as is",
    ],
    links: [
      { label: "Repo", url: "https://github.com/intuition-box/Liquid-Voting" },
      {
        label: "Governor on testnet",
        url: "https://testnet.explorer.intuition.systems/address/0xd3eAA81C5D283E4270EFB568045A7b406197917F",
      },
    ],
    featured: true,
    year: "2026",
  },
  {
    slug: "loka",
    domain: "music",
    name: "Loka",
    tagline: "A platform for an initiatory meditation board game.",
    status: "building",
    role: "Creator: companion app (sound / music mission)",
    stack: [],
    description:
      "The companion app for Loka, an initiatory board game built around meditation: the place where all the audio plays and the guidance happens. A client that came through my sound work, in the same vein as my audio background. Repo not public yet.",
    highlights: [
      "Companion app for an initiatory meditation board game",
      "All the game's audio and guidance run through it",
      "A client landed through the sound side of my work",
    ],
    links: [],
    featured: false,
    year: "2026",
  },
  {
    slug: "trackhunter",
    domain: "music",
    name: "TrackHunter",
    tagline: "Search and compare tracks across every platform, from one playlist.",
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
    preview: "https://track-hunter.com/",
    featured: false,
    year: "2024–2026",
  },
];

export const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  building: "Building",
  exploring: "Exploring",
};
