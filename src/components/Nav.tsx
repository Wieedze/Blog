"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Auto-hiding nav. On the home the first reveal is synchronized with the
// hero's closing beat (hero:eyebrow event, timeout as a safety net), so the
// nav, the eyebrow, the lede, the tagline and the scroll cue all land
// together; elsewhere it shows right away. After that it hides while
// scrolling down and comes back on scroll up, near the page top, or when the
// pointer reaches the top edge. Reduced motion keeps it permanently visible.
export default function Nav() {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let entered = true;
    let timer: number | undefined;
    const enter = () => {
      entered = true;
      setVisible(true);
    };

    // Entrance: only delay when the hero is on the page and we're at the top
    // (fresh load; scroll restoration further down shows the nav directly).
    if (document.querySelector("[data-hero='public']") && window.scrollY <= 40) {
      entered = false;
      setVisible(false);
      window.addEventListener("hero:eyebrow", enter, { once: true });
      timer = window.setTimeout(enter, 3500);
    }

    lastY.current = window.scrollY;
    const onScroll = () => {
      if (!entered) return;
      const y = window.scrollY;
      const dy = y - lastY.current;
      lastY.current = y;
      if (y < 90) setVisible(true);
      else if (dy > 6) setVisible(false);
      else if (dy < -6) setVisible(true);
    };
    const onPointer = (e: PointerEvent) => {
      if (entered && e.clientY < 72) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("hero:eyebrow", enter);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  return (
    <header
      style={{
        borderBottom: "1px solid var(--line)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "color-mix(in srgb, var(--bg) 88%, transparent)",
        backdropFilter: "blur(8px)",
        transform: visible ? "translateY(0)" : "translateY(-101%)",
        opacity: visible ? 1 : 0,
        /* Same duration AND same curve as the hero's closing tween
           (GSAP power3.out ≈ this cubic-out bezier), so the nav lands
           in sync with the eyebrow, lede, tagline and scroll cue. */
        transition:
          "transform .9s cubic-bezier(0.215, 0.61, 0.355, 1), opacity .9s cubic-bezier(0.215, 0.61, 0.355, 1)",
      }}
    >
      <nav
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 68,
        }}
      >
        <Link
          href="/"
          className="mono"
          style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          Wieedze<span style={{ color: "var(--accent)" }}>.</span>
        </Link>
        <div
          style={{ display: "flex", gap: 22, fontSize: "var(--fs-sm)", alignItems: "center" }}
          className="mono"
        >
          <Link href="/hackathons" className="link">hackathons</Link>
          <Link href="/projects" className="link">projects</Link>
          <Link href="/journal" className="link">journal</Link>
          <Link href="/now" className="link">now</Link>
          <Link href="/activity" className="link">activity</Link>
          <Link
            href="/contact"
            className="link"
            style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
          >
            contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
