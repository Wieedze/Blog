import Link from "next/link";
import type { Metadata } from "next";
import { projects, statusLabel } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Maxime Saint-Joannis's projects: Sofia, ARP, TheKitty, OurGlass, the Intuition FeeProxy, WisPear, TrackHunter.",
};

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
        paid contracts, hackathon experiments. Roughly ordered by maturity, not
        importance. I'm not claiming to have mastered any of it; each one taught
        me something I didn't know going in.
      </p>

      <div style={{ marginTop: 48 }}>
        {projects.map((p, i) => (
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
    </section>
  );
}
