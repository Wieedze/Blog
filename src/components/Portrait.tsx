import Link from "next/link";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Optional portrait: drop a square photo at public/portrait.{jpg,png} and it
// renders. Checked at build time; if the file is absent the text stands alone.
async function findPortrait(): Promise<string | null> {
  for (const file of ["portrait.jpg", "portrait.jpeg", "portrait.png"]) {
    try {
      await readFile(path.join(process.cwd(), "public", file));
      return `/${file}`;
    } catch {
      /* not found, try next */
    }
  }
  return null;
}

export default async function Portrait() {
  const src = await findPortrait();
  return (
    <section className="wrap" style={{ paddingTop: 64 }}>
      <div
        style={{
          borderTop: "1px solid var(--line)",
          paddingTop: 32,
          display: "flex",
          gap: 28,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt="Maxime Saint-Joannis"
            width={208}
            height={208}
            style={{
              width: 208,
              height: 208,
              borderRadius: "50%",
              objectFit: "cover",
              border: "1px solid var(--line)",
            }}
          />
        )}
        <div style={{ flex: "1 1 320px" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem" }}>
            Maxime Saint-Joannis
          </div>
          <p style={{ color: "var(--ink-soft)", marginTop: 6, maxWidth: "62ch" }}>
            I build, I learn, and I like meeting people who do the same. <Link href="/contact" className="link">Let&apos;s talk</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
