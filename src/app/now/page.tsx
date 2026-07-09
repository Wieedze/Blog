import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm working on right now.",
};

// Edit this page often: it's the pulse of the site.
export default function NowPage() {
  return (
    <section className="prose-wrap" style={{ paddingTop: 80 }}>
      <p className="eyebrow rise d1">Updated: July 2026</p>
      <h1 className="rise d2" style={{ marginTop: 16 }}>
        Right now
      </h1>

      <div className="prose rise d3" style={{ marginTop: 36 }}>
        <p>
          A "now" page. The idea is simple: what I'm actually doing today,
          updated often, without ceremony.
        </p>

        <h2>Main focus</h2>
        <ul>
          <li>
            <strong>Sofia</strong>: the "Add to Sofia" capture flow (right-click,
            then auto-mint the missing context atoms), an explorer onboarding
            tour, and extension v1.2. This is what I'm heads-down on right now.
          </li>
          <li>
            <strong>OddWave Studio</strong>: a design-led site for a mastering
            and sound-design studio (Sleeping Tracks Records). The most
            design-focused thing I've built lately.
          </li>
          <li>
            <strong>Intuition FeeProxy</strong>: finishing the design before it
            goes to mainnet.
          </li>
          <li>
            <strong>ARP</strong>: still working out which ontology to adopt (the
            discussion lives on the Intuition Atlas). It's the foundation, so I
            want it right before writing the code.
          </li>
        </ul>

        <h2>Recently shipped</h2>
        <ul>
          <li>
            <strong>TheKitty</strong>: finished 2nd overall in the Gnosis Circles
            hackathon (official). Onchain group pots and a services marketplace,
            CRC-native on Gnosis.
          </li>
          <li>
            <strong>OurGlass</strong>: live, a Safe App for recurring on-chain
            payments. It pulled ~6,000 likes at the hackathon, but that wasn't
            enough to place (the winner had ~14,000). Didn't make the ranking.
            Still, it's live and I'm keeping it.
          </li>
        </ul>

        <h2>In the background</h2>
        <ul>
          <li>TrackHunter, music production, a VST plugin.</li>
        </ul>
      </div>
    </section>
  );
}
