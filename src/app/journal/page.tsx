import Link from "next/link";
import type { Metadata } from "next";
import { getAllJournal } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Build notes, lines of thinking, and learnings, building in public.",
};

export default function JournalPage() {
  const posts = getAllJournal();

  return (
    <section className="prose-wrap" style={{ paddingTop: 80 }}>
      <p className="eyebrow rise d1">Building in public</p>
      <h1 className="rise d2" style={{ marginTop: 16 }}>
        Journal
      </h1>
      <p
        className="rise d3"
        style={{ marginTop: 18, color: "var(--ink-soft)" }}
      >
        Build notes, lines of thinking, raw learnings. No expert posturing,
        just the work as it unfolds.
      </p>

      <div style={{ marginTop: 48 }}>
        {posts.length === 0 && (
          <p className="mono" style={{ color: "var(--ink-faint)" }}>
            First notes coming soon.
          </p>
        )}
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/journal/${post.slug}`}
            className="rise"
            style={{
              display: "block",
              borderTop: "1px solid var(--line)",
              padding: "26px 0",
              animationDelay: `${0.1 + i * 0.07}s`,
            }}
          >
            <div
              className="mono"
              style={{ fontSize: ".76rem", color: "var(--ink-faint)" }}
            >
              {post.date} · {post.readingTime}
            </div>
            <h3 style={{ fontSize: "1.4rem", marginTop: 8 }}>{post.title}</h3>
            <p style={{ color: "var(--ink-soft)", marginTop: 8 }}>
              {post.summary}
            </p>
          </Link>
        ))}
        {posts.length > 0 && (
          <div style={{ borderTop: "1px solid var(--line)" }} />
        )}
      </div>
    </section>
  );
}
