import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm working on right now.",
};

// Edit this page often: it's the pulse of the site.
export default function NowPage() {
  return (
    <section className="wrap" style={{ paddingTop: 80 }}>
      <p className="eyebrow rise d1">Updated: August 2026</p>
      <h1 className="rise d2" style={{ marginTop: 16 }}>
        Right now
      </h1>

      <div className="prose rise d3" style={{ marginTop: 36 }}>
        <p>What I'm working on at the moment. Updated whenever the focus shifts.</p>

        <h2>Main focus</h2>
        <ul>
          <li>
            <strong>Liquid Democracy</strong>: a new paid mission for the intuition.box DAO, delegated and revocable voting. Repo not public yet.
          </li>
          <li>
            <strong>Loka</strong>: a platform for an initiatory board game built around meditation. A sound-side mission, back near my music roots. Repo not public yet.
          </li>
          <li>
            <strong>Hourglass</strong>: after presenting at ETHGlobal Lisbon, extending it with Agent DeFi: an AI agent that runs investments for you within scoped ERC-7710 permissions.
          </li>
        </ul>

        <h2>Recently shipped</h2>
        <ul>
          <li>
            <strong>OddWave Studio</strong>: the design-led site for a mastering and sound-design studio is done. Likely to grow into a studio-management SaaS.
          </li>
          <li>
            <strong>TheKitty</strong>: finished 2nd overall in the Gnosis Circles hackathon (official). Onchain group pots and a services marketplace, CRC-native on Gnosis.
          </li>
        </ul>

        <h2>In the background</h2>
        <ul>
          <li>Sofia, the Intuition FeeProxy, TrackHunter, music production, a VST plugin.</li>
        </ul>
      </div>
    </section>
  );
}
