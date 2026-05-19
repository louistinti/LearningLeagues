// ds-patterns.jsx — Patterns tab: lesson cards, leaderboard, league tier display

function Patterns() {
  return (
    <React.Fragment>
      <DSSection num="01" title="Lesson card" lede="The unit of progress on Learning Leagues. Combines a phase header, an objective list, a corner-bracketed frame, and a CTA into the lesson catalog grid.">
        <LessonCardPattern />
      </DSSection>

      <DSSection num="02" title="League tier display" lede="Shows a player's current rank, LP and trajectory. Tier color informs the icon only — never the surrounding chrome.">
        <TierDisplayPattern />
      </DSSection>

      <DSSection num="03" title="Leaderboard" lede="A vertical leaderboard for ranked weekly cohorts. Mono-numbered, dashed dividers, current user highlighted in amber.">
        <LeaderboardPattern />
      </DSSection>

      <DSSection num="04" title="Stat callout strip" lede="Three or four KPIs aligned to the eyebrow grid. Used at the top of a lesson recap or post-game review.">
        <StatStripPattern />
      </DSSection>

      <DSSection num="05" title="Empty / error state" lede="When there's nothing to show, lean on the sigil. Never use sad-face illustrations or gradients.">
        <EmptyStatePattern />
      </DSSection>
    </React.Fragment>
  );
}

const LESSON_DATA = [
  { num: "01", tag: "FONDAMENTAUX", time: "12 min", title: "Lecture de map", desc: "Suis les 5 ennemis sans regarder. La map est lue dans la périphérie, pas au centre.", level: "Bronze → Silver" },
  { num: "02", tag: "VISION",       time: "18 min", title: "Pose de wards Support", desc: "Quand poser, quand attendre, quand annuler. Les 4 spots qui changent ta game.", level: "Iron → Gold" },
  { num: "03", tag: "MACRO",        time: "22 min", title: "Macro objectifs",     desc: "Drake, Hérault, Baron : timings, prio par phase, et quand céder un objectif.", level: "Silver → Plat" },
];

function LessonCardPattern() {
  return (
    <div className="ds-pattern-grid ds-pattern-grid--3">
      {LESSON_DATA.map(l => (
        <article key={l.num} className="phase-card ds-lesson-card">
          <header className="phase-hd">
            <span className="mono ds-lesson-num">L· {l.num} · {l.tag}</span>
            <span className="phase-timer">{l.time}</span>
          </header>
          <h3 className="phase-title ds-lesson-title">{l.title}</h3>
          <p className="ds-lesson-desc">{l.desc}</p>
          <footer className="ds-lesson-foot">
            <span className="mono ds-lesson-level">{l.level}</span>
            <a className="skill-link" href="#">Commencer →</a>
          </footer>
        </article>
      ))}
    </div>
  );
}

// Tier demo data — division/LP are display-only sample data, tier identity
// and color come from LL_TIERS (components.jsx, single source of truth).
const TIER_DEMO = [
  { name: "Iron",     division: "II",  lp: "32 LP" },
  { name: "Bronze",   division: "I",   lp: "78 LP" },
  { name: "Silver",   division: "III", lp: "44 LP" },
  { name: "Gold",     division: "IV",  lp: "68 LP" },
  { name: "Platinum", division: "II",  lp: "12 LP" },
];

