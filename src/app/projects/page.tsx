import type { Metadata } from "next";
import { projects, type Project } from "@/lib/projects";
import ProjectRow from "@/components/ProjectRow";
import Deck from "@/components/Deck";
import Entrance from "@/components/Entrance";

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
    title: "Web3",
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
        const first = gi === 0;

        // First sheet: staged entrance (Entrance timeline). The title lands
        // alone, then the intro, then the group header fades in, then the
        // rows. Second sheet keeps the plain .rise entrances.
        const body = (
          <>
            {first && (
              <>
                <p data-entrance="2" className="eyebrow">
                  What I build
                </p>
                <h1 data-entrance="1" style={{ marginTop: 16 }}>
                  Projects
                </h1>
                <p
                  data-entrance="2"
                  style={{ marginTop: 20, maxWidth: "70ch", color: "var(--ink-soft)" }}
                >
                  Everything I&apos;m building or have shipped: products in production, paid contracts, hackathon experiments. Web3 on one side, music and sound on the other.
                </p>
              </>
            )}

            <div style={{ marginTop: first ? 88 : 0 }}>
              <div
                data-entrance={first ? "3" : undefined}
                className={first ? undefined : "rise"}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 24,
                  flexWrap: "wrap",
                }}
              >
                <h2>{g.title}</h2>
                <p className="eyebrow" style={{ margin: 0 }}>
                  {g.eyebrow}
                </p>
              </div>
              <p
                data-entrance={first ? "3" : undefined}
                className={first ? "mono" : "rise mono"}
                style={{
                  marginTop: 12,
                  maxWidth: "72ch",
                  fontSize: "var(--fs-sm)",
                  color: "var(--ink-faint)",
                }}
              >
                {g.blurb}
              </p>

              <div style={{ marginTop: 28 }}>
                {items.map((p, i) =>
                  first ? (
                    <div key={p.slug} data-entrance="4">
                      <ProjectRow project={p} />
                    </div>
                  ) : (
                    <ProjectRow
                      key={p.slug}
                      project={p}
                      className="rise"
                      style={{ animationDelay: `${0.06 + Math.min(i, 8) * 0.045}s` }}
                    />
                  )
                )}
                <div style={{ borderTop: "1px solid var(--line)" }} />
              </div>
            </div>
          </>
        );

        return (
          <div
            key={g.domain}
            className={g.domain === "music" ? "sheet sheet-alt" : "sheet"}
          >
            <section className="wrap" style={{ width: "100%" }}>
              {first ? <Entrance>{body}</Entrance> : body}
            </section>
          </div>
        );
      })}
    </Deck>
  );
}
