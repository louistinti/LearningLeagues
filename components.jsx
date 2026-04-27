// components.jsx — shared primitives for the Support role page.

function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M12 1.5 22.4 7.5 22.4 16.5 12 22.5 1.6 16.5 1.6 7.5Z" />
      <path d="M12 6 18 9.5 18 14.5 12 18 6 14.5 6 9.5Z" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Nav() {
  return (
    <div className="nav">
      <div className="shell nav-inner">
        <a className="logo" href="#">
          <LogoMark />
          <span>Learning Leagues</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a className="nav-link" href="#">Foundations</a>
          <a className="nav-link" href="#" aria-current="page">Roles</a>
          <a className="nav-link" href="#">Champions</a>
          <a className="nav-link" href="#">Macro</a>
          <a className="nav-link" href="#">Pathways</a>
        </nav>
        <div className="nav-right">
          <LangSwitcher />
          <button className="nav-cta">Role quiz →</button>
        </div>
      </div>
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

            <blockquote className="hero-pullquote">
              "You are the team's eyes and the barrier between your ADC and death."
            </blockquote>

            <p className="hero-intro">
              Support is the team's connective role. You don't farm, you don't hunt
              kills for yourself — you provide vision, you start or cancel engages,
              and you keep your ADC alive. It's the ideal role for a player who
              prefers reading the map and orchestrating decisions over executing combos.
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
              <a href="#">Foundations</a>
              <a href="#">Roles</a>
              <a href="#">Champions</a>
              <a href="#">Macro</a>
              <a href="#">Pathways</a>
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

Object.assign(window, { LogoMark, Nav, Breadcrumb, SectionHead, Hero, Footer, LangSwitcher });
