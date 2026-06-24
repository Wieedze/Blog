import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm working on right now.",
};

// Edit this page often: it's the pulse of the site.
export default function NowPage() {
  return (
    <section className="prose-wrap" style={{ paddingTop: 80 }}>
      <p className="eyebrow rise d1">Updated: June 2026</p>
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
            <strong>Sofia</strong>: building out the social layer (groups,
            notifications, circle-pro). This is what I'm heads-down on right now.
          </li>
          <li>
            <strong>Intuition FeeProxy</strong>: finishing the design before it
            goes to mainnet.
          </li>
          <li>
            <strong>ARP</strong>: working out which ontology to adopt (deep in
            the discussion on the Intuition Atlas). Starting the code next week.
          </li>
          <li>
            <strong>Mastering-studio site</strong>: a more design-led build,
            back on the music side.
          </li>
        </ul>

        <h2>Recently shipped</h2>
        <ul>
          <li>
            <strong>OurGlass</strong>: live, a Safe App for recurring on-chain
            payments. It pulled ~6,000 likes at the hackathon, but that wasn't
            enough to place (the winner had ~14,000). Didn't make the ranking.
            Still, it's live and I'm keeping it.
          </li>
        </ul>

        <h2>In the background</h2>
        <ul>
          <li>TheKitty (Gnosis hackathon), TrackHunter, music production, a VST plugin.</li>
        </ul>
      </div>
    </section>
  );
}
