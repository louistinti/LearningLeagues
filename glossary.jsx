// glossary.jsx — Glossary page composition.
// Renders every entry of LL_GLOSSARY (defined in components.jsx) as an
// alphabetised definition list. The page is intentionally lean: hero,
// list, footer. No tabs, no archetypes, just the terms.

function GlossaryHero() {
  const count = Object.keys(LL_GLOSSARY).length;
  return (
    <section className="hero">
      <div className="shell">
        <div className="hero-grid">
          <div>
            <div className="eyebrow hero-eyebrow">
              REFERENCE <span className="dot"></span> GLOSSARY
            </div>
            <h1 className="serif">Glossary<em>.</em></h1>

            <p className="hero-intro">
              Every term Learning Leagues defines inline lives here too.
              Open this page when a guide uses a word you don't recognise,
              or skim it once to anchor the vocabulary.
            </p>

            <div className="hero-meta">
              <span><strong>{count} terms</strong> · alphabetised</span>
              <span><strong>Scope</strong> · macro &amp; mechanics</span>
              <span><strong>Patch-stable</strong></span>
            </div>
          </div>

          <div className="hero-sigil" aria-hidden="true">
            <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
              <polygon points="100,10 180,55 180,145 100,190 20,145 20,55" strokeWidth="1" opacity="0.6" />
              <polygon points="100,40 155,72 155,128 100,160 45,128 45,72" strokeWidth="0.8" opacity="0.4" />
              {/* radial spokes */}
              <line x1="100" y1="10" x2="100" y2="40" opacity=".5" />
              <line x1="180" y1="55" x2="155" y2="72" opacity=".5" />
              <line x1="180" y1="145" x2="155" y2="128" opacity=".5" />
              <line x1="100" y1="190" x2="100" y2="160" opacity=".5" />
              <line x1="20" y1="145" x2="45" y2="128" opacity=".5" />
              <line x1="20" y1="55" x2="45" y2="72" opacity=".5" />
              {/* book glyph */}
              <path d="M64 78 L100 70 L136 78 L136 134 L100 126 L64 134 Z" strokeWidth="1.1" opacity=".7" />
              <line x1="100" y1="70" x2="100" y2="126" opacity=".6" />
              <path d="M74 92 L94 88 M74 104 L94 100 M74 116 L94 112 M106 88 L126 92 M106 100 L126 104 M106 112 L126 116" opacity=".5" />
            </svg>
            <span className="tag">SIGIL · GLOSSARY</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function GlossaryList() {
  // Sort case-insensitive, alphabetical
  const entries = Object.entries(LL_GLOSSARY).sort((a, b) =>
    a[0].toLowerCase().localeCompare(b[0].toLowerCase())
  );

  // Group by first letter for index anchors
  const groups = entries.reduce((acc, [term, def]) => {
    const k = term[0].toUpperCase();
    (acc[k] = acc[k] || []).push([term, def]);
    return acc;
  }, {});

  const letters = Object.keys(groups);

  return (
    <section className="section shell" id="s-glossary">
      <SectionHead
        num="01"
        title="Every term, defined"
        lede="Hover any glossed word in a guide and you'll see the same definition that lives here. The list is patch-stable — if a term changes meaning between seasons, it changes here too."
      />

      <nav className="glossary-jumper" aria-label="Letter index">
        {letters.map((l) => (
          <a key={l} href={`#letter-${l}`} className="glossary-jumper-link mono">{l}</a>
        ))}
      </nav>

      {letters.map((l) => (
        <div key={l} className="glossary-group" id={`letter-${l}`}>
          <h2 className="glossary-letter serif">{l}</h2>
          <dl className="glossary-list">
            {groups[l].map(([term, def]) => (
              <div key={term} className="glossary-entry">
                <dt className="glossary-term">{term}</dt>
                <dd className="glossary-def">{def}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </section>
  );
}

function GlossaryApp() {
  return (
    <React.Fragment>
      <Nav activeKey="glossary" />
      <GlossaryHero />
      <GlossaryList />
      <Footer />
    </React.Fragment>
  );
}

Object.assign(window, { GlossaryHero, GlossaryList, GlossaryApp });
