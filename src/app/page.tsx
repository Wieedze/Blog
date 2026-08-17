import Link from "next/link";
import { projects, type Project } from "@/lib/projects";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Timeline from "@/components/Timeline";
import Portrait from "@/components/Portrait";
import ProjectRow from "@/components/ProjectRow";
import Reveal from "@/components/Reveal";
import Deck from "@/components/Deck";

export default function Home() {
  const web3 = projects.filter((p) => p.domain === "web3" && p.featured);
  const music = projects.filter((p) => p.domain === "music");

  return (
    <Deck>
      {/* ---------- SHEET 1: HERO ---------- */}
      <div className="sheet">
        <Hero />
      </div>

      {/* ---------- SHEET 2: STORY ---------- */}
      <div className="sheet">
        <Story />
      </div>

      {/* ---------- SHEET 3: TIMELINE ---------- */}
      <div className="sheet">
        <Timeline />
      </div>

      {/* ---------- SHEET 4: WEB3 WORK ---------- */}
      <div className="sheet">
        <WorkBlock title="Web3 and on-chain" items={web3} />
      </div>

      {/* ---------- SHEET 5: MUSIC & SOUND WORK ---------- */}
      <div className="sheet sheet-alt">
        <WorkBlock title="Music and sound" items={music} />
      </div>

      {/* ---------- SHEET 6: PORTRAIT ---------- */}
      <div className="sheet">
        <Portrait />
      </div>
    </Deck>
  );
}

function WorkBlock({
  title,
  items,
}: {
  title: string;
  items: Project[];
}) {
  return (
    <section className="wrap" style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <h2>{title}</h2>
        <Link href="/projects" className="mono link" style={{ fontSize: "var(--fs-sm)" }}>
          view all
        </Link>
      </div>

      <Reveal style={{ marginTop: 24 }} y={16} stagger={0.07}>
        {items.map((p) => (
          <ProjectRow key={p.slug} project={p} />
        ))}
      </Reveal>
      <div style={{ borderTop: "1px solid var(--line)" }} />
    </section>
  );
}
