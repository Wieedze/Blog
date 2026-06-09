import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT = path.join(process.cwd(), "src", "content");

export type JournalMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: string;
};

export type JournalPost = JournalMeta & { content: string };

function readDir(sub: string): string[] {
  const dir = path.join(CONTENT, sub);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

export function getJournalSlugs(): string[] {
  return readDir("journal").map((f) => f.replace(/\.mdx$/, ""));
}

export function getJournalPost(slug: string): JournalPost {
  const raw = fs.readFileSync(
    path.join(CONTENT, "journal", `${slug}.mdx`),
    "utf8"
  );
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    summary: data.summary ?? data.description ?? "",
    tags: data.tags ?? [],
    readingTime: readingTime(content).text.replace("min read", "min"),
    content,
  };
}

export function getAllJournal(): JournalMeta[] {
  return getJournalSlugs()
    .map((slug) => {
      const { content, ...meta } = getJournalPost(slug);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
