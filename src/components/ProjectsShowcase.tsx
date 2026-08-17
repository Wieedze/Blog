"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { statusLabel, type Project } from "@/lib/projects";
import ScrollyRail from "./ScrollyRail";
import SitePreview from "./SitePreview";
import { useScrollytelling } from "./useScrollytelling";

// One block per project, same scrollytelling mechanic as Story (How I got
// here): the stage pins and each project holds the screen, then crossfades
// into the next as you scroll. A panel carries the status and year, the
// name, the short description, the stack line and a live preview of the
// site; the whole panel links to the project's detail page. Without JS,
// with reduced motion, or on small screens the panels render as a normal
// stacked column.
export default function ProjectsShowcase({
  title,
  blurb,
  items,
}: {
  title: string;
  blurb?: string;
  items: Project[];
}) {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [railOn, setRailOn] = useState(false);
  const { jumpTo } = useScrollytelling(rootRef, {
    onIndex: setActive,
    onActive: setRailOn,
  });

  return (
    <section ref={rootRef} className="wrap" style={{ paddingTop: 24, width: "100%" }}>
      <div className="story-track">
        <div className="story-stage">
          {/* Header inverted to the right, like Story: the panels below stay
              left, so the title answers the body across the page's diagonal. */}
          <div
            style={{ borderTop: "1px solid var(--line)", paddingTop: 28, textAlign: "right" }}
          >
            <h2>{title}</h2>
            {blurb && (
              <p
                className="mono"
                style={{
                  marginTop: 10,
                  marginLeft: "auto",
                  maxWidth: "58ch",
                  fontSize: "var(--fs-sm)",
                  color: "var(--ink-faint)",
                }}
              >
                {blurb}
              </p>
            )}
          </div>

          <div className="story-panels">
            {items.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="story-panel"
                style={{ display: "block" }}
              >
                <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "center" }}>
                  <div style={{ flex: "1 1 360px", maxWidth: "74ch" }}>
                    <div
                      style={{ display: "flex", gap: 14, alignItems: "baseline", flexWrap: "wrap" }}
                    >
                      <span
                        className={
                          p.status === "live" ? "status-word is-strong" : "status-word"
                        }
                      >
                        {statusLabel[p.status]}
                      </span>
                      <span
                        className="mono"
                        style={{ fontSize: "var(--fs-xs)", color: "var(--ink-faint)" }}
                      >
                        {p.year}
                      </span>
                    </div>
                    {/* Panel = the star of a full screen: section-size name,
                        lede-size description. */}
                    <h3 style={{ fontSize: "var(--fs-h2)", marginTop: 10 }}>{p.name}</h3>
                    <p
                      style={{
                        fontSize: "var(--fs-lede)",
                        color: "var(--ink-soft)",
                        marginTop: 12,
                        lineHeight: 1.6,
                        maxWidth: "56ch",
                      }}
                    >
                      {p.tagline}
                    </p>
                    {p.stack.length > 0 && (
                      <p className="stack-line" style={{ marginTop: 14 }}>
                        {p.stack.join(" · ")}
                      </p>
                    )}
                    <span
                      className="mono link"
                      style={{
                        display: "inline-block",
                        marginTop: 18,
                        fontSize: "var(--fs-sm)",
                      }}
                    >
                      View project →
                    </span>
                  </div>
                  {p.preview && (
                    <SitePreview
                      url={p.preview}
                      title={`${p.name}, live site`}
                      style={{
                        flex: "1 1 440px",
                        maxWidth: 600,
                        width: "100%",
                      }}
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <ScrollyRail
        items={items.map((p) => ({ key: p.slug, label: p.name }))}
        active={active}
        visible={railOn}
        onJump={jumpTo}
        label={`${title} projects`}
      />
    </section>
  );
}
