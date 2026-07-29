import Link from "next/link";
import type { Metadata } from "next";
import { hackathons, resultLabel, type Hackathon } from "@/lib/hackathons";

export const metadata: Metadata = {
  title: "Hackathons",
  description:
    "Hackathons I've built at: WisPear (ETHGlobal Cannes), TheKitty (2nd, Gnosis / Circles), OurGlass (ETHGlobal Lisbon), and more. What shipped, and what the jury said.",
};

function ResultPill({ result }: { result: Hackathon["result"] }) {
  const strong = result === "winner" || result === "finalist";
  return (
    <span
      className="mono"
      style={{
        fontSize: ".64rem",
        letterSpacing: ".1em",
        textTransform: "uppercase",
        padding: "3px 8px",
        borderRadius: 999,
        background: strong ? "var(--accent)" : "var(--accent-soft)",
        color: strong ? "var(--bg)" : "var(--ink-soft)",
      }}
    >
      {resultLabel[result]}
    </span>
  );
}

function clean(value: string): string {
  return value && !value.startsWith("TODO") ? value : "";
}

export default function HackathonsPage() {
  return (
    <section className="wrap" style={{ paddingTop: 80 }}>
      <p className="eyebrow rise d1">What I build at</p>
      <h1 className="rise d2" style={{ marginTop: 16 }}>
        Hackathons
      </h1>
      <p
        className="rise d3"
        style={{ marginTop: 20, maxWidth: "56ch", color: "var(--ink-soft)" }}
      >
        Where a lot of my work starts. Every entry links to the repo, the demo,
        or the on-chain result, including the ones that didn't place, and why.
      </p>

      <div style={{ marginTop: 48 }}>
        {hackathons.map((h, i) => (
          <Link
            key={h.slug}
            href={`/hackathons/${h.slug}`}
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
                <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <span
                    className="mono"
                    style={{ fontSize: ".8rem", color: "var(--accent)", letterSpacing: ".03em" }}
                  >
                    {h.event}
                  </span>
                  <ResultPill result={h.result} />
                </div>
                <h3 style={{ fontSize: "1.6rem", marginTop: 8 }}>{h.project}</h3>
                <p style={{ color: "var(--ink-soft)", marginTop: 8 }}>{h.pitch}</p>
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
                {h.stack.slice(0, 3).join(" · ")}
                <div style={{ marginTop: 8 }}>
                  {[clean(h.date), clean(h.city)].filter(Boolean).join(" · ")}
                </div>
                {h.prize && (
                  <div style={{ marginTop: 4, color: "var(--accent)" }}>{h.prize}</div>
                )}
              </div>
            </div>
          </Link>
        ))}
        <div style={{ borderTop: "1px solid var(--line)" }} />
      </div>
    </section>
  );
}
