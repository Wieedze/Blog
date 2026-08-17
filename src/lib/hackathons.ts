// Hackathon entries. Same authoring style as projects.ts: typed data, edited
// here by hand. An empty string or empty array means unknown or not
// applicable; the pages skip empty values.

export type Hackathon = {
  slug: string;
  event: string; // "ETHGlobal Cannes"
  city: string;
  date: string; // ISO
  duration: string; // "48h", "6 weeks"
  team: string[]; // [] if solo or unknown
  project: string;
  pitch: string; // one sentence
  stack: string[];
  sponsors: string[]; // tracks targeted
  result: "winner" | "finalist" | "submitted";
  prize?: string;
  links: { repo?: string; demo?: string; showcase?: string };
  media: string[]; // screenshot paths under /public
  learned: string; // the honest takeaway, jury feedback included
};

// Most recent first.
export const hackathons: Hackathon[] = [
  {
    slug: "ethglobal-lisbon-ourglass",
    event: "ETHGlobal Lisbon",
    city: "Lisbon",
    date: "2026-07-24",
    duration: "",
    team: [],
    project: "Hourglass: scoped permission + Agent DeFi",
    pitch:
      "Scoped, revocable on-chain permission for Safe treasuries: recurring payments plus an AI agent that runs DeFi yield within the ERC-7710 caveats you sign.",
    stack: ["TypeScript", "Solidity", "ERC-7710", "AI agents", "Intuition", "Safe App"],
    sponsors: [],
    result: "submitted",
    links: {
      repo: "https://github.com/intuition-box/Hourglass",
      demo: "https://hourglass.box",
    },
    media: [],
    learned:
      "Presenting at Lisbon forced the story down to something a judge can verify in a minute: one signature, one on-chain cap, revocable anytime. The automated version we built there, an agent running DeFi inside the caveats you sign, came out of that pressure, and it convinced me the delegation framework is a product surface, not just plumbing.",
  },
  {
    slug: "gnosis-circles-thekitty",
    event: "Gnosis / Circles hackathon (Circles Garage)",
    city: "Online",
    date: "2026-06",
    duration: "6 weeks",
    team: [],
    project: "TheKitty",
    pitch:
      "On-chain group pots and a services marketplace, CRC-native on Gnosis.",
    stack: ["TypeScript", "React", "Solidity", "Gnosis Chain", "Circles (CRC)"],
    sponsors: ["Circles", "Gnosis"],
    result: "finalist",
    prize: "2nd place overall (official)",
    links: {
      repo: "https://github.com/gnosis-box/TheKitty",
      showcase: "https://garage.aboutcircles.com/leaderboard",
    },
    media: [],
    learned:
      "Six weeks of shipping something every week is a different sport from a weekend sprint: scope discipline mattered more than speed. The real lesson was the recommender, because the Circles trust graph turned out to be a queryable primitive, the same idea I keep meeting in Intuition.",
  },
  {
    slug: "ethglobal-cannes-wispear",
    event: "ETHGlobal Cannes",
    city: "Cannes",
    date: "2026-04-25",
    duration: "",
    team: ["Team of five"],
    project: "WisPear",
    pitch:
      "Community wisdom, whispered to your agent: a community-curated marketplace for AI-agent tools on Intuition.",
    stack: ["TypeScript", "React", "Intuition Protocol", "AI agents"],
    sponsors: ["Intuition"],
    result: "submitted",
    links: {
      repo: "https://github.com/intuition-box/WisPear",
      demo: "https://wispear.ai",
    },
    media: [],
    learned:
      "Our first hackathon, and the jury feedback was blunt and fair: the pitch stayed too abstract, there was no smart contract in the repo to point at, and product-market fit got questioned. It also left me with the question that became ARP: what is an agent, really? Next time, one concrete user path and contracts in the repo from day one.",
  },
  {
    slug: "ethcc-wonderland-ctf",
    event: "Wonderland CTF @ EthCC",
    city: "",
    date: "",
    duration: "",
    team: [],
    project: "Wonderland CTF",
    pitch:
      "A smart-contract security CTF at EthCC: reading contracts adversarially instead of building them.",
    stack: [],
    sponsors: [],
    result: "submitted",
    links: {},
    media: [],
    learned:
      "A first real taste of the security side. Breaking a contract asks for a different head than shipping one: you stop reading what the code is meant to do and start reading what it actually allows.",
  },
];

export const resultLabel: Record<Hackathon["result"], string> = {
  winner: "Winner",
  finalist: "Finalist",
  submitted: "Submitted",
};
