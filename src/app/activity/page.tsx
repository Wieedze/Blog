"use client";

import { useState } from "react";
import activity from "@/content/activity.json";

type Day = { date: string; count: number; level: number };
type Calendar = { total: number; weeks: Day[][] };

const data = activity as unknown as {
  user: string;
  syncedAt: string;
  stats?: { commits: number; prs: number; issues: number; reviews?: number };
  years?: number[];
  calendars?: Record<string, Calendar>;
  repos?: {
    name: string;
    fullName: string;
    description: string;
    url: string;
    stars: number;
    forks: number;
    isPrivate: boolean;
    language: string | null;
    languageColor?: string | null;
  }[];
  events?: { type: string; repo: string; date: string; detail: string; message: string }[];
};

// Heat levels mapped onto the claret accent.
const HEAT = [
  "var(--line)",
  "color-mix(in srgb, var(--accent) 28%, var(--bg-raised))",
  "color-mix(in srgb, var(--accent) 52%, var(--bg-raised))",
  "color-mix(in srgb, var(--accent) 76%, var(--bg-raised))",
  "var(--accent)",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
}

function fmtNum(n: number): string {
  return n.toLocaleString("en-US");
}

export default function ActivityPage() {
  const years = data.years ?? [];
  const [year, setYear] = useState<number>(years[0] ?? new Date().getFullYear());
  const calendar = data.calendars?.[String(year)];

  return (
    <section className="wrap" style={{ paddingTop: 80 }}>
      <div
        className="rise d1"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12 }}
      >
        <p className="eyebrow">Developer activity</p>
        <p className="mono" style={{ fontSize: ".78rem", color: "var(--ink-faint)" }}>
          GitHub: <span style={{ color: "var(--accent)" }}>@{data.user}</span> · synced {fmtDate(data.syncedAt)}
        </p>
      </div>
      <h1 className="rise d2" style={{ marginTop: 14 }}>
        Activity
      </h1>

      {/* ---------- STAT CARDS ---------- */}
      {data.stats && (
        <div
          className="rise d3"
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
          }}
        >
          <Stat label="Total commits" value={data.stats.commits} />
          <Stat label="Total PRs" value={data.stats.prs} />
          <Stat label="Total issues" value={data.stats.issues} />
        </div>
      )}

      {/* ---------- CONTRIBUTION HEATMAP ---------- */}
      {calendar && (
        <div
          className="rise d4"
          style={{
            marginTop: 28,
            border: "1px solid var(--line)",
            borderRadius: "var(--radius)",
            background: "var(--bg-raised)",
            padding: "24px 22px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", gap: 8 }}>
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className="mono"
                  style={{
                    fontSize: ".78rem",
                    padding: "5px 12px",
                    borderRadius: 999,
                    cursor: "pointer",
                    border: "1px solid var(--line)",
                    background: y === year ? "var(--accent-soft)" : "transparent",
                    color: y === year ? "var(--ink)" : "var(--ink-faint)",
                  }}
                >
                  {y}
                </button>
              ))}
            </div>
            <div className="mono" style={{ fontSize: ".74rem", color: "var(--ink-faint)", display: "flex", alignItems: "center", gap: 6 }}>
              <span>Less</span>
              {HEAT.map((c, i) => (
                <span key={i} style={{ width: 11, height: 11, borderRadius: 2, background: c, display: "inline-block" }} />
              ))}
              <span>More</span>
            </div>
          </div>

          <p className="mono" style={{ fontSize: ".76rem", color: "var(--ink-soft)", marginTop: 14 }}>
            {fmtNum(calendar.total)} contributions in {year}
          </p>

          <Heatmap calendar={calendar} />
        </div>
      )}

      {/* ---------- REPO CARDS ---------- */}
      {data.repos && data.repos.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <p className="eyebrow rise">Repositories</p>
          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            {data.repos.map((r, i) => (
              <a
                key={r.fullName}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="rise"
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius)",
                  background: "var(--bg-raised)",
                  padding: "20px 20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  animationDelay: `${0.1 + i * 0.05}s`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem" }}>{r.name}</span>
                  <span
                    className="mono"
                    style={{
                      fontSize: ".6rem",
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      padding: "2px 7px",
                      borderRadius: 999,
                      border: "1px solid var(--line)",
                      color: "var(--ink-faint)",
                    }}
                  >
                    {r.isPrivate ? "private" : "public"}
                  </span>
                </div>
                <p style={{ fontSize: ".92rem", color: "var(--ink-soft)", lineHeight: 1.5, flex: 1 }}>
                  {r.description}
                </p>
                <div
                  className="mono"
                  style={{ fontSize: ".76rem", color: "var(--ink-faint)", display: "flex", gap: 16, alignItems: "center" }}
                >
                  {r.language && (
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span
                        style={{
                          width: 9,
                          height: 9,
                          borderRadius: 999,
                          background: r.languageColor ?? "var(--accent)",
                          display: "inline-block",
                        }}
                      />
                      {r.language}
                    </span>
                  )}
                  <span>★ {r.stars}</span>
                  <span>⑂ {r.forks}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ---------- RECENT EVENTS (fallback / extra) ---------- */}
      {!data.stats && data.events && (
        <div style={{ marginTop: 44 }}>
          <p className="mono" style={{ fontSize: ".82rem", color: "var(--ink-faint)" }}>
            Set a <code>GITHUB_TOKEN</code> and run <code>bun run sync:activity</code> to load the full dashboard.
          </p>
          <div style={{ marginTop: 24 }}>
            {data.events.map((e, i) => (
              <div
                key={i}
                style={{
                  borderTop: "1px solid var(--line)",
                  padding: "16px 0",
                  display: "flex",
                  gap: 16,
                  alignItems: "baseline",
                }}
              >
                <span
                  className="mono"
                  style={{ fontSize: ".66rem", textTransform: "uppercase", color: "var(--accent)", minWidth: 96 }}
                >
                  {e.type}
                </span>
                <div style={{ flex: 1 }}>
                  <span className="mono" style={{ fontSize: ".9rem" }}>{e.repo}</span>
                  {e.message && <span style={{ color: "var(--ink-soft)" }}> — {e.message}</span>}
                  <div className="mono" style={{ fontSize: ".72rem", color: "var(--ink-faint)", marginTop: 2 }}>
                    {e.detail} · {fmtDate(e.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        border: "1px solid var(--line)",
        borderRadius: "var(--radius)",
        background: "var(--bg-raised)",
        padding: "22px 24px",
      }}
    >
      <div style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 600, lineHeight: 1 }}>
        {fmtNum(value)}
      </div>
      <div className="mono" style={{ fontSize: ".74rem", color: "var(--ink-faint)", marginTop: 8 }}>
        {label}
      </div>
    </div>
  );
}

function Heatmap({ calendar }: { calendar: Calendar }) {
  const weeks = calendar.weeks;

  // Month labels: show a month name above the first week where it changes.
  const monthLabels = weeks.map((week, i) => {
    const first = week[0]?.date;
    if (!first) return "";
    const m = new Date(first).getUTCMonth();
    const prev = i > 0 ? new Date(weeks[i - 1][0]?.date ?? first).getUTCMonth() : -1;
    return m !== prev ? MONTHS[m] : "";
  });

  return (
    <div style={{ marginTop: 16, overflowX: "auto" }}>
      <div style={{ display: "inline-flex", flexDirection: "column", gap: 4 }}>
        {/* Month labels */}
        <div style={{ display: "flex", gap: 3, paddingLeft: 0 }}>
          {monthLabels.map((m, i) => (
            <div
              key={i}
              className="mono"
              style={{ width: 11, fontSize: ".62rem", color: "var(--ink-faint)", whiteSpace: "nowrap" }}
            >
              {m}
            </div>
          ))}
        </div>
        {/* Week columns */}
        <div style={{ display: "flex", gap: 3 }}>
          {weeks.map((week, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {Array.from({ length: 7 }).map((_, di) => {
                const day = week[di];
                return (
                  <div
                    key={di}
                    title={day ? `${day.count} contributions on ${day.date}` : ""}
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: 2,
                      background: day ? HEAT[day.level] : "transparent",
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
