import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

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
    <PageShell
      eyebrow="Contact"
      title={"Let's talk"}
      lede="Freelance work, collaborations, hackathons, or something I haven't thought of yet. If you're building something interesting, I want to hear about it."
      aside={
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/portrait.jpg"
          alt="Maxime Saint-Joannis"
          width={148}
          height={148}
          style={{
            width: 148,
            height: 148,
            borderRadius: "var(--radius)",
            objectFit: "cover",
            border: "1px solid var(--line)",
            flexShrink: 0,
          }}
        />
      }
    >
      <div>
        <a
          href={`mailto:${EMAIL}`}
          className="mono"
          style={{
            background: "var(--ink)",
            color: "var(--bg)",
            padding: "13px 26px",
            borderRadius: "var(--radius)",
            fontSize: "var(--fs-sm)",
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
                style={{ fontSize: "var(--fs-xs)", color: "var(--ink-faint)", minWidth: 96 }}
              >
                {c.label}
              </span>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="link mono"
                style={{ fontSize: "var(--fs-sm)" }}
              >
                {c.handle}
              </a>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
      </div>
    </PageShell>
  );
}
