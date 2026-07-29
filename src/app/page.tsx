import Link from "next/link";
import { projects, statusLabel } from "@/lib/projects";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="wrap" style={{ paddingTop: 96, paddingBottom: 72 }}>
        <p className="eyebrow rise d1">Maxime Saint-Joannis</p>
        <h1 className="rise d2" style={{ marginTop: 18, maxWidth: 14 + "ch" + "" }}>
          Let's build,
          <span style={{ color: "var(--accent)" }}> in public.</span>
        </h1>
        <p
          className="rise d3"
          style={{
            marginTop: 28,
            maxWidth: "54ch",
            fontSize: "1.2rem",
            color: "var(--ink-soft)",
            lineHeight: 1.6,
          }}
        >
          Full-stack & web3 junior developer. A
          product live with real users, an Intuition grant, a mission landed
          with a DAO, and a wide-open field still left to explore.
        </p>
        <p
          className="rise d3 mono"
          style={{
            marginTop: 20,
            maxWidth: "54ch",
            fontSize: ".92rem",
            color: "var(--ink-faint)",
          }}
        >
          Not an expert, an experimenter. I build in the open and write it
          down as it happens: what ships, what breaks, what I learn next.
        </p>

        <div
          className="rise d4"
          style={{ marginTop: 40, display: "flex", gap: 18, flexWrap: "wrap" }}
        >
          <Link
            href="/hackathons"
            className="mono"
            style={{
              background: "var(--ink)",
              color: "var(--bg)",
              padding: "13px 26px",
              borderRadius: "var(--radius)",
              fontSize: ".9rem",
              transition: "opacity .25s var(--ease)",
            }}
          >
            View my work →
          </Link>
          <Link
            href="/journal"
            className="mono link"
            style={{ padding: "13px 4px", fontSize: ".9rem", border: "none" }}
          >
            Read the journal
          </Link>
        </div>
      </section>

      {/* ---------- FEATURED PROJECTS ---------- */}
      <section className="wrap" style={{ paddingTop: 24 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            borderTop: "1px solid var(--line)",
            paddingTop: 28,
            marginBottom: 8,
          }}
        >
          <h2 style={{ fontSize: "1.4rem" }}>Selected work</h2>
          <Link href="/projects" className="mono link" style={{ fontSize: ".85rem" }}>
            view all
          </Link>
        </div>

        <div>
          {featured.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="rise"
              style={{
                display: "block",
                borderBottom: "1px solid var(--line)",
                padding: "30px 0",
                animationDelay: `${0.1 + i * 0.08}s`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 16,
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ flex: "1 1 320px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <h3 style={{ fontSize: "1.5rem" }}>{p.name}</h3>
                    <StatusPill status={p.status} />
                  </div>
                  <p style={{ color: "var(--ink-soft)", marginTop: 6 }}>
                    {p.tagline}
                  </p>
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: ".78rem",
                    color: "var(--ink-faint)",
                    textAlign: "right",
                  }}
                >
                  {p.stack.slice(0, 3).join(" · ")}
                  <div style={{ marginTop: 4 }}>{statusLabel[p.status]}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function StatusPill({ status }: { status: string }) {
  const isLive = status === "live";
  return (
    <span
      className="mono"
      style={{
        fontSize: ".64rem",
        letterSpacing: ".1em",
        textTransform: "uppercase",
        padding: "3px 8px",
        borderRadius: 999,
        background: isLive ? "var(--accent)" : "var(--accent-soft)",
        color: isLive ? "var(--bg)" : "var(--ink-soft)",
      }}
    >
      {isLive ? "live" : status}
    </span>
  );
}
