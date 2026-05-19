// components.jsx — shared primitives for the Support role page.

/* ── Shared design-token data (single source of truth) ─────────────────────
   LL_TIERS is consumed by ds-foundations.jsx (palette swatches) and
   ds-patterns.jsx (TierDisplayPattern, Leaderboard). The "var" field points
   to the live CSS token in styles.css; "hex" is documentation only and is
   the same hex the token resolves to in every palette.
   ──────────────────────────────────────────────────────────────────────── */
const LL_TIERS = [
  { name: "Iron",       var: "--tier-iron",        hex: "#5b5959" },
  { name: "Bronze",     var: "--tier-bronze",      hex: "#a26939" },
  { name: "Silver",     var: "--tier-silver",      hex: "#9ba6b3" },
  { name: "Gold",       var: "--tier-gold",        hex: "#e39a3c" },
  { name: "Platinum",   var: "--tier-platinum",    hex: "#4ea3a3" },
  { name: "Emerald",    var: "--tier-emerald",     hex: "#3f9670" },
  { name: "Diamond",    var: "--tier-diamond",     hex: "#6fa8dc" },
  { name: "Master",     var: "--tier-master",      hex: "#a868d4" },
  { name: "GM",         var: "--tier-grandmaster", hex: "#c9484a" },
  { name: "Challenger", var: "--tier-challenger",  hex: "#d4b468" },
];

/* ── Glossary ─────────────────────────────────────────────────────────────
   Single source of truth for short, inline LoL term definitions. Use the
   <Gloss term="..."/> component on the FIRST mention of a term in a guide
   to wrap it in a dotted underline + native tooltip. If a term is missing
   here, add it once — never inline glosses ad-hoc in section files.
   ──────────────────────────────────────────────────────────────────────── */
const LL_GLOSSARY = {
  "CS":            "Creep Score — minions you last-hit for gold.",
  "trinket":       "The free warding tool every champion starts with.",
  "control ward":  "Pink ward — denies enemy vision in its area.",
  "pink ward":     "Older name for a control ward — denies enemy vision.",
  "scuttle":       "The neutral crab in the river — first one spawns at 2:55.",
  "invade":        "An early enemy push into your jungle, usually pre-1:30.",
  "peel":          "Standing between your carry and the threat that wants them dead.",
  "pit":           "The walled area where an objective (Drake, Baron) spawns.",
  "freeze":        "Holding the wave near your tower so it never pushes.",
  "vision score":  "The in-game stat measuring your contribution to map vision.",
  "TP":            "Teleport — Summoner spell that lets you re-enter a lane from base.",
  "APC":           "AP Carry — a magic-damage carry (e.g. Veigar, Karthus bot).",
  "ADC":           "Attack Damage Carry — the ranged auto-attacker of the bot lane.",
  "keystone":      "The top-row rune that defines your laning identity.",
  "engage":        "Starting a fight — usually with a hard CC ability.",
  "all-in":        "Committing every cooldown to kill the enemy now.",
  "poke":          "Chipping enemy HP from range without committing to a fight.",
  "enchanter":     "A support archetype focused on shields, heals and buffs.",
  "summoners":     "Summoner Spells — the two extra abilities (Flash, Heal, Ignite…).",
  "Ezreal E":      "Ezreal's dash ability — short blink + skillshot.",
  "Lucian E":      "Lucian's dash ability — short skillshot dash.",
};

/* <Gloss term="CS">CS</Gloss>
   <Gloss term="vision score" def="custom override if you must" />
   First-mention helper. Looks up term in LL_GLOSSARY; def prop wins if given.
   Renders an <abbr> with a native tooltip — no JS hover state needed. */
function Gloss({ term, def, children }) {
  const title = def || LL_GLOSSARY[term] || LL_GLOSSARY[term && term.toLowerCase()];
  return (
    <abbr className="gloss" title={title} data-term={term}>
      {children || term}
    </abbr>
  );
}

