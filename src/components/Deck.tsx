"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Stacked sheets: each direct `.sheet` child pins at the top of the viewport
// and the next one slides over it (position: sticky, later siblings paint on
// top). Sheets taller than the viewport get a negative sticky top so all
// their content scrolls through before they pin (top = viewport - height).
// Without JS nothing pins (no `top` is set) and the page reads as normal flow.
export default function Deck({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deck = ref.current;
    if (!deck) return;
    const sheets = Array.from(deck.querySelectorAll<HTMLElement>(":scope > .sheet"));
    if (sheets.length === 0) return;

    const setTops = () => {
      const vh = window.innerHeight;
      sheets.forEach((s) => {
        s.style.top = `${Math.min(0, vh - s.offsetHeight)}px`;
      });
    };
    setTops();

    const ro = new ResizeObserver(() => {
      setTops();
      ScrollTrigger.refresh();
    });
    sheets.forEach((s) => ro.observe(s));
    window.addEventListener("resize", setTops);

    // Recede: while the next sheet slides over, the covered one dims toward
    // the paper color (::after veil) and shrinks a hair. The sticky stacking
    // itself is native scroll, so under prefers-reduced-motion only this
    // embellishment is skipped.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;
      sheets.slice(1).forEach((sheet, i) => {
        gsap.fromTo(
          sheets[i],
          { "--veil": 0, scale: 1 },
          {
            "--veil": 0.5,
            scale: 0.96,
            ease: "none",
            scrollTrigger: {
              trigger: sheet,
              start: "top bottom",
              end: "top top",
              scrub: true,
              // Flag covered sheets so fixed overlays inside them (the
              // project jump rail) can fade out as the next sheet arrives.
              onUpdate: (self) => {
                sheets[i].classList.toggle("is-covered", self.progress > 0.06);
              },
            },
          }
        );
      });
    }, deck);

    return () => {
      ctx.revert();
      ro.disconnect();
      window.removeEventListener("resize", setTops);
    };
  }, []);

  return (
    <div ref={ref} className="deck">
      {children}
    </div>
  );
}
