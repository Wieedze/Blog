import Link from "next/link";
import type { Metadata } from "next";
import { projects, statusLabel, type Project } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Maxime Saint-Joannis's projects. Web3: Sofia, ARP, TheKitty, Hourglass, the Intuition FeeProxy, WisPear. Music & sound: TrackHunter, OddWave Studio, Loka.",
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
    title: "Web3 & on-chain",
    blurb:
      "Protocols, DAO missions and hackathon builds: TypeScript, Solidity, delegation frameworks, the Intuition graph.",
  },
  {
    domain: "music",
    eyebrow: "02 · music",
    title: "Music & sound",
    blurb:
      "Where it all started, and still running: tools and platforms on the sound side, for DJs, a mastering studio and a meditation board game.",
  },
];

export default function ProjectsPage() {
  return (
    <section className="wrap" style={{ paddingTop: 80 }}>
      <p className="eyebrow rise d1">What I build</p>
      <h1 className="rise d2" style={{ marginTop: 16 }}>
        Projects
      </h1>
      <p
        className="rise d3"
        style={{ marginTop: 20, maxWidth: "56ch", color: "var(--ink-soft)" }}
      >
        Everything I'm building or have shipped: products in production,
        paid contracts, hackathon experiments. Two worlds, one itch to build:
        web3 on one side, music and sound on the other. I'm not claiming to
        have mastered any of it; each one taught me something I didn't know
        going in.
      </p>

      {groups.map((g, gi) => {
        const items = projects.filter((p) => p.domain === g.domain);
        return (
          <div key={g.domain} style={{ marginTop: gi === 0 ? 56 : 72 }}>
            <p className="eyebrow rise">{g.eyebrow}</p>
            <h2 className="rise" style={{ fontSize: "1.7rem", marginTop: 8 }}>
              {g.title}
            </h2>
            <p
              className="rise"
              style={{ marginTop: 10, maxWidth: "58ch", color: "var(--ink-soft)" }}
            >
              {g.blurb}
            </p>

            <div style={{ marginTop: 28 }}>
              {items.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="rise"
                  style={{
                    display: "block",
                    borderTop: "1px solid var(--line)",
                    padding: "32px 0",
                    animationDelay: `${0.1 + i * 0.07}s`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 20,
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ flex: "1 1 340px" }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <h3 style={{ fontSize: "1.6rem" }}>{p.name}</h3>
                        <span
                          className="mono"
                          style={{
                            fontSize: ".64rem",
                            letterSpacing: ".1em",
                            textTransform: "uppercase",
                            padding: "3px 8px",
                            borderRadius: 999,
                            background:
                              p.status === "live"
                                ? "var(--accent)"
                                : "var(--accent-soft)",
                            color:
                              p.status === "live" ? "var(--bg)" : "var(--ink-soft)",
                          }}
                        >
                          {statusLabel[p.status]}
                        </span>
                      </div>
                      <p style={{ color: "var(--ink-soft)", marginTop: 8 }}>
                        {p.tagline}
                      </p>
                      <p
                        className="mono"
                        style={{
                          fontSize: ".78rem",
                          color: "var(--ink-faint)",
                          marginTop: 12,
                        }}
                      >
                        {p.role}
                      </p>
                    </div>
                    <div
                      className="mono"
                      style={{
                        fontSize: ".76rem",
                        color: "var(--ink-faint)",
                        textAlign: "right",
                        maxWidth: 240,
                      }}
                    >
                      {p.stack.join(" · ")}
                      <div style={{ marginTop: 8 }}>{p.year}</div>
                    </div>
                  </div>
                </Link>
              ))}
              <div style={{ borderTop: "1px solid var(--line)" }} />
            </div>
          </div>
        );
      })}
    </section>
  );
}
