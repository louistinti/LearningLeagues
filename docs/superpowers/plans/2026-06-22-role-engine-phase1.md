# Role-Guide Engine — Phase 1 (pilote Support) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the existing Support page into a data-driven engine (generic section components + a single per-role data file) without changing what renders, so the 4 remaining role guides become data-only.

**Architecture:** Generic section components live in `role-sections.jsx` and take their content via props. All Support content moves verbatim into `role-support.jsx`, which exposes `window.ROLE_DATA`. A generic `app.jsx` reads `ROLE_DATA`, renders only the sections whose data key is present (in a fixed `SECTION_ORDER`), derives section numbers/ids and the TOC from the rendered set, and feeds `meta` into the chrome (Hero / Breadcrumb / TocSidebar). A new `[data-role]` axis in `styles.css` drives the per-role accent.

**Tech Stack:** React 18 + Babel-standalone in-browser (no build step, no test runner). Verification is done in the live preview via `preview_eval` (DOM/structure assertions) and `preview_screenshot` against a baseline captured before any refactor.

**Cross-file convention (do not remove):** each `text/babel` script is transpiled and executed separately, so top-level `const`/`function` bindings are NOT shared across files. Every file that defines something another file needs MUST expose it via `Object.assign(window, { … })` at its end (this is why the existing files do it). Bare references like `SectionHead` resolve only because they are window properties. Script load order in `Support.html` is significant: `components.jsx` → `role-sections.jsx` → `role-support.jsx` → `app.jsx`.

**Success criterion for the whole phase:** the refactored Support page renders identically to the pre-refactor baseline (same visible structure, same screenshot, zero console errors).

---

## File structure (after Phase 1)

- `role-sections.jsx` — **create.** Generic section components (`SectionPhases`, `SectionMap`, `SectionSkills`, `SectionTriangle`, `SectionCallouts`, `SectionErrors`, `SectionChampions`, `SectionBuild`, `SectionMatchups`, `SectionChecklist`, `SectionPractice`) + `ChampionPortrait`. All take props.
- `role-support.jsx` — **create.** `window.ROLE_DATA` for Support (all content moved verbatim from the old section files + Hero/Breadcrumb/TOC meta).
- `app.jsx` — **rewrite.** Generic composition reading `ROLE_DATA`.
- `components.jsx` — **modify.** `Hero`, `Breadcrumb`, `TocSidebar` become prop-driven; `DDRAGON_VER` constant added; `Object.assign` export updated.
- `styles.css` — **modify.** Add `[data-role]` accent axis.
- `Support.html` — **modify.** `data-role="support"` on `<html>`; swap the three `sections-*.jsx` script tags for `role-sections.jsx` + `role-support.jsx`.
- `sections-01-03.jsx`, `sections-04-06.jsx`, `sections-07-11.jsx` — **delete** (content absorbed).

---

## Task 1: Capture the baseline

**Files:** none (verification artifact only).

- [ ] **Step 1: Start the preview server and open Support**

Use `preview_start` with name `learning-leagues`. Then `preview_eval` with expression:
```js
window.location.href = '/Support.html'; 'navigating'
```

- [ ] **Step 2: Capture the structural baseline**

Run `preview_eval` with this expression and save the returned JSON verbatim into the plan's scratch notes — it is the equality target for Task 9:
```js
JSON.stringify({
  sectionIds: [...document.querySelectorAll('section.section.shell')].map(s => s.id),
  sectionTitles: [...document.querySelectorAll('.section-title')].map(t => t.textContent),
  tocLabels: [...document.querySelectorAll('.toc-text')].map(t => t.textContent),
  heroTitle: document.querySelector('.hero h1')?.textContent,
  breadcrumbCurrent: document.querySelector('.breadcrumb .current')?.textContent,
  errorCount: document.querySelectorAll('.error-card').length,
  champCount: document.querySelectorAll('.champ-card').length,
  matchupRows: document.querySelectorAll('.matchup-table tbody tr').length,
  checklistItems: document.querySelectorAll('.checklist li').length,
})
```
Expected: 11 sectionIds `s01..s11`, 11 tocLabels, heroTitle `Support.`, breadcrumbCurrent `Support`, errorCount 6, champCount 3, matchupRows 5, checklistItems 10.

- [ ] **Step 3: Capture a visual baseline**

Run `preview_screenshot` and keep the image as the visual reference for Task 9.

