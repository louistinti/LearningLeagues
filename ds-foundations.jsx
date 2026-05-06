// ds-foundations.jsx — Foundations tab: color, type, spacing, motion

const COLOR_GROUPS = [
  {
    title: "Surfaces", label: "Background hierarchy",
    tokens: [
      { name: "--bg",        value: "#070a14", note: "Page background" },
      { name: "--bg-soft",   value: "#0c1222", note: "Sub-surface, footer" },
      { name: "--surface",   value: "#111a2e", note: "Card, panel" },
      { name: "--surface-2", value: "#162238", note: "Hover, raised" },
    ],
  },
  {
    title: "Borders & rules", label: "Edges & dividers",
    tokens: [
      { name: "--border",      value: "#223152", note: "Default border" },
      { name: "--border-soft", value: "#1a2540", note: "Inner / nested" },
      { name: "--rule",        value: "rgba(255,255,255,.06)", note: "Section divider" },
      { name: "--grid-line",   value: "rgba(127,168,220,.05)", note: "Hex grid texture" },
    ],
  },
  {
    title: "Foreground", label: "Text & icons",
    tokens: [
      { name: "--fg",      value: "#e7ecf5", note: "Primary text" },
      { name: "--fg-dim",  value: "#a8b3c7", note: "Body, secondary" },
      { name: "--fg-mute", value: "#6e7a94", note: "Eyebrows, meta" },
    ],
  },
  {
    title: "Accents", label: "Hextech amber",
    tokens: [
      { name: "--accent-or",    value: "#d4b468", note: "Hextech gold" },
      { name: "--accent-ambre", value: "#e39a3c", note: "Live accent — amber" },
      { name: "--accent-bleu",  value: "#6fa8dc", note: "Cool secondary" },
      { name: "--gold-soft",    value: "rgba(212,180,104,.12)", note: "Tinted bg" },
    ],
  },
];

const TIER_COLORS = [
  { name: "Iron",      hex: "#5b5959" },
  { name: "Bronze",    hex: "#a26939" },
  { name: "Silver",    hex: "#9ba6b3" },
  { name: "Gold",      hex: "#e39a3c" },
  { name: "Platinum",  hex: "#4ea3a3" },
  { name: "Emerald",   hex: "#3f9670" },
  { name: "Diamond",   hex: "#6fa8dc" },
  { name: "Master",    hex: "#a868d4" },
  { name: "GM",        hex: "#c9484a" },
  { name: "Challenger","hex": "#d4b468" },
];

function Foundations() {
  return (
    <React.Fragment>
      <DSSection
        num="01"
        title="Color"
        lede="Dark-only system. The page sits on a deep midnight blue; surfaces step up two values; amber carries the eye through the page. We never mix in pure black or pure white — every neutral is tinted toward Hextech blue."
      >
        <div className="ds-color-grid">
          {COLOR_GROUPS.map(g => (
            <ColorGroup key={g.title} group={g} />
          ))}
        </div>
      </DSSection>

      <DSSection
        num="02"
        title="Tier palette"
        lede="Ranked tiers carry their own swatches, used sparingly — leaderboard chips, progress bars, profile badges. Never as a primary surface or text color."
      >
        <div className="ds-tier-row">
          {TIER_COLORS.map(t => (
            <div key={t.name} className="ds-tier-chip">
              <span className="ds-tier-swatch" style={{ background: t.hex }} aria-hidden="true">
                <span className="ds-tier-glint"></span>
              </span>
              <span className="ds-tier-name">{t.name}</span>
              <span className="ds-tier-hex mono">{t.hex}</span>
            </div>
          ))}
        </div>
      </DSSection>

      <DSSection
        num="03"
        title="Typography"
        lede="A three-family system: EB Garamond italic for editorial titles and big numbers, Inter for body and UI, JetBrains Mono for labels, eyebrows and stats. Compact density throughout."
      >
        <TypeScale />
        <FontStack />
      </DSSection>

      <DSSection
        num="04"
        title="Spacing & rhythm"
        lede="Strict 8px scale. 4px is the absolute minimum; 12px is the only allowed half-step. Everything else is 8 · 16 · 24 · 32 · 40 · 48 · 64."
      >
        <SpacingScale />
      </DSSection>

      <DSSection
        num="05"
        title="Borders, corners & elevation"
        lede="No rounded corners. Cards are framed with single-pixel borders, accented by amber corner brackets that signal interactivity. Elevation is implied through surface stepping, not shadow."
      >
        <BordersAndCorners />
      </DSSection>

      <DSSection
        num="06"
        title="Iconography"
        lede="Stroke-only line work, 1px–1.2px weight, 24px grid. Inspired by Hextech runes — angular, hexagonal, never pillowy."
      >
        <IconGrid />
      </DSSection>
    </React.Fragment>
  );
}

