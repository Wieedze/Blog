"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Global smooth scroll (Lenis) synced with GSAP ScrollTrigger. Renders nothing;
// it just drives window scroll. Disabled under prefers-reduced-motion so the
// page keeps native scroll for users who ask for less motion.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    // Expose the instance for programmatic jumps (useScrollytelling's
    // jumpTo), so they glide through Lenis instead of fighting it.
    const w = window as unknown as { __lenis?: Lenis };
    w.__lenis = lenis;

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      delete w.__lenis;
      lenis.destroy();
    };
  }, []);

  return null;
}
