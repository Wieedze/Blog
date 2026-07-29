import { story } from "@/lib/story";

export default function Story() {
  return (
    <section className="wrap" style={{ paddingTop: 24 }}>
      <div style={{ borderTop: "1px solid var(--line)", paddingTop: 28 }}>
        <p className="eyebrow">The story</p>
        <h2 style={{ fontSize: "1.6rem", marginTop: 8 }}>How I got here</h2>

        <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 40 }}>
          {story.map((c) => (
            <div key={c.n} className="reveal" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "2.6rem",
                  lineHeight: 1,
                  minWidth: 68,
                  color: "color-mix(in srgb, var(--accent) 42%, var(--bg))",
                }}
              >
                {c.n}
              </div>
              <div style={{ flex: "1 1 440px" }}>
                <div
                  className="mono"
                  style={{
                    fontSize: ".72rem",
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "var(--ink-faint)",
                  }}
                >
                  {c.theme}
                </div>
                <h3 style={{ fontSize: "1.5rem", marginTop: 8 }}>{c.title}</h3>
                <p style={{ color: "var(--ink-soft)", marginTop: 8, lineHeight: 1.65 }}>
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
