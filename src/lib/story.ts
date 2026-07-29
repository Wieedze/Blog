// Story chapters for the home page. Structure only: the narrative text is
// written by hand (brief: "Ne pas rédiger ce contenu"). Titles and bodies are
// TODO(maxime); the `theme` is a hint for what each chapter is about.
// Thread: music production / live performance -> dev training -> web3 ->
// building in public. The sound-and-composability angle is the hook.

export type Chapter = {
  n: string;
  theme: string; // hint, kept visible until the real title/body land
  title: string;
  body: string;
};

export const story: Chapter[] = [
  {
    n: "01",
    theme: "Music production & live performance",
    title: "TODO(maxime): chapter title",
    body: "TODO(maxime): the sound-and-composability angle (processing chains, modules, presets). Nobody else in this ecosystem has this background.",
  },
  {
    n: "02",
    theme: "Learning to build",
    title: "TODO(maxime): chapter title",
    body: "TODO(maxime): the switch into dev (The Hacking Project).",
  },
  {
    n: "03",
    theme: "Into web3",
    title: "TODO(maxime): chapter title",
    body: "TODO(maxime): landing in the Intuition ecosystem and shipping the first real on-chain work.",
  },
  {
    n: "04",
    theme: "Building in public",
    title: "TODO(maxime): chapter title",
    body: "TODO(maxime): why you document everything, each claim backed by a repo, demo, or on-chain link.",
  },
];
