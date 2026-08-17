import Link from "next/link";
import type { Metadata } from "next";
import { getAllJournal } from "@/lib/content";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Build notes, lines of thinking, and learnings, building in public.",
};

export default function JournalPage() {
  const posts = getAllJournal();

  return (
    <PageShell
      eyebrow="Building in public"
      title="Journal"
      lede="Build notes written as the work happens."
    >
      {posts.length === 0 && (
        <p className="mono" style={{ color: "var(--ink-faint)" }}>
          First notes coming soon.
        </p>
      )}
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/journal/${post.slug}`}
          style={{
            display: "block",
            borderTop: "1px solid var(--line)",
            padding: "26px 0",
          }}
        >
          <div
            className="mono"
            style={{ fontSize: "var(--fs-xs)", color: "var(--ink-faint)" }}
          >
            {post.date} · {post.readingTime}
          </div>
          <h3 style={{ marginTop: 8 }}>{post.title}</h3>
          <p style={{ color: "var(--ink-soft)", marginTop: 8, maxWidth: "72ch" }}>
            {post.summary}
          </p>
        </Link>
      ))}
      {posts.length > 0 && <div style={{ borderTop: "1px solid var(--line)" }} />}
    </PageShell>
  );
}
