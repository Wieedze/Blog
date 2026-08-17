import Link from "next/link";
import type { Metadata } from "next";
import { hackathons, resultLabel } from "@/lib/hackathons";

export const metadata: Metadata = {
  title: "Hackathons",
  description:
    "Hackathons I've built at: WisPear (ETHGlobal Cannes), TheKitty (2nd, Gnosis / Circles), Hourglass (ETHGlobal Lisbon), and more. What shipped, and what the jury said.",
};

export default function HackathonsPage() {
  return (
    <section className="wrap" style={{ paddingTop: 80 }}>
      <p className="eyebrow rise d1">What I build at</p>
      <h1 className="rise d2" style={{ marginTop: 16 }}>
        Hackathons
      </h1>
      <p
        className="rise d3"
        style={{ marginTop: 20, maxWidth: "70ch", color: "var(--ink-soft)" }}
      >
        Where a lot of my work starts. Every entry links to the repo, the demo, or the on-chain result, including the ones that didn't place, and why.
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
              padding: "30px 0",
              animationDelay: `${0.06 + Math.min(i, 8) * 0.045}s`,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 24,
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <div style={{ flex: "1 1 380px" }}>
                <span
                  className="mono"
                  style={{ fontSize: ".8rem", color: "var(--accent)", letterSpacing: ".03em" }}
                >
                  {h.event}
                </span>
                <h3 style={{ fontSize: "1.5rem", marginTop: 8 }}>{h.project}</h3>
                <p style={{ color: "var(--ink-soft)", marginTop: 6, maxWidth: "72ch" }}>
                  {h.pitch}
                </p>
                {h.stack.length > 0 && (
                  <p className="stack-line" style={{ marginTop: 12 }}>
                    {h.stack.join(" · ")}
                  </p>
                )}
              </div>
              <div style={{ textAlign: "right" }}>
                <span
                  className={
                    h.result === "winner" || h.result === "finalist"
                      ? "status-word is-strong"
                      : "status-word"
                  }
                >
                  {resultLabel[h.result]}
                </span>
                {h.prize && (
                  <div
                    className="mono"
                    style={{ fontSize: ".78rem", color: "var(--accent)", marginTop: 6 }}
                  >
                    {h.prize}
                  </div>
                )}
                <div
                  className="mono"
                  style={{ fontSize: ".78rem", color: "var(--ink-faint)", marginTop: 6 }}
                >
                  {[h.date, h.city].filter(Boolean).join(" · ")}
                </div>
              </div>
            </div>
          </Link>
        ))}
        <div style={{ borderTop: "1px solid var(--line)" }} />
      </div>
    </section>
  );
}
