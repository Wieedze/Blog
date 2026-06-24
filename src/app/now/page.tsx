import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm working on right now.",
};

// Edit this page often — it's the pulse of the site.
export default function NowPage() {
  return (
    <section className="prose-wrap" style={{ paddingTop: 80 }}>
      <p className="eyebrow rise d1">Updated: June 2026</p>
      <h1 className="rise d2" style={{ marginTop: 16 }}>
        Right now
      </h1>

      <div className="prose rise d3" style={{ marginTop: 36 }}>
        <p>
          A "now" page — the idea is simple: what I'm actually doing today,
          updated often, without ceremony.
        </p>

        <h2>Main focus</h2>
        <ul>
          <li>
            <strong>OurGlass</strong> — just shipped: a Safe App for recurring
            on-chain payments (sign once, capped via ERC-7710, revocable). Live
            at ourglass.intuition.box.
          </li>
          <li>
            <strong>ARP</strong> — MVP for the MetaMask Snap Smart Wallet
            hackathon, shipped this week.
          </li>
          <li>
            <strong>Sofia</strong> — continuous iteration on the product in
            production (onboarding, scoring, attestations).
          </li>
          <li>
            <strong>Intuition Fee Proxy contract</strong> — a proxy factory for
            businesses in the ecosystem.
          </li>
          <li>
            <strong>TheKitty</strong> — evolving it through a 6-week Gnosis
            hackathon (weekly prizes, then a grand finale). 2nd in week 2, and
            re-entering every week — week 3, then week 4 — with new progress
            each time, building toward the finale.
          </li>
        </ul>

        <h2>On the horizon</h2>
        <ul>
          <li>ETHGlobal Lisbon 2026 (July 24) with ARP.</li>
          <li>Learning ZK / Noir ahead of that deadline.</li>
          <li>Building a team.</li>
        </ul>

        <h2>In the background</h2>
        <ul>
          <li>TrackHunter, music production, a VST plugin.</li>
        </ul>
      </div>
    </section>
  );
}
