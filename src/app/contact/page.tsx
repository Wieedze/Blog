import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Freelance work, collaborations, hackathons, or something I haven't thought of yet. Reach out.",
};

const EMAIL = "maxime.moodz@gmail.com";

const channels = [
  { label: "X", handle: "@MoodzMaxime", url: "https://x.com/MoodzMaxime" },
  { label: "GitHub", handle: "Wieedze", url: "https://github.com/Wieedze" },
  {
    label: "LinkedIn",
    handle: "maxime-saint-joannis",
    url: "https://www.linkedin.com/in/maxime-saint-joannis-65163b345/",
  },
  {
    label: "Book a call",
    handle: "calendar.app.google",
    url: "https://calendar.app.google/a7yB8LgGLLJKHVq99",
  },
];

export default function ContactPage() {
  return (
    <section className="wrap" style={{ paddingTop: 80 }}>
      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 320px" }}>
          <p className="eyebrow rise d1">Contact</p>
          <h1 className="rise d2" style={{ marginTop: 16 }}>
            Let&apos;s talk
          </h1>
          <p
            className="rise d3"
            style={{
              marginTop: 20,
              maxWidth: "68ch",
              fontSize: "1.15rem",
              color: "var(--ink-soft)",
              lineHeight: 1.6,
            }}
          >
            Freelance work, collaborations, hackathons, or something I haven&apos;t thought of yet. If you&apos;re building something interesting, I want to hear about it.
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/portrait.jpg"
          alt="Maxime Saint-Joannis"
          width={148}
          height={148}
          className="rise d2"
          style={{
            width: 148,
            height: 148,
            borderRadius: "var(--radius)",
            objectFit: "cover",
            border: "1px solid var(--line)",
            flexShrink: 0,
          }}
        />
      </div>

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
          {channels.map((c) => (
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
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="link mono"
                style={{ fontSize: ".95rem" }}
              >
                {c.handle}
              </a>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
      </div>
    </section>
  );
}
