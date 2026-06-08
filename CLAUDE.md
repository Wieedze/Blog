# CLAUDE.md — Portfolio Wieedze

Brief pour itérer sur ce projet via Claude Code.

## Quoi

Portfolio + blog + flux d'activité de **Maxime Saint-Joannis** (handle
`Wieedze`, X `@MoodzMaxime`). Objectif : profil de développeur crédible dans
l'écosystème Intuition / crypto, posture **building in public** (exploration,
pas expertise). Cible : attirer des opportunités + construire une réputation.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Bun** comme package manager / runtime de dev
- Contenu en **MDX** (`gray-matter` + `next-mdx-remote`, coloration
  `rehype-pretty-code`)
- Déploiement : **Coolify** via Docker (Next.js `output: "standalone"`)
- Pas de Tailwind : design system maison dans `src/app/globals.css`

## Design

Direction **éditorial / clair**. Fond crème (`--bg: #f4f0e8`), encre chaude,
accent unique claret / bordeaux (`--accent: #8c2f39`). Typo : Fraunces (display) +
IBM Plex Sans (body) + IBM Plex Mono (détails). Animations d'entrée sobres
(`.rise` + délais `.d1`–`.d5`). Toutes les couleurs passent par des variables
CSS — ne jamais hardcoder.

## Structure

```
src/
  app/
    layout.tsx            # SEO + OG, nav, footer
    page.tsx              # home (hero + projets vedette)
    projects/page.tsx     # liste projets
    projects/[slug]/      # détail projet
    journal/page.tsx      # liste articles
    journal/[slug]/       # article MDX
    now/page.tsx          # page "now" (à éditer souvent)
    activity/page.tsx     # flux GitHub
    globals.css           # design system
  components/Nav.tsx, Footer.tsx
  lib/
    projects.ts           # DONNÉES projets (éditer ici pour ajouter un projet)
    content.ts            # lecture MDX du journal
  content/
    journal/*.mdx         # articles
    activity.json         # généré par le script de sync
scripts/
  fetch-github-activity.mjs
```

## Tâches courantes

**Ajouter un projet** → éditer le tableau `projects` dans `src/lib/projects.ts`.
Mettre `featured: true` pour l'afficher sur la home.

**Écrire une note de journal** → créer `src/content/journal/<slug>.mdx` avec
frontmatter `title`, `date` (YYYY-MM-DD), `summary`, `tags`.
Workflow visé : à la fin d'une session de dev, demander à Claude de générer
cette note (ton honnête, ce qui a marché / coincé), commit, push.

**Mettre à jour "now"** → éditer `src/app/now/page.tsx`.

**Sync activité GitHub** → `GITHUB_USER=Wieedze bun run sync:activity`
(ajouter `GITHUB_TOKEN` pour le rate limit). Idéalement en cron / GitHub
Action qui commit `src/content/activity.json`.

## Dev

```bash
bun install
bun run dev      # http://localhost:3000
bun run build    # build prod (standalone)
```

## Déploiement Coolify

Pointer Coolify sur le repo, build via le `Dockerfile` (rien d'autre à
configurer). Adapter la constante `SITE` dans `src/app/layout.tsx` au domaine
réel pour que les cards Open Graph (LinkedIn/X) marchent.

## Posture éditoriale — NE PAS DÉVIER

- Jamais « expert ». Toujours trajectoire / exploration / apprentissage.
- Sofia = vitrine n°1 (seul vrai produit en prod, vrais users, grant).
- Honnêteté sur l'expérience (1 an de dev), valorisée comme vitesse
  d'apprentissage, pas masquée.
- Pas de positionnement « accélérateur de projets d'autrui » : prématuré.

## Pont LinkedIn (manuel, volontairement)

L'API LinkedIn ne permet pas de publication auto propre (CGU + risque ban).
Workflow : on publie une note ici → on demande à Claude un post LinkedIn dérivé
(ton building-in-public, lien vers l'article) → copier/coller/publier à la main.
Le site reste la source de vérité qu'on possède.
