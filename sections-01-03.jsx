// sections-01-03.jsx — Phase cards, annotated map, skills

// ── Section 01 ─────────────────────────────────────────────────────────────
function SectionPhases() {
  const phases = [
    {
      title: "Early game",
      timer: "0 → 14 min",
      items: [
        "Prio niveau 2 : tu passes 2 avec les 6 premiers minions + les 3 mélés de la 2e wave. Tape (sans tuer) les creeps des 2 premières waves pour accélérer le tempo.",
        "Premier ward : dépend de ton push. Priorise tes bottes ou ton 1er item selon ton archétype. Le control ward (pink) se garde pour défendre une zone précise contre un gank ou préparer un objectif.",
        "Laisse les CS à l'ADC (tape sans tuer). Protège-le en trade.",
      ],
    },
    {
      title: "Mid game",
      timer: "14 → 25 min",
      items: [
        "Roam ou reste : lis la minimap, juge si mid/jungle a besoin de toi.",
        "Vision autour des objectifs (Grubs → Herald → Drake), contest la vision adverse.",
        "Enclenche ou désamorce les teamfights selon ton archétype (engage / enchanter / poke).",
      ],
    },
    {
      title: "Late game",
      timer: "25 min +",
      items: [
        "Vision profonde autour du Baron, control wards partout.",
        "Peel ton carry (ADC ou mid) : tes CC servent à garder tes dégâts en vie.",
        "Flanque ou engage avec l'équipe, jamais seul — tu as 0 dégât.",
      ],
    },
  ];
  return (
    <section className="section shell" id="s01">
      <SectionHead
        num="01"
        title="Ce que tu fais, phase par phase"
        lede="Un Support efficace change de priorités avec le temps. Voici les 3 choses qui comptent à chaque phase."
      />
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

// ── Section 02 ─────────────────────────────────────────────────────────────
function SectionMap() {
  const [active, setActive] = React.useState(null);
  const pins = [
    { n: 1, x: 22, y: 73, short: "Bush tribush", long: "1er ward contre gank" },
    { n: 2, x: 32, y: 82, short: "Bush lane",    long: "Vision de trade" },
    { n: 3, x: 46, y: 62, short: "River bot",    long: "Timing Scuttle 2:55" },
    { n: 4, x: 72, y: 36, short: "Tri-brush jungle adverse", long: "Vision profonde" },
    { n: 5, x: 62, y: 44, short: "Baron pit",    long: "Dès 19:30 pour 20:00" },
    { n: 6, x: 38, y: 54, short: "Drake pit",    long: "À chaque spawn" },
  ];
  return (
    <section className="section shell" id="s02">
      <SectionHead
        num="02"
        title="La Faille depuis ton point de vue"
        lede="Tes zones, angles de vision et menaces typiques — une lecture de map spécifique au Support."
      />
      <div className="map-wrap">
        <div className="map-frame">
          <div className="map-corners"><span></span><span></span><span></span><span></span></div>
          <svg viewBox="0 0 100 100" aria-label="Carte stylisée de la Faille">
            {/* grid */}
            <defs>
              <pattern id="mg" width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M5 0 L0 0 0 5" fill="none" stroke="var(--grid-line)" strokeWidth="0.15" />
              </pattern>
              <linearGradient id="riverGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--accent-bleu)" stopOpacity="0.22" />
                <stop offset="1" stopColor="var(--accent-bleu)" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <rect width="100" height="100" fill="url(#mg)" />

            {/* outer diamond — the map frame */}
            <polygon points="50,6 94,50 50,94 6,50" fill="none" stroke="var(--border)" strokeWidth="0.5" />

            {/* river band (diagonal) */}
            <polygon points="6,50 50,6 60,16 16,60" fill="url(#riverGrad)" />
            <polygon points="50,94 94,50 84,40 40,84" fill="url(#riverGrad)" />
            <line x1="6" y1="50" x2="50" y2="6" stroke="var(--accent-bleu)" strokeOpacity=".35" strokeWidth="0.25" />
            <line x1="50" y1="94" x2="94" y2="50" stroke="var(--accent-bleu)" strokeOpacity=".35" strokeWidth="0.25" />

            {/* three lanes — stylized */}
            <g stroke="var(--fg-mute)" strokeWidth="0.35" strokeOpacity="0.55" fill="none" strokeDasharray="1.5 1.2">
              {/* top lane */}
              <path d="M10 20 L20 12 L80 12 L88 20" />
              <path d="M12 30 L30 18 L80 18" />
              {/* mid diagonal */}
              <path d="M20 80 L80 20" />
              {/* bottom lane */}
              <path d="M12 80 L20 88 L80 88 L88 80" />
              <path d="M20 82 L70 82 L82 70" />
            </g>

            {/* nexuses */}
            <circle cx="13" cy="87" r="2.4" fill="var(--surface)" stroke="var(--accent)" strokeWidth="0.5" />
            <circle cx="87" cy="13" r="2.4" fill="var(--surface)" stroke="var(--accent)" strokeWidth="0.5" />

            {/* objectives markers */}
            <polygon points="62,44 65,47 62,50 59,47" fill="none" stroke="var(--accent)" strokeOpacity=".4" strokeWidth="0.35" />
            <polygon points="38,54 41,57 38,60 35,57" fill="none" stroke="var(--accent)" strokeOpacity=".4" strokeWidth="0.35" />

            {/* bot-lane highlight (the support's home) */}
            <path d="M12 80 L20 88 L36 88" stroke="var(--accent)" strokeWidth="0.8" fill="none" strokeOpacity=".8" />

            {/* scale bar */}
            <g fontFamily="JetBrains Mono, monospace" fontSize="2" fill="var(--fg-mute)">
              <line x1="82" y1="96" x2="94" y2="96" stroke="var(--fg-mute)" strokeWidth="0.2" />
              <line x1="82" y1="95" x2="82" y2="97" stroke="var(--fg-mute)" strokeWidth="0.2" />
              <line x1="94" y1="95" x2="94" y2="97" stroke="var(--fg-mute)" strokeWidth="0.2" />
              <text x="84" y="94">N</text>
              <text x="6" y="8">SUMMONER'S RIFT · SCHEMA</text>
            </g>
          </svg>

          {pins.map((p) => (
            <button
              key={p.n}
              className="map-pin"
              style={{ left: p.x + "%", top: p.y + "%" }}
              data-active={active === p.n ? "1" : "0"}
              onMouseEnter={() => setActive(p.n)}
              onMouseLeave={() => setActive(null)}
              aria-label={`Point ${p.n} : ${p.short}`}
            >
              {p.n}
            </button>
          ))}
        </div>

        <aside className="map-legend">
          <h4>Légende — 6 points clés</h4>
          {pins.map((p) => (
            <div
              key={p.n}
              className="legend-item"
              data-active={active === p.n ? "1" : "0"}
              onMouseEnter={() => setActive(p.n)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="legend-num">0{p.n}</span>
              <span className="legend-text"><strong>{p.short}</strong> — {p.long}</span>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

// ── Section 03 ─────────────────────────────────────────────────────────────
function SectionSkills() {
  const skills = [
    {
      title: "Vision placement",
      desc: "Placer un ward à chaque CD de trinket, identifier les 10 spots clés, garder un control ward actif sur les objectifs. Info 2026 : un ward posé sur un Faelight (anneau de champignons brillants) devient un superward — +25% de range et une zone de vision bonus de 45 s.",
      link: "/macro/vision",
    },
    {
      title: "Lecture de lane",
      desc: "Savoir quand push pour prio-2, quand freeze pour étouffer l'ADC adverse, quand trade selon les CD.",
      link: "/macro/wave-management",
    },
    {
      title: "Roam timing",
      desc: "Lire la minimap pour partir au bon moment — push de wave sous tour + ADC sécurisé + mid en danger = go.",
      link: "/macro/rotations-et-tempo",
    },
    {
      title: "Positioning en teamfight",
      desc: "Engage = rentrer en premier, enchanter = rester derrière l'ADC, peel = se placer entre ton carry et la menace.",
      link: "/macro/teamfight",
    },
  ];
  return (
    <section className="section shell" id="s03">
      <SectionHead
        num="03"
        title="Les compétences qui font la différence"
        lede="Quatre compétences à travailler en priorité pour devenir un Support fiable dès le bas Elo."
      />
      <div className="skills-grid">
        {skills.map((s, i) => (
          <article key={i} className="skill">
            <span className="skill-num">0{i + 1} / 04</span>
            <h3 className="skill-title serif">{s.title}</h3>
            <p className="skill-desc">{s.desc}</p>
            <a className="skill-link" href="#">{s.link} →</a>
          </article>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { SectionPhases, SectionMap, SectionSkills });
