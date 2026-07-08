# Role Quiz Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the already-designed Role Quiz into the live Learning Leagues site, wired onto the current codebase.

**Architecture:** Recreate the Claude Design handoff faithfully as a new `Quiz.html` page backed by `quiz-data.jsx` (content + scoring) and `quiz-app.jsx` (React flow), styled by `quiz.css`. Reconcile handoff-era artifacts to today's codebase: drop `data-palette`, reuse the shared `<Nav>`/`<Footer>`, freeze the Ledger question style (remove the exploration switcher), and wire the real role-guide links and the site's "Role quiz" CTAs.

**Tech Stack:** Static site, React 18 + ReactDOM + Babel-standalone from CDN, JSX transpiled in-browser. No build step, no test runner. Verification is browser-driven via the preview tools.

**Source of truth for handoff files:** `C:\Users\goldy\Downloads\Learning Leagues-handoff\learning-leagues\project\` (referred to below as `HANDOFF/`). Target repo root: `C:\Users\goldy\Desktop\GitHub\LearningLeagues\`.

**Note on TDD:** This repo has no automated test framework. Per the spec, each build task ends with a browser-driven verification step (serve + drive the UI) rather than a unit test. Follow the existing site's pattern; do not introduce a test harness.

---

### Task 1: Create `quiz-data.jsx` (content + scoring, real role links)

**Files:**
- Create: `quiz-data.jsx`
- Reference: `HANDOFF/quiz-data.jsx` (copy verbatim, then change 4 hrefs)

- [ ] **Step 1: Copy the handoff file verbatim**

Copy the entire contents of `HANDOFF/quiz-data.jsx` into a new repo-root `quiz-data.jsx`. It defines `QUIZ_ROLES`, `QUIZ_ROLE_ORDER`, `QUIZ_QUESTIONS`, `quizComputeScores`, and exposes them on `window`.

- [ ] **Step 2: Wire the four placeholder role links**

In `QUIZ_ROLES`, the `href` fields for `top`, `jungle`, `mid`, `adc` are `"#"`. Set each to its real guide (leave `support` as `Support.html`):

```js
top:     { ... href: "Top.html", ... },
jungle:  { ... href: "Jungle.html", ... },
mid:     { ... href: "Mid.html", ... },
adc:     { ... href: "ADC.html", ... },
support: { ... href: "Support.html", ... },
```

Change only the four `href` values. Leave all `key`, `name`, `article`, `icon`, and `blurb` values exactly as in the handoff.

- [ ] **Step 3: Sanity-check the file**

Confirm the file still ends with:

```js
Object.assign(window, { QUIZ_ROLES, QUIZ_ROLE_ORDER, QUIZ_QUESTIONS, quizComputeScores });
```

and that no `"#"` remains among the role hrefs (`grep '"#"' quiz-data.jsx` should return nothing).

- [ ] **Step 4: Commit**

```bash
git add quiz-data.jsx
git commit -m "feat(quiz): add role quiz data + scoring"
```

---

### Task 2: Create `quiz.css` (styles, minus the exploration switcher)

**Files:**
- Create: `quiz.css`
- Reference: `HANDOFF/quiz.css` (copy verbatim, then remove one block)

- [ ] **Step 1: Copy the handoff file verbatim**

Copy the entire contents of `HANDOFF/quiz.css` into a new repo-root `quiz.css`.

- [ ] **Step 2: Remove the switcher styles**

Delete the entire final section, from the comment header:

```css
/* ── Style switcher (exploration control) ───────────────────────────────── */
```

through the end of the file (the last rule is `@media (max-width: 640px) { .qz-switcher { display: none; } }`). These `.qz-switcher*` rules style the exploration control, which production removes. Make **no other edits** — keep the rest of the file (including `min-height: calc(100vh - 64px)` and the leading `a { color: inherit; }`) exactly as-is.

- [ ] **Step 3: Confirm no switcher rules remain**

`grep 'qz-switcher' quiz.css` should return nothing.

- [ ] **Step 4: Commit**

```bash
git add quiz.css
git commit -m "feat(quiz): add role quiz styles (ledger)"
```

---

### Task 3: Create `quiz-app.jsx` (Ledger-only flow, shared Nav/Footer)

**Files:**
- Create: `quiz-app.jsx`
- Reference: `HANDOFF/quiz-app.jsx` (copy, then apply the removals below)
- Depends on shared components in `components.jsx`: `Nav`, `Footer`, `LogoMark`, `LangSwitcher` (all already present).

- [ ] **Step 1: Copy the handoff file verbatim**

Copy the entire contents of `HANDOFF/quiz-app.jsx` into a new repo-root `quiz-app.jsx`.

- [ ] **Step 2: Delete the local `QuizNav` component**

Remove the entire `function QuizNav() { ... }` definition (the inline nav with `LogoMark`/`LangSwitcher`/`Landing.html` links). The shared `<Nav>` from `components.jsx` replaces it. Keep `QuizBreadcrumb` exactly as-is.

- [ ] **Step 3: Delete the `QzOptionCards` component**

Remove the entire `function QzOptionCards({ question, picked, onPick }) { ... }` definition. Ledger uses `QzOptionRows` only.

- [ ] **Step 4: Replace `QzQuestion` with the Ledger-only version**

Replace the entire `function QzQuestion(...) { ... }` (which branched on `variant` for split/cards/ledger) with:

```jsx
function QzQuestion({ index, picked, onPick, onBack }) {
  const question = QUIZ_QUESTIONS[index];
  return (
    <div className="qz-v-ledger">
      <QzProgress index={index} onBack={onBack} />
      <div className="qz-tag">{question.tag}</div>
      <h2 className="qz-question">{question.q}</h2>
      <QzOptionRows question={question} picked={picked} onPick={onPick} />
      <QzKbdHint />
    </div>
  );
}
```

- [ ] **Step 5: Delete the `QzSwitcher` component**

Remove the entire `function QzSwitcher({ variant, setVariant }) { ... }` definition.

- [ ] **Step 6: Replace `QuizApp` with the switcher-free version**

Replace the entire `function QuizApp() { ... }` with the version below. Changes from the handoff: no `variant` state, `<QuizNav />` → `<Nav activeKey="quiz" />`, `<QzQuestion>` called without `variant`, and no `<QzSwitcher>` render. Everything else (localStorage, transitions, keyboard shortcuts, back/retake) is unchanged.

```jsx
function QuizApp() {
  const saved = React.useMemo(qzLoad, []);
  const [screen, setScreen] = React.useState(saved.screen || "intro"); // intro | q | result
  const [index, setIndex] = React.useState(Number.isInteger(saved.index) ? saved.index : 0);
  const [answers, setAnswers] = React.useState(Array.isArray(saved.answers) ? saved.answers : []);
  const [leaving, setLeaving] = React.useState(false);
  const leavingRef = React.useRef(false);

  React.useEffect(() => {
    qzSave({ screen, index, answers });
  }, [screen, index, answers]);

  const transition = (fn) => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    setTimeout(() => {
      fn();
      leavingRef.current = false;
      setLeaving(false);
    }, 210);
  };

  const start = () => transition(() => { setScreen("q"); setIndex(0); });

  const pick = (optIdx) => {
    const next = answers.slice();
    next[index] = optIdx;
    setAnswers(next);
    transition(() => {
      if (index + 1 >= QZ_TOTAL) setScreen("result");
      else setIndex(index + 1);
    });
  };

  const back = () => {
    if (index === 0) return;
    transition(() => setIndex(index - 1));
  };

  const retake = () => transition(() => {
    setAnswers([]);
    setIndex(0);
    setScreen("intro");
  });

  // Keyboard shortcuts
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      if (screen === "intro" && e.key === "Enter") { start(); return; }
      if (screen !== "q") return;
      const k = e.key.toLowerCase();
      const letterIdx = ["a", "b", "c", "d"].indexOf(k);
      const numIdx = ["1", "2", "3", "4"].indexOf(k);
      const i = letterIdx >= 0 ? letterIdx : numIdx;
      if (i >= 0 && i < QUIZ_QUESTIONS[index].options.length) { e.preventDefault(); pick(i); }
      else if (e.key === "Backspace") { e.preventDefault(); back(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const screenKey = screen === "q" ? `q-${index}` : screen;

  return (
    <>
      <Nav activeKey="quiz" />
      <div className="qz-main" data-screen-label={screen === "q" ? `Question ${index + 1}` : screen === "result" ? "Result" : "Quiz intro"}>
        <QuizBreadcrumb />
        <div className="shell qz-stage">
          <div key={screenKey} className={"qz-screen" + (leaving ? " is-leaving" : "")}>
            {screen === "intro" && <QzIntro onStart={start} />}
            {screen === "q" && (
              <QzQuestion
                index={index}
                picked={answers[index]}
                onPick={pick}
                onBack={back}
              />
            )}
            {screen === "result" && <QzResult answers={answers} onRetake={retake} />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<QuizApp />);
```

- [ ] **Step 7: Confirm the removals**

`grep -E 'QuizNav|QzSwitcher|QzOptionCards|variant' quiz-app.jsx` should return nothing. The remaining components are: `qzLoad`, `qzSave`, `QuizBreadcrumb`, `QzIntro`, `QzProgress`, `QzOptionRows`, `QzKbdHint`, `QzQuestion`, `QzResult`, `QuizApp`.

- [ ] **Step 8: Commit**

```bash
git add quiz-app.jsx
git commit -m "feat(quiz): add role quiz flow (ledger, shared nav/footer)"
```

---

### Task 4: Create `Quiz.html` (page shell)

**Files:**
- Create: `Quiz.html`
- Reference: `Support.html` (current head/script pattern), `HANDOFF/Quiz.html` (script list)

- [ ] **Step 1: Write `Quiz.html`**

Mirror the current site's shell (as in `Support.html`): no `data-palette`, `styles.css` with no version query, load `components.jsx` before the quiz scripts.

```html
<!doctype html>
<html lang="en" data-density="compact" data-accent="ambre">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Learning Leagues · Role Quiz</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap">

<link rel="stylesheet" href="styles.css" />
<link rel="stylesheet" href="quiz.css" />

<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
</head>
<body>
<div id="root"></div>

<script type="text/babel" src="components.jsx"></script>
<script type="text/babel" src="quiz-data.jsx"></script>
<script type="text/babel" src="quiz-app.jsx"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add Quiz.html
git commit -m "feat(quiz): add Quiz.html page shell"
```

---

### Task 5: Verify the quiz page end-to-end (browser)

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Use the preview tooling (`preview_start`, config name `learning-leagues` if present in `.claude/launch.json`; otherwise create one running `python -m http.server 8000` on port 8000, or use `serve.ps1`). Open `Quiz.html`.

- [ ] **Step 2: Check for load errors**

`preview_console_logs` (level error) and `preview_logs` — expect no React/Babel errors and no 404s for `quiz-data.jsx`, `quiz-app.jsx`, `quiz.css`, `components.jsx`.

- [ ] **Step 3: Drive the flow**

- Intro renders with the shared `<Nav>` (Role quiz CTA marked active) and Footer.
- Click "Start the quiz" → Q01 renders in Ledger style (progress bar, tag, question, four `A/B/C/D` rows).
- Answer all 8 (click or press A–D); progress bar advances; "Back" returns a question.
- After Q08 the result screen shows a verdict role, the blurb, and all 5 roles ranked with score bars.
- The result "Read the {role} guide" button `href` matches the top role's real page (e.g. `Top.html`).

Use `preview_snapshot` to confirm structure/text and `preview_screenshot` for the intro, one question, and the result.

- [ ] **Step 4: Check persistence + reduced motion**

Reload mid-quiz (e.g. on Q04) via `preview_eval` `window.location.reload()` — the quiz resumes at Q04 (localStorage `ll-quiz-v1`). No fixed switcher control appears anywhere on screen.

- [ ] **Step 5: Fix any issues, then re-verify**

If anything fails, read the relevant new file, fix, and repeat steps 2–4. No commit needed unless a source file changed (then commit the fix).

---

### Task 6: Wire the shared `<Nav>` quiz CTA (`components.jsx`)

**Files:**
- Modify: `components.jsx` (the `Nav` component, ~line 224)

- [ ] **Step 1: Turn the CTA button into an active-aware link**

In `function Nav({ activeKey = "roles" })`, replace:

```jsx
<button className="nav-cta">Role quiz →</button>
```

with:

```jsx
<a
  className={"nav-cta" + (activeKey === "quiz" ? " is-active" : "")}
  href="Quiz.html"
  aria-current={activeKey === "quiz" ? "page" : undefined}
>Role quiz →</a>
```

- [ ] **Step 2: Verify across pages**

Reload `Quiz.html` (Nav CTA points to `Quiz.html`, active) and `Support.html` (Nav CTA points to `Quiz.html`, not active). `preview_console_logs` clean on both. Clicking the CTA from `Support.html` lands on the quiz.

- [ ] **Step 3: Commit**

```bash
git add components.jsx
git commit -m "feat(nav): wire Role quiz CTA to Quiz.html"
```

---

### Task 7: Wire the landing-page quiz entry points (`landing.jsx`)

**Files:**
- Modify: `landing.jsx` (hero ghost button ~lines 35-41; `LandingNav` CTA ~line 262)

- [ ] **Step 1: Wire the hero "Role quiz" ghost button**

Change the hero ghost link's `href` from `"#"` to `"Quiz.html"`:

```jsx
<a href="Quiz.html" className="btn-ghost">
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square">
    <circle cx="8" cy="8" r="6" />
    <path d="M6 6.5c0-1.1.9-2 2-2s2 .9 2 2-2 1.5-2 3M8 11.5v.01" />
  </svg>
  <span>Role quiz</span>
</a>
```

- [ ] **Step 2: Wire the `LandingNav` CTA**

In `function LandingNav()`, replace:

```jsx
<button className="nav-cta">Role quiz →</button>
```

with:

```jsx
<a className="nav-cta" href="Quiz.html">Role quiz →</a>
```

- [ ] **Step 3: Verify on the landing page**

Reload `index.html`. Both the hero "Role quiz" button and the top-right nav CTA navigate to `Quiz.html`. `preview_console_logs` clean. `preview_screenshot` of the hero.

- [ ] **Step 4: Commit**

```bash
git add landing.jsx
git commit -m "feat(landing): wire Role quiz entry points to Quiz.html"
```

---

### Task 8: Document the page + final pass

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add a README line**

In the "What's here" list, add an entry for the quiz alongside the other pages, e.g.:

```markdown
- `Quiz.html` — role-orientation quiz (intro → 8 questions → all 5 roles ranked), backed by `quiz-data.jsx` + `quiz-app.jsx` + `quiz.css`
```

- [ ] **Step 2: Final end-to-end pass**

From `index.html`: click the hero "Role quiz" → complete the quiz → land on the correct role guide from the result CTA. Confirm no console errors on `index.html`, `Quiz.html`, and one role page. Screenshot the result screen.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: document Quiz.html in README"
```

---

## Self-Review notes

- **Spec coverage:** drop `data-palette` (Task 4) ✓; shared Nav/Footer (Task 3) ✓; real role hrefs (Task 1) ✓; remove switcher (Tasks 2 + 3) ✓; wire nav + landing CTAs (Tasks 6 + 7) ✓; keep `quiz.css` faithful / no house-style tweaks (Task 2) ✓; keep inline `QuizBreadcrumb` (Task 3) ✓; README (Task 8) ✓.
- **Naming consistency:** `activeKey="quiz"` is set in `QuizApp` (Task 3) and read in `Nav` (Task 6) — matched. Script filenames (`quiz-data.jsx`, `quiz-app.jsx`, `quiz.css`) match across Tasks 1–4.
- **Out of scope confirmed untouched:** `/training` section and Champions/Macro placeholders.
