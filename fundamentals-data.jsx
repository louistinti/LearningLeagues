// fundamentals-data.jsx — source of truth for the 25 fundamentals.
// Tiers: "primary" (the 6 that carry your rank) | "secondary".
// `toolkit: true` marks the orphan nodes nobody depends on — the transferable
// kit that sits around the graph without inbound edges.
// `connects` (primaries only) is DIRECTED: A → B reads "A feeds B / B leans on A".

const FUND_NODES = [
  // ── 6 primaries ────────────────────────────────────────────────────────
  {
    id: "map-awareness", name: "Map Awareness", tier: "primary",
    lede: "Read the map or you can't make the right call. Every other skill leans on this one.",
    connects: ["vision", "jungle-tracking", "roaming", "recall-timers"],
  },
  {
    id: "mentality", name: "Mentality", tier: "primary",
    lede: "Tilt undoes hours of practice. It is a skill you train, not a personality trait.",
    connects: ["champion-pool", "win-conditions"],
  },
  {
    id: "farming", name: "Farming", tier: "primary",
    lede: "Gold and XP are the two currencies of the game. Every role earns them at the last hit.",
    connects: ["wave-control", "trading", "cooldowns"],
  },
  {
    id: "tempo", name: "Tempo", tier: "primary",
    lede: "Every second has a price: recall windows, plate timing, roams. Spend yours on purpose.",
    connects: ["wave-control", "recall-timers", "priority-usage", "mid-game"],
  },
  {
    id: "vision", name: "Vision", tier: "primary",
    lede: "What you can see decides who takes the fight and who walks in blind.",
    connects: ["map-awareness", "jungle-tracking", "roaming"],
  },
  {
    id: "strongside-weakside", name: "Strongside / Weakside", tier: "primary",
    lede: "Resources go to one side of the map. You pick which one back in champ select.",
    connects: ["roaming", "sidelaning", "matchups", "champion-knowledge"],
  },

  // ── connected secondaries ────────────────────────────────────────────────
  {
    id: "wave-control", name: "Wave Control", tier: "secondary",
    lede: "Where the wave sits decides where you can go. Freeze it or push it, on purpose.",
  },
  {
    id: "jungle-tracking", name: "Jungle Tracking", tier: "secondary",
    lede: "The enemy jungler is on the map even when you can't see them. Guess where, then play around it.",
  },
  {
    id: "priority-usage", name: "Priority Usage", tier: "secondary",
    lede: "Winning your lane is worth little if you sit in it. Priority is permission to leave.",
  },
  {
    id: "roaming", name: "Roaming", tier: "secondary",
    lede: "Leaving your lane to help another one is a trade. Check the math before you go.",
  },
  {
    id: "mid-game", name: "Mid Game", tier: "secondary",
    lede: "Lanes end and the map opens up. The mid game is where leads turn into objectives.",
  },
  {
    id: "sidelaning", name: "Sidelaning", tier: "secondary",
    lede: "One player holds a side lane while the team groups. Done right, it bends the map.",
  },
  {
    id: "recall-timers", name: "Recall Timers", tier: "secondary",
    lede: "Base at the right moment and you lose nothing. Base at the wrong one and you hand over the wave.",
  },
  {
    id: "trading", name: "Trading", tier: "secondary",
    lede: "Every hit you take should buy something back. Trade when the terms favor you.",
  },
  {
    id: "win-conditions", name: "Win Conditions", tier: "secondary",
    lede: "Every game has a shape that wins it for you. Name it early, then play toward it.",
  },
  {
    id: "matchups", name: "Matchups", tier: "secondary",
    lede: "Some lanes you beat, some you survive. Knowing which changes how you play minute one.",
  },
  {
    id: "cooldowns", name: "Cooldowns", tier: "secondary",
    lede: "A spell on cooldown is a window. Track theirs and yours before you commit.",
  },
  {
    id: "champion-pool", name: "Champion Pool", tier: "secondary",
    lede: "A small pool you know beats a large one you don't. Depth over breadth.",
  },
  {
    id: "champion-knowledge", name: "Champion Knowledge", tier: "secondary",
    lede: "You can't respect what you don't know. Learn the threats before they punish you.",
  },

  // ── toolkit (orphans — no inbound edges) ─────────────────────────────────
  {
    id: "itemization", name: "Itemization", tier: "secondary", toolkit: true,
    lede: "Builds aren't fixed. Read the game and buy what it asks for.",
  },
  {
    id: "runes", name: "Runes", tier: "secondary", toolkit: true,
    lede: "Runes set your lane before it starts. Match them to the matchup, not the guide.",
  },
  {
    id: "summoner-spells", name: "Summoner Spells", tier: "secondary", toolkit: true,
    lede: "Flash and your second spell decide fights on their own. Track them like a resource.",
  },
  {
    id: "mechanics", name: "Mechanics", tier: "secondary", toolkit: true,
    lede: "Last-hitting, kiting, dodging skillshots. The hands catch up with reps, not theory.",
  },
  {
    id: "teamfighting", name: "Teamfighting", tier: "secondary", toolkit: true,
    lede: "Five players, one clock. Know your job in the fight before it starts.",
  },
  {
    id: "champ-select", name: "Champ Select", tier: "secondary", toolkit: true,
    lede: "The game starts before the game. Draft is where good and bad matchups are decided.",
  },
];

// Lookup + derived structures ------------------------------------------------
const FUND_BY_ID = Object.fromEntries(FUND_NODES.map((n) => [n.id, n]));

// Directed edges built from every primary's `connects`. If B also connects to
// A, the edge is flagged `bidir` so we can render a double arrowhead instead of
// two overlapping lines (resolves the Vision ⇄ Map Awareness crossing).
function buildFundEdges() {
  const seen = new Map();
  const has = (a, b) => {
    const na = FUND_BY_ID[a];
    return !!(na && na.connects && na.connects.includes(b));
  };
  for (const n of FUND_NODES) {
    if (!n.connects) continue;
    for (const t of n.connects) {
      if (!FUND_BY_ID[t]) continue;
      const key = [n.id, t].sort().join("::");
      const bidir = has(t, n.id);
      if (seen.has(key)) { seen.get(key).bidir = true; continue; }
      seen.set(key, { source: n.id, target: t, bidir });
    }
  }
  return [...seen.values()];
}

const FUND_EDGES = buildFundEdges();

// Neighbours of a node (undirected adjacency) for focus/highlight.
function fundNeighbors(id) {
  const out = new Set();
  for (const e of FUND_EDGES) {
    if (e.source === id) out.add(e.target);
    if (e.target === id) out.add(e.source);
  }
  return out;
}

Object.assign(window, {
  FUND_NODES, FUND_BY_ID, FUND_EDGES, fundNeighbors,
});
