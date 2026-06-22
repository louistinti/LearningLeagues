// role-sections.jsx — generic, prop-driven section components for every role guide.

function ChampionPortrait({ name, label }) {
  const [failed, setFailed] = React.useState(false);
  const src = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VER}/img/champion/${name}.png`;
  return (
    <div className="champ-portrait" data-fallback={failed ? "1" : "0"}>
      {!failed && (
        <img src={src} alt={`${name} portrait`} onError={() => setFailed(true)} loading="lazy" />
      )}
      {failed && <span className="placeholder-label">{label}</span>}
    </div>
  );
}

function SectionPhases({ num, id, title, lede, phases }) {
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
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

function SectionSkills({ num, id, title, lede, skills }) {
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <div className="skills-grid">
        {skills.map((s, i) => (
          <article key={i} className="skill">
            <span className="skill-num">{String(i + 1).padStart(2, "0")} / {String(skills.length).padStart(2, "0")}</span>
            <h3 className="skill-title serif">{s.title}</h3>
            <p className="skill-desc">{s.desc}</p>
            <a className="skill-link" href="#">{s.link} →</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function SectionMap({ num, id, title, lede, pins, mapSrc, mapAlt, mapCredit, legendTitle }) {
  const [active, setActive] = React.useState(null);
  const legendPins = pins.filter((p, i) => pins.findIndex((q) => q.n === p.n) === i);
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <div className="map-wrap">
        <div className="map-frame">
          <div className="map-corners"><span></span><span></span><span></span><span></span></div>
          <img className="map-image" src={mapSrc} alt={mapAlt} />
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
            <span className="accent">©</span> {mapCredit}
          </span>
        </div>
        <aside className="map-legend">
          <h4>{legendTitle}</h4>
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

function SectionTriangle({ num, id, title, lede, nodes, legend }) {
  const [hover, setHover] = React.useState(null);
  const stageRef = React.useRef(null);
  // The triangle is always 3 archetypes in a fixed visual cycle: node[0] top,
  // node[1] bottom-right, node[2] bottom-left (set via each node's corner/x/y).
  // Refs and arrows key off POSITION, not archetype name, so any role can supply
  // its own 3 archetype keys in that order (Support: poke / engage / enchanter).
  const refs = [React.useRef(null), React.useRef(null), React.useRef(null)];
  const keys = Object.keys(nodes);
  const [arrows, setArrows] = React.useState(null);

  React.useLayoutEffect(() => {
    const compute = () => {
      const s = stageRef.current;
      const p = refs[0].current;
      const a = refs[1].current;
      const e = refs[2].current;
      if (!s || !p || !a || !e) return;
      const sr = s.getBoundingClientRect();
      if (!sr.width) return;
      const box = (el) => {
        const r = el.getBoundingClientRect();
        return {
          left:   r.left   - sr.left,
          right:  r.right  - sr.left,
          top:    r.top    - sr.top,
          bottom: r.bottom - sr.top,
          cx:    (r.left + r.right)  / 2 - sr.left,
          cy:    (r.top  + r.bottom) / 2 - sr.top,
        };
      };
      const poke = box(p), engage = box(a), enc = box(e);
      const GAP = 16;
      const vx = (v) => (v / sr.width)  * 100;
      const vy = (v) => (v / sr.height) * 100;
      setArrows({
        // Enchanter → Poke: tail 16px above Enc's top-center, tip 16px below Poke's bottom-left corner
        encToPoke: {
          x1: vx(enc.cx),    y1: vy(enc.top - GAP),
          x2: vx(poke.left), y2: vy(poke.bottom + GAP),
        },
        // Poke → Engage: tail 16px below Poke's bottom-right corner, tip 16px above Engage's top-center
        pokeToEngage: {
          x1: vx(poke.right), y1: vy(poke.bottom + GAP),
          x2: vx(engage.cx),  y2: vy(engage.top - GAP),
        },
        // Engage → Enchanter: horizontal, centered on both boxes' y, 16px from each inner edge
        engageToEnc: {
          x1: vx(engage.left - GAP), y1: vy(engage.cy),
          x2: vx(enc.right  + GAP),  y2: vy(enc.cy),
        },
      });
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", compute);
    return () => { ro.disconnect(); window.removeEventListener("resize", compute); };
  }, []);

  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <div className="triangle-wrap">
        <div className="triangle-stage" ref={stageRef}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="50" cy="58" r="16" fill="none" stroke="var(--border)" strokeWidth="0.3" />
            <circle cx="50" cy="58" r="10" fill="none" stroke="var(--border-soft)" strokeWidth="0.3" />
            <text x="50" y="56" textAnchor="middle" fontFamily="EB Garamond, serif" fontStyle="italic" fontSize="5" fill="var(--fg-mute)">triangle</text>
            <text x="50" y="63" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="3" letterSpacing="1" fill="var(--accent)">ARCHETYPES</text>

            {arrows && (() => {
              // Arrow asset: native 12 × 123 viewBox. Triangle tip at (5.77, 0),
              // shaft 2 wide (x∈[4.77, 6.77]) from y=9 to y=123.
              // Scale chosen so shaft thickness ≈ old stroke width (0.45 vb units).
              const S = 0.22;
              const SHAFT_W = 2 * S;
              const HEAD_H  = 10 * S;
              const HEAD_W  = 11.55 * S;
              const renderArrow = (key, a) => {
                const dx = a.x2 - a.x1, dy = a.y2 - a.y1;
                const L = Math.hypot(dx, dy);
                // Rotate native "+y-down" (tip → tail direction in the asset)
                // to align with the tip→tail world direction.
                const theta = Math.atan2(dx, -dy) * 180 / Math.PI;
                const op = hover && hover !== key ? 0.18 : 0.95;
                return (
                  <g key={key}
                     transform={`translate(${a.x2} ${a.y2}) rotate(${theta})`}
                     fill="var(--accent)"
                     opacity={op}>
                    <rect x={-SHAFT_W / 2} y={HEAD_H - 0.15}
                          width={SHAFT_W} height={Math.max(0, L - HEAD_H + 0.15)} />
                    <path d={`M0 0 L${-HEAD_W / 2} ${HEAD_H} L${HEAD_W / 2} ${HEAD_H} Z`} />
                  </g>
                );
              };
              return (
                <>
                  {renderArrow(keys[0], arrows.pokeToEngage)}
                  {renderArrow(keys[1], arrows.engageToEnc)}
                  {renderArrow(keys[2], arrows.encToPoke)}
                </>
              );
            })()}
          </svg>

          {Object.entries(nodes).map(([key, n], i) => (
            <div
              key={key}
              ref={refs[i]}
              className="arche-node"
              data-corner={n.corner}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              data-active={hover === key ? "1" : "0"}
              onMouseEnter={() => setHover(key)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="arche-node-inner">
                <div className="arche-name serif">{n.label}</div>
                <div className="arche-champs mono">{n.champs}</div>
              </div>
            </div>
          ))}
        </div>

        <aside className="triangle-legend">
          <h4>How to read the triangle</h4>
          {legend.map((l, i) => (
            <p key={i}><strong>{l.strong}</strong> {l.rest}</p>
          ))}
        </aside>
      </div>
    </section>
  );
}

function SectionCallouts({ num, id, title, lede, callouts }) {
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <div className="callout-grid">
        {callouts.map((c, i) => (
          <Callout key={i} type={c.type} title={c.title}>{c.body}</Callout>
        ))}
      </div>
    </section>
  );
}

function SectionErrors({ num, id, title, lede, errors }) {
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <div className="errors-grid">
        {errors.map((e, i) => (
          <ErrorCard key={i} title={e.title} symptom={e.s} cause={e.c} fix={e.f} />
        ))}
      </div>
    </section>
  );
}

function SectionChampions({ num, id, title, lede, champions }) {
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <div className="champ-grid">
        {champions.map((c) => (
          <article key={c.name} className="champ-card">
            <ChampionPortrait name={c.name} label={`PORTRAIT · ${c.name.toUpperCase()}`} />
            <div className="champ-body">
              <div className="champ-meta">
                <span className="tag">{c.tag}</span>
                <span>Diff · {c.diff}</span>
              </div>
              <h3 className="champ-name serif">{c.name}</h3>
              <p className="champ-desc">{c.desc}</p>
              <a className="champ-link" href="#">Full profile →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SectionBuild({ num, id, title, lede, build }) {
  const keys = Object.keys(build);
  const [archetype, setArchetype] = React.useState(keys[0]);
  const cur = build[archetype];
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <div className="archetype-switch" role="tablist" aria-label="Archetype">
        {keys.map((k, i) => (
          <button
            key={k}
            role="tab"
            aria-selected={archetype === k}
            className={"archetype-tab" + (archetype === k ? " is-active" : "")}
            onClick={() => setArchetype(k)}
          >
            <span className="mono tag">{String(i + 1).padStart(2, "0")}</span>
            <span className="label serif">{build[k].label}</span>
          </button>
        ))}
      </div>
      <div className="build-grid">
        <div className="build-block">
          <h3 className="serif">Default runes<span className="tag">{cur.label}</span></h3>
          <dl>
            {cur.runes.map(([k, v], i) => (
              <div key={i} className="build-row"><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
        <div className="build-block">
          <h3 className="serif">Build path<span className="tag">{cur.label}</span></h3>
          <dl>
            {cur.build.map(([k, v], i) => (
              <div key={i} className="build-row"><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function SectionMatchups({ num, id, title, lede, matchups }) {
  const pillClass = (d) => "pill pill--" + d.toLowerCase();
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <table className="matchup-table">
        <thead>
          <tr><th>Matchup</th><th>Difficulty</th><th>You win if…</th><th>You lose if…</th></tr>
        </thead>
        <tbody>
          {matchups.map((r, i) => (
            <tr key={i}>
              <td data-label="Matchup" className="m-name">{r[0]}</td>
              <td data-label="Difficulty" className="m-diff"><span className={pillClass(r[1])}>{r[1]}</span></td>
              <td data-label="You win if" className="m-win"><b>{r[2]}</b></td>
              <td data-label="You lose if" className="m-lose">{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function SectionChecklist({ num, id, title, lede, storageKey, items, threshold = 8 }) {
  const [checked, setChecked] = React.useState(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return Array(items.length).fill(false);
  });
  React.useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(checked)); } catch (e) {}
  }, [checked]);
  const toggle = (i) => setChecked(checked.map((v, j) => (i === j ? !v : v)));
  const count = checked.filter(Boolean).length;
  const ready = count >= threshold;
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <div className="checklist-wrap">
        <div className="checklist-progress">
          <div className="progress-num">{count}<span className="of">/{items.length}</span></div>
          <div className="progress-label">Validated · saved locally</div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${(count / items.length) * 100}%` }} />
          </div>
          <p className={"progress-readout" + (ready ? " ready" : "")}>
            {ready
              ? `✓ Threshold reached. You're ready to queue ranked over 3 games in a row.`
              : `${threshold - count} more point${threshold - count > 1 ? "s" : ""} before launching ranked`}
          </p>
        </div>
        <ul className="checklist" role="list">
          {items.map((txt, i) => (
            <li
              key={i}
              className={checked[i] ? "done" : ""}
              onClick={() => toggle(i)}
              onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(i); } }}
              tabIndex="0"
              role="checkbox"
              aria-checked={checked[i]}
            >
              <span className="checklist-box" aria-hidden="true"></span>
              <span className="checklist-text">{txt}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SectionPractice({ num, id, title, lede, videos = [], drills = [] }) {
  return (
    <section className="section shell" id={id}>
      <SectionHead num={num} title={title} lede={lede} />
      <div className="practice-grid">
        {videos.map((v, i) => (
          <article key={i} className="video-card">
            <div className="video-thumb"><span className="video-duration">{v.duration}</span></div>
            <span className="video-meta">Video · {v.creator}</span>
            <h3 className="video-title serif">{v.title}</h3>
            <p className="exercise-text">{v.desc}</p>
          </article>
        ))}
      </div>
      <div className="exercises">
        {drills.map((d, i) => (
          <article key={i} className="exercise">
            <span className="exercise-tag">{d.tag}</span>
            <h4 className="exercise-title serif">{d.title}</h4>
            <p className="exercise-text">{d.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, {
  ChampionPortrait, SectionPhases, SectionMap, SectionSkills, SectionTriangle,
  SectionCallouts, SectionErrors, SectionChampions, SectionBuild, SectionMatchups,
  SectionChecklist, SectionPractice,
});
