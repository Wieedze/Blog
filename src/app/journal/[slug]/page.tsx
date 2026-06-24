import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compile, run } from "@mdx-js/mdx";
import * as jsxRuntime from "react/jsx-runtime";
import rehypePrettyCode from "rehype-pretty-code";
import { getJournalSlugs, getJournalPost } from "@/lib/content";

export function generateStaticParams() {
  return getJournalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getJournalPost(slug);
    return { title: post.title, description: post.summary };
  } catch {
    return {};
  }
}

// Compile MDX content to a React component (server-side). We use @mdx-js/mdx
// directly instead of next-mdx-remote, which is incompatible with Next 15 /
// React 19 (it surfaced as "Cannot read properties of undefined (reading
// 'stack')", a masked render error).
async function renderMDX(source: string) {
  const compiled = String(
    await compile(source, {
      outputFormat: "function-body",
      rehypePlugins: [
        [rehypePrettyCode, { theme: "github-dark", keepBackground: false }],
      ],
    })
  );
  const { default: Content } = await run(compiled, {
    ...jsxRuntime,
    baseUrl: import.meta.url,
  });
  return Content;
}

export default async function JournalPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post;
  try {
    post = getJournalPost(slug);
  } catch {
    notFound();
  }

  const Content = await renderMDX(post.content);

  return (
    <article className="prose-wrap" style={{ paddingTop: 72 }}>
      <Link
        href="/journal"
        className="mono link"
        style={{ fontSize: ".85rem", color: "var(--ink-faint)" }}
      >
        ← journal
      </Link>

      <div className="rise d1" style={{ marginTop: 28 }}>
        <div
          className="mono"
          style={{ fontSize: ".78rem", color: "var(--ink-faint)" }}
        >
          {post.date} · {post.readingTime}
        </div>
        <h1 style={{ marginTop: 14 }}>{post.title}</h1>
      </div>

      <div className="prose rise d2" style={{ marginTop: 40 }}>
        <Content />
      </div>
    </article>
  );
}
