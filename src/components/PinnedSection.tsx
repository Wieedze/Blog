"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Generic pinned section: on desktop the header stays fixed while the content
// scrolls through the clipped frame below it. No fades, just the scroll. The
// pin lasts exactly as long as the hidden part of the content. Progress is
// rect-driven with a lerp (same approach as Story.tsx), so it stays correct
// inside the deck's sticky sheets and under smooth scroll. Small screens,
// no-JS and reduced motion keep the normal stacked flow.
export default function PinnedSection({
  header,
  children,
  gap = 28,
}: {
  header: ReactNode;
  children: ReactNode;
  gap?: number;
}) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const track = root.querySelector<HTMLElement>(".pin-track");
    const frame = root.querySelector<HTMLElement>(".pin-frame");
    const list = root.querySelector<HTMLElement>(".pin-list");
    if (!track || !frame || !list) return;

    root.classList.add("pin-ready");

    const overflow = () => Math.max(0, list.offsetHeight - frame.clientHeight);
    // The pin lasts exactly as long as the hidden part of the list.
    const sizeTrack = () => {
      track.style.height = `${window.innerHeight + overflow()}px`;
    };
    sizeTrack();
    const ro = new ResizeObserver(sizeTrack);
    ro.observe(list);
    ro.observe(frame);

    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
    let current = -1;
    let raf = 0;
    const tick = () => {
      const range = track.offsetHeight - window.innerHeight;
      const raw = range > 0 ? clamp01(-track.getBoundingClientRect().top / range) : 0;
      const target = raw * overflow();
      current = current < 0 ? target : current + (target - current) * 0.14;
      if (Math.abs(target - current) < 0.5) current = target;
      list.style.transform = `translateY(${-current}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <section ref={rootRef} className="wrap" style={{ paddingTop: 48, width: "100%" }}>
      <div className="pin-track">
        <div className="pin-stage">
          <div>{header}</div>
          <div className="pin-frame" style={{ marginTop: gap }}>
            <div className="pin-list">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
