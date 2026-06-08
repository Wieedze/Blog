import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Social preview card (LinkedIn / X / Slack / Discord). Mirrors the hero:
// a typographic, on-brand card — cream paper, claret accent, Fraunces display.
// Generate the card at build time (required with output: "export", since the
// font fetch below would otherwise make this route look dynamic).
export const dynamic = "force-static";
export const alt = "Maxime Saint-Joannis — I build, in public.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Optional avatar: drop a square photo at public/og-photo.{jpg,png} and it
// replaces the W monogram. If absent, we fall back to the monogram.
async function loadPhoto(): Promise<string | null> {
  const candidates: [string, string][] = [
    ["og-photo.jpg", "image/jpeg"],
    ["og-photo.jpeg", "image/jpeg"],
    ["og-photo.png", "image/png"],
  ];
  for (const [file, mime] of candidates) {
    try {
      const buf = await readFile(path.join(process.cwd(), "public", file));
      return `data:${mime};base64,${buf.toString("base64")}`;
    } catch {
      /* not found — try next */
    }
  }
  return null;
}

// Load a Google font as TTF (Satori can't use woff2). The CSS2 endpoint returns
// truetype/opentype when the request UA isn't a modern browser — which is the
// case from the server — so the regex below picks up a usable font URL.
async function loadFont(familyParam: string, text: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${familyParam}&text=${encodeURIComponent(
    text
  )}`;
  const css = await (await fetch(url)).text();
  const match = css.match(
    /src: url\((https:\/\/[^)]+)\) format\('(?:opentype|truetype)'\)/
  );
  if (!match) throw new Error(`Failed to load font: ${familyParam}`);
  return (await fetch(match[1])).arrayBuffer();
}

export default async function OpengraphImage() {
  const display = "I build, in public. W";
  const mono =
    "MAXIME SAINT-JOANNIS Junior full-stack & smart-contract developer wieedze.eth";

  const [fraunces, plex, photo] = await Promise.all([
    loadFont("Fraunces:opsz,wght@144,600", display),
    loadFont("IBM+Plex+Mono:wght@500", mono),
    loadPhoto(),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f0e8",
          padding: "72px 80px",
          fontFamily: "IBM Plex Mono",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: 24,
              letterSpacing: 4,
              color: "#8c2f39",
            }}
          >
            MAXIME SAINT-JOANNIS
          </div>
          {photo ? (
            <img
              src={photo}
              width={84}
              height={84}
              style={{
                width: 84,
                height: 84,
                borderRadius: 9999,
                objectFit: "cover",
                border: "4px solid #8c2f39",
              }}
            />
          ) : (
            <div
              style={{
                display: "flex",
                width: 72,
                height: 72,
                borderRadius: 16,
                background: "#8c2f39",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Fraunces",
                fontSize: 46,
                color: "#f4f0e8",
              }}
            >
              W
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: 122,
              color: "#1a1714",
              lineHeight: 1,
            }}
          >
            I build,
          </div>
          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: 122,
              color: "#8c2f39",
              lineHeight: 1,
            }}
          >
            in public.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontFamily: "IBM Plex Mono",
            fontSize: 26,
            color: "#4a443c",
          }}
        >
          <div style={{ display: "flex" }}>
            Junior full-stack &amp; smart-contract developer
          </div>
          <div style={{ display: "flex", color: "#8c2f39" }}>wieedze.eth</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
        { name: "IBM Plex Mono", data: plex, weight: 500, style: "normal" },
      ],
    }
  );
}
