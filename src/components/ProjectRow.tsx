import Link from "next/link";
import type { CSSProperties } from "react";
import { statusLabel, type Project } from "@/lib/projects";
import SitePreview from "@/components/SitePreview";

// Editorial list row (home work blocks). Name and tagline lead; the stack
// reads as a quiet left-aligned mono line under them; the right column
// carries only short strings (status + year). The row is a fixed-column
// grid (.project-row-grid) so previews and meta stay aligned across rows,
// with an empty middle cell when a project has no preview.
export default function ProjectRow({
  project: p,
  className,
  style,
}: {
  project: Project;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className={className}
      style={{
        display: "block",
        borderTop: "1px solid var(--line)",
        padding: "28px 0",
        ...style,
      }}
    >
      <div className="project-row-grid">
        <div>
          <h3>{p.name}</h3>
          <p style={{ color: "var(--ink-soft)", marginTop: 6, maxWidth: "72ch" }}>
            {p.tagline}
          </p>
          {p.stack.length > 0 && (
            <p className="stack-line" style={{ marginTop: 12 }}>
              {p.stack.join(" · ")}
            </p>
          )}
        </div>
        {p.preview ? (
          <SitePreview url={p.preview} title={`${p.name}, live site`} />
        ) : (
          <div aria-hidden />
        )}
        <div style={{ textAlign: "right" }}>
          <span
            className={
              p.status === "live" ? "status-word is-strong" : "status-word"
            }
          >
            {statusLabel[p.status]}
          </span>
          <div
            className="mono"
            style={{ fontSize: "var(--fs-xs)", color: "var(--ink-faint)", marginTop: 6 }}
          >
            {p.year}
          </div>
        </div>
      </div>
    </Link>
  );
}
