// fundamentals.jsx — Fundamentals page composition.
// Architecture: hero + 6 skill cards (2-col grid) + master tree below.
// Click a card → fullscreen overlay with in-card tree (top) + content (bottom).

// ── Data ────────────────────────────────────────────────────────────────────
// The 6 primary cards. `connects` lists the master-tree nodes feeding into / out of this skill.
// Cards are intentionally short here — full content comes in subsequent iterations.
const SKILLS = [
  {
    id: "map-awareness",
    title: "Map Awareness",
    lede: "The skill behind every other skill. If you can't read the map, you can't make the right call.",
    connects: ["vision", "jungle-tracking", "roaming", "recall-timers"],
  },
  {
    id: "mentality",
    title: "Mentality",
    lede: "The precondition. Tilt undoes hours of practice — it's a skill, not a personality trait.",
    connects: ["champion-pool", "win-conditions"],
  },
  {
    id: "farming",
    title: "Farming",
    lede: "Gold and XP are the game's two currencies. Last-hitting is how you earn them — for every role.",
    connects: ["wave-control", "trading", "cooldowns"],
  },
  {
    id: "tempo",
    title: "Tempo",
    lede: "Spending time efficiently. Recall windows, plate timing, roams — every second on the map has a price.",
    connects: ["wave-control", "recall-timers", "priority-usage", "mid-game"],
  },
  {
    id: "vision",
    title: "Vision",
    lede: "What you can see. The single biggest determinant of who picks the fight versus who walks into it.",
    connects: ["map-awareness", "jungle-tracking", "roaming"],
  },
  {
    id: "strongside-weakside",
    title: "Strongside / Weakside",
    lede: "Where the resources flow. Decided pre-game, executed every minute — the lane that wins is the lane fed.",
    connects: ["roaming", "sidelaning", "matchups", "champion-knowledge"],
  },
];

// Master tree nodes — every fundamental connected to the system.
// Used by the master tree visualization (stub for now).
const TREE_NODES = {
  "map-awareness":      { label: "Map Awareness",      tier: "primary" },
  "mentality":          { label: "Mentality",          tier: "primary" },
  "farming":            { label: "Farming",            tier: "primary" },
  "tempo":              { label: "Tempo",              tier: "primary" },
  "vision":             { label: "Vision",             tier: "primary" },
  "strongside-weakside":{ label: "Strongside / Weakside", tier: "primary" },
  "wave-control":       { label: "Wave Control",       tier: "secondary" },
  "jungle-tracking":    { label: "Jungle Tracking",    tier: "secondary" },
  "priority-usage":     { label: "Priority Usage",     tier: "secondary" },
  "roaming":            { label: "Roaming",            tier: "secondary" },
  "mid-game":           { label: "Mid Game",           tier: "secondary" },
  "sidelaning":         { label: "Sidelaning",         tier: "secondary" },
  "recall-timers":      { label: "Recall Timers",      tier: "secondary" },
  "trading":            { label: "Trading",            tier: "secondary" },
  "win-conditions":     { label: "Win Conditions",     tier: "secondary" },
  "matchups":           { label: "Matchups",           tier: "secondary" },
  "champ-select":       { label: "Champ Select",       tier: "secondary" },
  "cooldowns":          { label: "Cooldowns",          tier: "secondary" },
  "itemization":        { label: "Itemization",        tier: "secondary" },
  "runes":              { label: "Runes",              tier: "secondary" },
  "summoner-spells":    { label: "Summoner Spells",    tier: "secondary" },
  "mechanics":          { label: "Mechanics",          tier: "secondary" },
  "teamfighting":       { label: "Teamfighting",       tier: "secondary" },
  "champion-pool":      { label: "Champion Pool",      tier: "secondary" },
  "champion-knowledge": { label: "Champion Knowledge", tier: "secondary" },
};

