# Learning Leagues

A static site to teach **League of Legends** properly — from MOBA-savvy beginner to confident Bronze, structured by role with no jargon and no chasing the meta.

> Live: <https://louistinti.github.io/LearningLeagues/>

## What's here

- `index.html` — landing page (hero, fundamentals, 5-roles grid, training, resources)
- `Support.html` — first complete role guide (phases, map, archetypes, errors, champions, build, matchups, checklist, practice)
- `Fundamentals.html` — base-layer guide (map, items, runes, vision, wave management, neutral objectives)
- `landing.jsx`, `app.jsx`, `components.jsx`, `fundamentals.jsx`, `sections-*.jsx` — React components transpiled in-browser via Babel
- `styles.css` — Hextech design system: tokens swap via `[data-palette]`, `[data-density]`, `[data-accent]` on `<html>`
- `DesignSystem.html` + `design-system.{css,jsx}`, `ds-foundations.jsx`, `ds-components.jsx`, `ds-patterns.jsx` — visual reference page for the design system (foundations, components, patterns). Not linked from the live site; open the URL directly.
- `assets/sr-map-clean.png` — Summoner's Rift map used by Section 02

No build step. The pages load React + ReactDOM + Babel-standalone from a CDN and transpile the JSX at runtime.

## Local development

PowerShell static server (Windows):

```powershell
./serve.ps1
```

Then open <http://localhost:8000/index.html>. `start-server.bat` is a double-click wrapper.

Any other static-file server works too (e.g. `python -m http.server 8000`, `npx serve`).

## Deployment

Pushed to `main` → GitHub Pages serves it from the repo root. No CI step.

## Design system

Three palettes (`hextech` default, `codex`, `esport`), three accents (`or`, `ambre`, `bleu`), two densities (`aere`, `compact`). Set on `<html>` directly:

```html
<html lang="en" data-palette="hextech" data-density="compact" data-accent="ambre">
```

CSS reads the data-attrs to swap tokens. EB Garamond for serif, Inter for sans, JetBrains Mono for the eyebrows.

Full visual reference at `DesignSystem.html` (open the URL directly — it isn't linked from the site nav). Three tabs: **Foundations** (color, type, spacing, borders, icons), **Components** (buttons, inputs, tags, tabs, cards, charts), **Patterns** (lesson cards, tier display, leaderboard, stat strip, empty state).
