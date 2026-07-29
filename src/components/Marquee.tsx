// Keyword marquee. CSS-only animation (see globals.css), paused under
// prefers-reduced-motion. aria-hidden because it's decorative.

const KEYWORDS = [
  "Intuition",
  "ERC-7710",
  "delegation",
  "AI agents",
  "on-chain reputation",
  "ERC-8004",
  "Circles",
  "Safe App",
  "atom/triple",
  "IPFS",
  "ENS",
  "The Graph",
  "building in public",
];

export default function Marquee() {
  // Duplicated so the -50% translate loops seamlessly.
  const items = [...KEYWORDS, ...KEYWORDS];
  return (
    <div className="marquee" aria-hidden="true" style={{ marginTop: 8 }}>
      <div className="marquee-track">
        {items.map((k, i) => (
          <span key={i} className="marquee-item">
            <span className="dot">·</span>
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}
