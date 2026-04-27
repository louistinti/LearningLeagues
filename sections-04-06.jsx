// sections-04-06.jsx — Triangle, prio niveau 2 callouts, 6 erreurs

// ── Section 04 : Triangle ──────────────────────────────────────────────────
function SectionTriangle() {
  const [hover, setHover] = React.useState(null); // "poke" | "allin" | "enchanter"
  const stageRef = React.useRef(null);
  const pokeRef = React.useRef(null);
  const allinRef = React.useRef(null);
  const encRef = React.useRef(null);
  const [arrows, setArrows] = React.useState(null);

  const nodes = {
    poke:      { corner: "top", label: "Poke",        champs: "Karma · Lux · Senna · Xerath", x: 50, y: 8,  ref: pokeRef  },
    allin:     { corner: "br",  label: "All-in",      champs: "Leona · Nautilus · Rell · Pyke", x: 100, y: 80, ref: allinRef },
    enchanter: { corner: "bl",  label: "Enchanter",   champs: "Soraka · Janna · Nami · Yuumi",  x: 0,  y: 80, ref: encRef   },
  };

  React.useLayoutEffect(() => {
    const compute = () => {
      const s = stageRef.current;
      const p = pokeRef.current;
      const a = allinRef.current;
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
      const poke = box(p), allin = box(a), enc = box(e);
      const GAP = 16;
      const vx = (v) => (v / sr.width)  * 100;
      const vy = (v) => (v / sr.height) * 100;
      setArrows({
        // Enchanter → Poke: tail 16px above Enc's top-center, tip 16px below Poke's bottom-left corner
        encToPoke: {
          x1: vx(enc.cx),    y1: vy(enc.top - GAP),
          x2: vx(poke.left), y2: vy(poke.bottom + GAP),
        },
        // Poke → All-in: tail 16px below Poke's bottom-right corner, tip 16px above All-in's top-center
        pokeToAllin: {
          x1: vx(poke.right), y1: vy(poke.bottom + GAP),
          x2: vx(allin.cx),   y2: vy(allin.top - GAP),
        },
        // All-in → Enchanter: horizontal, centered on both boxes' y, 16px from each inner edge
        allinToEnc: {
          x1: vx(allin.left - GAP), y1: vy(allin.cy),
          x2: vx(enc.right  + GAP), y2: vy(enc.cy),
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
        title="Le triangle des archétypes"
        lede="La règle fondamentale à connaître par cœur. Ton archétype gagne contre un type, perd contre un autre."
      />
      <div className="triangle-wrap">
        <div className="triangle-stage" ref={stageRef}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* central sigil */}
            <circle cx="50" cy="58" r="16" fill="none" stroke="var(--border)" strokeWidth="0.3" />
            <circle cx="50" cy="58" r="10" fill="none" stroke="var(--border-soft)" strokeWidth="0.3" />
            <text x="50" y="56" textAnchor="middle" fontFamily="EB Garamond, serif" fontStyle="italic" fontSize="5" fill="var(--fg-mute)">triangle</text>
            <text x="50" y="63" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="3" letterSpacing="1" fill="var(--accent)">ARCHÉTYPES</text>

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
                  {renderArrow("poke", arrows.pokeToAllin)}
                  {renderArrow("allin", arrows.allinToEnc)}
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
          <h4>Comment lire le triangle</h4>
          <p>Le <strong>poke</strong> grignote les HP avant qu'un all-in ait l'occasion de s'engager — donc <strong>Poke &gt; All-in</strong>.</p>
          <p>L'<strong>all-in</strong> lock l'ADC avant que l'enchanter ait le temps de réagir — donc <strong>All-in &gt; Enchanter</strong>.</p>
          <p>L'<strong>enchanter</strong> heal et shield assez pour annuler la pression du poke — donc <strong>Enchanter &gt; Poke</strong>.</p>
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
        title="Concept clé : la prio niveau 2"
        lede="La fenêtre d'all-in la plus critique en botlane. Celui qui atteint le niveau 2 en premier prend l'avantage."
      />
      <div className="callout-grid">
        <article className="callout">
          <span className="callout-tag"><i className="gl gl--key"></i> Concept clé</span>
          <h3 className="callout-title serif">Comment atteindre le niveau 2 en premier ?</h3>
          <p className="callout-body">
            Le <b>lvl 2</b> se joue sur la 1ère wave (6 minions) + les 3 minions mélés de la 2e wave.
            Tape tous ces minions <b>sans les tuer</b> — ton ADC last-hit pendant que tu accumules l'XP.
            Vous passez 2 ensemble avant l'ADC adverse, fenêtre d'all-in ouverte.
          </p>
        </article>
        <article className="callout">
          <span className="callout-tag"><i className="gl gl--pro"></i> Astuce pro</span>
          <h3 className="callout-title serif">Juge le force-2 sur les dégâts, pas sur la peur</h3>
          <p className="callout-body">
            Le force 2 passe si <b>tes deux champions font plus de dégâts niveau 2</b> que les deux adverses.
            Un Braum est plus fort lvl 2 que la plupart des supports — même en face d'un Blitz.
            Compare les kits avant d'éviter par réflexe.
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
      title: "Tu roams au mauvais moment",
      s: "Tu pars roam alors que ta lane est perdue, ou au moment où le jungle adverse est sur ton ADC.",
      c: "Tu quittes la lane sans lire la situation.",
      f: "Roam uniquement si (a) ta lane est even ou gagnée ET tu sais que le jungler adverse n'est pas bot, ou (b) ton jungle joue un objectif (drake, grubs) et tu peux aider à contester. L'ADC joue Barrière ou Purification la quasi-totalité du temps — les seuls vrais TP sont les APC (Veigar, Karthus), donc ne compte pas sur un TP pour le protéger.",
    },
    {
      title: "Tu achètes des pinks trop tôt et trop souvent",
      s: "Tu as 3 control wards dans le sac en permanence en early, tes bottes et ton 1er item arrivent en retard.",
      c: "Le prix des control wards ne tombe à 40g qu'une fois la quête support terminée (800/800). Avant ça, le coût plein t'empêche de stacker tes items clés.",
      f: "En early, achète un control ward uniquement pour les objectifs (drake, grubs, Herald) ou pour défendre contre un gank ciblé. Priorise bottes + 1er item. Quête terminée → rythme pink régulier à 40g. Rappel : 3 wards trinket max posés à la fois.",
    },
    {
      title: "Tu refuses de toucher aux creeps",
      s: "Tu ne tapes jamais, l'ADC galère à push les 2 premières waves.",
      c: "On t'a dit « ne CS pas ». Règle mal interprétée.",
      f: "Tu dois taper (sans tuer) les creeps des 2 premières waves pour accélérer le push et déclencher la prio-2. Une fois le lvl 2 passé, lève la main uniquement si l'ADC est mort ou en reset.",
    },
    {
      title: "Tu engages sans vision",
      s: "Leona flash-R sur l'ADC adverse, jungler sort du bush, kill inversé.",
      c: "Engage avant de ward → pas de check du jungler.",
      f: "Ward tribush ou river AVANT d'engager. Toujours.",
    },
    {
      title: "Tu négliges complètement la vision",
      s: "Vision score de fin de game : 12. Ton équipe se fait ganker en aveugle.",
      c: "Tu poses tes wards au hasard ou tu oublies le trinket.",
      f: "Place un ward à chaque CD de trinket (≈ 90 s). Pink uniquement pour objectifs en early, puis régulièrement après ta quête support. Vise 30+ de vision score en fin de partie.",
    },
    {
      title: "Tu peel pas ton carry en teamfight",
      s: "Ton ADC se fait one-shot par l'assassin adverse au milieu du fight.",
      c: "Tu cherches la kill au lieu de protéger.",
      f: "Ta priorité = la santé de l'ADC. Stun, slow ou knockup sur son agresseur.",
    },
  ];
  return (
    <section className="section shell" id="s06">
      <SectionHead
        num="06"
        title="Les 6 erreurs qui te coûtent tes games"
        lede="Pour chacune : le symptôme que tu observes, la cause racine, la correction concrète."
      />
      <div className="errors-grid">
        {errors.map((e, i) => (
          <article key={i} className="error-card">
            <h3 className="error-title serif">{e.title}</h3>
            <div className="error-block">
              <span className="error-lbl">Symptôme</span>
              <p className="error-text">{e.s}</p>
            </div>
            <div className="error-block">
              <span className="error-lbl">Cause</span>
              <p className="error-text">{e.c}</p>
            </div>
            <div className="error-block">
              <span className="error-lbl">Correction</span>
              <p className="error-text">{e.f}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { SectionTriangle, SectionPrio2, SectionErrors });
