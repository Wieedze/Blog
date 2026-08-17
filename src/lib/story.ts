// Story chapters for the home page. Condensed arc; the timeline below it
// carries the detailed milestones, so each chapter stays short.
// Thread: music production / live performance -> dev training -> web3 ->
// building in public. The sound-and-composability angle is the hook.
//
// Optional image per chapter: drop a file under public/story/ (e.g.
// public/story/01.jpg) and set image: { src: "/story/01.jpg", alt: "..." }.
// Nothing renders while the field is absent.

export type Chapter = {
  theme: string;
  title: string;
  body: string;
  detail: string;
  image?: { src: string; alt: string };
};

export const story: Chapter[] = [
  {
    theme: "Music production & live performance",
    title: "Sound first",
    body: "I was a music producer: writing my own tracks in Ableton Live and performing them live, professionally, around the world. Making that music meant building the machinery behind it (processing chains, racks, presets), and the tools ended up fascinating me as much as the sound.",
    detail:
      "Ableton was my development environment before I knew what one was: building a set meant wiring inputs, transforms and outputs, then saving the good ones as presets. Engineering, just with sound.",
  },
  {
    theme: "Learning to build",
    title: "From racks to code",
    body: "That urge to build my own tools pushed me into development, through The Hacking Project, where I discovered the web and then web3. It felt familiar: small composable pieces wired into bigger systems, exactly how I already worked in sound.",
    detail:
      "The bootcamp gave the instinct a language, and web3 is where it clicked hardest: smart contracts compose like modules in a rack, except the patches move real value.",
  },
  {
    theme: "Into web3",
    title: "Shipping on Intuition",
    body: "Sofia started with a schoolmate and a $20k Intuition grant, and grew into a full ecosystem around personal data and trust circles enforced on-chain. From there came hackathons at ETHGlobal Cannes and Lisbon, paid missions for intuition.box, and one thread I keep pulling: delegation and reputation.",
    detail:
      "The grant turned a school project into responsibility: real users, an extension, an explorer, a mobile app, docs. The missions that followed (FeeProxy, Hourglass, Liquid Democracy) each went deeper into delegation.",
  },
  {
    theme: "Building in public",
    title: "In the open",
    body: "I document the work as it happens, and every claim on this site points at something you can check: a repo, a live demo, or an address on-chain. Sofia and TrackHunter are still live, Liquid Democracy and Loka are what I'm building right now.",
    detail:
      "This site is the log: journal notes written as things ship, hackathon debriefs that keep the misses in, and a now page that says what I'm actually doing this month.",
  },
];
