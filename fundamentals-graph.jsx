// fundamentals-graph.jsx — Section 02, the master tree.
// A lightweight force-directed graph of all 25 fundamentals, hand-rolled in
// inline JS (no npm graph lib). Radial layout: the 6 primaries anchor an inner
// ring, connected secondaries home hub-and-spoke inside it, orphan "toolkit"
// nodes soft-pin to an outer ring. Directed edges carry arrowheads. Clicking a
// node opens a right-side drawer.
//
// Production config is fixed to radial + drawer (the proto's constellation /
// refocus / overlay variants were exploratory and are intentionally not shipped).
//
// Perf: the physics loop mutates SVG attributes directly through refs. React
// only re-renders on real interaction (view, focus, drawer), so the drawer
// transition and highlighting stay smooth.

// ── geometry constants (viewBox space) ──────────────────────────────────────
const VB_W = 1160, VB_H = 780, CX = 580, CY = 384;
const RP = 205;   // inner ring — primaries
const RT = 348;   // outer ring — toolkit
const NODE_R = { primary: 28, secondary: 15, toolkit: 11 };

const PRIMARY_IDS = FUND_NODES.filter((n) => n.tier === "primary").map((n) => n.id);
const TOOLKIT_IDS = FUND_NODES.filter((n) => n.toolkit).map((n) => n.id);
// Which primaries feed each connected secondary (for the radial wheel homes).
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
  // Each connected secondary homes inside the ring, toward the mean of its
  // parent primaries — a clean hub-and-spoke the physics then loosens.
  Object.keys(SECONDARY_PARENTS).forEach((sid) => {
    const ps = SECONDARY_PARENTS[sid];
    let mx = 0, my = 0;
    ps.forEach((p) => { mx += primPos[p].x; my += primPos[p].y; });
    mx /= ps.length; my /= ps.length;
    const t = 0.62;   // pull toward centre so secondaries sit inside the ring
    homes[sid] = { x: CX + (mx - CX) * t, y: CY + (my - CY) * t, k: 0.05 };
  });
  TOOLKIT_IDS.forEach((id, i) => {
    homes[id] = { ...ringPoint(CX, CY, RT, i, TOOLKIT_IDS.length, -60), k: 0.085 };
  });
  return homes;
}

function buildNodes() {
  const homes = computeHomes();
  return FUND_NODES.map((n, i) => {
    const seed = ringPoint(CX, CY, n.tier === "primary" ? RP : n.toolkit ? RT : 110 + (i % 4) * 26, i, FUND_NODES.length, i * 37);
    const h = homes[n.id];
    return {
      id: n.id, tier: n.tier, toolkit: !!n.toolkit,
      x: h ? h.x + (Math.random() - 0.5) * 8 : seed.x + (Math.random() - 0.5) * 46,
      y: h ? h.y + (Math.random() - 0.5) * 8 : seed.y + (Math.random() - 0.5) * 46,
      vx: 0, vy: 0,
    };
  });
}

