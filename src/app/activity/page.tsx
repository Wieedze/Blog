"use client";

import { useState } from "react";
import activity from "@/content/activity.json";
import PageShell from "@/components/PageShell";

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
    <PageShell
      eyebrow="Developer activity"
      eyebrowRight={
        <p className="mono" style={{ fontSize: "var(--fs-xs)", color: "var(--ink-faint)" }}>
          GitHub: <span style={{ color: "var(--accent)" }}>@{data.user}</span> · synced {fmtDate(data.syncedAt)}
        </p>
      }
      title="Activity"
    >
      {/* ---------- STATS ---------- */}
      {data.stats && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 24,
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
          style={{
            marginTop: 40,
            borderTop: "1px solid var(--line)",
            paddingTop: 20,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", gap: 18 }}>
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className="mono"
                  style={{
                    fontSize: "var(--fs-sm)",
                    padding: "2px 0",
                    cursor: "pointer",
                    border: "none",
                    borderBottom:
                      y === year
                        ? "1px solid var(--accent)"
                        : "1px solid transparent",
                    background: "transparent",
                    color: y === year ? "var(--accent)" : "var(--ink-faint)",
                  }}
                >
                  {y}
                </button>
              ))}
            </div>
            <div className="mono" style={{ fontSize: "var(--fs-xs)", color: "var(--ink-faint)", display: "flex", alignItems: "center", gap: 6 }}>
              <span>Less</span>
              {HEAT.map((c, i) => (
                <span key={i} style={{ width: 11, height: 11, borderRadius: 2, background: c, display: "inline-block" }} />
              ))}
              <span>More</span>
            </div>
          </div>

          <p className="mono" style={{ fontSize: "var(--fs-xs)", color: "var(--ink-soft)", marginTop: 14 }}>
            {fmtNum(calendar.total)} contributions in {year}
          </p>

          <Heatmap calendar={calendar} />
        </div>
      )}

      {/* ---------- REPOSITORIES ---------- */}
      {data.repos && data.repos.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <p className="eyebrow">Repositories</p>
          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            {data.repos.map((r) => (
              <a
                key={r.fullName}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  borderTop: "1px solid var(--line)",
                  padding: "18px 0 4px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-lede)" }}>{r.name}</span>
                  <span className="status-word">
                    {r.isPrivate ? "private" : "public"}
                  </span>
                </div>
                <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-soft)", lineHeight: 1.5, flex: 1 }}>
                  {r.description}
                </p>
                <div
                  className="mono"
                  style={{ fontSize: "var(--fs-xs)", color: "var(--ink-faint)", display: "flex", gap: 16, alignItems: "center" }}
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
          <p className="mono" style={{ fontSize: "var(--fs-sm)", color: "var(--ink-faint)" }}>
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
                  style={{ fontSize: "var(--fs-xs)", textTransform: "uppercase", color: "var(--accent)", minWidth: 96 }}
                >
                  {e.type}
                </span>
                <div style={{ flex: 1 }}>
                  <span className="mono" style={{ fontSize: "var(--fs-sm)" }}>{e.repo}</span>
                  {e.message && <span style={{ color: "var(--ink-soft)" }}>: {e.message}</span>}
                  <div className="mono" style={{ fontSize: "var(--fs-xs)", color: "var(--ink-faint)", marginTop: 2 }}>
                    {e.detail} · {fmtDate(e.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ borderTop: "1px solid var(--line)", paddingTop: 18 }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-h2)", fontWeight: 600, lineHeight: 1 }}>
        {fmtNum(value)}
      </div>
      <div className="mono" style={{ fontSize: "var(--fs-xs)", color: "var(--ink-faint)", marginTop: 8 }}>
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
              style={{ width: 11, fontSize: "var(--fs-xs)", color: "var(--ink-faint)", whiteSpace: "nowrap" }}
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
