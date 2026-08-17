"use client";

import { useEffect, useRef } from "react";
import { story } from "@/lib/story";

// Scrollytelling: the stage pins (native sticky) for the height of the track
// and each chapter holds the screen, then crossfades into the next with a
// slight scale-back. The progress is read every frame from the track's live
// on-screen position, so it stays correct inside the deck's sticky sheets and
// under Lenis smooth scroll (no ScrollTrigger position caching involved).
// Gated behind the `story-ready` class: without JS, with reduced motion, or
// on small screens the chapters render as the normal stacked column.
export default function Story() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Small screens keep the stacked flow: a pinned 100svh stage cannot
    // guarantee a full chapter fits above the fold there.
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const track = root.querySelector<HTMLElement>(".story-track");
    const holder = root.querySelector<HTMLElement>(".story-panels");
    const panels = Array.from(root.querySelectorAll<HTMLElement>(".story-panel"));
    if (!track || !holder || panels.length < 2) return;

    root.classList.add("story-ready");
    track.style.height = `${panels.length * 110}svh`;

    // Absolute panels keep their natural height; size the holder to the
    // tallest one so the pinned stage never shifts between chapters.
    const sizeHolder = () => {
      holder.style.height = `${Math.max(...panels.map((p) => p.offsetHeight))}px`;
    };
    sizeHolder();
    const ro = new ResizeObserver(sizeHolder);
    panels.forEach((p) => ro.observe(p));

    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
    const smooth = (t: number) => t * t * (3 - 2 * t);
    const segments = panels.length - 1;
    // Share of each segment spent holding the chapter before its transition.
    const HOLD = 0.45;
    // Finish the last transition at 85% of the pin so the final chapter also
    // gets a beat on screen before the next sheet slides over.
    const TAIL = 0.85;

    // Warped progress: within each segment, hold first, then ease through.
    const warp = (p: number) => {
      const u = p * segments;
      const i = Math.min(Math.floor(u), segments - 1);
      const f = u - i;
      return i + smooth(clamp01((f - HOLD) / (1 - HOLD)));
    };

    // Each fade completes within FADE of the inter-chapter distance, so the
    // stretch between 2 * FADE and 1 is a quiet beat where the outgoing
    // chapter is already gone and the next one has not appeared yet.
    const FADE = 0.3;

    const apply = (pos: number) => {
      panels.forEach((panel, i) => {
        const d = pos - i;
        const a = 1 - clamp01(Math.abs(d) / FADE);
        const enter = clamp01(clamp01(-d) / FADE);
        const leave = clamp01(clamp01(d) / FADE);
        panel.style.opacity = String(a);
        panel.style.transform = `translateY(${26 * enter - 18 * leave}px) scale(${
          1 + 0.03 * enter - 0.04 * leave
        })`;
        // Keep fully faded panels out of hit-testing and selection.
        panel.style.visibility = a === 0 ? "hidden" : "visible";
      });
    };

    // Rect-driven with a lerp: the target comes from the live geometry, the
    // rendered value glides toward it, so wheel ticks never snap.
    let current = -1;
    let raf = 0;
    const tick = () => {
      const range = track.offsetHeight - window.innerHeight;
      const raw = range > 0 ? clamp01(-track.getBoundingClientRect().top / range) : 0;
      const target = warp(clamp01(raw / TAIL));
      current = current < 0 ? target : current + (target - current) * 0.14;
      if (Math.abs(target - current) < 0.001) current = target;
      apply(current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

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
    </section>
  );
}
