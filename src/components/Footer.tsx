export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        marginTop: 120,
        padding: "48px 0",
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-lede)" }}>
            Maxime Saint-Joannis
          </div>
          <div
            className="mono"
            style={{ fontSize: "var(--fs-sm)", color: "var(--ink-faint)", marginTop: 4 }}
          >
            Building in public
          </div>
        </div>
        <div
          className="mono"
          style={{ display: "flex", gap: 20, fontSize: "var(--fs-sm)" }}
        >
          <a href="https://github.com/Wieedze" className="link" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://x.com/MoodzMaxime" className="link" target="_blank" rel="noreferrer">
            X
          </a>
          <a
            href="https://www.linkedin.com/in/maxime-saint-joannis-65163b345/"
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