function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M12 1.5 22.4 7.5 22.4 16.5 12 22.5 1.6 16.5 1.6 7.5Z" />
      <path d="M12 6 18 9.5 18 14.5 12 18 6 14.5 6 9.5Z" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Nav({ activeKey = "roles" }) {
  const linkProps = (key) => ({
    className: "nav-link" + (activeKey === key ? " is-active" : ""),
    "aria-current": activeKey === key ? "page" : undefined,
  });
  return (
    <div className="nav">
      <div className="shell nav-inner">
        <a className="logo" href="index.html">
          <LogoMark />
          <span>Learning Leagues</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a {...linkProps("foundations")} href="Fundamentals.html">Foundations</a>
          <RolesDropdown active={activeKey === "roles"} />
          <a {...linkProps("champions")} href="#">Champions</a>
          <a {...linkProps("macro")} href="#">Macro</a>
          <a {...linkProps("glossary")} href="Glossary.html">Glossary</a>
        </nav>
        <div className="nav-right">
          <LangSwitcher />
          <button className="nav-cta">Role quiz →</button>
        </div>
      </div>
    </div>
  );
}

function RolesDropdown({ active }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const roles = [
    { name: "Top",     href: "/roles/top" },
    { name: "Jungle",  href: "/roles/jungle" },
    { name: "Mid",     href: "/roles/middle" },
    { name: "ADC",     href: "/roles/bottom" },
    { name: "Support", href: "Support.html" },
  ];

  return (
    <div className="nav-roles" ref={ref}>
      <button
        type="button"
        className={"nav-link nav-roles-btn" + (active ? " is-active" : "")}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-current={active ? "page" : undefined}
        onClick={() => setOpen((o) => !o)}
      >
        <span>Roles</span>
        <svg className="nav-roles-caret" viewBox="0 0 20 16" fill="currentColor" aria-hidden="true">
          <path d="M10 0L20 16H0L10 0Z" />
        </svg>
      </button>
      {open && (
        <ul className="nav-roles-menu" role="menu">
          {roles.map((r) => (
            <li key={r.name} role="none">
              <a className="nav-roles-item" role="menuitem" href={r.href}>{r.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Breadcrumb() {
  return (
    <div className="shell">
      <div className="breadcrumb">
        <a href="#">Home</a>
        <span className="sep">›</span>
        <a href="#">Roles</a>
        <span className="sep">›</span>
        <span className="current">Support</span>
      </div>
    </div>
  );
}

function SectionHead({ num, title, lede }) {
  return (
    <div className="section-head">
      <div className="section-num">{num}</div>
      <div>
        <h2 className="section-title">{title}</h2>
        <p className="section-lede">{lede}</p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="shell">
        <div className="hero-grid">
          <div>
            <div className="eyebrow hero-eyebrow">
              ROLE <span className="dot"></span> SUPPORT
            </div>
            <h1 className="serif">Support<em>.</em></h1>

            <p className="hero-intro">
              Support is the team's connective role. You don't farm and you don't
              hunt kills for yourself. You provide vision, you start or cancel
              engages, and you keep your ADC alive. Pick Support if reading the
              map beats executing combos for you.
            </p>

            <div className="hero-meta">
              <span><strong>Difficulty</strong><span className="stars">★</span><span style={{opacity:.3}}>★★</span></span>
              <span><strong>Read time</strong> ~15 min</span>
              <span><strong>Patch</strong> 26.X</span>
            </div>
          </div>

          <div className="hero-sigil" aria-hidden="true">
            <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
              {/* outer hex */}
              <polygon points="100,10 180,55 180,145 100,190 20,145 20,55" strokeWidth="1" opacity="0.6" />
              {/* inner hex */}
              <polygon points="100,40 155,72 155,128 100,160 45,128 45,72" strokeWidth="0.8" opacity="0.4" />
              {/* radial spokes */}
              <line x1="100" y1="10" x2="100" y2="40" opacity=".5" />
              <line x1="180" y1="55" x2="155" y2="72" opacity=".5" />
              <line x1="180" y1="145" x2="155" y2="128" opacity=".5" />
              <line x1="100" y1="190" x2="100" y2="160" opacity=".5" />
              <line x1="20" y1="145" x2="45" y2="128" opacity=".5" />
              <line x1="20" y1="55" x2="45" y2="72" opacity=".5" />
              {/* support glyph — shield + eye */}
              <path d="M100 70 L130 82 L130 108 C130 120 116 128 100 134 C84 128 70 120 70 108 L70 82 Z" strokeWidth="1.2" />
              <circle cx="100" cy="102" r="8" strokeWidth="1" />
              <circle cx="100" cy="102" r="2.5" fill="currentColor" stroke="none" />
              <path d="M100 88 L100 70 M100 116 L100 134 M80 102 L70 96 M120 102 L130 96" opacity=".5" />
            </svg>
            <span className="tag">SIGIL · SUPPORT</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <div className="footer-brand">
              Learning Leagues
              <span className="baseline">Learning League of Legends, properly.</span>
            </div>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h5>Navigation</h5>
              <a href="Fundamentals.html">Foundations</a>
              <a href="#">Roles</a>
              <a href="#">Champions</a>
              <a href="#">Macro</a>
              <a href="Glossary.html">Glossary</a>
            </div>
            <div className="footer-col">
              <h5>Resources</h5>
              <a href="#">Glossary</a>
              <a href="#">Objective timings</a>
              <a href="#">Role quiz</a>
              <a href="#">Patch changelog</a>
            </div>
            <div className="footer-col">
              <h5>Elsewhere</h5>
              <a href="#">YouTube</a>
              <a href="#">Discord</a>
              <a href="#">X / Twitter</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="disclaimer">
            <strong>Learning Leagues isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games</strong> or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc.
          </p>
          <span>© 2026 · LEARNING LEAGUES</span>
        </div>
      </div>
    </footer>
  );
}

function LangSwitcher() {
  const [open, setOpen] = React.useState(false);
  const [lang, setLang] = React.useState("EN");
  const wrapRef = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  const langs = ["FR", "EN", "ES", "DE"];
  return (
    <div className="lang-wrap" ref={wrapRef}>
      <button
        className="lang-btn"
        aria-label="Change language"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.5 3 2.5 15 0 18" />
          <path d="M12 3c-2.5 3-2.5 15 0 18" />
        </svg>
        <span className="lang-code mono">{lang}</span>
        <svg className="lang-chev" viewBox="0 0 10 6" width="9" height="5" fill="currentColor"><path d="M0 0h10L5 6z" /></svg>
      </button>
      {open && (
        <ul className="lang-menu" role="listbox">
          {langs.map((l) => (
            <li
              key={l}
              role="option"
              aria-selected={l === lang}
              className={"lang-item" + (l === lang ? " is-active" : "")}
              onClick={() => { setLang(l); setOpen(false); }}
            >
              <span className="mono">{l}</span>
              <span className="lang-name">{ {FR:"Français",EN:"English",ES:"Español",DE:"Deutsch"}[l] }</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

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
  const lockRef = React.useRef(false);
  const NAV_OFFSET = 80;
  const TRIGGER = NAV_OFFSET + 40;

  React.useEffect(() => {
    const ids = items.map((i) => i.id);
    const compute = () => {
      if (lockRef.current) return;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - TRIGGER <= 0.5) current = id;
        else break;
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  const onClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const targetTop = Math.max(
      0,
      Math.round(el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET)
    );
    setActive(id);
    lockRef.current = true;

    let stableFrames = 0;
    let lastY = window.scrollY;
    let raf = 0;
    let safety = 0;
    const release = () => {
      lockRef.current = false;
      cancelAnimationFrame(raf);
      clearTimeout(safety);
    };
    const tick = () => {
      const y = window.scrollY;
      const atTarget = Math.abs(y - targetTop) < 2;
      const stopped = y === lastY;
      lastY = y;
      stableFrames = stopped ? stableFrames + 1 : 0;
      if (atTarget && stableFrames >= 4) { release(); return; }
      raf = requestAnimationFrame(tick);
    };
    safety = setTimeout(release, 1500);
    window.scrollTo({ top: targetTop, behavior: "smooth" });
    raf = requestAnimationFrame(tick);
  };

  return (
    <aside className="toc" aria-label="Contents">
      <div className="toc-label mono">Contents</div>
      <ol className="toc-list">
        {items.map((it) => (
          <li key={it.id} className={"toc-item" + (active === it.id ? " is-active" : "")}>
            <a href={"#" + it.id} className="toc-link" onClick={(e) => onClick(e, it.id)}>
              <span className="toc-num mono">{it.num}</span>
              <span className="toc-text">{it.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}

Object.assign(window, { LogoMark, Nav, Breadcrumb, SectionHead, Hero, Footer, LangSwitcher, TocSidebar, Gloss, LL_TIERS, LL_GLOSSARY });
