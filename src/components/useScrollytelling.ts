"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";

// Shared scrollytelling mechanic (Story, ProjectsShowcase): the .story-stage
// pins (native sticky) for the height of the .story-track and each
// .story-panel holds the screen, then crossfades into the next with a slight
// scale-back. The progress is read every frame from the track's live
// on-screen position, so it stays correct inside the deck's sticky sheets and
// under Lenis smooth scroll (no ScrollTrigger position caching involved).
// Gated behind the `story-ready` class: without JS, with reduced motion, or
// on small screens the panels render as the normal stacked column.
// opts.onIndex reports the panel currently held; opts.onActive reports
// whether this section owns the screen (track spans the viewport middle and
// its sheet is not covered by the next one), which drives the jump rail.

// Share of each segment spent holding the panel before its transition.
const HOLD = 0.45;
// Finish the last transition at 85% of the pin so the final panel also gets
// a beat on screen before the next sheet slides over.
const TAIL = 0.85;
// Each fade completes within FADE of the inter-panel distance, so the
// stretch between 2 * FADE and 1 is a quiet beat where the outgoing panel
// is already gone and the next one has not appeared yet.
const FADE = 0.3;

export function useScrollytelling(
  rootRef: RefObject<HTMLElement | null>,
  opts?: { onIndex?: (index: number) => void; onActive?: (active: boolean) => void }
) {
  // Latest callbacks without retriggering the effect.
  const onIndexRef = useRef(opts?.onIndex);
  onIndexRef.current = opts?.onIndex;
  const onActiveRef = useRef(opts?.onActive);
  onActiveRef.current = opts?.onActive;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Small screens keep the stacked flow: a pinned 100svh stage cannot
    // guarantee a full panel fits above the fold there.
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const track = root.querySelector<HTMLElement>(".story-track");
    const holder = root.querySelector<HTMLElement>(".story-panels");
    const panels = Array.from(root.querySelectorAll<HTMLElement>(".story-panel"));
    if (!track || !holder || panels.length < 2) return;

    root.classList.add("story-ready");
    track.style.height = `${panels.length * 110}svh`;

    // Absolute panels keep their natural height; size the holder to the
    // tallest one so the pinned stage never shifts between panels.
    const sizeHolder = () => {
      holder.style.height = `${Math.max(...panels.map((p) => p.offsetHeight))}px`;
    };
    sizeHolder();
    const ro = new ResizeObserver(sizeHolder);
    panels.forEach((p) => ro.observe(p));

    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
    const smooth = (t: number) => t * t * (3 - 2 * t);
    const segments = panels.length - 1;

    // Warped progress: within each segment, hold first, then ease through.
    const warp = (p: number) => {
      const u = p * segments;
      const i = Math.min(Math.floor(u), segments - 1);
      const f = u - i;
      return i + smooth(clamp01((f - HOLD) / (1 - HOLD)));
    };

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
    let lastIdx = -1;
    let lastActive = false;
    let raf = 0;
    const tick = () => {
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const range = track.offsetHeight - vh;
      const raw = range > 0 ? clamp01(-rect.top / range) : 0;
      const target = warp(clamp01(raw / TAIL));
      current = current < 0 ? target : current + (target - current) * 0.14;
      if (Math.abs(target - current) < 0.001) current = target;
      apply(current);

      const idx = Math.round(current);
      if (idx !== lastIdx) {
        lastIdx = idx;
        onIndexRef.current?.(idx);
      }
      const covered = root.closest(".sheet")?.classList.contains("is-covered") ?? false;
      const active = !covered && rect.top < vh * 0.5 && rect.bottom > vh * 0.5;
      if (active !== lastActive) {
        lastActive = active;
        onActiveRef.current?.(active);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      onActiveRef.current?.(false);
    };
  }, [rootRef]);

  // Scroll so panel `index` sits fully shown (middle of its hold beat).
  // Goes through Lenis when it drives the scroll, so the glide matches the
  // rest of the site.
  const jumpTo = useCallback(
    (index: number) => {
      const root = rootRef.current;
      const track = root?.querySelector<HTMLElement>(".story-track");
      const count = root ? root.querySelectorAll(".story-panel").length : 0;
      if (!root || !track || count < 2) return;
      const range = track.offsetHeight - window.innerHeight;
      if (range <= 0) return;
      const p = Math.min(1, (index + HOLD / 2) / (count - 1));
      const top =
        window.scrollY + track.getBoundingClientRect().top + range * p * TAIL;
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } })
        .__lenis;
      if (lenis) lenis.scrollTo(top);
      else window.scrollTo({ top, behavior: "smooth" });
    },
    [rootRef]
  );

  return { jumpTo };
}