- [ ] **Step 4: Confirm clean console**

Run `preview_console_logs` with `level: "error"`. Expected: "No console logs."

---

## Task 2: Add `DDRAGON_VER` constant and make chrome prop-driven in `components.jsx`

**Files:**
- Modify: `components.jsx` (Hero, Breadcrumb, TocSidebar, exports)

- [ ] **Step 1: Add the Data Dragon version constant near the top of `components.jsx`** (just after the `LL_TIERS` array, before `LL_GLOSSARY`):

```js
// Data Dragon patch version for champion portraits (single source of truth).
const DDRAGON_VER = "14.23.1";
```

- [ ] **Step 2: Replace `Hero` with a prop-driven version**

Replace the entire `function Hero() { … }` block with:
```js
function Hero({ eyebrow, title, intro, meta = [], sigil, sigilLabel }) {
  return (
    <section className="hero">
      <div className="shell">
        <div className="hero-grid">
          <div>
            <div className="eyebrow hero-eyebrow">{eyebrow}</div>
            <h1 className="serif">{title}<em>.</em></h1>
            <p className="hero-intro">{intro}</p>
            <div className="hero-meta">
              {meta.map((m, i) => <span key={i}>{m}</span>)}
            </div>
          </div>
          <div className="hero-sigil" aria-hidden="true">
            {sigil}
            <span className="tag">{sigilLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
```
Note: `title` is the role name without the trailing period (the `<em>.</em>` is added by the component). `meta` is an array of JSX/strings. `sigil` is a JSX SVG node supplied by the role data.

- [ ] **Step 3: Replace `Breadcrumb` with a prop-driven version**

