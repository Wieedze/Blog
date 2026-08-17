import Link from "next/link";

export default function Nav() {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--line)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "color-mix(in srgb, var(--bg) 88%, transparent)",
        backdropFilter: "blur(8px)",
      }}
    >
      <nav
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 68,
        }}
      >
        <Link
          href="/"
          className="mono"
          style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          Wieedze<span style={{ color: "var(--accent)" }}>.</span>
        </Link>
        <div
          style={{ display: "flex", gap: 22, fontSize: "var(--fs-sm)", alignItems: "center" }}
          className="mono"
        >
          <Link href="/hackathons" className="link">hackathons</Link>
          <Link href="/projects" className="link">projects</Link>
          <Link href="/journal" className="link">journal</Link>
          <Link href="/now" className="link">now</Link>
          <Link href="/activity" className="link">activity</Link>
          <Link
            href="/contact"
            className="link"
            style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
          >
            contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
