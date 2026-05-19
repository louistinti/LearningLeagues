// ds-components.jsx — Components tab: buttons, inputs, cards, nav, charts

function Components() {
  return (
    <React.Fragment>
      <DSSection num="01" title="Buttons" lede="Two-tier system: amber primary with corner brackets, ghost secondary. All-caps mono labels at 12px, 0.14em tracking. Never rounded.">
        <ButtonsShowcase />
      </DSSection>

      <DSSection num="02" title="Inputs" lede="Single-line bordered inputs, sharp corners, mono labels above. Focus state lights up the border in amber.">
        <InputsShowcase />
      </DSSection>

      <DSSection num="03" title="Tags & pills" lede="Inline metadata. Mono caps, 0.14em tracking, 1px border or tinted bg.">
        <TagsShowcase />
      </DSSection>

      <DSSection num="04" title="Tab bar / segmented" lede="Sectioned tabs with active underline in amber. Used for archetype switching, lesson chapter nav.">
        <TabsShowcase />
      </DSSection>

      <DSSection num="05" title="Cards" lede="The atomic surface. Lesson, league, leaderboard rows all derive from the corner-bracketed card.">
        <CardsShowcase />
      </DSSection>

      <DSSection num="06" title="Charts & progress" lede="Numeric storytelling. Slim bars, dashed gridlines, mono axis labels. No area fills, no shadows.">
        <ChartsShowcase />
      </DSSection>

      <DSSection num="07" title="Gloss" lede="Inline annotation for LoL terms on first mention. Dotted underline + native tooltip. Sourced from LL_GLOSSARY (components.jsx) — never inline ad-hoc.">
        <GlossShowcase />
      </DSSection>
    </React.Fragment>
  );
}

function GlossShowcase() {
  return (
    <div className="ds-comp-grid ds-comp-grid--inputs">
      <DemoCell label="Inline in a sentence">
        <p style={{ margin: 0, fontSize: 15, color: "var(--fg-dim)", lineHeight: 1.55 }}>
          Leave <Gloss term="CS" /> to the ADC. Place your first <Gloss term="trinket" /> at 1:25,
          then drop a <Gloss term="control ward" /> in the river bush.
        </p>
      </DemoCell>
      <DemoCell label="Override with custom def">
        <p style={{ margin: 0, fontSize: 15, color: "var(--fg-dim)", lineHeight: 1.55 }}>
          You start a fight by burning the enemy{" "}
          <Gloss term="dash" def="any movement ability that breaks displacement (e.g. Ezreal E, Lucian E)">dash</Gloss>.
        </p>
      </DemoCell>
      <DemoCell label="Term coverage (current glossary)">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontSize: 13, color: "var(--fg-dim)" }}>
          {Object.keys(LL_GLOSSARY).map(t => (
            <Gloss key={t} term={t}>{t}</Gloss>
          ))}
        </div>
      </DemoCell>
    </div>
  );
}

function ButtonsShowcase() {
  return (
    <div className="ds-comp-grid">
      <DemoCell label="Primary · default">
        <button className="btn-primary">Quiz rôle →</button>
      </DemoCell>
      <DemoCell label="Primary · hover">
        <button className="btn-primary is-hover">Quiz rôle →</button>
      </DemoCell>
      <DemoCell label="Ghost · default">
        <button className="btn-ghost">Voir la map</button>
      </DemoCell>
      <DemoCell label="Ghost · hover">
        <button className="btn-ghost is-hover">Voir la map</button>
      </DemoCell>
      <DemoCell label="Nav CTA">
        <button className="nav-cta">Quiz rôle →</button>
      </DemoCell>
      <DemoCell label="Skill link">
        <a className="skill-link" href="#">Lire la suite →</a>
      </DemoCell>
    </div>
  );
}

