"use client";

import { useRef, useState } from "react";
import { story } from "@/lib/story";
import ScrollyRail from "./ScrollyRail";
import { useScrollytelling } from "./useScrollytelling";

// Scrollytelling chapters: the shared useScrollytelling hook pins the stage
// and crossfades one chapter into the next as you scroll (same mechanic as
// ProjectsShowcase on /projects), with the shared jump rail at the screen
// edge. Without JS, with reduced motion, or on small screens the chapters
// render as the normal stacked column.
export default function Story() {
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
          {/* Header inverted to the right: the chapters below stay left, so
              the title answers the body across the page's diagonal. */}
          <div
            style={{ borderTop: "1px solid var(--line)", paddingTop: 28, textAlign: "right" }}
          >
            <p className="eyebrow">The story</p>
            <h2 style={{ marginTop: 8 }}>How I got here</h2>
          </div>

          <div className="story-panels">
            {story.map((c) => (
              <div key={c.title} className="story-panel">
                <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 400px", maxWidth: "74ch" }}>
                    <div
                      className="mono"
                      style={{
                        fontSize: "var(--fs-xs)",
                        letterSpacing: ".14em",
                        textTransform: "uppercase",
                        color: "var(--ink-faint)",
                      }}
                    >
                      {c.theme}
                    </div>
                    <h3 style={{ marginTop: 8 }}>{c.title}</h3>
                    <p style={{ color: "var(--ink-soft)", marginTop: 10, lineHeight: 1.65 }}>
                      {c.body}
                    </p>
                    <p style={{ color: "var(--ink-soft)", marginTop: 12, lineHeight: 1.65 }}>
                      {c.detail}
                    </p>
                  </div>
                  {c.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.image.src}
                      alt={c.image.alt}
                      style={{
                        flex: "0 1 320px",
                        alignSelf: "flex-start",
                        maxWidth: 340,
                        width: "100%",
                        height: "auto",
                        border: "1px solid var(--line)",
                        borderRadius: "var(--radius)",
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ScrollyRail
        items={story.map((c) => ({ key: c.title, label: c.title }))}
        active={active}
        visible={railOn}
        onJump={jumpTo}
        label="Story chapters"
      />
    </section>
  );
}
