"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  y?: number;
  stagger?: number;
  start?: string;
  className?: string;
  style?: CSSProperties;
};

// Reveals its DIRECT children on scroll: staggered fade + slide up.
// Uses gsap.from, so if JS never runs the children stay at their natural
// (visible) state. No-ops under prefers-reduced-motion.
export default function Reveal({
  children,
  y = 28,
  stagger = 0.1,
  start = "top 82%",
  className,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const el = ref.current;
      if (!el || el.children.length === 0) return;
      gsap.from(el.children, {
        opacity: 0,
        y,
        duration: 0.8,
        ease: "power3.out",
        stagger,
        scrollTrigger: { trigger: el, start },
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
