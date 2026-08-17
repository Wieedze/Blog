import Link from "next/link";
import { projects, type Project } from "@/lib/projects";
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
        <section className="wrap">
          <p className="eyebrow rise d1">Maxime Saint-Joannis</p>
          <h1 className="rise d2" style={{ marginTop: 18, maxWidth: "14ch" }}>
            Let&apos;s build,
            <span style={{ color: "var(--accent)" }}> in public.</span>
          </h1>
          <p
            className="rise d3"
            style={{
              marginTop: 28,
              maxWidth: "68ch",
              fontSize: "1.2rem",
              color: "var(--ink-soft)",
              lineHeight: 1.6,
            }}
          >
            Full-stack and web3 developer.
          </p>
          <p
            className="rise d3 mono"
            style={{
              marginTop: 20,
              maxWidth: "68ch",
              fontSize: ".92rem",
              color: "var(--ink-faint)",
            }}
          >
            Not an expert, an experimenter. I build in the open and write it down as it happens.
          </p>

          <div
            className="rise d4"
            style={{ marginTop: 40, display: "flex", gap: 18, flexWrap: "wrap" }}
          >
            <Link
              href="/projects"
              className="mono"
              style={{
                background: "var(--ink)",
                color: "var(--bg)",
                padding: "13px 26px",
                borderRadius: "var(--radius)",
                fontSize: ".9rem",
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
        <h2 style={{ fontSize: "1.6rem" }}>{title}</h2>
        <Link href="/projects" className="mono link" style={{ fontSize: ".85rem" }}>
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