Replace the entire `function Breadcrumb() { … }` block with:
```js
function Breadcrumb({ current }) {
  return (
    <div className="shell">
      <div className="breadcrumb">
        <a href="index.html">Home</a>
        <span className="sep">›</span>
        <a href="#">Roles</a>
        <span className="sep">›</span>
        <span className="current">{current}</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Replace `TocSidebar` to take `items` as a prop**

In `function TocSidebar(...)`, change the signature and delete the hardcoded `items` array. Replace:
```js
function TocSidebar() {
  const items = [
    { id: "s01", num: "01", label: "Phases" },
    { id: "s02", num: "02", label: "Map" },
    { id: "s03", num: "03", label: "Skills" },
    { id: "s04", num: "04", label: "Triangle" },
    { id: "s05", num: "05", label: "Prio lvl 2" },
    { id: "s06", num: "06", label: "Mistakes" },
    { id: "s07", num: "07", label: "Champions" },
    { id: "s08", num: "08", label: "Build" },
    { id: "s09", num: "09", label: "Matchups" },
    { id: "s10", num: "10", label: "Checklist" },
    { id: "s11", num: "11", label: "Practice" },
  ];
  const [active, setActive] = React.useState("s01");
```
with:
```js
function TocSidebar({ items = [] }) {
  const [active, setActive] = React.useState(items[0]?.id);
```
Leave the rest of `TocSidebar` unchanged.

- [ ] **Step 5: Update the `Object.assign(window, …)` export at the bottom of `components.jsx`**

Add `DDRAGON_VER` to the exported list:
```js
Object.assign(window, { LogoMark, Nav, Breadcrumb, SectionHead, Hero, Footer, LangSwitcher, TocSidebar, Gloss, Callout, ErrorCard, LL_TIERS, LL_GLOSSARY, CALLOUT_TYPES, DDRAGON_VER });
```

- [ ] **Step 6: Commit**

```bash
git add components.jsx
git commit -m "refactor(engine): make Hero/Breadcrumb/TocSidebar prop-driven, add DDRAGON_VER"
```
(The page is intentionally broken between commits until app.jsx is rewired — that is expected; the equality check happens at Task 9.)

---

## Task 3: Create `role-sections.jsx` with generic section components

**Files:**
- Create: `role-sections.jsx`

Each component takes `num` and `id` props (derived by `app.jsx`) plus its data. The `SectionTriangle` takes `nodes` (3 entries) and `legend` (array of `{strong, rest}`), and keeps the exact arrow geometry from the old `sections-04-06.jsx`. `SectionCallouts` is the renamed generic of the old `SectionPrio2`. `SectionChecklist` takes a `storageKey` so each role persists separately.

- [ ] **Step 1: Create `role-sections.jsx` — header + `ChampionPortrait` + the simple list sections**

```js
// role-sections.jsx — generic, prop-driven section components for every role guide.

function ChampionPortrait({ name, label }) {
  const [failed, setFailed] = React.useState(false);
  const src = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VER}/img/champion/${name}.png`;
  return (
    <div className="champ-portrait" data-fallback={failed ? "1" : "0"}>
      {!failed && (
        <img src={src} alt={`${name} portrait`} onError={() => setFailed(true)} loading="lazy" />
      )}
      {failed && <span className="placeholder-label">{label}</span>}
    </div>
  );
}

function SectionPhases({ num, id, title, lede, phases }) {
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <div className="phase-grid">
        {phases.map((p, i) => (
          <article key={i} className="phase-card">
            <div className="phase-hd">
              <h3 className="phase-title serif">{p.title}</h3>
              <span className="phase-timer mono">{p.timer}</span>
            </div>
            <ol className="phase-list">
              {p.items.map((it, j) => <li key={j}>{it}</li>)}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}

function SectionSkills({ num, id, title, lede, skills }) {
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <div className="skills-grid">
        {skills.map((s, i) => (
          <article key={i} className="skill">
            <span className="skill-num">0{i + 1} / 0{skills.length}</span>
            <h3 className="skill-title serif">{s.title}</h3>
            <p className="skill-desc">{s.desc}</p>
            <a className="skill-link" href="#">{s.link} →</a>
          </article>
        ))}
      </div>
    </section>
  );
}
```
Note: the old `SectionSkills` hardcoded `/ 04`; deriving `0${skills.length}` keeps it correct for any count (Support has 4).

- [ ] **Step 2: Add `SectionMap` (copy the pin/legend logic verbatim, parameterized)**

```js
function SectionMap({ num, id, title, lede, pins, mapSrc, mapAlt, mapCredit, legendTitle }) {
  const [active, setActive] = React.useState(null);
  const legendPins = pins.filter((p, i) => pins.findIndex((q) => q.n === p.n) === i);
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <div className="map-wrap">
        <div className="map-frame">
          <div className="map-corners"><span></span><span></span><span></span><span></span></div>
          <img className="map-image" src={mapSrc} alt={mapAlt} />
          {pins.map((p, i) => (
            <button
              key={`${p.n}-${i}`}
              className="map-pin"
              style={{ left: p.x + "%", top: p.y + "%" }}
              data-active={active === p.n ? "1" : "0"}
              onMouseEnter={() => setActive(p.n)}
              onMouseLeave={() => setActive(null)}
              aria-label={`Point ${p.n}: ${p.short}`}
            >
              {p.n}
            </button>
          ))}
          <span className="map-credit">
            <span className="accent">©</span> {mapCredit}
          </span>
        </div>
        <aside className="map-legend">
          <h4>{legendTitle}</h4>
          {legendPins.map((p) => (
            <div
              key={p.n}
              className="legend-item"
              data-active={active === p.n ? "1" : "0"}
              onMouseEnter={() => setActive(p.n)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="legend-num">0{p.n}</span>
              <span className="legend-text">
                <strong>{p.short}</strong>{p.long ? ` — ${p.long}` : null}
              </span>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add `SectionTriangle` — copy the full arrow geometry verbatim, parameterize nodes/legend**

Copy the entire body of the old `SectionTriangle` from `sections-04-06.jsx` (refs, `useLayoutEffect`, the `compute()` arrow math, the SVG and `renderArrow` block) UNCHANGED, with only these differences:
- Signature: `function SectionTriangle({ num, id, title, lede, nodes, legend })`.
- Delete the hardcoded `const nodes = {…}` — it now comes from props. The prop `nodes` must have the same shape: `{ poke:{corner,label,champs,x,y}, engage:{…}, enchanter:{…} }`. The refs (`pokeRef`/`engageRef`/`encRef`) and the keys `poke`/`engage`/`enchanter` stay as the canonical archetype keys; assign refs inside the component by key:
```js
  const pokeRef = React.useRef(null);
  const engageRef = React.useRef(null);
  const encRef = React.useRef(null);
  const refByKey = { poke: pokeRef, engage: engageRef, enchanter: encRef };
```
and in the node map use `ref={refByKey[key]}` instead of `n.ref`.
- `<SectionHead num={num} title={title} lede={lede} />` instead of the hardcoded `num="04"`.
- Replace the hardcoded `<aside className="triangle-legend">` paragraphs with:
```js
        <aside className="triangle-legend">
          <h4>How to read the triangle</h4>
          {legend.map((l, i) => (
            <p key={i}><strong>{l.strong}</strong> {l.rest}</p>
          ))}
        </aside>
```

- [ ] **Step 4: Add `SectionCallouts`, `SectionErrors`, `SectionChampions`**

```js
function SectionCallouts({ num, id, title, lede, callouts }) {
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <div className="callout-grid">
        {callouts.map((c, i) => (
          <Callout key={i} type={c.type} title={c.title}>{c.body}</Callout>
        ))}
      </div>
    </section>
  );
}

function SectionErrors({ num, id, title, lede, errors }) {
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <div className="errors-grid">
        {errors.map((e, i) => (
          <ErrorCard key={i} title={e.title} symptom={e.s} cause={e.c} fix={e.f} />
        ))}
      </div>
    </section>
  );
}

