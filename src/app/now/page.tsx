import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm working on right now.",
};

// Edit this page often: it's the pulse of the site.
export default function NowPage() {
  return (
    <PageShell eyebrow="Updated: November 2026" title="Right now">
      <div className="prose">
        <p>What I'm working on at the moment. Updated whenever the focus shifts.</p>

        <h2>Main focus</h2>
        <ul>
          <li>
            <strong>ARP</strong>: heading toward the MVP. The core is rebuilt as a monorepo on testnet (CLI, runtime hook, MCP server, probe, Claude Code and Gemini plugins) and the pitch is sharper: ARP makes money flow to the tools agents actually use. November is for building, with a demo aimed at EthCC 2027. No users yet, and I'd rather say it. <a href="/projects/arp">Project page</a>.
          </li>
          <li>
            <strong>MoodzFilter</strong>: my first VST, a multi-model filter with drive and a tempo-synced LFO, in C++ with JUCE. It loads in Ableton Live; this week I'm choosing its four filter models by ear, on my own tracks. <a href="/projects/moodzfilter">Project page</a>.
          </li>
          <li>
            <strong>Sofia</strong>: a repositioning around one gesture, recommending a page. Free Recommends through our relayer (sign in with email or Google, no wallet needed), a cleaner explorer and Spotters, a monthly game of finding good pages first. <a href="/projects/sofia">Project page</a>.
          </li>
        </ul>

        <h2>Recently shipped</h2>
        <ul>
          <li>
            <strong>Transubtil Records</strong>: the new site of the psytrance label I'm part of is live. Label showcase, artist booking, the full catalogue, and a newsletter that drafts itself when a release lands on Bandcamp. <a href="/projects/transubtil-records">Project page</a>.
          </li>
          <li>
            <strong>Liquid Democracy</strong>: Mission 10 for the intuition.box DAO, delivered. Vote delegation by domain, scoped by the Intuition graph. <a href="/journal/liquid-democracy-graph-scoped-delegation">The write-up</a>.
          </li>
        </ul>

        <h2>In the background</h2>
        <ul>
          <li>Loka, Hourglass, the Intuition FeeProxy, TrackHunter, OddWave Studio, and music production as Radikal Moodz.</li>
        </ul>
      </div>
    </PageShell>
  );
}
