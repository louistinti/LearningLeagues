// fundamentals-graph.jsx — Section 02, the master tree.
// A STATIC map of all 25 fundamentals: the 6 primaries anchor the middle,
// connected secondaries cluster around them, orphan "toolkit" nodes sit on an
// outer ring. Tap a node to open its drawer. No physics loop, drag, pan or zoom
// at runtime — the layout is computed once (a synchronous force settle) and
// frozen, so the component is just static SVG + React-driven highlight.

const VB_W = 1160, VB_H = 780, CX = 580, CY = 384;
const RP = 205;   // inner ring — primaries
const RT = 348;   // outer ring — toolkit
const NODE_R = { primary: 28, secondary: 15, toolkit: 11 };

const PRIMARY_IDS = FUND_NODES.filter((n) => n.tier === "primary").map((n) => n.id);
const TOOLKIT_IDS = FUND_NODES.filter((n) => n.toolkit).map((n) => n.id);
const SECONDARY_PARENTS = {};
FUND_NODES.filter((n) => n.tier === "secondary" && !n.toolkit).forEach((s) => {
  SECONDARY_PARENTS[s.id] = FUND_NODES.filter((p) => p.connects && p.connects.includes(s.id)).map((p) => p.id);
});

function ringPoint(cx, cy, r, i, count, offsetDeg) {
  const a = ((offsetDeg || -90) + (360 / count) * i) * (Math.PI / 180);
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function computeHomes() {
  const homes = {};
  const primPos = {};
  PRIMARY_IDS.forEach((id, i) => { primPos[id] = ringPoint(CX, CY, RP, i, PRIMARY_IDS.length, -90); homes[id] = { ...primPos[id], k: 0.11 }; });
  Object.keys(SECONDARY_PARENTS).forEach((sid) => {
    const ps = SECONDARY_PARENTS[sid];
    let mx = 0, my = 0;
    ps.forEach((p) => { mx += primPos[p].x; my += primPos[p].y; });
    mx /= ps.length; my /= ps.length;
    const t = 0.62;   // pull secondaries inside the ring, toward the mean parent
    homes[sid] = { x: CX + (mx - CX) * t, y: CY + (my - CY) * t, k: 0.05 };
  });
  TOOLKIT_IDS.forEach((id, i) => {
    homes[id] = { ...ringPoint(CX, CY, RT, i, TOOLKIT_IDS.length, -60), k: 0.085 };
  });
  return homes;
}

// Frozen layout: seed nodes at their homes (with a small deterministic offset to
// break symmetry so co-located secondaries separate), run a few hundred force
// iterations synchronously at load, then keep the resulting positions forever.
const NODE_POS = (function computeFrozenLayout() {
  const homes = computeHomes();
  const nodes = FUND_NODES.map((n, i) => {
    const h = homes[n.id];
    return { id: n.id, tier: n.tier, toolkit: !!n.toolkit,
      x: h.x + ((i * 37) % 23 - 11), y: h.y + ((i * 53) % 23 - 11), vx: 0, vy: 0 };
  });
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const sizeF = (n) => (n.tier === "primary" ? 2.1 : n.toolkit ? 0.75 : 1.15);
  const MX = 52, MYT = 48, MYB = 66;
  for (let iter = 0; iter < 500; iter++) {
    for (const n of nodes) { n.ax = 0; n.ay = 0; }
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      let dx = a.x - b.x, dy = a.y - b.y; let d2 = dx * dx + dy * dy; if (d2 < 200) d2 = 200;
      const d = Math.sqrt(d2), f = (44000 * sizeF(a) * sizeF(b)) / d2, ux = dx / d, uy = dy / d;
      a.ax += ux * f; a.ay += uy * f; b.ax -= ux * f; b.ay -= uy * f;
    }
    for (const e of FUND_EDGES) {
      const a = byId[e.source], b = byId[e.target];
      if (a.tier === "primary" && b.tier === "primary") continue;   // the ring holds the primaries
      const L = 128; let dx = b.x - a.x, dy = b.y - a.y; let d = Math.sqrt(dx * dx + dy * dy) || 1;
      const f = 0.02 * (d - L), ux = dx / d, uy = dy / d;
      a.ax += ux * f; a.ay += uy * f; b.ax -= ux * f; b.ay -= uy * f;
    }
    for (const n of nodes) {
      n.ax += (CX - n.x) * 0.0016; n.ay += (CY - n.y) * 0.0016;
      const h = homes[n.id]; if (h) { n.ax += (h.x - n.x) * h.k; n.ay += (h.y - n.y) * h.k; }
    }
    for (const n of nodes) {
      n.vx = (n.vx + n.ax) * 0.85; n.vy = (n.vy + n.ay) * 0.85;
      const sp = Math.hypot(n.vx, n.vy); if (sp > 22) { n.vx = n.vx / sp * 22; n.vy = n.vy / sp * 22; }
      n.x += n.vx; n.y += n.vy;
      if (n.x < MX) n.x = MX; else if (n.x > VB_W - MX) n.x = VB_W - MX;
      if (n.y < MYT) n.y = MYT; else if (n.y > VB_H - MYB) n.y = VB_H - MYB;
    }
  }
  return Object.fromEntries(nodes.map((n) => [n.id, { x: n.x, y: n.y }]));
})();

