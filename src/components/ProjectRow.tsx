import Link from "next/link";
import type { CSSProperties } from "react";
import { statusLabel, type Project } from "@/lib/projects";

// Editorial list row shared by the home work blocks and /projects.
// Name and tagline lead; the stack reads as a quiet left-aligned mono line
// under them; the right column carries only short strings (status + year)
// so nothing ever wraps into a block.
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
      <div
        style={{
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <div style={{ flex: "1 1 380px" }}>
          <h3 style={{ fontSize: "1.5rem" }}>{p.name}</h3>
          <p style={{ color: "var(--ink-soft)", marginTop: 6, maxWidth: "72ch" }}>
            {p.tagline}
          </p>
          {p.stack.length > 0 && (
            <p className="stack-line" style={{ marginTop: 12 }}>
              {p.stack.join(" · ")}
            </p>
          )}
        </div>
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
            style={{ fontSize: ".78rem", color: "var(--ink-faint)", marginTop: 6 }}
          >
            {p.year}
          </div>
        </div>
      </div>
    </Link>
  );
}
