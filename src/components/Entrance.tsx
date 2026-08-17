"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Page entrance as one quick timeline, driven by data-entrance="1|2|3…"
// markers: beat 1 lands first, each next beat follows right behind.
// data-entrance-fade: opacity only, no slide (eyebrows sitting above the
// title would look shifted if they moved). data-entrance-items: animate the
// element's direct children instead, with a light cascade (list rows).
// gsap.from throughout, so without JS everything keeps its natural visible
// state. Skipped entirely under prefers-reduced-motion. The home hero keeps
// its own slower timeline: this one serves every other page.
export default function Entrance({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const el = ref.current;
      if (!el) return;

      const beats = new Map<number, HTMLElement[]>();
      el.querySelectorAll<HTMLElement>("[data-entrance]").forEach((node) => {
        const beat = Number(node.dataset.entrance);
        if (!beats.has(beat)) beats.set(beat, []);
        beats.get(beat)!.push(node);
      });
      if (beats.size === 0) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      [...beats.keys()]
        .sort((a, b) => a - b)
        .forEach((beat, i) => {
          const movers: Element[] = [];
          const faders: Element[] = [];
          beats.get(beat)!.forEach((node) => {
            const bucket = node.hasAttribute("data-entrance-fade") ? faders : movers;
            if (node.hasAttribute("data-entrance-items")) bucket.push(...Array.from(node.children));
            else bucket.push(node);
          });

          const pos = i === 0 ? 0.03 : "-=0.3";
          if (movers.length) {
            tl.from(
              movers,
              {
                opacity: 0,
                y: i === 0 ? 22 : 12,
                duration: i === 0 ? 0.6 : 0.5,
                stagger: 0.05,
              },
              pos
            );
          }
          if (faders.length) {
            tl.from(
              faders,
              { opacity: 0, duration: 0.45, ease: "power1.inOut" },
              movers.length ? "<" : pos
            );
          }
        });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
