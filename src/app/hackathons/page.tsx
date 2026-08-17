import Link from "next/link";
import type { Metadata } from "next";
import { hackathons, resultLabel } from "@/lib/hackathons";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Hackathons",
  description:
    "Hackathons I've built at: WisPear (ETHGlobal Cannes), TheKitty (2nd, Gnosis / Circles), Hourglass (ETHGlobal Lisbon), and more. What shipped, and what the jury said.",
};

export default function HackathonsPage() {
  return (
    <PageShell eyebrow="What I build at" title="Hackathons">
      {hackathons.map((h) => (
        <Link
          key={h.slug}
          href={`/hackathons/${h.slug}`}
          style={{
            display: "block",
            borderTop: "1px solid var(--line)",
            padding: "30px 0",
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
                style={{ fontSize: "var(--fs-xs)", color: "var(--accent)", letterSpacing: ".03em" }}
              >
                {h.event}
              </span>
              <h3 style={{ marginTop: 8 }}>{h.project}</h3>
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
                  style={{ fontSize: "var(--fs-xs)", color: "var(--accent)", marginTop: 6 }}
                >
                  {h.prize}
                </div>
              )}
              <div
                className="mono"
                style={{ fontSize: "var(--fs-xs)", color: "var(--ink-faint)", marginTop: 6 }}
              >
                {[h.date, h.city].filter(Boolean).join(" · ")}
              </div>
            </div>
          </div>
        </Link>
      ))}
      <div style={{ borderTop: "1px solid var(--line)" }} />
    </PageShell>
  );
}