function InputsShowcase() {
  return (
    <div className="ds-comp-grid ds-comp-grid--inputs">
      <DemoCell label="Text input">
        <label className="ds-input">
          <span className="ds-input-label mono">Pseudo invocateur</span>
          <input type="text" defaultValue="HextechMain" />
        </label>
      </DemoCell>
      <DemoCell label="Focus state">
        <label className="ds-input ds-input--focus">
          <span className="ds-input-label mono">Région</span>
          <input type="text" defaultValue="EUW" />
        </label>
      </DemoCell>
      <DemoCell label="Select">
        <label className="ds-input">
          <span className="ds-input-label mono">Rôle principal</span>
          <select defaultValue="support">
            <option value="top">Top</option>
            <option value="jungle">Jungle</option>
            <option value="mid">Mid</option>
            <option value="adc">ADC</option>
            <option value="support">Support</option>
          </select>
        </label>
      </DemoCell>
      <DemoCell label="Search">
        <label className="ds-input ds-input--search">
          <span className="ds-input-label mono">Chercher un champion</span>
          <input type="text" placeholder="Lulu, Thresh, Nautilus..." />
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="11" cy="11" r="6"/><line x1="20" y1="20" x2="16" y2="16"/></svg>
        </label>
      </DemoCell>
      <DemoCell label="Checkbox">
        <label className="ds-check">
          <span className="ds-check-box ds-check-box--on"></span>
          <span>Garder mes wards à jour</span>
        </label>
      </DemoCell>
      <DemoCell label="Toggle">
        <label className="ds-toggle ds-toggle--on">
          <span className="ds-toggle-track"><span className="ds-toggle-thumb"></span></span>
          <span>Mode compétition</span>
        </label>
      </DemoCell>
    </div>
  );
}

function TagsShowcase() {
  return (
    <div className="ds-tagrow">
      <span className="callout-tag"><span className="gl gl--key"></span> KEY POINT</span>
      <span className="callout-tag"><span className="gl gl--pro"></span> PRO TIP</span>
      <span className="callout-tag"><span className="gl gl--trap"></span> TRAP</span>
      <span className="pill pill--facile">FACILE</span>
      <span className="pill pill--jouable">JOUABLE</span>
      <span className="pill pill--difficile">DIFFICILE</span>
      <span className="ds-chip">PATCH 26.X</span>
      <span className="ds-chip ds-chip--accent">EUW</span>
      <span className="ds-chip ds-chip--win">WIN</span>
      <span className="ds-chip ds-chip--loss">LOSS</span>
    </div>
  );
}

function TabsShowcase() {
  const [tab, setTab] = React.useState("enchanteur");
  return (
    <div className="archetype-switch ds-tabs-demo">
      {[
        { id: "enchanteur", label: "Enchanteur", tag: "01" },
        { id: "engage",     label: "Engage",     tag: "02" },
        { id: "poke",       label: "Poke",       tag: "03" },
      ].map(t => (
        <button
          key={t.id}
          className={"archetype-tab" + (tab === t.id ? " is-active" : "")}
          onClick={() => setTab(t.id)}
        >
          <span className="tag mono">{t.tag}</span>
          <span className="label">{t.label}</span>
        </button>
      ))}
    </div>
  );
}

function CardsShowcase() {
  return (
    <div className="ds-cards-grid">
      <article className="phase-card ds-card-demo">
        <header className="phase-hd">
          <h4 className="phase-title">Lesson card</h4>
          <span className="phase-timer">~12 min</span>
        </header>
        <ol className="phase-list">
          <li><span>Vision control & ward placement basics</span></li>
          <li><span>Roaming triggers and timing windows</span></li>
          <li><span>Setting up your ADC for trades</span></li>
        </ol>
      </article>

      <article className="skill ds-card-demo">
        <span className="skill-num mono">SKILL · 02</span>
        <h4 className="skill-title">Lecture de la map</h4>
        <p className="skill-desc">Apprends à lire les positions des 5 ennemis sans regarder la map directement.</p>
        <a className="skill-link" href="#">Lire la suite →</a>
      </article>

      <article className="ds-rank-card">
        <div className="ds-rank-icon" data-tier="gold">
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
            <polygon points="24,4 42,14 42,34 24,44 6,34 6,14"/>
            <polygon points="24,12 36,18 36,30 24,36 12,30 12,18"/>
            <circle cx="24" cy="24" r="3" fill="currentColor"/>
          </svg>
        </div>
        <div className="ds-rank-meta">
          <span className="mono ds-rank-label">CURRENT TIER</span>
          <h4>Gold IV</h4>
          <p className="mono">68 LP · +12 last game</p>
        </div>
      </article>
    </div>
  );
}

