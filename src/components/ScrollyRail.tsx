"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// The jump ladder for a scrollytelling section (Story, ProjectsShowcase):
// one tick per panel, fixed at the middle of the screen's right edge.
// Rendered in a portal on <body> because the deck scales its sheets, and a
// transformed ancestor traps position: fixed; out there the rail stays
// pinned to the viewport no matter what the sheets do. Visibility comes in
// as a prop (from useScrollytelling's onActive), so the rail fades in only
// while its own section holds the screen.
export default function ScrollyRail({
  items,
  active,
  visible,
  onJump,
  label,
}: {
  items: { key: string; label: string }[];
  active: number;
  visible: boolean;
  onJump: (index: number) => void;
  label: string;
}) {
  // Portals need the DOM; render nothing during SSR / first paint.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div className={visible ? "scrolly-rail is-on" : "scrolly-rail"} aria-label={label}>
      {items.map((item, i) => (
        <button
          key={item.key}
          type="button"
          className="scrolly-rail-item"
          data-active={i === active || undefined}
          onClick={() => onJump(i)}
          tabIndex={visible ? 0 : -1}
        >
          <span className="scrolly-rail-label">{item.label}</span>
          <span className="scrolly-rail-tick" />
        </button>
      ))}
    </div>,
    document.body
  );
}
