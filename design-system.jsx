// design-system.jsx — Learning Leagues Design System reference

const TABS = [
  { id: "foundations", num: "01", label: "Foundations" },
  { id: "components",  num: "02", label: "Components" },
  { id: "patterns",    num: "03", label: "Patterns" },
];

function DSApp() {
  const [tab, setTab] = React.useState(() => {
    if (typeof window === "undefined") return "foundations";
    const h = window.location.hash.replace("#", "");
    return TABS.some(t => t.id === h) ? h : "foundations";
  });

  React.useEffect(() => {
    window.history.replaceState(null, "", "#" + tab);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [tab]);

  return (
    <React.Fragment>
      <DSNav tab={tab} setTab={setTab} />
      <DSHero />
      <DSTabRail tab={tab} setTab={setTab} />
      <main className="shell ds-main">
        {tab === "foundations" && <Foundations />}
        {tab === "components"  && <Components />}
        {tab === "patterns"    && <Patterns />}
      </main>
      <Footer />
    </React.Fragment>
  );
}

/* ─────────────────── Nav (slim variant of the brand nav) ─────────────── */
function DSNav({ tab, setTab }) {
  return (
    <div className="nav">
      <div className="shell nav-inner">
        <a className="logo" href="Landing.html">
          <LogoMark />
          <span>Learning Leagues</span>
          <span className="ds-brand-tag mono">/ DESIGN SYSTEM</span>
        </a>
        <nav className="nav-links" aria-label="Design system">
          {TABS.map(t => (
            <a
              key={t.id}
              className="nav-link"
              href={"#" + t.id}
              aria-current={tab === t.id ? "page" : undefined}
              onClick={(e) => { e.preventDefault(); setTab(t.id); }}
            >{t.label}</a>
          ))}
        </nav>
        <div className="nav-right">
          <a className="nav-cta" href="Landing.html">← Back to site</a>
        </div>
      </div>
    </div>
  );
}

function DSHero() {
  return (
    <section className="ds-hero">
      <div className="shell">
        <div className="ds-hero-grid">
          <div>
            <div className="eyebrow ds-hero-eyebrow">
              SYSTEM <span className="dot"></span> v1.0 <span className="dot"></span> HEXTECH ÉDITORIAL
            </div>
            <h1 className="ds-hero-h1">
              Learning Leagues<em>.</em>
              <br/>
              Design System.
            </h1>
            <p className="ds-hero-lede">
              The visual language behind Learning Leagues — a Hextech-inspired editorial system
              built for League players studying their craft. Dark by default, amber by accent,
              compact by density. Every token, component and pattern documented here.
            </p>
            <div className="ds-hero-meta">
              <span><strong>Density</strong> Compact</span>
              <span><strong>Accent</strong> Ambre</span>
              <span><strong>Mode</strong> Dark only</span>
              <span><strong>Patch</strong> 26.X</span>
            </div>
          </div>
          <DSHeroSigil />
        </div>
      </div>
    </section>
  );
}

function DSHeroSigil() {
  return (
    <div className="ds-hero-sigil" aria-hidden="true">
      <svg viewBox="0 0 240 240" fill="none" stroke="currentColor" strokeWidth="0.7">
        {/* hexagonal token grid */}
        <polygon points="120,12 218,68 218,172 120,228 22,172 22,68" strokeWidth="1" opacity=".6"/>
        <polygon points="120,40 192,82 192,158 120,200 48,158 48,82" strokeWidth=".7" opacity=".4"/>
        <polygon points="120,70 168,98 168,142 120,170 72,142 72,98" strokeWidth=".7" opacity=".5"/>
        {/* center diamond */}
        <path d="M120 95 L145 120 L120 145 L95 120 Z" fill="currentColor" opacity=".15"/>
        <path d="M120 95 L145 120 L120 145 L95 120 Z" strokeWidth="1.2"/>
        <circle cx="120" cy="120" r="3" fill="currentColor" stroke="none"/>
        {/* satellite nodes */}
        {[[120,70],[168,98],[168,142],[120,170],[72,142],[72,98]].map(([x,y],i)=>(
          <g key={i}>
            <line x1="120" y1="120" x2={x} y2={y} opacity=".25" strokeDasharray="2 3"/>
            <circle cx={x} cy={y} r="3" fill="currentColor"/>
          </g>
        ))}
        {/* cross-hairs */}
        <line x1="120" y1="0" x2="120" y2="40" opacity=".3"/>
        <line x1="120" y1="200" x2="120" y2="240" opacity=".3"/>
        <line x1="0" y1="120" x2="22" y2="120" opacity=".3"/>
        <line x1="218" y1="120" x2="240" y2="120" opacity=".3"/>
      </svg>
      <span className="tag">SIGIL · LL/DS · v1</span>
    </div>
  );
}

function DSTabRail({ tab, setTab }) {
  return (
    <div className="ds-tabrail">
      <div className="shell">
        <ol className="ds-tabs">
          {TABS.map(t => (
            <li key={t.id} className={"ds-tab" + (tab === t.id ? " is-active" : "")}>
              <button onClick={() => setTab(t.id)}>
                <span className="ds-tab-num mono">{t.num}</span>
                <span className="ds-tab-label">{t.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ─────────────────── Section primitives ──────────────────────────────── */
function DSSection({ num, title, lede, children }) {
  return (
    <section className="ds-section">
      <header className="ds-section-head">
        <div className="ds-section-num">{num}</div>
        <div>
          <h2 className="ds-section-title">{title}</h2>
          {lede && <p className="ds-section-lede">{lede}</p>}
        </div>
      </header>
      {children}
    </section>
  );
}

function DSBlock({ label, title, children }) {
  return (
    <div className="ds-block">
      <header className="ds-block-head">
        {label && <span className="ds-block-label mono">{label}</span>}
        {title && <h3 className="ds-block-title">{title}</h3>}
      </header>
      <div className="ds-block-body">{children}</div>
    </div>
  );
}

function Token({ name, value, swatch, children }) {
  return (
    <div className="ds-token">
      {swatch}
      <div className="ds-token-meta">
        <span className="ds-token-name mono">{name}</span>
        {value && <span className="ds-token-value mono">{value}</span>}
        {children && <span className="ds-token-desc">{children}</span>}
      </div>
    </div>
  );
}

Object.assign(window, { DSApp, DSNav, DSHero, DSTabRail, DSSection, DSBlock, Token });
