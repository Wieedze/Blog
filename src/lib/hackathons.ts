// Hackathon entries. Same authoring style as projects.ts: typed data, edited
// here by hand. Anything not verified is left as an explicit TODO(maxime) so it
// shows up in review instead of being invented.

export type Hackathon = {
  slug: string;
  event: string; // "ETHGlobal Cannes"
  city: string;
  date: string; // ISO
  duration: string; // "48h", "6 weeks"
  team: string[]; // [] if solo
  project: string;
  pitch: string; // one sentence
  stack: string[];
  sponsors: string[]; // tracks targeted
  result: "winner" | "finalist" | "submitted";
  prize?: string;
  links: { repo?: string; demo?: string; showcase?: string };
  media: string[]; // screenshot paths under /public
  learned: string; // REQUIRED: the honest takeaway, jury feedback included
};

// Most recent first.
export const hackathons: Hackathon[] = [
  {
    slug: "ethglobal-lisbon-ourglass",
    event: "ETHGlobal Lisbon",
    city: "Lisbon",
    date: "2026-07-24", // 24–26 July 2026
    duration: "TODO(maxime): duration",
    team: ["TODO(maxime): solo or teammates"],
    project: "Hourglass: scoped permission + Agent DeFi",
    pitch:
      "Scoped, revocable on-chain permission for Safe treasuries: recurring payments plus an AI agent that runs DeFi yield within the ERC-7710 caveats you sign.",
    stack: ["TypeScript", "Solidity", "ERC-7710", "AI agents", "Intuition", "Safe App"],
    sponsors: ["TODO(maxime): tracks"],
    result: "submitted", // presented at Lisbon; TODO(maxime): confirm placement
    links: {
      repo: "https://github.com/intuition-box/Hourglass",
      demo: "https://hourglass.box",
    },
    media: [],
    learned:
      "TODO(maxime): what presenting at Lisbon and adding the AI investment agent taught you.",
  },
  {
    slug: "gnosis-circles-thekitty",
    event: "Gnosis / Circles hackathon (Circles Garage)",
    city: "TODO(maxime): online or city",
    date: "2026-06", // 6-week program; TODO(maxime): confirm start/end
    duration: "6 weeks",
    team: [], // TODO(maxime): confirm solo
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
      "TODO(maxime): what the weekly cadence + the trust-graph recommender taught you, in your own words.",
  },
  {
    slug: "ethglobal-cannes-wispear",
    event: "ETHGlobal Cannes",
    city: "Cannes", // TODO(maxime): confirm
    date: "2026-04-25", // TODO(maxime): confirm exact dates
    duration: "TODO(maxime): duration",
    team: ["TODO(maxime): 4 teammates (team of 5 total)"],
    project: "WisPear",
    pitch:
      "Community wisdom, whispered to your agent: a community-curated marketplace for AI-agent tools on Intuition.",
    stack: ["TypeScript", "React", "Intuition Protocol", "AI agents"],
    sponsors: ["Intuition"], // TODO(maxime): confirm tracks
    result: "submitted",
    links: {
      repo: "https://github.com/intuition-box/WisPear",
      demo: "https://wispear.ai",
    },
    media: [],
    learned:
      "TODO(maxime): document the jury feedback verbatim (pitch too vague, no smart contract in the repo, PMF questioned) and what you'd do differently. Owning the misses is the differentiator.",
  },
  {
    slug: "ethcc-wonderland-ctf",
    event: "Wonderland CTF @ EthCC",
    city: "TODO(maxime): city",
    date: "TODO(maxime): date",
    duration: "TODO(maxime): duration",
    team: [], // TODO(maxime)
    project: "Wonderland CTF",
    pitch: "TODO(maxime): one-line on the security CTF at EthCC.",
    stack: ["TODO(maxime): stack / tooling"],
    sponsors: [],
    result: "submitted", // participation
    links: {},
    media: [],
    learned: "TODO(maxime): what the CTF taught you.",
  },
];

export const resultLabel: Record<Hackathon["result"], string> = {
  winner: "Winner",
  finalist: "Finalist",
  submitted: "Submitted",
};
