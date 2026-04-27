// sections-01-03.jsx — Phase cards, annotated map, skills

// ── Section 01 ─────────────────────────────────────────────────────────────
function SectionPhases() {
  const phases = [
    {
      title: "Early game",
      timer: "0 → 14 min",
      items: [
        "Level 2 prio: you hit level 2 with the first 6 minions + the 3 melees from the 2nd wave. Damage (without killing) the creeps of the first 2 waves to speed up the tempo.",
        "First ward at 1:25 (not before): river bush opposite the jungler's starting side, to spot the first scuttle. Pre-1:25 you bush-camp to scout invades — saving your trinket charge for an impactful spot. Save the control ward (pink) to defend a zone against a gank or to set up an objective.",
        "Leave CS to the ADC (damage without killing). Protect them in trades.",
      ],
    },
    {
      title: "Mid game",
      timer: "14 → 25 min",
      items: [
        "Roam or stay: read the minimap, judge whether mid/jungle needs you.",
        "Vision around objectives (Grubs → Herald → Drake), contest enemy vision.",
        "Start or shut down teamfights based on your archetype (engage / enchanter / poke).",
      ],
    },
    {
      title: "Late game",
      timer: "25 min +",
      items: [
        "Deep vision around Baron, control wards everywhere.",
        "Peel your carry (ADC or mid): your CC keeps your damage alive.",
        "Flank or engage with the team, never alone — you have 0 damage.",
      ],
    },
  ];
  return (
    <section className="section shell" id="s01">
      <SectionHead
        num="01"
        title="What you do, phase by phase"
        lede="An effective Support shifts priorities over time. Here are the 3 things that matter in each phase."
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
    { n: 1, x: 22, y: 73, short: "Tri-bush", long: "Anti-gank when pushed under tower" },
    { n: 2, x: 32, y: 82, short: "Lane bush",    long: "Behind your line — denies gank vision" },
    { n: 3, x: 46, y: 62, short: "Bot river",    long: "1:25 first ward · 2:55 scuttle" },
    { n: 4, x: 72, y: 36, short: "Enemy jungle tri-brush", long: "Deep vision when ahead — never solo" },
    { n: 5, x: 62, y: 44, short: "Baron pit",    long: "From 19:30 for 20:00" },
    { n: 6, x: 38, y: 54, short: "Drake pit",    long: "At every spawn" },
  ];
  return (
    <section className="section shell" id="s02">
      <SectionHead
        num="02"
        title="The Rift from your point of view"
        lede="Your zones, vision angles and typical threats — a Support-specific map read."
      />
      <div className="map-wrap">
        <div className="map-frame">
          <div className="map-corners"><span></span><span></span><span></span><span></span></div>
          <svg viewBox="0 0 100 100" aria-label="Stylized map of the Rift">
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
              aria-label={`Point ${p.n}: ${p.short}`}
            >
              {p.n}
            </button>
          ))}
        </div>

        <aside className="map-legend">
          <h4>Legend — 6 key points</h4>
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
      desc: "Learn the 10 key spots, and remember the Faelights — a ward placed on a ring of glowing mushrooms becomes a super-ward (+25% range, 45s bonus vision zone). Swap your trinket to Oracle Lens the moment your support quest completes — that's when real vision denial starts.",
      link: "/macro/vision",
    },
    {
      title: "Lane reading",
      desc: "Know when to push for level-2 prio, when to freeze to starve the enemy ADC, when to trade based on cooldowns.",
      link: "/macro/wave-management",
    },
    {
      title: "Roam timing",
      desc: "Only roam if you'll get a reward (kill, plate, vision setup). Trigger conditions: wave pushing under tower + ADC safe + a target downstream (mid weak, jungler bot side, drake spawning). With CC-heavy champs (Leona, Blitz), roams convert more reliably than with enchanters.",
      link: "/macro/rotations-and-tempo",
    },
    {
      title: "Teamfight positioning",
      desc: "Engage = go in first, enchanter = stay behind the ADC, peel = place yourself between your carry and the threat.",
      link: "/macro/teamfight",
    },
  ];
  return (
    <section className="section shell" id="s03">
      <SectionHead
        num="03"
        title="The skills that make the difference"
        lede="Four skills to prioritize to become a reliable Support starting in low Elo."
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
