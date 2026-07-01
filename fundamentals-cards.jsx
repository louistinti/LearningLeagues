// fundamentals-cards.jsx — intro, section 01 primary cards, in-card radial overlay.
// Depends on fundamentals-data.jsx (FUND_NODES, FUND_BY_ID) and components.jsx.

// ── Intro ───────────────────────────────────────────────────────────────────
function FundIntro() {
  return (
    <section className="ft-intro">
      <div className="shell">
        <div className="ft-intro-grid">
          <div>
            <div className="eyebrow eyebrow--accent">FUNDAMENTALS · THE BASE LAYER</div>
            <h1 className="serif">
              The fundamentals aren't a list.<br />
              They're a <em>system.</em>
            </h1>
            <p className="ft-intro-lede">
              Six skills carry your rank, and each one feeds the others. This page shows
              how the pieces connect, so you can see where a weak habit is quietly costing
              you three lanes over. No jargon, no chasing the meta.
            </p>
            <div className="ft-intro-meta">
              <span><strong>25</strong> fundamentals</span>
              <span><strong>6</strong> that carry your rank</span>
              <span><strong>Read</strong> ~12 min</span>
              <span><strong>Patch</strong> 26.X</span>
            </div>
          </div>
          <div className="ft-intro-sigil" aria-hidden="true">
            <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
              {/* spokes */}
              <g opacity="0.5">
                <line x1="100" y1="100" x2="100" y2="34" />
                <line x1="100" y1="100" x2="157" y2="67" />
                <line x1="100" y1="100" x2="157" y2="133" />
                <line x1="100" y1="100" x2="100" y2="166" />
                <line x1="100" y1="100" x2="43" y2="133" />
                <line x1="100" y1="100" x2="43" y2="67" />
              </g>
              {/* satellites */}
              <g fill="currentColor" stroke="none" opacity="0.85">
                <circle cx="100" cy="34" r="4" />
                <circle cx="157" cy="67" r="4" />
                <circle cx="157" cy="133" r="4" />
                <circle cx="100" cy="166" r="4" />
                <circle cx="43" cy="133" r="4" />
                <circle cx="43" cy="67" r="4" />
              </g>
              {/* outer dashed toolkit ring */}
              <circle cx="100" cy="100" r="86" strokeWidth="0.7" strokeDasharray="2 5" opacity="0.4" />
              {/* core */}
              <circle cx="100" cy="100" r="13" strokeWidth="1.4" />
              <circle cx="100" cy="100" r="4" fill="currentColor" stroke="none" />
            </svg>
            <span className="tag">DEPENDENCY GRAPH</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section 01 — the 6 primary cards ────────────────────────────────────────
function PrimaryCards() {
  const primaries = FUND_NODES.filter((n) => n.tier === "primary");
  const [openId, setOpenId] = React.useState(null);

  return (
    <section id="s-primary" className="ft-section">
      <div className="shell">
        <div className="ft-sec-head">
          <div className="ft-sec-num">01 / THE SIX THAT CARRY YOUR RANK</div>
          <h2 className="ft-sec-title serif">Start with the <em>six.</em></h2>
          <p className="ft-sec-lede">
            Master these before anything else. Open a card to see the smaller skills it
            pulls together, then jump between them to feel how the pieces feed each other.
          </p>
        </div>

        <div className="ft-cards">
          {primaries.map((n, i) => (
            <button key={n.id} className="ft-card" onClick={() => setOpenId(n.id)}>
              <span className="ft-card-corners"><span></span><span></span><span></span><span></span></span>
              <div className="ft-card-top">
                <span className="ft-card-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="ft-card-tier">Primary · {n.connects.length} links</span>
              </div>
              <div className="ft-card-name serif">{n.name}</div>
              <div className="ft-card-lede">{n.lede}</div>
              <div className="ft-card-foot">
                <span className="ft-card-links">
                  <b>Feeds</b> {n.connects.map((c) => FUND_BY_ID[c].name).slice(0, 2).join(", ")}
                  {n.connects.length > 2 ? " +" + (n.connects.length - 2) : ""}
                </span>
                <span className="ft-card-cta">Open tree <span className="arw">→</span></span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {openId && <InCardOverlay rootId={openId} onClose={() => setOpenId(null)} />}
    </section>
  );
}

// ── In-card radial overlay ──────────────────────────────────────────────────
function InCardOverlay({ rootId, onClose }) {
  const root = FUND_BY_ID[rootId];
  const [selId, setSelId] = React.useState(rootId);
  const sel = FUND_BY_ID[selId];

  // Esc to close + lock body scroll while open.
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  // Radial geometry: root at centre, connected nodes on a ring.
  const cx = 200, cy = 200, R = 132, CENTER_R = 33, LEAF_R = 28;
  const kids = root.connects.map((id, i) => {
    const a = (-90 + (360 / root.connects.length) * i) * (Math.PI / 180);
    return { id, x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  });

  const selConnects = (sel.connects || []).filter((c) => FUND_BY_ID[c]);

  return (
    <div className="ft-overlay" onClick={onClose}>
      <div className="ft-overlay-panel" onClick={(e) => e.stopPropagation()}>
        <button className="ft-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 3l10 10M13 3L3 13" /></svg>
        </button>

        <div className="ft-overlay-viz">
          <svg className="ft-incard-svg" viewBox="0 0 400 400">
            {kids.map((k) => (
              <line key={"e" + k.id} className={"ft-incard-edge" + (selId === k.id || selId === rootId ? " is-active" : "")} x1={cx} y1={cy} x2={k.x} y2={k.y} />
            ))}
            {/* centre */}
            <g className={"ft-incard-node is-center" + (selId === rootId ? " is-active" : "")} onClick={() => setSelId(rootId)}>
              <circle className="dot" cx={cx} cy={cy} r={CENTER_R} />
              {(() => { const t = shortName(root.name); return (
                <text className="lbl" x={cx} y={cy} dominantBaseline="central" style={{ fontSize: labelFont(t, CENTER_R) }}>{t}</text>
              ); })()}
            </g>
            {kids.map((k) => {
              const t = shortName(FUND_BY_ID[k.id].name);
              return (
                <g key={k.id} className={"ft-incard-node" + (selId === k.id ? " is-active" : "")} onClick={() => setSelId(k.id)}>
                  <circle className="dot" cx={k.x} cy={k.y} r={LEAF_R} />
                  <text className="lbl" x={k.x} y={k.y} dominantBaseline="central" style={{ fontSize: labelFont(t, LEAF_R) }}>{t}</text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="ft-overlay-body">
          <div className="ft-overlay-eyebrow">
            {sel.tier === "primary" ? "Primary skill" : "Connected skill"}
            {selId !== rootId ? " · via " + root.name : ""}
          </div>
          <div className="ft-overlay-title serif">{sel.name}</div>
          <p className="ft-overlay-lede">{sel.lede}</p>

          {selConnects.length > 0 ? (
            <>
              <div className="ft-overlay-sub">Feeds into</div>
              <div className="ft-connect-list">
                {selConnects.map((c) => (
                  <button key={c} className="ft-connect-row" onClick={() => setSelId(c)}>
                    <span className="arw">→</span>
                    <span className="ft-connect-name serif">{FUND_BY_ID[c].name}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="ft-connect-list">
              <div className="ft-overlay-sub" style={{ marginTop: "auto" }}>
                A skill others lean on. Click the centre to step back out.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Trim long names so they fit inside the small radial dots.
function shortName(name) {
  if (name.length <= 12) return name;
  if (name.includes("/")) return name.split("/")[0].trim();
  const w = name.split(" ");
  return w.length > 1 ? w[0] : name;
}

// Auto-size a mono label so it stays inside a circle of radius r. Short words
// keep the base size; long ones shrink to a readable floor. (mono advance ≈
// 0.6em; keep the string within ~84% of the diameter.)
function labelFont(text, r) {
  const usable = r * 2 * 0.84;
  const fs = usable / (text.length * 0.6);
  return Math.round(Math.max(8, Math.min(11, fs)) * 10) / 10;
}

Object.assign(window, { FundIntro, PrimaryCards, InCardOverlay });
