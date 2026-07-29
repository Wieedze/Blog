# Brief — Refonte wieedze.com

> À exécuter par Claude Code dans le repo du portfolio.
> **Commence par détecter la stack réelle** (framework, routing, système de contenu, styling) avant de proposer quoi que ce soit. Les chemins de routes ci-dessous sont indicatifs, adapte-les aux conventions du projet.

---

## 1. Objectif

Le site actuel est correct mais c'est une liste de projets. Il ne raconte pas une personne et il n'a aucune sortie commerciale. On ajoute : une page hackathons, un récit (Story + Timeline), un point de contact, et une passe visuelle — **dans cet ordre**.

## 2. Référence

`https://kilian.solutions/` — portfolio d'un dev web3 du même écosystème.

**Ce qu'on prend :**
- Structure narrative en deux blocs : « The Story » (chapitres numérotés, qualitatif) puis « The Timeline » (jalons datés, factuel).
- Une page `/hackathons` en navigation principale, utilisée comme CTA hero à la place de `/projects`.
- Une photo réelle + prénom réel.
- Un CTA contact persistant en nav.
- Le soin apporté au motion (marquee de mots-clés, scroll reveal, chapitres numérotés).

**Ce qu'on NE prend PAS :**
- Le ton. Le sien est mystique-autobiographique. Le nôtre est sobre, factuel, adossé à des artefacts (liens repo / demo / on-chain). Pas de storytelling grandiloquent.
- Les formules creuses type « I craft digital experiences at the intersection of… ».

## 3. État actuel (à conserver)

Routes existantes : `/`, `/projects`, `/journal`, `/now`, `/activity`.
Positionnement actuel : « Let's build, in public » / « Not an expert, an experimenter ». **À garder** — c'est plus distinctif que la référence.
Les cartes projet ont déjà : titre, statut (live/building/shipped), pitch une ligne, stack. **Réutiliser ce composant** comme base pour les cartes hackathon.

---

## 4. Plan d'exécution

### Sprint 0 — Modèle de données (à faire en premier, sans UI)

Créer les fichiers de contenu typés (`content/hackathons.*` et `content/timeline.*`, format à aligner sur l'existant du repo).

```ts
type Hackathon = {
  slug: string
  event: string            // "ETHGlobal Cannes"
  city: string
  date: string             // ISO
  duration: string         // "48h"
  team: string[]           // [] si solo
  project: string
  pitch: string            // une phrase
  stack: string[]
  sponsors: string[]       // tracks visées
  result: 'winner' | 'finalist' | 'submitted'
  prize?: string
  links: { repo?: string; demo?: string; showcase?: string }
  media: string[]          // screenshots
  learned: string          // OBLIGATOIRE
}

type Milestone = {
  year: string
  title: string
  context: string          // lieu ou cadre, ex. "Marseille" / "Crypto winter"
  body: string             // 2-3 phrases max
  link?: string
}
```

Le champ `learned` est **non négociable** : c'est le seul truc que la référence n'a pas. Exemple attendu sur Cannes : le retour jury (pitch trop vague, pas de smart contract dans le repo, PMF questionnée) écrit explicitement. Assumer les échecs, c'est le différenciant.

### Sprint 1 — `/hackathons`

- Route + entrée dans la nav principale.
- Grille de cartes (dérivée du composant carte projet) + page détail par slug.
- Le CTA hero passe de « View projects » à « View my work » → `/hackathons`.
- Entrées de départ : voir §5.

### Sprint 2 — `/contact`

Le plus petit effort du lot. Bouton « Let's talk » en nav (haut droite), page dédiée : email, lien de prise de RDV, X, GitHub, LinkedIn. **Une ligne explicite sur ce qui est cherché** (mission freelance / contribution écosystème / coéquipier hackathon). Aujourd'hui il n'y a aucun chemin pour quelqu'un qui veut proposer du travail.

### Sprint 3 — Story + Timeline sur la home

Deux sections distinctes, sous le hero, au-dessus de « Selected work ».

- **Story** : 4 chapitres numérotés max. Fil narratif : production musicale / spectacle vivant → formation dev → web3 → construire en public. L'angle son-et-composabilité (chaîne de traitement, modules, presets) est le hook — personne d'autre dans cet écosystème n'a ce parcours.
- **Timeline** : jalons datés, purement factuels, un échec minimum dedans.

⚠️ **Ne pas rédiger ce contenu.** Générer la structure, les composants et des placeholders explicites `TODO(maxime)`. Le texte sera écrit à la main.

### Sprint 4 — Passe visuelle (en dernier, quand le texte est figé)

- Photo portrait dans le hero ou en fin de home.
- Bande marquee de mots-clés (à adapter au vocabulaire réel : Intuition, ERC-7710, delegation, agents, reputation…).
- Scroll reveal sur les chapitres, numérotation visible, indicateur de scroll.
- Respecter `prefers-reduced-motion`.

---

## 5. Contenu connu (à vérifier avant de l'écrire en dur)

**Hackathons**
| Event | Projet | Résultat |
|---|---|---|
| ETHGlobal Cannes 2026 | WisPear / prompt-registry | soumis — retour jury à documenter |
| Hackathon Gnosis / Circles | TheKitty (cagnottes on-chain, CRC) | 2e place |
| ETHGlobal Lisbon 2026 (24–26 juillet) | A2A delegation streaming sur Ourglass (ERC-7710, sans ERC-4337), tracks ENS + The Graph | `TODO` — résultat à confirmer |
| Wonderland CTF @ EthCC | — | participation |

**Jalons timeline** (à compléter/dater)
- Formation The Hacking Project
- Arrivée dans l'écosystème Intuition (~1 an)
- Intuition FeeProxy (factory UUPS pour MultiVault)
- Sofia : 2000+ commits, grant Intuition, extension Chrome, produit live
- Mission décrochée avec un DAO
- Ourglass : paiements récurrents pour trésoreries Safe, fork ERC-7710, multi-chain
- ARP : couche de réputation on-chain pour agents (ERC-8004 + Intuition), SDK publié `@arp-protocol/sdk`
- TrackHunter : outil DJ (side project, à relier à l'angle musique)

**Ne rien inventer.** Toute date ou tout résultat non confirmé → `TODO(maxime)` visible.

---

## 6. Contraintes

- Ton : sobre, factuel, chaque affirmation adossée à un lien vérifiable. Pas de superlatifs.
- Pas de dépendance lourde ajoutée pour l'animation sans validation.
- Accessibilité : contraste, focus visible, reduced-motion.
- Anglais pour le site (cohérent avec l'existant).
- Livrer sprint par sprint, avec un commit par sprint. Ne pas tout attaquer d'un coup.
