/**
 * fetch-github-activity.mjs
 * --------------------------
 * Builds a rich GitHub "developer activity" snapshot and writes it to
 * src/content/activity.json. Powers the dashboard on /activity
 * (lifetime commit / PR / issue totals, a per-year contribution heatmap,
 * and repository cards).
 *
 * Run it manually (`bun run sync:activity`) or via cron / CI.
 *
 * Usage:
 *   GITHUB_USER=Wieedze GITHUB_TOKEN=ghp_xxx bun run sync:activity
 *
 * A GITHUB_TOKEN is REQUIRED for the full dashboard: the contribution
 * calendar and lifetime totals come from the GitHub GraphQL API, which
 * needs authentication. A classic token with the `read:user` and
 * `public_repo` scopes is enough.
 *
 * Without a token the script falls back to the public REST events feed
 * and writes a minimal snapshot (recent events only).
 */

import fs from "node:fs";
import path from "node:path";

// Load .env.local / .env into process.env (no dependency), so the script
// works whether it's run via `node`, `bun`, or `npm` — without needing the
// runner to auto-load env files. Existing env vars always win.
function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const p = path.join(process.cwd(), file);
    if (!fs.existsSync(p)) continue;
    for (const raw of fs.readFileSync(p, "utf8").split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      let val = line.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = val;
    }
  }
}
loadEnv();

const USER = process.env.GITHUB_USER || "Wieedze";
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

// Repos to surface first on the dashboard, in this order. Includes repos that
// live under other orgs (intuition-box, gnosis-box) so they get fetched too.
// These always appear; the rest of the list fills up to REPO_LIMIT by stars.
const PINNED = [
  "intuition-box/Sofia",
  "Wieedze/ARP",
  "intuition-box/OurGlass",
  "intuition-box/WisPear",
  "intuition-box/FeeProxy",
  "Wieedze/TrackHunter",
  "gnosis-box/TheKitty",
  "Wieedze/OddWave-Studio-",
];

// Max number of repo cards to write to the dashboard.
const REPO_LIMIT = 9;

const REST_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "wieedze-portfolio",
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

// Map a contribution count to a 0–4 heat level (GitHub-style).
function level(count) {
  if (count <= 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

async function gql(query, variables) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { ...REST_HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error(`GraphQL HTTP ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL: ${json.errors.map((e) => e.message).join("; ")}`);
  }
  return json.data;
}

// --- Lifetime totals + per-year contribution calendars ---
async function fetchContributions() {
  const created = await gql(
    `query($login:String!){ user(login:$login){ createdAt name bio followers{totalCount} following{totalCount} } }`,
    { login: USER }
  );
  const u = created.user;
  const startYear = new Date(u.createdAt).getUTCFullYear();
  const endYear = new Date().getUTCFullYear();

  const stats = { commits: 0, prs: 0, issues: 0, reviews: 0 };
  const calendars = {};
  const years = [];

  for (let year = endYear; year >= startYear; year--) {
    const from = `${year}-01-01T00:00:00Z`;
    const to = `${year}-12-31T23:59:59Z`;
    const data = await gql(
      `query($login:String!,$from:DateTime!,$to:DateTime!){
        user(login:$login){
          contributionsCollection(from:$from,to:$to){
            totalCommitContributions
            totalPullRequestContributions
            totalIssueContributions
            totalPullRequestReviewContributions
            contributionCalendar{
              totalContributions
              weeks{ contributionDays{ date contributionCount } }
            }
          }
        }
      }`,
      { login: USER, from, to }
    );
    const c = data.user.contributionsCollection;
    stats.commits += c.totalCommitContributions;
    stats.prs += c.totalPullRequestContributions;
    stats.issues += c.totalIssueContributions;
    stats.reviews += c.totalPullRequestReviewContributions;

    const weeks = c.contributionCalendar.weeks.map((w) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: level(d.contributionCount),
      }))
    );
    calendars[year] = { total: c.contributionCalendar.totalContributions, weeks };
    years.push(year);
  }

  return {
    profile: {
      name: u.name,
      bio: u.bio,
      followers: u.followers.totalCount,
      following: u.following.totalCount,
      createdAt: u.createdAt,
    },
    stats,
    calendars,
    years,
  };
}