function SectionChampions({ num, id, title, lede, champions }) {
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <div className="champ-grid">
        {champions.map((c) => (
          <article key={c.name} className="champ-card">
            <ChampionPortrait name={c.name} label={`PORTRAIT · ${c.name.toUpperCase()}`} />
            <div className="champ-body">
              <div className="champ-meta">
                <span className="tag">{c.tag}</span>
                <span>Diff · {c.diff}</span>
              </div>
              <h3 className="champ-name serif">{c.name}</h3>
              <p className="champ-desc">{c.desc}</p>
              <a className="champ-link" href="#">Full profile →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Add `SectionBuild` (archetype tabs), `SectionMatchups`, `SectionChecklist`, `SectionPractice`**

```js
function SectionBuild({ num, id, title, lede, build }) {
  const keys = Object.keys(build);
  const [archetype, setArchetype] = React.useState(keys[0]);
  const cur = build[archetype];
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <div className="archetype-switch" role="tablist" aria-label="Archetype">
        {keys.map((k, i) => (
          <button
            key={k}
            role="tab"
            aria-selected={archetype === k}
            className={"archetype-tab" + (archetype === k ? " is-active" : "")}
            onClick={() => setArchetype(k)}
          >
            <span className="mono tag">0{i + 1}</span>
            <span className="label serif">{build[k].label}</span>
          </button>
        ))}
      </div>
      <div className="build-grid">
        <div className="build-block">
          <h3 className="serif">Default runes<span className="tag">{cur.label}</span></h3>
          <dl>
            {cur.runes.map(([k, v], i) => (
              <div key={i} className="build-row"><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
        <div className="build-block">
          <h3 className="serif">Build path<span className="tag">{cur.label}</span></h3>
          <dl>
            {cur.build.map(([k, v], i) => (
              <div key={i} className="build-row"><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function SectionMatchups({ num, id, title, lede, matchups }) {
  const pillClass = (d) => "pill pill--" + d.toLowerCase();
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <table className="matchup-table">
        <thead>
          <tr><th>Matchup</th><th>Difficulty</th><th>You win if…</th><th>You lose if…</th></tr>
        </thead>
        <tbody>
          {matchups.map((r, i) => (
            <tr key={i}>
              <td data-label="Matchup" className="m-name">{r[0]}</td>
              <td data-label="Difficulty" className="m-diff"><span className={pillClass(r[1])}>{r[1]}</span></td>
              <td data-label="You win if" className="m-win"><b>{r[2]}</b></td>
              <td data-label="You lose if" className="m-lose">{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function SectionChecklist({ num, id, title, lede, storageKey, items, threshold = 8 }) {
  const [checked, setChecked] = React.useState(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return Array(items.length).fill(false);
  });
  React.useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(checked)); } catch (e) {}
  }, [checked]);
  const toggle = (i) => setChecked(checked.map((v, j) => (i === j ? !v : v)));
  const count = checked.filter(Boolean).length;
  const ready = count >= threshold;
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <div className="checklist-wrap">
        <div className="checklist-progress">
          <div className="progress-num">{count}<span className="of">/{items.length}</span></div>
          <div className="progress-label">Validated · saved locally</div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${(count / items.length) * 100}%` }} />
          </div>
          <p className={"progress-readout" + (ready ? " ready" : "")}>
            {ready
              ? `✓ Threshold reached. You're ready to queue ranked over 3 games in a row.`
              : `${threshold - count} more point${threshold - count > 1 ? "s" : ""} before launching ranked`}
          </p>
        </div>
        <ul className="checklist" role="list">
          {items.map((txt, i) => (
            <li
              key={i}
              className={checked[i] ? "done" : ""}
              onClick={() => toggle(i)}
              onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(i); } }}
              tabIndex="0"
              role="checkbox"
              aria-checked={checked[i]}
            >
              <span className="checklist-box" aria-hidden="true"></span>
              <span className="checklist-text">{txt}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SectionPractice({ num, id, title, lede, videos = [], drills = [] }) {
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <div className="practice-grid">
        {videos.map((v, i) => (
          <article key={i} className="video-card">
            <div className="video-thumb"><span className="video-duration">{v.duration}</span></div>
            <span className="video-meta">Video · {v.creator}</span>
            <h3 className="video-title serif">{v.title}</h3>
            <p className="exercise-text">{v.desc}</p>
          </article>
        ))}
      </div>
      <div className="exercises">
        {drills.map((d, i) => (
          <article key={i} className="exercise">
            <span className="exercise-tag">{d.tag}</span>
            <h4 className="exercise-title serif">{d.title}</h4>
            <p className="exercise-text">{d.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Add the window export at the end of `role-sections.jsx`**

```js
Object.assign(window, {
  ChampionPortrait, SectionPhases, SectionMap, SectionSkills, SectionTriangle,
  SectionCallouts, SectionErrors, SectionChampions, SectionBuild, SectionMatchups,
  SectionChecklist, SectionPractice,
});
```

- [ ] **Step 7: Commit**

```bash
git add role-sections.jsx
git commit -m "feat(engine): generic prop-driven section components"
```

---

## Task 4: Create `role-support.jsx` with `window.ROLE_DATA`

**Files:**
- Create: `role-support.jsx`

Move all Support content from the old files into one object. **Move text/JSX verbatim** — do not rewrite copy (voice is already validated). Source of each field is named below.

- [ ] **Step 1: Scaffold the file and `meta` block**

```js
// role-support.jsx — content for the Support role guide. window.ROLE_DATA.

const ROLE_DATA = {
  meta: {
    key: "support",
    activeKey: "roles",
    eyebrow: <>ROLE <span className="dot"></span> SUPPORT</>,
    title: "Support",
    intro: "Support is the team's connective role. You don't farm and you don't hunt kills for yourself. You provide vision, you start or cancel engages, and you keep your ADC alive. Pick Support if reading the map beats executing combos for you.",
    meta: [
      <><strong>Difficulty</strong><span className="stars">★</span><span style={{opacity:.3}}>★★</span></>,
      <><strong>Read time</strong> ~15 min</>,
      <><strong>Patch</strong> 26.X</>,
    ],
    sigilLabel: "SIGIL · SUPPORT",
    breadcrumb: "Support",
    sigil: (
      <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
        {/* paste the Support sigil SVG children verbatim from the old Hero in components.jsx */}
      </svg>
    ),
  },
  // sections below…
};
```
For the `sigil`, paste the inner `<polygon>/<line>/<path>/<circle>` children of the old `Hero`'s `<svg viewBox="0 0 200 200" …>` (the shield-and-eye glyph) verbatim.

- [ ] **Step 2: Add `phases`, `map`, `skills`**

- `phases`: move the `phases` array verbatim from `sections-01-03.jsx` `SectionPhases` into `phases.list`. Use this exact shape so `app.jsx` is uniform:
```js
  phases: {
    title: "What you do, phase by phase",
    lede: "An effective Support shifts priorities over time. Here are the 3 things that matter in each phase.",
    list: [ /* the 3 {title, timer, items:[…]} objects, verbatim */ ],
  },
```
- `map`: move the `pins` array verbatim from `SectionMap`, plus the static strings:
```js
  map: {
    title: "The Rift from your point of view",
    lede: "Your zones, vision angles and typical threats. A Support-specific map read.",
    mapSrc: "assets/sr-map-clean.png",
    mapAlt: "Summoner's Rift — official map",
    mapCredit: "RIOT GAMES — SUMMONER'S RIFT",
    legendTitle: "Legend — 6 key points",
    pins: [ /* the 8 pin objects, verbatim */ ],
  },
```
- `skills`: move the `skills` array verbatim:
```js
  skills: {
    title: "The skills that make the difference",
    lede: "Four skills to prioritize to become a reliable Support starting in low Elo.",
    list: [ /* the 4 {title, desc, link} objects, verbatim */ ],
  },
```

- [ ] **Step 3: Add `triangle`, `callouts`, `errors`**

- `triangle`: split the old `SectionTriangle` data:
```js
  triangle: {
    title: "The archetype triangle",
    lede: "Your archetype beats one type and loses to another. Memorize which.",
    nodes: {
      poke:      { corner: "top", label: "Poke",      champs: "Karma · Lux · Senna · Xerath", x: 50,  y: 8  },
      engage:    { corner: "br",  label: "Engage",    champs: "Leona · Nautilus · Rell · Pyke", x: 100, y: 80 },
      enchanter: { corner: "bl",  label: "Enchanter", champs: "Soraka · Janna · Nami · Yuumi",  x: 0,   y: 80 },
    },
    legend: [
      { strong: "Poke", rest: <>wears down the engage champion before they can ever reach you.<br /><strong>Poke &gt; Engage</strong>.</> },
      { strong: "Engage", rest: <>locks the ADC before the enchanter has time to react.<br /><strong>Engage &gt; Enchanter</strong>.</> },
      { strong: "Enchanter", rest: <>heals and shields enough to nullify poke pressure.<br /><strong>Enchanter &gt; Poke</strong>.</> },
    ],
  },
```
- `callouts`: convert the 4 `<Callout>` elements from the old `SectionPrio2` into data (keep the JSX bodies verbatim):
```js
  callouts: {
    title: "Key concept: level 2 prio",
    lede: "Whoever hits level 2 first takes the engage. The highest-stakes window in botlane.",
    list: [
      { type: "key", title: "How do you hit level 2 first?", body: <>…verbatim body…</> },
      { type: "pro", title: "Judge the force-2 on damage, not fear", body: <>…</> },
      { type: "pro", title: "Engage windows = enemy cooldowns", body: <>…</> },
      { type: "pro", title: "Position alone is a threat", body: <>…</> },
    ],
  },
```
- `errors`: move the `errors` array verbatim (`{title, s, c, f}` objects):
```js
  errors: {
    title: "The 6 mistakes that cost you games",
    lede: "Symptom, cause, fix.",
    list: [ /* the 6 {title, s, c, f} objects, verbatim */ ],
  },
```

- [ ] **Step 4: Add `champions`, `build`, `matchups`, `checklist`, `practice`**

- `champions`: move the 3-champion array + section title/lede verbatim under `{ title, lede, list }`.
- `build`: move the entire `data` object (`enchanter`/`engage`/`poke`) verbatim under `build.modes`, plus title/lede:
```js
  build: {
    title: "Runes & build path by archetype",
    lede: "A default setup for each archetype. Refine afterwards via Lolalytics.",
    modes: { /* the enchanter/engage/poke object, verbatim */ },
  },
```
- `matchups`: move the `rows` array verbatim under `{ title, lede, rows }`.
- `checklist`: move the `items` array verbatim; set `storageKey: "ll_support_checklist_v1"` (same key as today, so existing users keep their state):
```js
  checklist: {
    title: "Am I ready to play ranked?",
    lede: "Check the points you validate over 3 games in a row. If you hit 8+, you're ready to queue ranked.",
    storageKey: "ll_support_checklist_v1",
    threshold: 8,
    items: [ /* the 10 strings, verbatim */ ],
  },
```
- `practice`: convert the 2 video cards + 2 drills into data:
```js
  practice: {
    title: "To practice",
    lede: "Two short videos to watch and two drills to run in the practice tool.",
    videos: [
      { duration: "3:12", creator: "Coach Curtis", title: "Understanding bot lane vision", desc: "Ward timings, control ward priority, tribush vs river choice." },
      { duration: "4:48", creator: "Hi Im Gosu", title: "Engage vs peel: how to choose", desc: "Per-archetype demonstration with teamfight examples." },
    ],
    drills: [
      { tag: "Drill 01 · Practice tool", title: "Blind ward placement", body: <>Enter the practice tool, place 10 wards on the 10 map spots without checking their names. Time yourself: <b>&lt; 3 min</b> = you know the map.</> },
      { tag: "Drill 02 · Practice tool", title: "Leona engage combo", body: <>With Leona, chain <b>E → Q → AA → R</b> on a dummy <b>20 times</b>. Goal: smooth, without missing the Q after the E.</> },
    ],
  },
```

- [ ] **Step 5: Export at the end of `role-support.jsx`**

```js
window.ROLE_DATA = ROLE_DATA;
```

- [ ] **Step 6: Commit**

```bash
git add role-support.jsx
git commit -m "feat(engine): Support content as window.ROLE_DATA"
```

---

## Task 5: Rewrite `app.jsx` as the generic engine

**Files:**
- Rewrite: `app.jsx`

- [ ] **Step 1: Replace the entire contents of `app.jsx`**

```js
// app.jsx — generic role-guide composition. Reads window.ROLE_DATA, renders
// only the sections whose data key is present, derives section numbers/ids
// and the TOC from the rendered set.

// Ordered section registry: [dataKey, Component, tocLabel].
const SECTION_ORDER = [
  ["phases",    SectionPhases,   "Phases"],
  ["map",       SectionMap,      "Map"],
  ["skills",    SectionSkills,   "Skills"],
  ["triangle",  SectionTriangle, "Triangle"],
  ["callouts",  SectionCallouts, "Prio lvl 2"],
  ["errors",    SectionErrors,   "Mistakes"],
  ["champions", SectionChampions,"Champions"],
  ["build",     SectionBuild,    "Build"],
  ["matchups",  SectionMatchups, "Matchups"],
  ["checklist", SectionChecklist,"Checklist"],
  ["practice",  SectionPractice, "Practice"],
];

function hasData(v) {
  if (!v) return false;
  if (Array.isArray(v)) return v.length > 0;
  return true;
}

// Spread the section's data object as props. For sections whose payload is an
// array under `list`/`rows`/`modes`, map it to the component's expected prop.
function sectionProps(key, data) {
  const d = data[key];
  switch (key) {
    case "phases":   return { title: d.title, lede: d.lede, phases: d.list };
    case "skills":   return { title: d.title, lede: d.lede, skills: d.list };
    case "callouts": return { title: d.title, lede: d.lede, callouts: d.list };
    case "errors":   return { title: d.title, lede: d.lede, errors: d.list };
    case "champions":return { title: d.title, lede: d.lede, champions: d.list };
    case "matchups": return { title: d.title, lede: d.lede, matchups: d.rows };
    case "build":    return { title: d.title, lede: d.lede, build: d.modes };
    case "map":      return d; // already has title/lede/pins/mapSrc/…
    case "triangle": return d; // already has title/lede/nodes/legend
    case "checklist":return d; // already has title/lede/storageKey/items/threshold
    case "practice": return d; // already has title/lede/videos/drills
    default:         return d;
  }
}

function App() {
  const data = window.ROLE_DATA;
  const rendered = SECTION_ORDER.filter(([key]) => hasData(data[key]));
  const tocItems = rendered.map(([key, , label], i) => ({
    id: "s" + String(i + 1).padStart(2, "0"),
    num: String(i + 1).padStart(2, "0"),
    label,
  }));
  return (
    <>
      <Nav activeKey={data.meta.activeKey} />
      <TocSidebar items={tocItems} />
      <Breadcrumb current={data.meta.breadcrumb} />
      <Hero
        eyebrow={data.meta.eyebrow}
        title={data.meta.title}
        intro={data.meta.intro}
        meta={data.meta.meta}
        sigil={data.meta.sigil}
        sigilLabel={data.meta.sigilLabel}
      />
      {rendered.map(([key, Component], i) => {
        const num = String(i + 1).padStart(2, "0");
        return <Component key={key} num={num} id={"s" + num} {...sectionProps(key, data)} />;
      })}
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

- [ ] **Step 2: Commit**

```bash
git add app.jsx
git commit -m "feat(engine): generic app.jsx driven by ROLE_DATA + SECTION_ORDER"
```

---

## Task 6: Wire `Support.html` to the new files

**Files:**
- Modify: `Support.html`

- [ ] **Step 1: Add `data-role="support"` to the `<html>` tag**

Change line 2 from:
```html
<html lang="en" data-density="compact" data-accent="ambre">
```
to:
```html
<html lang="en" data-role="support" data-density="compact" data-accent="ambre">
```

- [ ] **Step 2: Swap the script tags**

Replace:
```html
<script type="text/babel" src="sections-01-03.jsx"></script>
<script type="text/babel" src="sections-04-06.jsx"></script>
<script type="text/babel" src="sections-07-11.jsx"></script>
<script type="text/babel" src="app.jsx"></script>
```
with:
```html
<script type="text/babel" src="role-sections.jsx"></script>
<script type="text/babel" src="role-support.jsx"></script>
<script type="text/babel" src="app.jsx"></script>
```

- [ ] **Step 3: Commit**

```bash
git add Support.html
git commit -m "feat(engine): point Support.html at the data-driven engine"
```

---

## Task 7: Add the `[data-role]` accent axis to `styles.css`

**Files:**
- Modify: `styles.css` (after the `[data-accent]` selector block, around line 117-120)

- [ ] **Step 1: Add the role-accent mapping** directly after the three `[data-accent]` rules:

```css
/* Role accent — each role guide gets a signature accent without touching the
   palette. Support keeps amber (identical to the default). */
:root[data-role="support"] { --accent: var(--accent-ambre); }
```
Note: because `data-accent="ambre"` already resolves `--accent` to amber on Support, this rule is a no-op for appearance now; it establishes the axis for the future roles (each adds its own `[data-role="x"]` line). Keep the `[data-accent]` rules in place — `[data-role]` overrides only when both are set and the cascade order favors the later rule, so place `[data-role]` AFTER `[data-accent]`.

- [ ] **Step 2: Commit**

```bash
git add styles.css
git commit -m "feat(engine): add [data-role] accent axis (support=amber)"
```

---

## Task 8: Delete the absorbed section files

**Files:**
- Delete: `sections-01-03.jsx`, `sections-04-06.jsx`, `sections-07-11.jsx`

- [ ] **Step 1: Confirm no remaining references**

Run (Grep tool): pattern `sections-0` across the repo. Expected: no matches in any `.html` (only possibly in git history / this plan).

- [ ] **Step 2: Delete the files and commit**

```bash
git rm sections-01-03.jsx sections-04-06.jsx sections-07-11.jsx
git commit -m "chore(engine): remove section files absorbed into the engine"
```

---

## Task 9: Equality verification against the baseline

**Files:** none (verification only).

- [ ] **Step 1: Reload Support in the preview**

`preview_eval`: `window.location.reload(); 'reloading'` (or navigate to `/Support.html`).

- [ ] **Step 2: Re-run the structural snapshot**

Run the exact `preview_eval` expression from Task 1 Step 2. Compare field-by-field with the baseline captured then.
Expected (must match baseline exactly): sectionIds `["s01",…,"s11"]`, 11 tocLabels in the same order (`Phases, Map, Skills, Triangle, Prio lvl 2, Mistakes, Champions, Build, Matchups, Checklist, Practice`), heroTitle `Support.`, breadcrumbCurrent `Support`, errorCount 6, champCount 3, matchupRows 5, checklistItems 10.

- [ ] **Step 3: Verify the triangle arrows rendered**

`preview_eval`:
```js
document.querySelectorAll('.triangle-stage svg g').length
```
Expected: 3 (one `<g>` per arrow). If 0, the `useLayoutEffect` geometry or refs regressed.

- [ ] **Step 4: Verify the build tabs and checklist interactivity**

`preview_eval`:
```js
JSON.stringify({
  buildTabs: document.querySelectorAll('.archetype-tab').length,
  firstTabActive: document.querySelector('.archetype-tab')?.classList.contains('is-active'),
})
```
Expected: `buildTabs` 3, `firstTabActive` true.

- [ ] **Step 5: Console must be clean**

`preview_console_logs` with `level: "error"`. Expected: "No console logs."

- [ ] **Step 6: Visual diff**

`preview_screenshot`. Compare against the Task 1 baseline image. Expected: visually identical (hero, TOC, all 11 sections, triangle, map pins, amber accent).

- [ ] **Step 7: Final commit / merge readiness**

If all checks pass, the engine is proven on Support. Report results to the user. Do NOT merge to `main` until the user confirms (per project workflow, the user merges).

---

## Notes for Phase 2 (out of scope for this plan)

Each new role (ADC → Top → Mid → Jungle) is its own plan/session: research (web + Riot patch notes), author `role-<x>.jsx` + `<X>.html` (copy of `Support.html` with its own `data-role` and `role-<x>.jsx`), add a `[data-role="<x>"]` accent line, add missing `LL_GLOSSARY` terms, point the `RolesDropdown` href at the new page, and pass the fact-validation checkpoint before merge. A role that needs a section Support lacks gets a new generic component added to `role-sections.jsx` + an entry in `SECTION_ORDER`.
