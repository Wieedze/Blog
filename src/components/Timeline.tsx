import Link from "next/link";
import { timeline } from "@/lib/timeline";

function clean(value: string): string {
  return value && !value.startsWith("TODO") ? value : "";
}

export default function Timeline() {
  return (
    <section className="wrap" style={{ paddingTop: 48 }}>
      <div style={{ borderTop: "1px solid var(--line)", paddingTop: 28 }}>
        <p className="eyebrow">The timeline</p>
        <h2 style={{ fontSize: "1.6rem", marginTop: 8 }}>Milestones</h2>

        <div style={{ marginTop: 28 }}>
          {timeline.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 20,
                borderTop: "1px solid var(--line)",
                padding: "20px 0",
                flexWrap: "wrap",
              }}
            >
              <div
                className="mono"
                style={{ fontSize: ".9rem", color: "var(--accent)", minWidth: 76 }}
              >
                {clean(m.year)}
              </div>
              <div style={{ flex: "1 1 440px" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: "1.25rem" }}>
                    {m.link ? (
                      <Link href={m.link} className="link">
                        {m.title}
                      </Link>
                    ) : (
                      m.title
                    )}
                  </h3>
                  <span className="mono" style={{ fontSize: ".72rem", color: "var(--ink-faint)" }}>
                    {m.context}
                  </span>
                </div>
                <p style={{ color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.65 }}>
                  {m.body}
                </p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
      </div>
    </section>
  );
}