// hexagon for primary nodes (drawn at local origin)
function Hex({ r, className }) {
  const pts = [];
  for (let i = 0; i < 6; i++) { const a = (-90 + 60 * i) * (Math.PI / 180); pts.push(`${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`); }
  return <polygon className={className} points={pts.join(" ")} />;
}

// ── master tree component ────────────────────────────────────────────────────
function MasterTree() {
  const svgRef = React.useRef(null);
  const [vbScale, setVbScale] = React.useState(1);   // keep labels readable as the SVG scales to the container
  const [focusId, setFocusId] = React.useState(null);
  const [drawerId, setDrawerId] = React.useState(null);
  const [hoverId, setHoverId] = React.useState(null);

  React.useEffect(() => {
    const el = svgRef.current; if (!el) return;
    const measure = () => { const w = el.getBoundingClientRect().width; if (w) setVbScale(VB_W / w); };
    measure();
    const ro = new ResizeObserver(measure); ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setFocusId(null); setDrawerId(null); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const clear = () => { setFocusId(null); setDrawerId(null); };
  const select = (id) => {
    if (focusId === id) { clear(); return; }
    setFocusId(id); setDrawerId(id);
  };

  // Highlight is pure React state (tap to focus, hover on desktop).
  const hiId = focusId || hoverId;
  const hiNb = hiId ? fundNeighbors(hiId) : null;
  const stateCls = (id) => (hiId ? (id === hiId ? " is-focus" : hiNb.has(id) ? " is-neighbor" : " is-dim") : "");
  const edgeCls = (e) => "ft-edge" + (hiId ? ((e.source === hiId || e.target === hiId) ? " is-active" : " is-dim") : "");
  const baseCls = (n) => "ft-node ft-node--" + (n.toolkit ? "toolkit" : n.tier);

  return (
    <div className="ft-master-wrap">
      <div className="ft-stage">
        <svg className="ft-canvas" ref={svgRef} viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid meet" onClick={clear}>
          <defs>
            <marker id="ft-arrow" viewBox="0 0 10 10" refX="8.6" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto-start-reverse">
              <path d="M0.6 1.3 L9 5 L0.6 8.7" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>

          <circle className="ft-ring" cx={CX} cy={CY} r={RT} />
          <text className="ft-ring-label" x={CX} y={CY - RT - 14} textAnchor="middle">TRANSFERABLE TOOLKIT</text>

          {FUND_EDGES.map((e) => {
            const a = NODE_POS[e.source], b = NODE_POS[e.target];
            const ra = NODE_R[FUND_BY_ID[e.source].tier] + 2, rb = NODE_R[FUND_BY_ID[e.target].tier] + 6;
            const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d;
            return (
              <line key={e.source + e.target} className={edgeCls(e)}
                    x1={(a.x + ux * ra).toFixed(1)} y1={(a.y + uy * ra).toFixed(1)}
                    x2={(b.x - ux * rb).toFixed(1)} y2={(b.y - uy * rb).toFixed(1)}
                    markerEnd="url(#ft-arrow)" markerStart={e.bidir ? "url(#ft-arrow)" : undefined} />
            );
          })}

          {FUND_NODES.map((n) => {
            const p = NODE_POS[n.id];
            const r = NODE_R[n.tier];
            const off = n.tier === "primary" ? r + 17 : r + 13;
            return (
              <g key={n.id} className={baseCls(n) + stateCls(n.id)} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}
                 onClick={(e) => { e.stopPropagation(); select(n.id); }}
                 onMouseEnter={() => setHoverId(n.id)} onMouseLeave={() => setHoverId((h) => (h === n.id ? null : h))}>
                {/* generous invisible hit area so small nodes stay tappable */}
                <circle className="ft-hit" cx="0" cy="0" r={Math.max(r, 18) + 8} fill="transparent" />
                <circle className="halo" cx="0" cy="0" r={r + 12} />
                {n.tier === "primary" ? <Hex className="shape" r={r} /> : <circle className="shape" cx="0" cy="0" r={r} />}
                <text className="lbl" x="0" y={off} style={{ fontSize: (n.tier === "primary" ? 15 : n.toolkit ? 12 : 13) * vbScale }}>{FUND_BY_ID[n.id].name}</text>
              </g>
            );
          })}
        </svg>

        <div className="ft-legend" aria-hidden="true">
          <div className="ft-legend-row"><span className="ft-legend-key"><i className="ft-key-primary"></i></span> Primary · carries rank</div>
          <div className="ft-legend-row"><span className="ft-legend-key"><i className="ft-key-secondary"></i></span> Secondary skill</div>
          <div className="ft-legend-row"><span className="ft-legend-key"><i className="ft-key-toolkit"></i></span> Toolkit · stands alone</div>
          <div className="ft-legend-row"><span className="ft-legend-key"><i className="ft-key-edge"></i></span> Feeds into →</div>
        </div>

        {drawerId && (
          <div className="ft-drawer">
            <DrawerBody id={drawerId} onPick={(id) => { setDrawerId(id); setFocusId(id); }} onClose={clear} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── drawer content ──
function DrawerBody({ id, onPick, onClose }) {
  const n = FUND_BY_ID[id];
  const outs = (n.connects || []).filter((c) => FUND_BY_ID[c]);
  const ins = FUND_NODES.filter((m) => m.connects && m.connects.includes(id));
  return (
    <>
      <button className="ft-close" style={{ position: "absolute", top: 14, right: 14 }} onClick={onClose} aria-label="Close">
        <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 3l10 10M13 3L3 13" /></svg>
      </button>
      <div className="ft-drawer-tier">{n.tier === "primary" ? "Primary skill" : n.toolkit ? "Toolkit · stands alone" : "Secondary skill"}</div>
      <div className="ft-drawer-title serif">{n.name}</div>
      <p className="ft-drawer-lede">{n.lede}</p>
      {outs.length > 0 && (
        <>
          <div className="ft-drawer-sub">Feeds into</div>
          <div className="ft-connect-list" style={{ marginBottom: "calc(var(--s) * 3)" }}>
            {outs.map((c) => (
              <button key={c} className="ft-connect-row" onClick={() => onPick(c)}><span className="arw">→</span><span className="ft-connect-name serif">{FUND_BY_ID[c].name}</span></button>
            ))}
          </div>
        </>
      )}
      {ins.length > 0 && (
        <>
          <div className="ft-drawer-sub">Leaned on by</div>
          <div className="ft-connect-list">
            {ins.map((m) => (
              <button key={m.id} className="ft-connect-row" onClick={() => onPick(m.id)}><span className="arw">←</span><span className="ft-connect-name serif">{m.name}</span></button>
            ))}
          </div>
        </>
      )}
      {outs.length === 0 && ins.length === 0 && (
        <div className="ft-drawer-sub">No dependencies. Part of the kit you carry into every game.</div>
      )}
    </>
  );
}

// ── Section 02 wrapper ───────────────────────────────────────────────────────
function MasterTreeSection() {
  return (
    <section id="s-master" className="ft-section">
      <div className="shell">
        <div className="ft-sec-head">
          <div className="ft-sec-num">02 / THE FULL MAP</div>
          <h2 className="ft-sec-title serif">All twenty-five, <em>wired together.</em></h2>
          <p className="ft-sec-lede">
            Every fundamental and the ones it feeds. The six primaries anchor the middle;
            the outer ring is the toolkit you carry into any game, no matter how you play
            the rest. Tap a node to read it and jump to what it connects to.
          </p>
        </div>
        <MasterTree />
      </div>
    </section>
  );
}

Object.assign(window, { MasterTree, MasterTreeSection });
