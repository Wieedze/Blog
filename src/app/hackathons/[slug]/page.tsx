import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hackathons, resultLabel } from "@/lib/hackathons";

export function generateStaticParams() {
  return hackathons.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const h = hackathons.find((x) => x.slug === slug);
  if (!h) return {};
  return { title: `${h.project} · ${h.event}`, description: h.pitch };
}

// Hide TODO placeholders from the meta line so the page stays readable.
function clean(value?: string): string {
  return value && !value.startsWith("TODO") ? value : "";
}

const linkLabels: Record<string, string> = {
  repo: "Repo",
  demo: "Demo",
  showcase: "Showcase",
};

export default async function HackathonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const h = hackathons.find((x) => x.slug === slug);
  if (!h) notFound();

  const meta = [h.event, clean(h.city), clean(h.date), clean(h.duration)]
    .filter(Boolean)
    .join(" · ");
  const team = h.team.filter((t) => !t.startsWith("TODO"));
  const links = Object.entries(h.links).filter(([, url]) => url && !url.startsWith("TODO"));

  return (
    <article className="prose-wrap" style={{ paddingTop: 72 }}>
      <Link
        href="/hackathons"
        className="mono link"
        style={{ fontSize: ".85rem", color: "var(--ink-faint)" }}
      >
        ← hackathons
      </Link>

      <div className="rise d1" style={{ marginTop: 28 }}>
        <p className="eyebrow">
          {resultLabel[h.result]}
          {h.prize ? ` · ${h.prize}` : ""}
        </p>
        <h1 style={{ marginTop: 12 }}>{h.project}</h1>
        <p style={{ fontSize: "1.25rem", color: "var(--ink-soft)", marginTop: 14 }}>
          {h.pitch}
        </p>
        <p
          className="mono"
          style={{ fontSize: ".82rem", color: "var(--ink-faint)", marginTop: 16 }}
        >
          {meta}
        </p>
      </div>

      {/* What I learned: the differentiator, kept up top. */}
      <div
        className="rise d2"
        style={{
          marginTop: 36,
          borderLeft: "2px solid var(--accent)",
          background: "var(--bg-raised)",
          padding: "18px 22px",
          borderRadius: "var(--radius)",
        }}
      >
        <p className="eyebrow">What I learned</p>
        <p style={{ marginTop: 10, color: "var(--ink-soft)", lineHeight: 1.6 }}>
          {h.learned}
        </p>
      </div>

      <div className="rise d3" style={{ marginTop: 36 }}>
        <p className="eyebrow">Stack</p>
        <div
          className="mono"
          style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}
        >
          {h.stack.map((s) => (
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

      {(team.length > 0 || h.sponsors.length > 0) && (
        <div
          className="rise d4"
          style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 48 }}
        >
          {team.length > 0 && (
            <div>
              <p className="eyebrow">Team</p>
              <p style={{ marginTop: 10, color: "var(--ink-soft)" }}>
                {team.join(", ")}
              </p>
            </div>
          )}
          {h.sponsors.length > 0 && (
            <div>
              <p className="eyebrow">Tracks</p>
              <p style={{ marginTop: 10, color: "var(--ink-soft)" }}>
                {h.sponsors.join(", ")}
              </p>
            </div>
          )}
        </div>
      )}

      {links.length > 0 && (
        <div style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
          {links.map(([kind, url]) => (
            <a
              key={kind}
              href={url}
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
              {linkLabels[kind] ?? kind} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
