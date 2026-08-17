"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { timeline } from "@/lib/timeline";
import PinnedSection from "@/components/PinnedSection";

// Milestones list. Desktop: PinnedSection pins the header and scrolls the
// rows through the frame. Small screens keep the stacked flow with the
// per-row reveal below (tl-ready / IntersectionObserver).
export default function Timeline() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Desktop is the pinned scroll: rows stay visible, nothing to reveal.
    if (window.matchMedia("(min-width: 768px)").matches) return;

    list.classList.add("tl-ready");
    const rows = Array.from(list.querySelectorAll<HTMLElement>(".tl-row"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <PinnedSection
      header={
        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 28 }}>
          <p className="eyebrow">The timeline</p>
          <h2 style={{ marginTop: 8 }}>Milestones</h2>
        </div>
      }
    >
      <div ref={listRef} className="tl">
        {timeline.map((m, i) => (
          <div
            key={i}
            className="tl-row"
            style={{
              display: "flex",
              gap: 20,
              borderTop: "1px solid var(--line)",
              padding: "20px 0",
              flexWrap: "wrap",
            }}
          >
            <div
              className="mono tl-year"
              style={{ fontSize: "var(--fs-sm)", color: "var(--accent)", minWidth: 76 }}
            >
              {m.year}
            </div>
            <div style={{ flex: "1 1 440px" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
                <h3>
                  {m.link ? (
                    <Link href={m.link} className="link">
                      {m.title}
                    </Link>
                  ) : (
                    m.title
                  )}
                </h3>
                <span className="mono" style={{ fontSize: "var(--fs-xs)", color: "var(--ink-faint)" }}>
                  {m.context}
                </span>
              </div>
              <p style={{ color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.65 }}>
                {m.body}
              </p>
            </div>
          </div>
        ))}
        <div style={{ borderTop: "1px solid var(--line)" }} />
      </div>
    </PinnedSection>
  );
}
