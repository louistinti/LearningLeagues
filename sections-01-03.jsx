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
        "Set up vision before the objective spawns. Reaction time = distance from the pit to your deepest ward — pair pit wards with control wards in high-traffic bushes.",
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

  // Pin coordinates are % of the official Summoner's Rift map (1990 x 1323).
  // Pins 1 and 4 each appear twice (different spots on the map); the legend
  // dedupes by `n` so the right column always shows 6 rows.
  const pins = [
    { n: 1, x: 70.3, y: 57.9, short: "Tri-brush",         long: "Sees the jungler arrive at tower fights — defensive when stuck under yours (dive risk), offensive when you're pushed under theirs (counter-gank risk)." },
    { n: 1, x: 64.3, y: 67.5, short: "Tri-brush",         long: "Sees the jungler arrive at tower fights — defensive when stuck under yours (dive risk), offensive when you're pushed under theirs (counter-gank risk)." },
    { n: 2, x: 78.2, y: 75.1, short: "Lane brush",        long: "Central early-game control bush — decisive when you're the hooker, risky against enemy hooks (Blitz/Thresh/Pyke). Ward it when the matchup allows." },
    { n: 3, x: 68.3, y: 62.9, short: "Pixel brush",       long: "High-traffic spot near Drake setup — a control ward here holds the area." },
    { n: 4, x: 67.1, y: 43.2, short: "Deep jungle brush", long: "Deep vision when you're ahead — never solo; spots the enemy jungler before objectives." },
    { n: 4, x: 52.7, y: 64.4, short: "Deep jungle brush", long: "Deep vision when you're ahead — never solo; spots the enemy jungler before objectives." },
    { n: 5, x: 60.9, y: 59.5, short: "Dragon pit",        long: "Ward before every spawn; pair with a deep ward upstream so you see jungler rotations earlier." },
    { n: 6, x: 38.7, y: 27.5, short: "Nashor's pit",      long: "Late-game key. Pink the pit, deep-ward the entrances — reaction time = distance to your deepest ward." },
  ];

  const legendPins = pins.filter(
    (p, i) => pins.findIndex((q) => q.n === p.n) === i
  );

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

          <img
            className="map-image"
            src="assets/sr-map-clean.png"
            alt="Summoner's Rift — official map"
          />

          {pins.map((p, i) => (
            <button
              key={`${p.n}-${i}`}
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

          <span className="map-credit">
            <span className="accent">©</span> RIOT GAMES — SUMMONER'S RIFT
          </span>
        </div>

        <aside className="map-legend">
          <h4>Legend — 6 key points</h4>
          {legendPins.map((p) => (
            <div
              key={p.n}
              className="legend-item"
              data-active={active === p.n ? "1" : "0"}
              onMouseEnter={() => setActive(p.n)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="legend-num">0{p.n}</span>
              <span className="legend-text">
                <strong>{p.short}</strong>{p.long ? ` — ${p.long}` : null}
              </span>
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
      desc: "Learn the 8 key ward placements, and remember the Faelights — a ward placed on a ring of glowing mushrooms becomes a super-ward (+25% range, 45s bonus vision zone). Swap your trinket to Oracle Lens the moment your support quest completes — that's when real vision denial starts.",
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