function ColorGroup({ group }) {
  return (
    <div className="ds-color-group">
      <header className="ds-block-head">
        <span className="ds-block-label mono">{group.label}</span>
        <h3 className="ds-block-title">{group.title}</h3>
      </header>
      <div className="ds-color-list">
        {group.tokens.map(t => (
          <div key={t.name} className="ds-color-row">
            <span className="ds-color-swatch" style={{ background: t.value }}></span>
            <span className="ds-color-name mono">{t.name}</span>
            <span className="ds-color-value mono">{t.value}</span>
            <span className="ds-color-note">{t.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypeScale() {
  const items = [
    { tag: "DISPLAY · serif",      cls: "ts-display",   text: "Support.",          meta: "EB Garamond / 92px / 0.98" },
    { tag: "H1 · serif italic",    cls: "ts-h1",        text: "Tu es les yeux.",   meta: "EB Garamond italic / 56px" },
    { tag: "H2 · serif",           cls: "ts-h2",        text: "Phases de la partie", meta: "EB Garamond / 36px" },
    { tag: "H3 · serif",           cls: "ts-h3",        text: "Vision & roaming",  meta: "EB Garamond / 24px" },
    { tag: "BODY · sans",          cls: "ts-body",      text: "Le Support est le rôle transverse de l'équipe. Tu ne farms pas, tu donnes la vision.", meta: "Inter 400 / 15px / 1.55" },
    { tag: "DIM · sans",           cls: "ts-dim",       text: "Lecture estimée 15 minutes. Patch 26.X.", meta: "Inter 400 / 14px / fg-dim" },
    { tag: "EYEBROW · mono",       cls: "ts-eyebrow",   text: "RÔLE · SUPPORT",    meta: "JetBrains Mono / 11px / 0.18em" },
    { tag: "META · mono",          cls: "ts-meta",      text: "01 · 23m 14s · WIN", meta: "JetBrains Mono / 10.5px / tnum" },
  ];
  return (
    <div className="ds-type-scale">
      {items.map((i, idx) => (
        <div key={idx} className="ds-type-row">
          <span className="ds-type-tag mono">{i.tag}</span>
          <span className={"ds-type-sample " + i.cls}>{i.text}</span>
          <span className="ds-type-meta mono">{i.meta}</span>
        </div>
      ))}
    </div>
  );
}

function FontStack() {
  const stacks = [
    { name: "EB Garamond", role: "Display / Titles", sample: "Aa Æ ƒ", note: "Italic for emphasis. Numbers in italic for big stats." },
    { name: "Inter",       role: "Body / UI",        sample: "Aa 0123", note: "ss01 + cv11 enabled. Letter-spacing -0.005em." },
    { name: "JetBrains Mono", role: "Labels / Stats", sample: "0/1 →", note: "11px caps, 0.14em tracking. Tabular numerals." },
  ];
  return (
    <div className="ds-fontstack">
      {stacks.map(s => (
        <div key={s.name} className="ds-font-card">
          <div className="ds-font-sample" style={{ fontFamily: s.name === "JetBrains Mono" ? "'JetBrains Mono', monospace" : (s.name === "EB Garamond" ? "'EB Garamond', serif" : "'Inter', sans-serif") }}>
            {s.sample}
          </div>
          <div className="ds-font-meta">
            <span className="ds-font-role mono">{s.role}</span>
            <h4 className="ds-font-name">{s.name}</h4>
            <p className="ds-font-note">{s.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SpacingScale() {
  const stops = [
    { mult: "0.5", css: "--s-05", px: "4px",  note: "Minimum — hairline gaps" },
    { mult: "1",   css: "--s-1",  px: "8px",  note: "Base unit" },
    { mult: "1.5", css: "--s-15", px: "12px", note: "Inline / tight" },
    { mult: "2",   css: "--s-2",  px: "16px", note: "Default gap" },
    { mult: "3",   css: "--s-3",  px: "24px", note: "Card padding" },
    { mult: "4",   css: "--s-4",  px: "32px", note: "Section blocks" },
    { mult: "5",   css: "--s-5",  px: "40px", note: "Generous" },
    { mult: "6",   css: "--s-6",  px: "48px", note: "Large gap" },
    { mult: "8",   css: "--s-8",  px: "64px", note: "Section rhythm" },
  ];
  return (
    <div className="ds-spacing">
      <div className="ds-spacing-rows">
        {stops.map(s => (
          <div key={s.mult} className="ds-spacing-row">
            <span className="ds-spacing-mult mono">×{s.mult}</span>
            <span className="ds-spacing-bar" style={{ width: s.px }}></span>
            <span className="ds-spacing-px mono">{s.px}</span>
            <span className="ds-spacing-css mono">{s.css}</span>
            <span className="ds-spacing-note">{s.note}</span>
          </div>
        ))}
      </div>
      <aside className="ds-spacing-aside">
        <span className="ds-block-label mono">Scale</span>
        <h4 className="ds-aside-title">8px base · 4px minimum</h4>
        <p>
          Spacing follows a strict <b>8px scale</b> — every gap, padding and margin
          is a multiple of <b>8</b>. <b>4px</b> is the minimum (hairline only);
          <b>12px</b> is the one allowed half-step for inline / tight contexts.
          The full ladder: <span className="mono">4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64</span>.
        </p>
        <dl className="ds-aside-dl">
          <div><dt className="mono">--s-1</dt><dd className="mono">8px</dd></div>
          <div><dt className="mono">--s-2</dt><dd className="mono">16px</dd></div>
          <div><dt className="mono">--s-3</dt><dd className="mono">24px</dd></div>
          <div><dt className="mono">--s-4</dt><dd className="mono">32px</dd></div>
        </dl>
      </aside>
    </div>
  );
}

function BordersAndCorners() {
  return (
    <div className="ds-borders-grid">
      <figure className="ds-border-fig">
        <div className="ds-border-demo">
          <span className="ds-border-corners">
            <span></span><span></span><span></span><span></span>
          </span>
          <span className="ds-border-label mono">CARD · WITH CORNERS</span>
        </div>
        <figcaption>
          <span className="mono">.phase-card</span> · 1px <span className="mono">--border</span> + 4 amber bracket corners.
          The signature frame across cards.
        </figcaption>
      </figure>

      <figure className="ds-border-fig">
        <div className="ds-border-demo ds-border-demo--simple">
          <span className="ds-border-label mono">CARD · PLAIN</span>
        </div>
        <figcaption>
          Plain 1px <span className="mono">--border</span>. Used in dense lists where corner brackets would compete.
        </figcaption>
      </figure>

      <figure className="ds-border-fig">
        <div className="ds-border-demo ds-border-demo--accent">
          <span className="ds-border-label mono">ACCENT RAIL</span>
        </div>
        <figcaption>
          2px left <span className="mono">--accent</span> rail. Quotes, exercises, callouts.
        </figcaption>
      </figure>

      <figure className="ds-border-fig">
        <div className="ds-border-demo ds-border-demo--dashed">
          <span className="ds-border-label mono">DASHED RULE</span>
        </div>
        <figcaption>
          1px dashed <span className="mono">--rule</span>. List item separators inside cards.
        </figcaption>
      </figure>
    </div>
  );
}

function IconGrid() {
  const icons = [
    { name: "hex",     svg: <polygon points="12,2 21,7 21,17 12,22 3,17 3,7"/> },
    { name: "shield",  svg: <path d="M12 2 L20 5 L20 12 C20 17 16 21 12 22 C8 21 4 17 4 12 L4 5 Z"/> },
    { name: "eye",     svg: <React.Fragment><path d="M2 12 C 5 6 9 4 12 4 C 15 4 19 6 22 12 C 19 18 15 20 12 20 C 9 20 5 18 2 12 Z"/><circle cx="12" cy="12" r="3"/></React.Fragment> },
    { name: "ward",    svg: <React.Fragment><path d="M12 2 L20 8 L20 16 L12 22 L4 16 L4 8 Z"/><circle cx="12" cy="12" r="2.5"/></React.Fragment> },
    { name: "sword",   svg: <path d="M14 4 L20 4 L20 10 L8 22 L4 22 L4 18 Z"/> },
    { name: "crown",   svg: <path d="M2 8 L7 14 L12 6 L17 14 L22 8 L20 20 L4 20 Z"/> },
    { name: "compass", svg: <React.Fragment><circle cx="12" cy="12" r="9"/><polygon points="12,5 14,12 12,19 10,12" fill="currentColor" stroke="none"/></React.Fragment> },
    { name: "spark",   svg: <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"/> },
    { name: "arrow",   svg: <React.Fragment><line x1="4" y1="12" x2="20" y2="12"/><polyline points="14,6 20,12 14,18"/></React.Fragment> },
    { name: "dot",     svg: <React.Fragment><circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="9" opacity="0.4"/></React.Fragment> },
  ];
  return (
    <div className="ds-icons">
      {icons.map(i => (
        <div key={i.name} className="ds-icon-cell">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
            {i.svg}
          </svg>
          <span className="mono">{i.name}</span>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  Foundations, ColorGroup, TypeScale, FontStack, SpacingScale, BordersAndCorners, IconGrid,
});
