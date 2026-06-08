import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, statusLabel } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.name, description: p.tagline };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <article className="prose-wrap" style={{ paddingTop: 72 }}>
      <Link
        href="/projects"
        className="mono link"
        style={{ fontSize: ".85rem", color: "var(--ink-faint)" }}
      >
        ← projects
      </Link>

      <div className="rise d1" style={{ marginTop: 28 }}>
        <p className="eyebrow">{statusLabel[p.status]} · {p.year}</p>
        <h1 style={{ marginTop: 12 }}>{p.name}</h1>
        <p
          style={{
            fontSize: "1.25rem",
            color: "var(--ink-soft)",
            marginTop: 14,
          }}
        >
          {p.tagline}
        </p>
      </div>

      <div
        className="rise d2"
        style={{ marginTop: 36, fontSize: "1.08rem", color: "var(--ink-soft)" }}
      >
        {p.description}
      </div>

      <div className="rise d3" style={{ marginTop: 40 }}>
        <p className="eyebrow">Highlights</p>
        <ul style={{ marginTop: 14, paddingLeft: "1.2rem", color: "var(--ink-soft)" }}>
          {p.highlights.map((h) => (
            <li key={h} style={{ marginTop: 6 }}>
              {h}
            </li>
          ))}
        </ul>
      </div>

      <div className="rise d4" style={{ marginTop: 36 }}>
        <p className="eyebrow">Stack</p>
        <div
          className="mono"
          style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}
        >
          {p.stack.map((s) => (
            <span
              key={s}
              style={{
                fontSize: ".78rem",
                padding: "5px 11px",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius)",
                background: "var(--bg-raised)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="rise d5" style={{ marginTop: 36 }}>
        <p className="eyebrow">My role</p>
        <p style={{ marginTop: 10, color: "var(--ink-soft)" }}>{p.role}</p>
      </div>

      {p.links.length > 0 && (
        <div style={{ marginTop: 40, display: "flex", gap: 16 }}>
          {p.links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="mono"
              style={{
                background: "var(--ink)",
                color: "var(--bg)",
                padding: "11px 22px",
                borderRadius: "var(--radius)",
                fontSize: ".85rem",
              }}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