// ── Hero ────────────────────────────────────────────────────────────────────
function FundamentalsHero() {
  return (
    <section className="hero">
      <div className="shell">
        <div className="hero-grid">
          <div>
            <div className="eyebrow hero-eyebrow">
              THE BASE LAYER <span className="dot"></span> FUNDAMENTALS
            </div>
            <h1 className="serif">Fundamentals<em>.</em></h1>

            <blockquote className="hero-pullquote">
              "Mechanics get you out of Iron. Fundamentals get you out of Gold."
            </blockquote>

            <p className="hero-intro">
              Six skills carry your rank. Each one branches into a dozen smaller habits —
              click a card to open the full tree, see how the pieces feed each other,
              and what 2026 changed about how you should play it.
            </p>

            <div className="hero-meta">
              <span><strong>For</strong> players who've already played</span>
              <span><strong>Read time</strong> ~25 min</span>
              <span><strong>Patch</strong> 26.9</span>
            </div>
          </div>

          <div className="hero-sigil" aria-hidden="true">
            <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
              <polygon points="100,10 180,55 180,145 100,190 20,145 20,55" strokeWidth="1" opacity="0.6" />
              <polygon points="100,40 155,72 155,128 100,160 45,128 45,72" strokeWidth="0.8" opacity="0.4" />
              {/* central node + 6 spokes — visualises the 6 fundamentals as a graph */}
              <circle cx="100" cy="100" r="6" fill="currentColor" stroke="none" />
              {[
                [100,40], [155,72], [155,128], [100,160], [45,128], [45,72],
              ].map(([x,y], i) => (
                <g key={i}>
                  <line x1="100" y1="100" x2={x} y2={y} opacity=".55" />
                  <circle cx={x} cy={y} r="3.2" fill="currentColor" stroke="none" opacity=".85" />
                </g>
              ))}
            </svg>
            <span className="tag">SIGIL · FUNDAMENTALS</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Breadcrumb ──────────────────────────────────────────────────────────────
function FundamentalsBreadcrumb() {
  return (
    <div className="shell">
      <div className="breadcrumb">
        <a href="index.html">Home</a>
        <span className="sep">›</span>
        <span className="current">Foundations</span>
      </div>
    </div>
  );
}

// ── Card grid ───────────────────────────────────────────────────────────────
function CardsGrid({ onOpen }) {
  return (
    <section className="section shell" id="s-cards">
      <SectionHead
        num="01"
        title="The six that move your rank"
        lede="Click a card to open its full tree, examples, and 2026-specific notes."
      />
      <div className="fund-cards">
        {SKILLS.map((s, i) => (
          <button
            key={s.id}
            className="fund-card"
            onClick={() => onOpen(s.id)}
            aria-label={`Open ${s.title}`}
          >
            <span className="fund-card-num mono">0{i + 1}</span>
            <h3 className="fund-card-title serif">{s.title}</h3>
            <p className="fund-card-lede">{s.lede}</p>
            <span className="fund-card-cta">
              Open <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

// ── In-card tree (top half of the expanded card) ────────────────────────────
function InCardTree({ skillId, activeNodeId, onSelect }) {
  const skill = SKILLS.find((s) => s.id === skillId);
  if (!skill) return null;
  // Layout: skill in centre, connected nodes evenly spaced around the right.
  // Simple radial: works for 3–5 connections without clutter.
  const W = 520, H = 200, CX = 110, CY = H / 2, R = 170;
  const n = skill.connects.length;
  const positions = skill.connects.map((id, i) => {
    // Spread the connected nodes vertically along the right side.
    const t = n === 1 ? 0.5 : i / (n - 1);
    const y = 30 + t * (H - 60);
    return { id, x: CX + R, y };
  });

  return (
    <div className="incard-tree" role="group" aria-label="Connected fundamentals">
      <svg viewBox={`0 0 ${W} ${H}`} className="incard-tree-svg">
        {/* spokes */}
        {positions.map((p) => (
          <line
            key={"l-" + p.id}
            x1={CX} y1={CY} x2={p.x} y2={p.y}
            className="incard-edge"
          />
        ))}
        {/* center node (the card's skill) */}
        <g className="incard-node incard-node--center">
          <circle cx={CX} cy={CY} r="38" />
          <text x={CX} y={CY - 4} textAnchor="middle" className="incard-node-label">
            {skill.title.split(" / ").map((line, i) => (
              <tspan key={i} x={CX} dy={i === 0 ? 0 : 14}>{line}</tspan>
            ))}
          </text>
        </g>
        {/* connected nodes */}
        {positions.map((p) => {
          const isActive = activeNodeId === p.id;
          const node = TREE_NODES[p.id];
          return (
            <g
              key={p.id}
              className={"incard-node incard-node--leaf" + (isActive ? " is-active" : "")}
              onClick={() => onSelect(p.id)}
              tabIndex="0"
              role="button"
              aria-pressed={isActive}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect(p.id); }}
            >
              <circle cx={p.x} cy={p.y} r="28" />
              <text x={p.x} y={p.y + 4} textAnchor="middle" className="incard-node-label">
                {(node?.label || p.id).split(" ").map((w, i, arr) => (
                  <tspan key={i} x={p.x} dy={i === 0 ? -((arr.length - 1) * 6) : 12}>{w}</tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Card content (placeholder — real per-card content comes next iteration) ─
function CardContent({ skillId, activeNodeId }) {
  // When a connected node is selected, show that node's stub content instead.
  const focus = activeNodeId || skillId;
  const isPrimary = activeNodeId == null;
  const node = isPrimary
    ? SKILLS.find((s) => s.id === focus)
    : { id: focus, title: TREE_NODES[focus]?.label, lede: null };

  return (
    <div className="incard-body">
      <div className="incard-body-inner">
        <div className="eyebrow">
          {isPrimary ? "PRIMARY FUNDAMENTAL" : "CONNECTED · FROM " + (SKILLS.find(s => s.id === skillId)?.title || "").toUpperCase()}
        </div>
        <h2 className="serif incard-title">{node?.title || focus}</h2>
        {node?.lede && <p className="incard-lede">{node.lede}</p>}
        <p className="incard-placeholder">
          <em>Content for "{node?.title || focus}" coming in the next iteration.</em>
          {" "}This card will be filled with: a 2026-grounded definition, why it sits where it does in the dependency graph, the chain examples,
          common mistakes, and a visual (map / lane diagram / decision flow) appropriate to the skill.
        </p>
      </div>
    </div>
  );
}

// ── Expanded card (modal-style overlay) ─────────────────────────────────────
function ExpandedCard({ skillId, onClose }) {
  const [activeNodeId, setActiveNodeId] = React.useState(null);

  // Reset the inner selection when the card itself changes.
  React.useEffect(() => { setActiveNodeId(null); }, [skillId]);

  // Esc to close, lock body scroll while open.
  React.useEffect(() => {
    if (!skillId) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [skillId, onClose]);

  if (!skillId) return null;

  return (
    <div className="incard-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="incard-panel" onClick={(e) => e.stopPropagation()}>
        <button className="incard-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
          <span>Close</span>
        </button>

        <InCardTree
          skillId={skillId}
          activeNodeId={activeNodeId}
          onSelect={(id) => setActiveNodeId((cur) => (cur === id ? null : id))}
        />

        <CardContent skillId={skillId} activeNodeId={activeNodeId} />
      </div>
    </div>
  );
}

// ── Master tree (stub for now) ──────────────────────────────────────────────
function MasterTree() {
  return (
    <section className="section shell" id="s-tree">
      <SectionHead
        num="02"
        title="The full map"
        lede="Every fundamental, connected. Click a node to explore — primary skills sit larger; B/C/D-tier skills branch off."
      />
      <div className="master-tree-stub">
        <div className="eyebrow">UPCOMING</div>
        <p>
          Interactive force-directed graph of all 25 fundamentals — coming after the six primary cards have content.
        </p>
        <ul className="master-tree-stub-list">
          {Object.entries(TREE_NODES).map(([id, n]) => (
            <li key={id} className={"master-tree-stub-item" + (n.tier === "primary" ? " is-primary" : "")}>
              {n.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── App ─────────────────────────────────────────────────────────────────────
function FundamentalsApp() {
  const [openId, setOpenId] = React.useState(null);
  return (
    <>
      <Nav activeKey="foundations" />
      <FundamentalsBreadcrumb />
      <FundamentalsHero />
      <CardsGrid onOpen={setOpenId} />
      <MasterTree />
      <Footer />
      <ExpandedCard skillId={openId} onClose={() => setOpenId(null)} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<FundamentalsApp />);
