"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Hero entrance, one timeline: "Let's build," lands first, slow and fluid;
// "in public." slides in from the side; the nav drops from the top a beat
// early to catch the eye (hero:eyebrow event); then lede, tagline, eyebrow
// and scroll cue answer by rising from below as one synchronized movement
// (no buttons: the next sheet is the call to action, so the hero points down).
// gsap.from throughout, so without JS everything stays at its natural
// visible state. Skipped entirely under prefers-reduced-motion.
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const el = ref.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        // 1. "Let's build," alone, slow and fluid.
        .from(q("[data-hero='build']"), { opacity: 0, y: 34, duration: 1.4 })
        // 2. "in public." slides in from the side to complete the phrase.
        .from(q("[data-hero='public']"), { opacity: 0, x: 36, duration: 1 }, "-=0.25")
        // 3. The nav leads by a quarter second: its downward drop catches the
        //    eye first (it listens for this beat, same 0.9s cubic-out in CSS).
        .call(() => window.dispatchEvent(new Event("hero:eyebrow")), undefined, "+=0.1")
        // 4. Then the answering move: lede, tagline, eyebrow and scroll cue
        //    rise from below as ONE tween (same rise, duration and ease, no
        //    stagger), the eyebrow coming up to underline the title.
        .from(
          q(
            "[data-hero='lede'], [data-hero='tagline'], [data-hero='eyebrow'], [data-hero='cue']"
          ),
          { opacity: 0, y: 14, duration: 0.9 },
          "+=0.25"
        )
        // The arrow keeps a slow bob once everything is in place.
        .to(q("[data-hero='arrow']"), {
          y: 7,
          duration: 0.9,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
        });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="wrap">
      <p data-hero="eyebrow" className="eyebrow">
        Maxime Saint-Joannis
      </p>
      <h1 style={{ marginTop: 18, maxWidth: "14ch" }}>
        {/* inline-block: transforms don't apply to inline elements */}
        <span data-hero="build" style={{ display: "inline-block" }}>
          Let&apos;s build,
        </span>{" "}
        <span
          data-hero="public"
          style={{ display: "inline-block", color: "var(--accent)" }}
        >
          in public.
        </span>
      </h1>
      <p
        data-hero="lede"
        style={{
          marginTop: 28,
          maxWidth: "68ch",
          fontSize: "var(--fs-lede)",
          color: "var(--ink-soft)",
          lineHeight: 1.6,
        }}
      >
        Full-stack and web3 developer.
      </p>
      <p
        data-hero="tagline"
        className="mono"
        style={{
          marginTop: 20,
          maxWidth: "68ch",
          fontSize: "var(--fs-sm)",
          color: "var(--ink-faint)",
        }}
      >
        Not an expert, an experimenter. I build in the open and write it down as it happens.
      </p>

      <div
        data-hero="cue"
        className="mono"
        style={{
          marginTop: 64,
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: "var(--fs-xs)",
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color: "var(--ink-faint)",
        }}
      >
        <span data-hero="arrow" style={{ display: "inline-block" }}>
          ↓
        </span>
        scroll
      </div>
    </section>
  );
}
