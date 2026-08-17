import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, statusLabel } from "@/lib/projects";
import SitePreview from "@/components/SitePreview";

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
        style={{ fontSize: "var(--fs-sm)", color: "var(--ink-faint)" }}
      >
        ← projects
      </Link>

      <div className="rise d1" style={{ marginTop: 28 }}>
        <p className="eyebrow">{statusLabel[p.status]} · {p.year}</p>
        <h1 style={{ marginTop: 12 }}>{p.name}</h1>
        <p
          style={{
            fontSize: "var(--fs-lede)",
            color: "var(--ink-soft)",
            marginTop: 14,
          }}
        >
          {p.tagline}
        </p>
      </div>

      {p.preview && (
        <a
          href={p.preview}
          target="_blank"
          rel="noreferrer"
          className="rise d2"
          style={{ display: "block", marginTop: 36 }}
        >
          <SitePreview url={p.preview} title={`${p.name}, live site`} />
          <p
            className="mono"
            style={{ marginTop: 10, fontSize: "var(--fs-xs)", color: "var(--ink-faint)" }}
          >
            {new URL(p.preview).hostname} ↗
          </p>
        </a>
      )}

      <div
        className="rise d2"
        style={{ marginTop: 36, fontSize: "var(--fs-prose)", color: "var(--ink-soft)" }}
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

      <div className="rise d4 facts" style={{ marginTop: 44 }}>
        {p.stack.length > 0 && (
          <div className="facts-row">
            <span className="facts-label">Stack</span>
            <span className="facts-value">{p.stack.join(" · ")}</span>
          </div>
        )}
        <div className="facts-row">
          <span className="facts-label">Role</span>
          <span className="facts-value">{p.role}</span>
        </div>
        <div className="facts-row">
          <span className="facts-label">Year</span>
          <span className="facts-value">{p.year}</span>
        </div>
      </div>

      {p.links.length > 0 && (
        <div style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
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
                fontSize: "var(--fs-sm)",
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