function ChartsShowcase() {
  return (
    <div className="ds-charts-grid">
      <DSBlock label="PROGRESS · BAR" title="XP rail">
        <div className="ds-progress-demo">
          <div className="progress-bar"><div className="progress-bar-fill" style={{width: "62%"}}></div></div>
          <div className="ds-progress-meta">
            <span className="mono">LVL 14</span>
            <span className="mono">620 / 1000 XP</span>
          </div>
        </div>
      </DSBlock>

      <DSBlock label="STAT · NUMERIC" title="Win-rate stat">
        <div className="ds-stat-demo">
          <span className="ds-stat-num">62<em>%</em></span>
          <span className="ds-stat-delta">+4.2 vs patch 26.W</span>
          <span className="mono ds-stat-label">WIN RATE · LAST 30 GAMES</span>
        </div>
      </DSBlock>

      <DSBlock label="CHART · BAR" title="KDA per role">
        <BarChart />
      </DSBlock>

      <DSBlock label="CHART · LINE" title="LP trajectory">
        <LineChart />
      </DSBlock>
    </div>
  );
}

function BarChart() {
  const data = [
    { label: "TOP",  v: 0.45 },
    { label: "JNG",  v: 0.62 },
    { label: "MID",  v: 0.51 },
    { label: "ADC",  v: 0.78 },
    { label: "SUP",  v: 0.92 },
  ];
  return (
    <div className="ds-bar-chart">
      <div className="ds-bar-chart-grid">
        {[0, 0.25, 0.5, 0.75, 1].map(g => (
          <div key={g} className="ds-bar-gridline" style={{ bottom: (g * 100) + "%" }}>
            <span className="mono">{Math.round(g*10)}</span>
          </div>
        ))}
        {data.map(d => (
          <div key={d.label} className="ds-bar-col">
            <div className="ds-bar-fill" style={{ height: (d.v * 100) + "%" }}>
              <span className="ds-bar-cap"></span>
            </div>
            <span className="ds-bar-label mono">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LineChart() {
  const points = [20, 35, 28, 42, 38, 55, 48, 62, 70];
  const w = 280, h = 120;
  const max = 80, min = 0;
  const path = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p - min) / (max - min)) * h;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  return (
    <div className="ds-line-chart">
      <svg viewBox={`0 0 ${w} ${h+20}`} preserveAspectRatio="none">
        {[0, 0.5, 1].map(g => (
          <line key={g} x1="0" x2={w} y1={h - g*h} y2={h - g*h}
            stroke="var(--rule)" strokeDasharray="2 4"/>
        ))}
        <path d={path} fill="none" stroke="var(--accent)" strokeWidth="1.5"/>
        {points.map((p, i) => {
          const x = (i / (points.length - 1)) * w;
          const y = h - ((p - min) / (max - min)) * h;
          return <circle key={i} cx={x} cy={y} r="2.5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.2"/>;
        })}
      </svg>
      <div className="ds-line-axis">
        <span className="mono">M1</span><span className="mono">M5</span><span className="mono">M9</span>
      </div>
    </div>
  );
}

function DemoCell({ label, children }) {
  return (
    <div className="ds-demo-cell">
      <div className="ds-demo-stage">{children}</div>
      <span className="ds-demo-label mono">{label}</span>
    </div>
  );
}

Object.assign(window, { Components, ButtonsShowcase, InputsShowcase, TagsShowcase, TabsShowcase, CardsShowcase, ChartsShowcase, BarChart, LineChart, DemoCell });
