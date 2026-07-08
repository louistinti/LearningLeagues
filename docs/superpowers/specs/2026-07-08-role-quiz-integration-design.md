# Role Quiz — Integration Design

**Date:** 2026-07-08
**Status:** Approved for planning

## Goal

Ship the **Role Quiz** into the live Learning Leagues site. The quiz is already
fully designed in a Claude Design handoff bundle
(`C:\Users\goldy\Downloads\Learning Leagues-handoff\learning-leagues\project\`).
This is an **integration**, not a design task: recreate the handoff faithfully,
wired onto the *current* codebase — nothing more.

The quiz answers the site's long-standing "Role quiz" placeholders (nav CTA and
landing hero button), helping a MOBA-savvy beginner find which of the five roles
suits them.

## What the handoff provides (keep faithfully)

- **Flow:** intro → 8 questions (one per screen) → result ranking all **5 roles**
  with score bars.
- **Content:** 8 questions (4 `SCENARIO` + 4 `PERSONALITY`), per-role answer
  weights, and per-role verdict blurbs — already in the site's editorial voice.
- **UX:** progress bar, back button, keyboard shortcuts (A/B/C/D + Backspace),
  `localStorage` persistence (`ll-quiz-v1`), screen transitions, and
  `prefers-reduced-motion` handling.
- **CSS:** `quiz.css`, `.qz-*` namespaced, built on existing `styles.css` tokens.

The handoff was exported from an **older snapshot** of the project. It contains
artifacts that must be reconciled to today's codebase: `data-palette="hextech"`,
an inline `QuizNav`/`LangSwitcher`, `Landing.html` links, `styles.css?v=5`, and
a three-way question-style **exploration switcher**.

## Decision: question style

The handoff shipped a floating `QzSwitcher` offering three question-screen
styles (ledger / cards / split) for exploration. Production freezes **Ledger**
(question on top, four full-width answer rows) and removes the switcher.

## Scope — files

### New files (in repo root)

- **`Quiz.html`** — `<html lang="en" data-density="compact" data-accent="ambre">`
  (no `data-palette`). Loads `styles.css` then `quiz.css`, then
  `components.jsx` → `quiz-data.jsx` → `quiz-app.jsx`. Title "Role Quiz —
  Learning Leagues".
- **`quiz-data.jsx`** — content copied verbatim, except role `href`s wired to the
  real guides: `Top.html`, `Jungle.html`, `Mid.html`, `ADC.html`, `Support.html`
  (currently `top/jungle/mid/adc` are `"#"`).
- **`quiz-app.jsx`** — intro → 8Q → result flow, **Ledger only**. Remove
  `QzSwitcher`, `QzOptionCards`, and the split/cards branches of `QzQuestion`;
  keep `QzOptionRows`. Use the shared `<Nav activeKey="quiz">` and `<Footer>`
  from `components.jsx` instead of the inline `QuizNav`. Keep the handoff's inline
  `QuizBreadcrumb` ("Home › Role quiz") verbatim.
- **`quiz.css`** — copied verbatim, minus the `.qz-switcher*` rules (the only
  removal, since the switcher component is gone). No other edits.

### Modified files

- **`components.jsx`** — the `<Nav>` CTA `Role quiz →` becomes
  `<a className="nav-cta" href="Quiz.html">` and gains an active state when
  `activeKey === "quiz"`.
- **`landing.jsx`** — the hero *Role quiz* ghost button and the `LandingNav`
  `Role quiz →` CTA both point to `Quiz.html`.
- **`README.md`** — one line documenting `Quiz.html`.

## Out of scope

- No cosmetic "house-style" tweaks to the handoff CSS/markup (e.g. no
  `var(--nav-h)` swap, no breadcrumb restyle). Faithful and minimal.
- The landing "Train your skills" section (`/training`) and the Champions/Macro
  placeholder links are untouched.

## Data flow

`quiz-app.jsx` holds all state (`screen`, `index`, `answers`, `variant` fixed to
`ledger`), persisted to `localStorage`. On each answer it appends to `answers`
and advances; after Q8 it calls `quizComputeScores(answers)` from `quiz-data.jsx`,
which sums per-answer weights into per-role scores and returns the five roles
sorted descending (ties broken by canonical order). The result screen renders the
ranking with animated bars and a CTA to the top role's guide.

## Testing / verification

No build step (in-browser Babel). Verify by serving the site and driving the
quiz end-to-end: intro → answer all 8 → result; check the ranking CTA links to
the correct role guide, the nav/hero CTAs reach `Quiz.html`, keyboard shortcuts
and back button work, and a reload mid-quiz restores progress.
