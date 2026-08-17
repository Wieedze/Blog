import Link from "next/link";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Optional portrait: drop a square photo at public/portrait.{jpg,png} and it
// renders. Until then, a placeholder marks the spot (checked at build time, so
// nothing breaks if the file is absent).
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
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt="Maxime Saint-Joannis"
            width={128}
            height={128}
            style={{
              width: 128,
              height: 128,
              borderRadius: 12,
              objectFit: "cover",
              border: "1px solid var(--line)",
            }}
          />
        ) : (
          <div
            className="mono"
            style={{
              width: 128,
              height: 128,
              borderRadius: 12,
              border: "1px dashed var(--line)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: 8,
            }}
          >
            <span style={{ fontSize: ".62rem", color: "var(--ink-faint)" }}>
              TODO: public/portrait.jpg
            </span>
          </div>
        )}
        <div style={{ flex: "1 1 320px" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem" }}>
            Maxime Saint-Joannis
          </div>
          <p style={{ color: "var(--ink-soft)", marginTop: 6, maxWidth: "48ch" }}>
            I build, I learn, and I like meeting people who do the same.{" "}
            <Link href="/contact" className="link">
              Let&apos;s talk
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
