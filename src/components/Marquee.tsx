// Keyword marquee. CSS-only animation (see globals.css), paused under
// prefers-reduced-motion. aria-hidden because it's decorative.
// Concrete tech / ecosystems only, no buzzwords.

const KEYWORDS = [
  "Intuition",
  "Circles",
  "Solidity",
  "TypeScript",
  "ERC-7710",
  "ERC-8004",
  "MultiVault",
  "delegation",
  "Safe",
  "IPFS",
  "ENS",
  "The Graph",
  "wagmi/viem",
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
