import type { Metadata } from "next";
import { projects, type Project } from "@/lib/projects";
import ProjectRow from "@/components/ProjectRow";
import Deck from "@/components/Deck";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Maxime Saint-Joannis's projects. Web3: Sofia, ARP, TheKitty, Hourglass, the Intuition FeeProxy, WisPear. Music and sound: TrackHunter, OddWave Studio, Loka.",
};

const groups: {
  domain: Project["domain"];
  eyebrow: string;
  title: string;
  blurb: string;
}[] = [
  {
    domain: "web3",
    eyebrow: "01 · web3",
    title: "Web3 and on-chain",
    blurb:
      "Protocols, DAO missions and hackathon builds: TypeScript, Solidity, delegation frameworks, the Intuition graph.",
  },
  {
    domain: "music",
    eyebrow: "02 · music",
    title: "Music and sound",
    blurb:
      "Where it all started, and still running: tools and platforms on the sound side, for DJs, a mastering studio and a meditation board game.",
  },
];

export default function ProjectsPage() {
  return (
    <Deck>
      {groups.map((g, gi) => {
        const items = projects.filter((p) => p.domain === g.domain);
        return (
          <div
            key={g.domain}
            className={g.domain === "music" ? "sheet sheet-alt" : "sheet"}
          >
            <section className="wrap" style={{ width: "100%" }}>
              {gi === 0 && (
                <>
                  <p className="eyebrow rise d1">What I build</p>
                  <h1 className="rise d2" style={{ marginTop: 16 }}>
                    Projects
                  </h1>
                  <p
                    className="rise d3"
                    style={{ marginTop: 20, maxWidth: "70ch", color: "var(--ink-soft)" }}
                  >
                    Everything I'm building or have shipped: products in production, paid contracts, hackathon experiments. Web3 on one side, music and sound on the other.
                  </p>
                </>
              )}

              <div style={{ marginTop: gi === 0 ? 88 : 0 }}>
                <div
                  className="rise"
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 24,
                    flexWrap: "wrap",
                  }}
                >
                  <h2 style={{ fontSize: "2.2rem" }}>{g.title}</h2>
                  <p className="eyebrow" style={{ margin: 0 }}>
                    {g.eyebrow}
                  </p>
                </div>
                <p
                  className="rise mono"
                  style={{
                    marginTop: 12,
                    maxWidth: "72ch",
                    fontSize: ".85rem",
                    color: "var(--ink-faint)",
                  }}
                >
                  {g.blurb}
                </p>

                <div style={{ marginTop: 28 }}>
                  {items.map((p, i) => (
                    <ProjectRow
                      key={p.slug}
                      project={p}
                      className="rise"
                      style={{ animationDelay: `${0.06 + Math.min(i, 8) * 0.045}s` }}
                    />
                  ))}
                  <div style={{ borderTop: "1px solid var(--line)" }} />
                </div>
              </div>
            </section>
          </div>
        );
      })}
    </Deck>
  );
}
