import type { CSSProperties, ReactNode } from "react";
import Entrance from "./Entrance";

// The uniform page opening, used by every page except the home (which keeps
// its own hero): eyebrow, display title, optional lede, optional aside to
// the right of the header, then the content. One quick entrance for all
// pages: the title lands first, eyebrow and lede fade right behind, then
// the content's direct children cascade in.
export default function PageShell({
  eyebrow,
  eyebrowRight,
  title,
  lede,
  aside,
  children,
  style,
}: {
  eyebrow: ReactNode;
  eyebrowRight?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
}) {
  const header = (
    <div style={aside ? { flex: "1 1 320px" } : undefined}>
      <div
        data-entrance="2"
        data-entrance-fade
        style={
          eyebrowRight
            ? {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                flexWrap: "wrap",
                gap: 12,
              }
            : undefined
        }
      >
        <p className="eyebrow">{eyebrow}</p>
        {eyebrowRight}
      </div>
      <h1 data-entrance="1" style={{ marginTop: 16 }}>
        {title}
      </h1>
      {lede ? (
        <p
          data-entrance="2"
          style={{
            marginTop: 20,
            maxWidth: "68ch",
            fontSize: "var(--fs-lede)",
            lineHeight: 1.6,
            color: "var(--ink-soft)",
          }}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );

  return (
    <Entrance className="wrap" style={{ paddingTop: 80, ...style }}>
      {aside ? (
        <div style={{ display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap" }}>
          {header}
          <div data-entrance="2" data-entrance-fade>
            {aside}
          </div>
        </div>
      ) : (
        header
      )}
      {children ? (
        <div data-entrance="3" data-entrance-items style={{ marginTop: 48 }}>
          {children}
        </div>
      ) : null}
    </Entrance>
  );
}
