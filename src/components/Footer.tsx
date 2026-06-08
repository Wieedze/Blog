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
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
            Maxime Saint-Joannis
          </div>
          <div
            className="mono"
            style={{ fontSize: ".82rem", color: "var(--ink-faint)", marginTop: 4 }}
          >
            Building in public
          </div>
        </div>
        <div
          className="mono"
          style={{ display: "flex", gap: 20, fontSize: ".88rem" }}
        >
          <a href="https://github.com/Wieedze" className="link" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://x.com/MoodzMaxime" className="link" target="_blank" rel="noreferrer">
            X
          </a>
          <a href="https://www.linkedin.com" className="link" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
