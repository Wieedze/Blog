"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { timeline } from "@/lib/timeline";

function clean(value: string): string {
  return value && !value.startsWith("TODO") ? value : "";
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const rows = Array.from(container.querySelectorAll<HTMLElement>(".tl-row"));

    // Reduced motion: show everything at once, no animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rows.forEach((r) => r.classList.add("in"));
      return;
    }

    // Enable the hidden-start CSS only now (so no-JS keeps content visible),
    // then reveal each row as it scrolls into view.
    container.classList.add("tl-ready");
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
    <section className="wrap" style={{ paddingTop: 48 }}>
      <div style={{ borderTop: "1px solid var(--line)", paddingTop: 28 }}>
        <p className="eyebrow">The timeline</p>
        <h2 style={{ fontSize: "1.6rem", marginTop: 8 }}>Milestones</h2>

        <div ref={containerRef} className="tl" style={{ marginTop: 28 }}>
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
                style={{ fontSize: ".9rem", color: "var(--accent)", minWidth: 76 }}
              >
                {clean(m.year)}
              </div>
              <div style={{ flex: "1 1 440px" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: "1.25rem" }}>
                    {m.link ? (
                      <Link href={m.link} className="link">
                        {m.title}
                      </Link>
                    ) : (
                      m.title
                    )}
                  </h3>
                  <span className="mono" style={{ fontSize: ".72rem", color: "var(--ink-faint)" }}>
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
      </div>
    </section>
  );
}
