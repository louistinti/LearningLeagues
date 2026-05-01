// landing.jsx — Learning Leagues landing page sections.
// Reuses the existing Hextech design system (tokens from styles.css, components from components.jsx).

// ── Hero ────────────────────────────────────────────────────────────────
function LandingHero() {
  const onExplore = (e) => {
    e.preventDefault();
    const el = document.getElementById("s-fundamentals");
    if (!el) return;
    const top = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - 72));
    window.scrollTo({ top, behavior: "smooth" });
  };
  return (
    <section className="hero landing-hero">
      <div className="shell">
        <div className="landing-hero-grid">
          <div>
            <h1 className="serif landing-h1">
              Everything you need to learn
              League of <em>Legends.</em>
            </h1>

            <p className="landing-sub">
              From MOBA-savvy beginner to confident Bronze — a structured path by
              role, with no jargon and no chasing the meta.
            </p>

            <div className="landing-cta-row">
              <a href="#s-fundamentals" className="btn-primary" onClick={onExplore}>
                <span>Explore</span>
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square">
                  <path d="M8 3v10M3 8l5 5 5-5" />
                </svg>
              </a>
              <a href="#" className="btn-ghost">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M6 6.5c0-1.1.9-2 2-2s2 .9 2 2-2 1.5-2 3M8 11.5v.01" />
                </svg>
                <span>Role quiz</span>
              </a>
            </div>

            <div className="landing-meta">
              <span><strong>5 sections</strong> · structured path</span>
              <span className="dot-sep">·</span>
              <span><strong>By role</strong> · top, jungle, mid, adc, support</span>
              <span className="dot-sep">·</span>
              <span><strong>Iron → Platinium</strong></span>
            </div>
          </div>

          <div className="hero-sigil landing-sigil" aria-hidden="true">
            <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
              <polygon points="100,10 180,55 180,145 100,190 20,145 20,55" strokeWidth="1" opacity="0.55" />
              <polygon points="100,40 155,72 155,128 100,160 45,128 45,72" strokeWidth="0.8" opacity="0.4" />
              {/* radial */}
              <line x1="100" y1="10" x2="100" y2="40" opacity=".5" />
              <line x1="180" y1="55" x2="155" y2="72" opacity=".5" />
              <line x1="180" y1="145" x2="155" y2="128" opacity=".5" />
              <line x1="100" y1="190" x2="100" y2="160" opacity=".5" />
              <line x1="20" y1="145" x2="45" y2="128" opacity=".5" />
              <line x1="20" y1="55" x2="45" y2="72" opacity=".5" />
              {/* compass / rift glyph */}
              <circle cx="100" cy="100" r="36" strokeWidth="1" opacity=".7" />
              <path d="M100 64 L106 100 L100 136 L94 100 Z" fill="currentColor" opacity=".85" stroke="none" />
              <path d="M64 100 L100 94 L136 100 L100 106 Z" fill="currentColor" opacity=".4" stroke="none" />
              <circle cx="100" cy="100" r="3" fill="currentColor" stroke="none" />
              {/* corner ticks */}
              <path d="M100 14 L100 22 M100 178 L100 186 M24 100 L32 100 M168 100 L176 100" opacity=".55" strokeWidth="1" />
            </svg>
            <span className="tag">RIFT · COMPASS</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Showcase (Fundamentals / Training / Resources) ──────────────────────
function Showcase({ id, num, eyebrow, title, lede, ctaLabel, ctaHref, variant, children }) {
  return (
    <section id={id} className={"section showcase showcase--" + (variant || "default")}>
      <div className="shell">
        <div className="showcase-grid">
          <div className="showcase-text">
            <div className="showcase-num mono">{num}</div>
            <div className="eyebrow eyebrow--accent showcase-eyebrow">{eyebrow}</div>
            <h2 className="showcase-title serif">{title}</h2>
            <p className="showcase-lede">{lede}</p>
            <a href={ctaHref} className="btn-primary showcase-cta">
              <span>{ctaLabel}</span>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </div>
          <div className="showcase-visual">{children}</div>
        </div>
      </div>
    </section>
  );
}

// ── Visual: Fundamentals (curriculum vignette) ──────────────────────────
function FundamentalsVisual() {
  const cells = [
    { tag: "MAP",       label: "Lanes & jungle"   },
    { tag: "ITEMS",     label: "Mythic, support, boots" },
    { tag: "RUNES",     label: "Trees & shards"   },
    { tag: "VISION",    label: "Wards & control"  },
    { tag: "WAVES",     label: "Freeze, push, slow-push" },
    { tag: "OBJECTIVES",label: "Drake, herald, baron" },
  ];
  return (
    <div className="fund-vignette">
      <div className="fund-grid">
        {cells.map((c, i) => (
          <div className="fund-cell" key={c.tag}>
            <span className="fund-cell-num mono">{String(i + 1).padStart(2, "0")}</span>
            <span className="fund-cell-tag mono">{c.tag}</span>
            <span className="fund-cell-label">{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Section: 5 roles ────────────────────────────────────────────────────
const ROLES = [
  { key: "top",     name: "Top",     icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-top.png",     blurb: "Island duelist", href: "/roles/top" },
  { key: "jungle",  name: "Jungle",  icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-jungle.png",  blurb: "Tempo & paths",  href: "/roles/jungle" },
  { key: "middle",  name: "Mid",     icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-middle.png",  blurb: "Map carry",      href: "/roles/middle" },
  { key: "bottom",  name: "ADC",     icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-bottom.png",  blurb: "Late-game DPS",  href: "/roles/bottom" },
  { key: "utility", name: "Support", icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-utility.png", blurb: "Vision & engage", href: "Support.html" },
];

function RolesSection() {
  return (
    <section id="s-roles" className="section roles-section">
      <div className="shell">
        <div className="showcase-grid showcase-grid--centered">
          <div className="showcase-text">
            <div className="eyebrow eyebrow--accent showcase-eyebrow">THE FIVE POSITIONS</div>
            <h2 className="showcase-title serif">Choose your <em>role.</em></h2>
            <p className="showcase-lede">
              Five positions, five mindsets. Your role decides your job on the map —
              start with what fits your instincts, branch out later.
            </p>
          </div>
        </div>

        <ul className="roles-grid" role="list">
          {ROLES.map((r) => (
            <li key={r.key} className="role-card-wrap">
              <a
                className="role-card"
                href={r.href}
                aria-label={`${r.name} role — open the dedicated guide`}
              >
                <div className="role-card-corners"><span></span><span></span><span></span><span></span></div>
                <div className="role-card-icon">
                  <img src={r.icon} alt="" loading="lazy" />
                </div>
                <span className="role-card-name serif">{r.name}</span>
                <span className="role-card-blurb mono">{r.blurb}</span>
                <span className="role-card-arrow mono" aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Visual: Training (drill list) ───────────────────────────────────────
function TrainingVisual() {
  const drills = [
    { id: "01", name: "Last-hit drill",     dur: "10 min", tag: "MECH"   },
    { id: "02", name: "Vision sweep",       dur: "15 min", tag: "MAP"    },
    { id: "03", name: "Wave tempo",         dur: "20 min", tag: "MACRO"  },
    { id: "04", name: "Skillshot accuracy", dur: "10 min", tag: "MECH"   },
  ];
  return (
    <div className="train-vignette">
      <div className="train-head">
        <span className="mono">PRACTICE TOOL · DRILL #03</span>
        <span className="train-status mono">● LIVE</span>
      </div>
      <ul className="train-list">
        {drills.map((d, i) => (
          <li key={d.id} className={"train-row" + (i === 2 ? " is-active" : "")}>
            <span className="train-row-id mono">{d.id}</span>
            <span className="train-row-name">{d.name}</span>
            <span className="train-row-tag mono">{d.tag}</span>
            <span className="train-row-dur mono">{d.dur}</span>
          </li>
        ))}
      </ul>
      <div className="train-foot mono">
        <span>4 DRILLS · 55 MIN</span>
        <span className="train-foot-cta">REPS &gt; THEORY</span>
      </div>
    </div>
  );
}

// ── Visual: Resources (wordmarks) ───────────────────────────────────────
function ResourcesVisual() {
  const tools = ["LOLALYTICS", "U.GG", "OP.GG", "DPM.LOL"];
  return (
    <div className="res-vignette">
      <div className="res-head mono">EXTERNAL · 4 TOOLS</div>
      <ul className="res-list">
        {tools.map((t, i) => (
          <li key={t} className="res-row">
            <span className="res-row-num mono">{String(i + 1).padStart(2, "0")}</span>
            <span className="res-row-name serif">{t}</span>
            <span className="res-row-line"></span>
            <span className="res-row-tag mono">
              {i === 0 ? "STATS · BUILDS" : i === 1 ? "MATCHUPS" : i === 2 ? "PROFILES" : "PRO REPLAYS"}
            </span>
          </li>
        ))}
      </ul>
      <div className="res-foot mono">
        WE STEP ASIDE FOR THE TOOLS THAT DO IT BEST.
      </div>
    </div>
  );
}

// ── Landing nav ─────────────────────────────────────────────────────────
function LandingNav() {
  return (
    <div className="nav">
      <div className="shell nav-inner">
        <a className="logo" href="index.html">
          <LogoMark />
          <span>Learning Leagues</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a className="nav-link" href="#s-fundamentals">Fundamentals</a>
          <RolesDropdown />
          <a className="nav-link" href="#">Champions</a>
          <a className="nav-link" href="#s-training">Training</a>
          <a className="nav-link" href="#s-resources">Resources</a>
        </nav>
        <div className="nav-right">
          <LangSwitcher />
          <button className="nav-cta">Role quiz →</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  LandingHero, Showcase, FundamentalsVisual, RolesSection,
  TrainingVisual, ResourcesVisual, LandingNav,
});
