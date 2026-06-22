# Design — Moteur data-driven pour les guides de rôle + déploiement des 4 rôles restants

**Date :** 2026-06-22
**Statut :** validé en brainstorming, en attente de relecture utilisateur
**Auteur :** Claude + louistinti

## Objectif

Produire les 4 guides de rôle restants (ADC, Top, Mid, Jungle) pour Learning Leagues,
sans dupliquer 5× le code ni laisser les pages diverger. Pour cela, on généralise
d'abord le template Support en un **moteur data-driven** (sections génériques + données
par rôle), puis on l'alimente rôle par rôle.

`Support.html` est la page de référence existante et sert de pilote : sa refacto valide
le moteur contre une page déjà connue-bonne, sans nouveau contenu à inventer.

## Décisions arrêtées (brainstorming)

| Sujet | Décision |
|-------|----------|
| Source du contenu | Je recherche (web + patch notes Riot), l'utilisateur valide les faits avant merge |
| Architecture | Moteur data-driven : composants de section génériques + 1 fichier de données par rôle |
| Rythme | Support refactoré en pilote pour bâtir/valider le moteur, puis les 4 rôles un par un |
| Ordre des rôles | ADC → Top → Mid → Jungle |
| Accent visuel | Activer l'axe `[data-role]` : un token d'accent signature par rôle (Support garde `ambre`) |

## Architecture

### Composants de section génériques

Nouveau fichier `role-sections.jsx`, extrait de `sections-01-03.jsx` / `04-06` / `07-11`.
Chaque section ne porte plus de contenu, seulement la mise en page, et reçoit ses données en props :

- `<SectionPhases phases={…} />` — les 3 cartes de phase (titre, timer, items)
- `<SectionMap pins={…} mapSrc lede />` — map annotée ; les coordonnées de pins sont en data
- `<SectionSkills skills={…} />`
- `<SectionTriangle triangle={…} />` — les 3 archetypes du rôle
- `<SectionErrors errors={…} />` — réutilise `<ErrorCard>`
- `<SectionChampions champions={…} />`
- `<SectionBuild build={…} />`
- `<SectionMatchups matchups={…} />` — placeholder structurel tant que l'import de matchups n'est pas fait (pas de `<MatchupRow>` ni colonne Priority pour l'instant)
- `<SectionChecklist items={…} />`
- `<SectionPractice creators={…} />`

Les atomes partagés existants (`<Gloss>`, `<Callout>`, `<ErrorCard>`, `<Nav>`,
`<TocSidebar>`, `<SectionHead>`, `<Breadcrumb>`, `<Footer>`) restent dans `components.jsx`
et sont consommés par les sections génériques.

### Données par rôle

Un fichier par rôle : `role-support.jsx`, `role-adc.jsx`, `role-top.jsx`,
`role-mid.jsx`, `role-jungle.jsx`. Chacun expose un seul objet sur `window` :

```js
window.ROLE_DATA = {
  meta:    { key: "support", title, heroLede, activeKey: "roles", accent: "ambre" },
  phases:  [ … ],
  pins:    [ … ],        // map
  skills:  [ … ],
  triangle:[ … ],
  errors:  [ … ],
  champions: [ … ],
  build:   { … },
  matchups: [ … ],       // placeholder pour l'instant
  checklist: [ … ],
  creators: [ … ],       // §11 — créateurs vidéo committés pour le rôle
};
```

Les data partagées (`LL_TIERS`, `LL_GLOSSARY`, `CALLOUT_TYPES`) restent dans
`components.jsx`. Tout terme LoL nouveau est ajouté à `LL_GLOSSARY` avant d'être référencé
(il apparaît alors automatiquement sur `Glossary.html`).

### Pages HTML

Chaque page rôle (`Support.html`, `ADC.html`, `Top.html`, `Mid.html`, `Jungle.html`)
est structurellement identique : mêmes scripts partagés + son seul `role-<x>.jsx` + un
`app.jsx` générique qui lit `window.ROLE_DATA` et assemble TOC + sections + hero.
L'attribut racine `data-role="<x>"` pilote l'accent.

## Plan de réalisation

### Phase 1 — Refacto moteur (pilote Support, zéro nouveau contenu)
1. Extraire les sections de Support vers `role-sections.jsx` (génériques, props).
2. Déplacer tout le contenu Support actuel dans `role-support.jsx` (`window.ROLE_DATA`).
3. Rendre `app.jsx` générique (lit `ROLE_DATA`).
4. Ajouter l'axe `[data-role]` dans `styles.css` (token d'accent par rôle, Support = `ambre`).
5. **Critère de succès :** le Support refactoré rend identique à l'actuel (vérif preview + screenshot avant/après, console sans erreur).

### Phase 2 — Les 4 rôles, un par un (ADC → Top → Mid → Jungle)
Pour chaque rôle, sur sa propre branche :
1. Recherche (web + patch notes Riot pour chiffres/timings/champions/orthographes).
2. Rédaction du `role-<x>.jsx` + `<X>.html`, selon les règles de voix.
3. Ajout des termes manquants à `LL_GLOSSARY`, du lien Nav dans le dropdown Roles, de l'accent du rôle.
4. **Checkpoint validation :** je présente les faits clés (champions, builds, timings) à l'utilisateur ; merge seulement après validation.

## Règles de voix (rappel, à respecter sur tout contenu)
- Pas d'em-dash en milieu de phrase (point ou deux-points).
- Pas de lede en fragment ; commencer par sujet + verbe.
- Max 2 items par énumération en prose, sauf si le compte est structurel.
- Pas de citation fabriquée en `<blockquote>` ; si non attribuée, on coupe.
- Positionnement anti-grift du README.

## Hors-scope (YAGNI)
- `<MatchupRow>` + colonne Priority : attend l'import de matchups par l'utilisateur.
- `<TierBadge>` atomique : seulement si un rôle en a besoin.
- Refacto non liée à ce travail.

## Critères de succès globaux
- Un seul jeu de composants de section à maintenir pour 5 rôles.
- Support refactoré identique à l'original.
- Chaque nouveau rôle suit la même séquence de sections et passe le checkpoint de validation factuelle.
- Aucune régression de voix ni d'accessibilité par rapport à Support.