function TierDisplayPattern() {
  const byName = Object.fromEntries(LL_TIERS.map(t => [t.name, t]));
  return (
    <div className="ds-tiers-grid">
      {TIER_DEMO.map(d => {
        const t = byName[d.name];
        return (
          <article key={d.name} className="ds-tier-card">
            <div className="ds-tier-icon" style={{ color: `var(${t.var})` }}>
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2">
                <polygon points="32,4 58,18 58,46 32,60 6,46 6,18" strokeWidth="1.4"/>
                <polygon points="32,14 50,24 50,40 32,50 14,40 14,24"/>
                <path d="M32 22 L40 32 L32 42 L24 32 Z" fill="currentColor" opacity=".5"/>
                <circle cx="32" cy="32" r="2" fill="currentColor"/>
              </svg>
            </div>
            <div className="ds-tier-meta">
              <span className="mono ds-tier-rank">{d.name} {d.division}</span>
              <span className="mono ds-tier-lp">{d.lp}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}

const LEADERBOARD = [
  { rank: 1, name: "AntiVoidMain",  tier: "Diamond", div: "II", lp: 312, delta: +28, you: false },
  { rank: 2, name: "PoroWisdom",    tier: "Diamond", div: "III", lp: 287, delta: +14, you: false },
  { rank: 3, name: "HextechMid",    tier: "Diamond", div: "IV", lp: 244, delta: -6,  you: false },
  { rank: 4, name: "WardingShogun", tier: "Platinum", div: "I",  lp: 198, delta: +22, you: false },
  { rank: 5, name: "you",           tier: "Platinum", div: "II", lp: 162, delta: +18, you: true },
  { rank: 6, name: "BluePillBot",   tier: "Platinum", div: "II", lp: 154, delta: -10, you: false },
  { rank: 7, name: "FreljordFlex",  tier: "Platinum", div: "III", lp: 132, delta: +6, you: false },
  { rank: 8, name: "BaronSteal",    tier: "Platinum", div: "III", lp: 118, delta: -3, you: false },
];

function LeaderboardPattern() {
  return (
    <div className="ds-leaderboard">
      <header className="ds-lb-head">
        <span className="mono">WEEKLY · Cohort #14</span>
        <span className="mono">Plat & below · 2,418 players</span>
      </header>
      <table className="ds-lb-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Tier</th>
            <th className="r">LP</th>
            <th className="r">Δ 24h</th>
          </tr>
        </thead>
        <tbody>
          {LEADERBOARD.map(p => (
            <tr key={p.rank} className={p.you ? "is-you" : ""}>
              <td className="mono">{String(p.rank).padStart(2, "0")}</td>
              <td><span className="ds-lb-name">{p.name}{p.you && <span className="mono ds-lb-youtag"> · YOU</span>}</span></td>
              <td className="mono">{p.tier} {p.div}</td>
              <td className="r mono">{p.lp}</td>
              <td className={"r mono " + (p.delta >= 0 ? "up" : "down")}>{p.delta >= 0 ? "+" : ""}{p.delta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatStripPattern() {
  const stats = [
    { label: "GAMES PLAYED",  num: "147", sub: "this season" },
    { label: "WIN RATE",      num: "58%", sub: "+4.2 last patch" },
    { label: "AVG VISION",    num: "42",  sub: "score per game" },
    { label: "MOST PLAYED",   num: "Lulu", sub: "61 games · 64% WR" },
  ];
  return (
    <div className="ds-stat-strip">
      {stats.map(s => (
        <div key={s.label} className="ds-stat-cell">
          <span className="mono ds-stat-cell-label">{s.label}</span>
          <span className="ds-stat-cell-num">{s.num}</span>
          <span className="ds-stat-cell-sub mono">{s.sub}</span>
        </div>
      ))}
    </div>
  );
}

function EmptyStatePattern() {
  return (
    <div className="ds-empty">
      <div className="ds-empty-sigil" aria-hidden="true">
        <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="0.8">
          <polygon points="60,10 102,32 102,82 60,108 18,82 18,32" opacity=".7"/>
          <polygon points="60,28 86,42 86,72 60,86 34,72 34,42" opacity=".5"/>
          <path d="M60 50 L72 60 L60 70 L48 60 Z" opacity=".8"/>
          <line x1="20" y1="60" x2="100" y2="60" opacity=".25" strokeDasharray="3 4"/>
        </svg>
      </div>
      <div className="ds-empty-meta">
        <span className="mono ds-empty-tag">NO MATCHES · 404</span>
        <h3 className="ds-empty-title">Pas encore de games sur ce patch.</h3>
        <p>Joue au moins 3 games classées sur le patch 26.X pour débloquer ton recap hebdomadaire.</p>
        <button className="btn-ghost">Voir le dernier patch</button>
      </div>
    </div>
  );
}

Object.assign(window, {
  Patterns, LessonCardPattern, TierDisplayPattern, LeaderboardPattern, StatStripPattern, EmptyStatePattern
});
