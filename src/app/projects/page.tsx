import type { Metadata } from "next";
import { projects, type Project } from "@/lib/projects";
import Deck from "@/components/Deck";
import PageShell from "@/components/PageShell";
import ProjectsShowcase from "@/components/ProjectsShowcase";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Maxime Saint-Joannis's projects. Web3: Sofia, ARP, TheKitty, Hourglass, the Intuition FeeProxy, WisPear. Music and sound: TrackHunter, OddWave Studio, Loka.",
};

const groups: {
  domain: Project["domain"];
  title: string;
  blurb: string;
}[] = [
  {
    domain: "web3",
    title: "Web3",
    blurb: "Protocols, DAO missions, hackathon builds.",
  },
  {
    domain: "music",
    title: "Music and sound",
    blurb: "Where it all started: tools and platforms on the sound side.",
  },
];

// Same construction as the home: an intro sheet, then one sheet per domain
// sliding over it, each running the shared scrollytelling (one panel per
// project, crossfading as you scroll).
export default function ProjectsPage() {
  const [web3, music] = groups;

  return (
    <Deck>
      <div className="sheet">
        <PageShell
          eyebrow="What I build"
          title="Projects"
          lede="Everything I'm building or have shipped: products in production, paid contracts, hackathon experiments. Web3 on one side, music and sound on the other."
          style={{ paddingTop: 0, width: "100%" }}
        />
      </div>

      <div className="sheet">
        <ProjectsShowcase
          title={web3.title}
          blurb={web3.blurb}
          items={projects.filter((p) => p.domain === web3.domain)}
        />
      </div>

      <div className="sheet sheet-alt">
        <ProjectsShowcase
          title={music.title}
          blurb={music.blurb}
          items={projects.filter((p) => p.domain === music.domain)}
        />
      </div>
    </Deck>
  );
}