// ── master tree component ────────────────────────────────────────────────────
function MasterTree() {
  const stageRef = React.useRef(null);
  const svgRef = React.useRef(null);
  const nodesRef = React.useRef(null);
  if (!nodesRef.current) nodesRef.current = buildNodes();
  const nodes = nodesRef.current;

  const nodeElRef = React.useRef({});   // id -> <g>
  const edgeElRef = React.useRef({});   // key -> <line>
  const dragRef = React.useRef(null);
  const draggedRef = React.useRef(false);
  const focusRef = React.useRef(null);
  const hoverRef = React.useRef(null);

  const [view, setView] = React.useState({ x: 0, y: 0, k: 1 });
  const viewRef = React.useRef(view); viewRef.current = view;
  const [focusId, setFocusId] = React.useState(null);   // drives highlight + drawer
  const [drawerId, setDrawerId] = React.useState(null);
  const [panning, setPanning] = React.useState(false);
  // viewBox units per on-screen pixel. Node labels are SVG text, so they shrink
  // with the stage. We divide the target px size by the container scale to hold
  // a readable on-screen size (>=12px at zoom 1) on any viewport.
  const [vbScale, setVbScale] = React.useState(1);
  const pointers = React.useRef(new Map());
  const panRef = React.useRef(null);
  const pinchRef = React.useRef(null);

  const setFocus = (id) => { focusRef.current = id; setFocusId(id); };

  const baseCls = React.useMemo(() => Object.fromEntries(
    nodes.map((n) => [n.id, "ft-node ft-node--" + (n.toolkit ? "toolkit" : n.tier)])
  ), [nodes]);

  // ── physics + render loop ──
  React.useEffect(() => {
    const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
    const N = nodes.length;
    const sizeF = (n) => (n.tier === "primary" ? 2.1 : n.toolkit ? 0.75 : 1.15);
    let raf;

    const step = () => {
      const homes = computeHomes();
      for (const n of nodes) { n.ax = 0; n.ay = 0; }

      // repulsion
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = nodes[i], b = nodes[j];
          let dx = a.x - b.x, dy = a.y - b.y;
          let d2 = dx * dx + dy * dy; if (d2 < 200) d2 = 200;
          const d = Math.sqrt(d2);
          const f = (44000 * sizeF(a) * sizeF(b)) / d2;
          const ux = dx / d, uy = dy / d;
          a.ax += ux * f; a.ay += uy * f; b.ax -= ux * f; b.ay -= uy * f;
        }
      }
      // edge springs
      for (const e of FUND_EDGES) {
        const a = byId[e.source], b = byId[e.target];
        const both = a.tier === "primary" && b.tier === "primary";
        if (both) continue;   // radial: pins hold the primary wheel
        const L = 128;
        let dx = b.x - a.x, dy = b.y - a.y;
        let d = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = 0.02 * (d - L), ux = dx / d, uy = dy / d;
        a.ax += ux * f; a.ay += uy * f; b.ax -= ux * f; b.ay -= uy * f;
      }
      // centre gravity + home springs
      const grav = 0.0016;
      for (const n of nodes) {
        n.ax += (CX - n.x) * grav; n.ay += (CY - n.y) * grav;
        const h = homes[n.id];
        if (h && (!dragRef.current || dragRef.current.id !== n.id)) {
          n.ax += (h.x - n.x) * h.k; n.ay += (h.y - n.y) * h.k;
        }
      }
      // integrate (+ hard containment so the web can't grow past the canvas)
      const MX = 52, MYT = 48, MYB = 66;
      for (const n of nodes) {
        if (dragRef.current && dragRef.current.id === n.id) { n.vx = 0; n.vy = 0; continue; }
        n.vx = (n.vx + n.ax) * 0.85; n.vy = (n.vy + n.ay) * 0.85;
        const sp = Math.hypot(n.vx, n.vy);
        if (sp > 22) { n.vx = (n.vx / sp) * 22; n.vy = (n.vy / sp) * 22; }
        n.x += n.vx; n.y += n.vy;
        if (n.x < MX) { n.x = MX; if (n.vx < 0) n.vx = 0; }
        else if (n.x > VB_W - MX) { n.x = VB_W - MX; if (n.vx > 0) n.vx = 0; }
        if (n.y < MYT) { n.y = MYT; if (n.vy < 0) n.vy = 0; }
        else if (n.y > VB_H - MYB) { n.y = VB_H - MYB; if (n.vy > 0) n.vy = 0; }
      }

      // ── paint ──
      const hi = focusRef.current || hoverRef.current;
      const nb = hi ? fundNeighbors(hi) : null;
      for (const n of nodes) {
        const g = nodeElRef.current[n.id];
        if (!g) continue;
        g.setAttribute("transform", `translate(${n.x.toFixed(2)} ${n.y.toFixed(2)})`);
        let c = baseCls[n.id];
        if (hi) c += n.id === hi ? " is-focus" : nb.has(n.id) ? " is-neighbor" : " is-dim";
        if (g.getAttribute("class") !== c) g.setAttribute("class", c);
      }
      for (const e of FUND_EDGES) {
        const el = edgeElRef.current[e.source + e.target];
        if (!el) continue;
        const a = byId[e.source], b = byId[e.target];
        const ra = NODE_R[a.tier] + 2, rb = NODE_R[b.tier] + 6;
        const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1;
        const ux = dx / d, uy = dy / d;
        el.setAttribute("x1", (a.x + ux * ra).toFixed(2));
        el.setAttribute("y1", (a.y + uy * ra).toFixed(2));
        el.setAttribute("x2", (b.x - ux * rb).toFixed(2));
        el.setAttribute("y2", (b.y - uy * rb).toFixed(2));
        let c = "ft-edge";
        if (hi) c += (e.source === hi || e.target === hi) ? " is-active" : " is-dim";
        if (el.getAttribute("class") !== c) el.setAttribute("class", c);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [nodes, baseCls]);

  // ── coordinate helpers ──
  const toVB = (cx, cy) => { const svg = svgRef.current, pt = svg.createSVGPoint(); pt.x = cx; pt.y = cy; return pt.matrixTransform(svg.getScreenCTM().inverse()); };
  const toWorld = (cx, cy) => { const p = toVB(cx, cy), v = viewRef.current; return { x: (p.x - v.x) / v.k, y: (p.y - v.y) / v.k }; };
  const vbPerPx = () => VB_W / svgRef.current.getBoundingClientRect().width;

  // ── node drag / click ──
  const onNodeDown = (e, id) => { e.stopPropagation(); e.currentTarget.setPointerCapture(e.pointerId); dragRef.current = { id }; draggedRef.current = false; };
  const onNodeMove = (e, id) => { if (!dragRef.current || dragRef.current.id !== id) return; e.stopPropagation(); const w = toWorld(e.clientX, e.clientY); const n = nodes.find((x) => x.id === id); n.x = w.x; n.y = w.y; n.vx = 0; n.vy = 0; };
  const onNodeUp = (e, id) => { if (dragRef.current && dragRef.current.id === id) dragRef.current = null; };
  const onNodeClick = (e, id) => {
    e.stopPropagation();
    if (draggedRef.current) { draggedRef.current = false; return; }
    // click the already-selected node again to deselect
    if (focusRef.current === id) { setFocus(null); setDrawerId(null); return; }
    setFocus(id);
    setDrawerId(id);
  };

  React.useEffect(() => {
    const move = () => { if (dragRef.current) draggedRef.current = true; };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  // Track the stage's viewBox-per-pixel ratio so node labels keep a readable
  // on-screen size regardless of viewport width.
  React.useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const measure = () => { const w = el.getBoundingClientRect().width; if (w) setVbScale(VB_W / w); };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── background pan + pinch ──
  const onBgDown = (e) => {
    stageRef.current.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { bg: true, x: e.clientX, y: e.clientY });
    const bgs = [...pointers.current.values()].filter((p) => p.bg);
    if (bgs.length === 2) { pinchRef.current = { d: dist(bgs[0], bgs[1]), k: viewRef.current.k }; panRef.current = null; }
    else { panRef.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y }; setPanning(true); }
  };
  const onBgMove = (e) => {
    const rec = pointers.current.get(e.pointerId);
    if (rec && rec.bg) { rec.x = e.clientX; rec.y = e.clientY; }
    const bgs = [...pointers.current.values()].filter((p) => p.bg);
    if (pinchRef.current && bgs.length === 2) {
      const nd = dist(bgs[0], bgs[1]);
      const k = clamp(pinchRef.current.k * (nd / pinchRef.current.d), 0.5, 2.4);
      const mid = toVB((bgs[0].x + bgs[1].x) / 2, (bgs[0].y + bgs[1].y) / 2);
      setView((v) => zoomAround(v, k, mid)); return;
    }
    if (panRef.current) { const f = vbPerPx(); setView((v) => ({ ...v, x: panRef.current.vx + (e.clientX - panRef.current.x) * f, y: panRef.current.vy + (e.clientY - panRef.current.y) * f })); }
  };
  const onBgUp = (e) => { pointers.current.delete(e.pointerId); if (pointers.current.size < 2) pinchRef.current = null; if (pointers.current.size === 0) { panRef.current = null; setPanning(false); } };
  const onBgClick = () => { if (!panRef.current) { setFocus(null); setDrawerId(null); } };
  // Wheel zoom is intentionally omitted: hijacking the scroll wheel over a
  // graph embedded in a scrollable page fights the page scroll. Zoom is via the
  // +/- buttons (desktop) and pinch (touch) only.
  const zoomBtn = (dir) => { const p = { x: VB_W / 2, y: VB_H / 2 }; const k = clamp(viewRef.current.k * (dir > 0 ? 1.2 : 0.83), 0.5, 2.4); setView((v) => zoomAround(v, k, p)); };
  const resetView = () => { setView({ x: 0, y: 0, k: 1 }); setFocus(null); setDrawerId(null); };

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setDrawerId(null); setFocus(null); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="ft-master-wrap">
      <div className={"ft-stage" + (panning ? " is-panning" : "")} ref={stageRef}
           onPointerDown={onBgDown} onPointerMove={onBgMove} onPointerUp={onBgUp} onPointerCancel={onBgUp}>
        <svg className="ft-canvas" ref={svgRef} viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid meet" onClick={onBgClick}>
          <defs>
            <marker id="ft-arrow" viewBox="0 0 10 10" refX="8.6" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto-start-reverse">
              <path d="M0.6 1.3 L9 5 L0.6 8.7" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>

          <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
            <circle className="ft-ring" cx={CX} cy={CY} r={RT} />
            <text className="ft-ring-label" x={CX} y={CY - RT - 14} textAnchor="middle">TRANSFERABLE TOOLKIT</text>

            {FUND_EDGES.map((e) => {
              const a = nodes.find((x) => x.id === e.source), b = nodes.find((x) => x.id === e.target);
              return (
                <line key={e.source + e.target} className="ft-edge"
                      x1={a.x.toFixed(1)} y1={a.y.toFixed(1)} x2={b.x.toFixed(1)} y2={b.y.toFixed(1)}
                      ref={(el) => { if (el) edgeElRef.current[e.source + e.target] = el; }}
                      markerEnd="url(#ft-arrow)" markerStart={e.bidir ? "url(#ft-arrow)" : undefined} />
              );
            })}

            {nodes.map((n) => {
              const meta = FUND_BY_ID[n.id];
              const r = NODE_R[n.tier];
              const off = n.tier === "primary" ? r + 17 : r + 13;
              return (
                <g key={n.id} className={baseCls[n.id]} transform={`translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})`}
                   ref={(el) => { if (el) nodeElRef.current[n.id] = el; }}
                   onPointerDown={(e) => onNodeDown(e, n.id)} onPointerMove={(e) => onNodeMove(e, n.id)}
                   onPointerUp={(e) => onNodeUp(e, n.id)} onClick={(e) => onNodeClick(e, n.id)}
                   onMouseEnter={() => { hoverRef.current = n.id; }} onMouseLeave={() => { hoverRef.current = null; }}>
                  <circle className="halo" cx="0" cy="0" r={r + 12} />
                  {n.tier === "primary" ? <Hex className="shape" r={r} /> : <circle className="shape" cx="0" cy="0" r={r} />}
                  <text className="lbl" x="0" y={off} style={{ fontSize: (n.tier === "primary" ? 15 : n.toolkit ? 12 : 13) * vbScale }}>{meta.name}</text>
                </g>
              );
            })}
          </g>
        </svg>

        <div className="ft-controls" onPointerDown={(e) => e.stopPropagation()}>
          <button className="ft-ctl" onClick={() => zoomBtn(1)} aria-label="Zoom in">+</button>
          <button className="ft-ctl" onClick={() => zoomBtn(-1)} aria-label="Zoom out">−</button>
          <button className="ft-ctl" onClick={resetView} aria-label="Reset view">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 8a6 6 0 1 1 1.7 4.2M2 12.5V8.5h4" strokeLinecap="square" /></svg>
          </button>
        </div>

        <div className="ft-legend" aria-hidden="true">
          <div className="ft-legend-row"><span className="ft-legend-key"><i className="ft-key-primary"></i></span> Primary · carries rank</div>
          <div className="ft-legend-row"><span className="ft-legend-key"><i className="ft-key-secondary"></i></span> Secondary skill</div>
          <div className="ft-legend-row"><span className="ft-legend-key"><i className="ft-key-toolkit"></i></span> Toolkit · stands alone</div>
          <div className="ft-legend-row"><span className="ft-legend-key"><i className="ft-key-edge"></i></span> Feeds into →</div>
        </div>

        {drawerId && (
          <div className="ft-drawer" onPointerDown={(e) => e.stopPropagation()}>
            <DrawerBody id={drawerId} onPick={(id) => { setDrawerId(id); setFocus(id); }} onClose={() => { setDrawerId(null); setFocus(null); }} />
          </div>
        )}
      </div>

      <div className="ft-hint">
        <span><kbd>Drag</kbd> a node to pull the web</span>
        <span><kbd>+ / −</kbd> or pinch to zoom</span>
        <span><kbd>Click</kbd> a node to read it</span>
        <span><kbd>Esc</kbd> to reset</span>
      </div>
    </div>
  );
}

// hexagon for primary nodes (drawn at local origin)
function Hex({ r, className }) {
  const pts = [];
  for (let i = 0; i < 6; i++) { const a = (-90 + 60 * i) * (Math.PI / 180); pts.push(`${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`); }
  return <polygon className={className} points={pts.join(" ")} />;
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
            Every fundamental and the ones it feeds. Pull a node and the web follows.
            The six primaries anchor the middle; the outer ring is the toolkit you carry
            into any game, no matter how you play the rest.
          </p>
        </div>
        <MasterTree />
      </div>
    </section>
  );
}

function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function zoomAround(v, k, p) { return { k, x: p.x - (p.x - v.x) * (k / v.k), y: p.y - (p.y - v.y) * (k / v.k) }; }

Object.assign(window, { MasterTree, MasterTreeSection });