// --- Repository cards (owned + pinned) ---
async function fetchRepos() {
  const owned = await gql(
    `query($login:String!){
      user(login:$login){
        repositories(first:100, ownerAffiliations:[OWNER], privacy:PUBLIC,
          orderBy:{field:UPDATED_AT, direction:DESC}){
          nodes{ nameWithOwner name description url stargazerCount forkCount
            isPrivate primaryLanguage{ name color } pushedAt }
        }
      }
    }`,
    { login: USER }
  );

  const map = new Map();
  for (const r of owned.user.repositories.nodes) map.set(r.nameWithOwner, r);

  // Pull in pinned repos that may live under other orgs.
  for (const full of PINNED) {
    if (map.has(full)) continue;
    const [owner, name] = full.split("/");
    try {
      const r = await gql(
        `query($owner:String!,$name:String!){
          repository(owner:$owner,name:$name){
            nameWithOwner name description url stargazerCount forkCount
            isPrivate primaryLanguage{ name color } pushedAt }
        }`,
        { owner, name }
      );
      if (r.repository) map.set(full, r.repository);
    } catch {
      /* ignore a missing/renamed pinned repo */
    }
  }

  const pinnedRank = (full) => {
    const i = PINNED.indexOf(full);
    return i === -1 ? Infinity : i;
  };

  return [...map.values()]
    .sort((a, b) => {
      // Pinned repos first, in PINNED order.
      const pr = pinnedRank(a.nameWithOwner) - pinnedRank(b.nameWithOwner);
      if (pr !== 0) return pr;
      // Then by stars, then by most recently pushed.
      if (b.stargazerCount !== a.stargazerCount)
        return b.stargazerCount - a.stargazerCount;
      return new Date(b.pushedAt) - new Date(a.pushedAt);
    })
    .slice(0, REPO_LIMIT)
    .map((r) => ({
      name: r.name,
      fullName: r.nameWithOwner,
      description: r.description ?? "",
      url: r.url,
      stars: r.stargazerCount,
      forks: r.forkCount,
      isPrivate: r.isPrivate,
      language: r.primaryLanguage?.name ?? null,
      languageColor: r.primaryLanguage?.color ?? null,
    }));
}

// --- Fallback: public REST events feed (no token) ---
async function fetchEventsFallback() {
  const res = await fetch(
    `https://api.github.com/users/${USER}/events/public?per_page=100`,
    { headers: REST_HEADERS }
  );
  if (!res.ok) {
    console.error(`GitHub API error: ${res.status} ${res.statusText}`);
    return [];
  }
  const events = await res.json();
  return events
    .filter((e) =>
      ["PushEvent", "CreateEvent", "ReleaseEvent", "PullRequestEvent"].includes(
        e.type
      )
    )
    .map((e) => ({
      type: e.type,
      repo: e.repo?.name ?? "",
      date: e.created_at,
      detail:
        e.type === "PushEvent"
          ? `${e.payload?.commits?.length ?? 0} commit(s)`
          : e.type === "CreateEvent"
            ? `${e.payload?.ref_type ?? ""} ${e.payload?.ref ?? ""}`.trim()
            : e.type === "ReleaseEvent"
              ? (e.payload?.release?.tag_name ?? "release")
              : e.type === "PullRequestEvent"
                ? `PR ${e.payload?.action ?? ""}`
                : "",
      message:
        e.type === "PushEvent"
          ? (e.payload?.commits?.[0]?.message?.split("\n")[0] ?? "")
          : "",
    }))
    .slice(0, 40);
}

async function main() {
  const dest = path.join(process.cwd(), "src", "content", "activity.json");
  const out = { user: USER, syncedAt: new Date().toISOString() };

  if (!TOKEN) {
    // No token → degraded events-only mode. Crucially, DON'T clobber an
    // existing full dashboard (e.g. a CI run where the secret isn't set):
    // keep the committed activity.json so prod never falls back to garbage.
    try {
      const existing = JSON.parse(fs.readFileSync(dest, "utf8"));
      if (existing && existing.stats) {
        console.warn(
          "! No GITHUB_TOKEN: keeping the existing full dashboard (not overwriting). Set GITHUB_TOKEN to refresh."
        );
        return;
      }
    } catch {
      /* no existing file — fall through and write the events-only fallback */
    }
    console.warn(
      "! No GITHUB_TOKEN: writing recent events only. Set GITHUB_TOKEN for the full dashboard."
    );
    out.events = await fetchEventsFallback();
    fs.writeFileSync(dest, JSON.stringify(out, null, 2));
    console.log(`✓ ${out.events.length} events written (fallback mode)\n  → ${dest}`);
    return;
  }

  const [contrib, repos] = await Promise.all([fetchContributions(), fetchRepos()]);
  Object.assign(out, contrib, { repos });
  out.events = await fetchEventsFallback();
  fs.writeFileSync(dest, JSON.stringify(out, null, 2));
  console.log(
    `✓ commits=${out.stats.commits} prs=${out.stats.prs} issues=${out.stats.issues}, ${out.repos.length} repos, years ${out.years.join("/")}\n  → ${dest}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
