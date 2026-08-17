"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Page entrance as one timeline, driven by data-entrance="1|2|3…" markers:
// beat 1 lands first, slow, then each next beat follows; elements sharing a
// beat rise together with a light stagger. gsap.from throughout, so without
// JS everything keeps its natural visible state. Skipped entirely under
// prefers-reduced-motion.
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

      const beats = new Map<number, Element[]>();
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
          tl.from(
            beats.get(beat)!,
            {
              opacity: 0,
              y: i === 0 ? 30 : 16,
              duration: i === 0 ? 1.1 : 0.8,
              stagger: 0.08,
            },
            i === 0 ? 0.05 : "-=0.35"
          );
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
