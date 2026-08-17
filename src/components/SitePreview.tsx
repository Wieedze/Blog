"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// Live window on a real site: the page renders at desktop width in a lazy
// iframe, then scales down to fit its frame. Pointer events are off so it
// reads as a living image, not an embed. Only used for sites that allow
// framing (no X-Frame-Options / frame-ancestors), flagged via
// Project.preview in src/lib/projects.ts.
const FRAME_W = 1280;
const FRAME_H = 800;

export default function SitePreview({
  url,
  title,
  className,
  style,
}: {
  url: string;
  title: string;
  className?: string;
  style?: CSSProperties;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / FRAME_W);
    });
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      className={className}
      aria-hidden
      style={{
        aspectRatio: `${FRAME_W} / ${FRAME_H}`,
        overflow: "hidden",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius)",
        background: "var(--bg-raised)",
        ...style,
      }}
    >
      {scale > 0 && (
        <iframe
          src={url}
          title={title}
          loading="lazy"
          tabIndex={-1}
          sandbox="allow-scripts allow-same-origin"
          style={{
            width: FRAME_W,
            height: FRAME_H,
            border: 0,
            display: "block",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
