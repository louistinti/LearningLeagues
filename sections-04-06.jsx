// sections-04-06.jsx — Triangle, prio niveau 2 callouts, 6 erreurs

// ── Section 04 : Triangle ──────────────────────────────────────────────────
function SectionTriangle() {
  const [hover, setHover] = React.useState(null); // "poke" | "engage" | "enchanter"
  const stageRef = React.useRef(null);
  const pokeRef = React.useRef(null);
  const engageRef = React.useRef(null);
  const encRef = React.useRef(null);
  const [arrows, setArrows] = React.useState(null);

  const nodes = {
    poke:      { corner: "top", label: "Poke",        champs: "Karma · Lux · Senna · Xerath", x: 50, y: 8,  ref: pokeRef   },
    engage:    { corner: "br",  label: "Engage",      champs: "Leona · Nautilus · Rell · Pyke", x: 100, y: 80, ref: engageRef },
    enchanter: { corner: "bl",  label: "Enchanter",   champs: "Soraka · Janna · Nami · Yuumi",  x: 0,  y: 80, ref: encRef    },
  };

  React.useLayoutEffect(() => {
    const compute = () => {
      const s = stageRef.current;
      const p = pokeRef.current;
      const a = engageRef.current;
      const e = encRef.current;
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
    <section className="section shell" id="s04">
      <SectionHead
        num="04"
        title="The archetype triangle"
        lede="Your archetype beats one type and loses to another. Memorize which."
      />
      <div className="triangle-wrap">
        <div className="triangle-stage" ref={stageRef}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* central sigil */}
            <circle cx="50" cy="58" r="16" fill="none" stroke="var(--border)" strokeWidth="0.3" />
            <circle cx="50" cy="58" r="10" fill="none" stroke="var(--border-soft)" strokeWidth="0.3" />
            <text x="50" y="56" textAnchor="middle" fontFamily="EB Garamond, serif" fontStyle="italic" fontSize="5" fill="var(--fg-mute)">triangle</text>
            <text x="50" y="63" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="3" letterSpacing="1" fill="var(--accent)">ARCHETYPES</text>

            {arrows && (() => {
              // Arrow asset: native 12 × 123 viewBox. Triangle tip at (5.77, 0),
              // shaft 2 wide (x∈[4.77, 6.77]) from y=9 to y=123.
              // Scale chosen so shaft thickness ≈ old stroke width (0.45 vb units).
              const S = 0.22;
              const SHAFT_W = 2 * S;     // 0.44
              const HEAD_H  = 10 * S;    // 2.2
              const HEAD_W  = 11.55 * S; // 2.54
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
                  {renderArrow("poke", arrows.pokeToEngage)}
                  {renderArrow("engage", arrows.engageToEnc)}
                  {renderArrow("enchanter", arrows.encToPoke)}
                </>
              );
            })()}
          </svg>

          {Object.entries(nodes).map(([key, n]) => (
            <div
              key={key}
              ref={n.ref}
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
          <p><strong>Poke</strong> wears down the engage champion before they can ever reach you.<br /><strong>Poke &gt; Engage</strong>.</p>
          <p><strong>Engage</strong> locks the ADC before the enchanter has time to react.<br /><strong>Engage &gt; Enchanter</strong>.</p>
          <p><strong>Enchanter</strong> heals and shields enough to nullify poke pressure.<br /><strong>Enchanter &gt; Poke</strong>.</p>
        </aside>
      </div>
    </section>
  );
}

// ── Section 05 : Prio niveau 2 ─────────────────────────────────────────────
function SectionPrio2() {
  return (
    <section className="section shell" id="s05">
      <SectionHead
        num="05"
        title="Key concept: level 2 prio"
        lede="Whoever hits level 2 first takes the engage. The highest-stakes window in botlane."
      />
      <div className="callout-grid">
        <article className="callout">
          <span className="callout-tag"><i className="gl gl--key"></i> Key concept</span>
          <h3 className="callout-title serif">How do you hit level 2 first?</h3>
          <p className="callout-body">
            <b>Level 2</b> is decided on the 1st wave (6 minions) + the 3 melee minions of the 2nd wave.
            Damage all those minions <b>without killing them</b>. Your ADC last-hits while you stack XP.
            You both hit level 2 before the enemy ADC. Engage window open.
          </p>
        </article>
        <article className="callout">
          <span className="callout-tag"><i className="gl gl--pro"></i> Pro tip</span>
          <h3 className="callout-title serif">Judge the force-2 on damage, not fear</h3>
          <p className="callout-body">
            Forcing level 2 works if <b>your two champions deal more level-2 damage</b> than the enemy duo.
            Braum is stronger at level 2 than most supports, even into Blitz.
            Compare the kits before reflexively backing off.
          </p>
        </article>
        <article className="callout">
          <span className="callout-tag"><i className="gl gl--pro"></i> Pro tip</span>
          <h3 className="callout-title serif">Engage windows = enemy cooldowns</h3>
          <p className="callout-body">
            Aggression isn't random. It opens when the enemy spends a key cooldown.
            Enemy ADC just used <b><Gloss term="Ezreal E">Ezreal E</Gloss> / <Gloss term="Lucian E">Lucian E</Gloss></b>? You have a 5–10s window of weak retaliation. Trade now.
            Hook champions (<b>Blitz, Thresh</b>) land hooks much more reliably once the enemy ADC's dash is on cooldown.
            No Flash up on the enemy ADC? Repeat-engage to zone them off CS.
          </p>
        </article>
        <article className="callout">
          <span className="callout-tag"><i className="gl gl--pro"></i> Pro tip</span>
          <h3 className="callout-title serif">Position alone is a threat</h3>
          <p className="callout-body">
            Where you stand at level 1 already sets the lane tone.
            Tank/engage (<b>Leona, Naut</b>) = in front of your ADC. You telegraph the threat and force the enemy to respect a 2v2 before level 2 even hits.
            Damage/poke (<b>Lux, Senna</b>) = in line with ADC, in trading range.
            Enchanter (<b>Soraka, Janna</b>) = slightly behind, where you can heal/shield without eating poke.
            Wrong stance = your archetype plays against itself.
          </p>
        </article>
      </div>
    </section>
  );
}

// ── Section 06 : 6 erreurs ─────────────────────────────────────────────────
function SectionErrors() {
  const errors = [
    {
      title: "You roam at the wrong moment",
      s: "You roam without checking the enemy jungler position, or you abandon your ADC when they're vulnerable to a dive.",
      c: "You leave the lane without reading the situation.",
      f: <>Roam only if (a) your lane is even or won AND you know the enemy jungler isn't bot, or (b) your jungler is playing an objective (drake, grubs) and you can help contest. The ADC takes Barrier or Cleanse almost all the time. The only real <Gloss term="TP">TP</Gloss> users are <Gloss term="APC">APCs</Gloss> (Veigar, Karthus), so don't count on a TP to save them.</>,
    },
    {
      title: "You buy pinks too early and too often",
      s: "You constantly carry 2 control wards in early, your boots and 1st item come out late.",
      c: "Control ward price only drops to 40g once the support quest is complete (800/800). Before that, the full cost stops you from stacking key items.",
      f: "In early game, only buy a control ward for objectives (drake, grubs, Herald) or to defend against a targeted gank. Prioritize boots + 1st item. Quest complete → steady pink rhythm at 40g. Reminder: max 3 trinket wards placed at a time.",
    },
    {
      title: "You refuse to touch the minions",
      s: "You never auto, the ADC struggles to push the first 2 waves.",
      c: "Someone told you 'don't CS'. Rule misunderstood.",
      f: "Hit each minion in the first two waves without last-hitting. Your ADC takes the gold, you both rush level 2. Once level 2 is hit, only step in if the ADC is dead or recalling.",
    },
    {
      title: "You engage without vision",
      s: "Leona flash-Rs the enemy ADC, the jungler walks out of the bush, kill flipped.",
      c: "Engage before warding → no jungler check.",
      f: "Ward tribush or river BEFORE engaging. Always. And never deep-ward alone if the enemy has a kill threat. Wait for your team to come with you.",
    },
    {
      title: "You completely neglect vision",
      s: <>End-of-game <Gloss term="vision score">vision score</Gloss>: 12. Your team gets ganked blind.</>,
      c: "You place wards at random or forget the trinket.",
      f: "Place a ward every time your trinket comes off cooldown (≈ 90s). Never let two charges stack up. Pinks only for objectives in early, then a steady rhythm after your support quest (price drops to 40g). Target vision score = 3× the minutes played (e.g. 23 min → 69).",
    },
    {
      title: "You sit on your support item stacks",
      s: "You stay at 2-3 charges for minutes. Your gold income lags behind a support who cycles them constantly.",
      c: "You only think 'consume stacks = engage', so when you can't engage you sit.",
      f: "Cycle your stacks every time you hit 2-3. If you can engage and trade, do it. If you can't (enchanter, no window, no peel), last-hit or tag a minion to convert the stack into gold. The point is steady turnover. Holding stacks idle costs you 30-50 gold every laning phase.",
    },
  ];
  return (
    <section className="section shell" id="s06">
      <SectionHead
        num="06"
        title="The 6 mistakes that cost you games"
        lede="Symptom, cause, fix."
      />
      <div className="errors-grid">
        {errors.map((e, i) => (
          <article key={i} className="error-card">
            <h3 className="error-title serif">{e.title}</h3>
            <div className="error-block">
              <span className="error-lbl">Symptom</span>
              <p className="error-text">{e.s}</p>
            </div>
            <div className="error-block">
              <span className="error-lbl">Cause</span>
              <p className="error-text">{e.c}</p>
            </div>
            <div className="error-block">
              <span className="error-lbl">Fix</span>
              <p className="error-text">{e.f}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { SectionTriangle, SectionPrio2, SectionErrors });
