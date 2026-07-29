import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Open to a freelance mission, an Intuition / Circles ecosystem contribution, or a hackathon team. Reach out.",
};

const EMAIL = "maxime.moodz@gmail.com";

const channels = [
  { label: "X", handle: "@MoodzMaxime", url: "https://x.com/MoodzMaxime" },
  { label: "GitHub", handle: "Wieedze", url: "https://github.com/Wieedze" },
  { label: "LinkedIn", handle: "TODO(maxime): profile URL", url: "TODO(maxime)" },
  { label: "Book a call", handle: "TODO(maxime): scheduling link", url: "TODO(maxime)" },
];

export default function ContactPage() {
  return (
    <section className="prose-wrap" style={{ paddingTop: 80 }}>
      <p className="eyebrow rise d1">Contact</p>
      <h1 className="rise d2" style={{ marginTop: 16 }}>
        Let&apos;s talk
      </h1>
      <p
        className="rise d3"
        style={{ marginTop: 20, fontSize: "1.15rem", color: "var(--ink-soft)", lineHeight: 1.6 }}
      >
        I&apos;m open to three things: a freelance mission, contributing to a
        project in the Intuition or Circles ecosystem, or teaming up for a
        hackathon. If any of that fits, get in touch.
      </p>

      <div className="rise d4" style={{ marginTop: 40 }}>
        <a
          href={`mailto:${EMAIL}`}
          className="mono"
          style={{
            background: "var(--ink)",
            color: "var(--bg)",
            padding: "13px 26px",
            borderRadius: "var(--radius)",
            fontSize: ".9rem",
            display: "inline-block",
          }}
        >
          {EMAIL} ↗
        </a>
      </div>

      <div style={{ marginTop: 44 }}>
        <p className="eyebrow">Elsewhere</p>
        <div style={{ marginTop: 16 }}>
          {channels.map((c) => {
            const ready = !c.url.startsWith("TODO");
            return (
              <div
                key={c.label}
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "baseline",
                  borderTop: "1px solid var(--line)",
                  padding: "14px 0",
                }}
              >
                <span
                  className="mono"
                  style={{ fontSize: ".76rem", color: "var(--ink-faint)", minWidth: 96 }}
                >
                  {c.label}
                </span>
                {ready ? (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link mono"
                    style={{ fontSize: ".95rem" }}
                  >
                    {c.handle}
                  </a>
                ) : (
                  <span className="mono" style={{ fontSize: ".9rem", color: "var(--ink-faint)" }}>
                    {c.handle}
                  </span>
                )}
              </div>
            );
          })}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
      </div>
    </section>
  );
}
