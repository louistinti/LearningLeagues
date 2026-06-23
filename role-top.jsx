// role-top.jsx — content for the Top role guide. window.ROLE_DATA.
// Content researched 2026-06-23 against current patch 26.12 + Riot patch notes.
// Builds transcribed from u.gg (Emerald+) text; videos picked by the user.

const ROLE_DATA = {
  meta: {
    activeKey: "roles",
    breadcrumb: "Top",
    eyebrow: <>ROLE <span className="dot"></span> Top</>,
    title: "Top",
    intro: "Top is the team's island. You play a long 1v1 lane far from the rest of the map, where controlling the wave and trading well decide the lane more than kills do. You win by managing the wave, spending your Teleport on the right play, and turning a side-lane lead into pressure on the whole map. Pick Top if you like self-reliant, duel-focused play.",
    meta: [
      <><strong>Difficulty</strong><span className="stars">★★</span><span style={{opacity:.3}}>★</span></>,
      <><strong>Read time</strong> ~15 min</>,
      <><strong>Patch</strong> {LL_PATCH}</>,
    ],
    sigilLabel: "SIGIL · TOP",
    sigil: (
      <span className="hero-sigil-icon" style={{ WebkitMaskImage: "url(https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-top.png)", maskImage: "url(https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-top.png)" }} />
    ),
  },

  phases: {
    title: "What you do, phase by phase",
    lede: "Your job in the top lane shifts as the map opens up. Here are the 3 things that matter in each phase.",
    list: [
      {
        title: "Early game",
        timer: "0 → 14 min",
        items: [
          <>Win the wave, not the kill. Set the wave state before you commit: <Gloss term="freeze">freeze</Gloss> when you're behind, <Gloss term="slow push">slow-push</Gloss> when you want to crash and recall. A healthy wave beats a risky all-in.</>,
          <><Gloss term="trade">Trade</Gloss> around cooldowns. Step up when the enemy's main damage or escape is down, then back off before it comes back. One clean swing can zone them off CS for the whole lane.</>,
          "Track the enemy jungler. Top is the easiest lane to gank because it's far from help. When you can't see the jungler, hug your minions and keep a ward in the river.",
        ],
      },
      {
        title: "Mid game",
        timer: "14 → 25 min",
        items: [
          <><Gloss term="TP">Teleport</Gloss> is your macro lever. Hold it for a play that flips a fight or saves a tower, not to instantly refill a lost wave. A wasted TP loses the game slowly.</>,
          <>Set up the top objective. <Gloss term="Voidgrubs">Voidgrubs</Gloss> first, then <Gloss term="Rift Herald">Rift Herald</Gloss>. <Gloss term="crash">Crash</Gloss> your wave just before it so you arrive free, not down two waves of farm.</>,
          "Choose between grouping and side-laning each time a wave is up. If your team can't fight without you, group. Otherwise pressure a side lane and pull a body or two.",
        ],
      },
      {
        title: "Late game",
        timer: "25 min +",
        items: [
          <><Gloss term="split push">Split push</Gloss> with intent. A duelist pressures a side lane to draw enemies away. A tank or juggernaut groups and frontlines for the carries.</>,
          "Don't get caught alone. Keep a ward on both sides of your side lane and walk away the moment two enemies go missing. A 5v4 from one bad death usually loses the game.",
          "In a teamfight, know your job: tanks engage and soak, juggernauts dive the backline, duelists wait for the enemy to commit before they jump in.",
        ],
      },
    ],
  },

  map: {
    title: "The Rift from the top island",
    lede: "Where you stand, where ganks come from, and where the early objective lives. A top-lane read of the upper half of the map.",
    mapSrc: "assets/sr-map-clean.png",
    mapAlt: "Summoner's Rift — official map",
    mapCredit: "RIOT GAMES — SUMMONER'S RIFT",
    legendTitle: "Legend — 6 key points",
    pins: [
      { n: 1, x: 24.0, y: 27.0, short: "Lane brush",      long: "The bush in the lane. Don't sit in it unwarded. Trades and gank setups start here. Control it when you're pushing." },
      { n: 2, x: 44.0, y: 13.0, short: "Enemy tri-brush", long: "Where you dive from when you're ahead, and where the enemy jungler hides for a counter-gank. Ward it before you commit." },
      { n: 3, x: 33.0, y: 35.0, short: "River brush",     long: "The gank path. Almost every gank top comes through here. A ward here at level 1 to 6 is the cheapest life insurance you can buy." },
      { n: 4, x: 38.7, y: 27.5, short: "Objective pit",   long: "Voidgrubs and Rift Herald spawn here early, Baron later. Your lane decides who gets it. Crash your wave so you're free to help." },
      { n: 5, x: 22.0, y: 44.0, short: "Your jungle entrance", long: "When you're behind, ward here to spot the enemy jungler invading your side before a fight finds you." },
      { n: 6, x: 52.0, y: 30.0, short: "Deep enemy ward", long: "Only when ahead and with your team near. Spots the enemy jungler's pathing so your side lane is safe to push." },
    ],
  },

  skills: {
    title: "The skills that make the difference",
    lede: "Four skills to prioritize to become a reliable top laner starting in low Elo.",
    list: [
      {
        title: "Wave management",
        desc: <>Decide the wave state before you touch a minion: <Gloss term="crash">crash</Gloss> before you recall, <Gloss term="freeze">freeze</Gloss> when you're behind, <Gloss term="slow push">slow-push</Gloss> to set up an objective or a dive.</>,
        link: "/macro/wave-management",
      },
      {
        title: "Trading",
        desc: <>Step up when the enemy's key spell is on cooldown, deal your damage, then disengage before they can answer. <Gloss term="trade">Trade</Gloss> swings, not coin-flips.</>,
        link: "/macro/trading",
      },
      {
        title: "Teleport usage",
        desc: <>Your one map-wide lever. <Gloss term="TP">TP</Gloss> to flip a fight, save a tower, or punish a play across the map. Don't burn it to refill a wave you lost.</>,
        link: "/macro/teleport",
      },
      {
        title: "Side-lane management",
        desc: <>Late game, push a side lane to threaten towers and pull enemies to you, then back off with vision before you get collapsed on. This is how Top carries from behind.</>,
        link: "/macro/split-push",
      },
    ],
  },

  triangle: {
    title: "The three top-lane archetypes",
    tocLabel: "Archetypes",
    lede: "Top laners don't fit a strict rock-paper-scissors. They split into three jobs. Know which one you're playing and what it owes the team.",
    nodes: {
      juggernaut: { corner: "top", label: "Juggernaut",        champs: "Darius · Garen · Mordekaiser", x: 50,  y: 8  },
      duelist:    { corner: "br",  label: "Duelist / split",   champs: "Fiora · Jax · Camille",        x: 100, y: 80 },
      tank:       { corner: "bl",  label: "Tank",              champs: "Malphite · Ornn · Sion",       x: 0,   y: 80 },
    },
    legend: [
      { strong: "Juggernaut", rest: <>deals heavy damage and is hard to kill, but has no escape. Win lane, then walk at the enemy backline in fights and force them to deal with you.</> },
      { strong: "Duelist / split", rest: <>wins 1v1s and pressures side lanes. Weaker in a grouped 5v5, so its job is to take towers elsewhere and pull bodies off the map.</> },
      { strong: "Tank", rest: <>trades damage for durability and crowd control. Survives bad matchups, starts fights with an engage, and protects the carries.</> },
    ],
  },

  callouts: {
    title: "Key concept: the wave wins the lane",
    tocLabel: "Key concept",
    lede: "In a 1v1 lane far from help, the player who controls the minion wave controls when to trade, when to recall, and when it's safe to be away.",
    list: [
      { type: "key", title: "The three wave states", body: <>You only ever do three things with a wave. <Gloss term="freeze">Freeze</Gloss> it near your tower to deny the enemy CS and bait ganks. <Gloss term="slow push">Slow-push</Gloss> it to build a big wave for an objective. <Gloss term="crash">Crash</Gloss> it into their tower so you're free to recall or roam.</> },
      { type: "pro", title: "Freeze when you're losing", body: <>Behind in a hard matchup? Hold the wave just outside your tower by last-hitting only. The enemy has to overextend to farm it, which makes them gank-bait and stops them from snowballing.</> },
      { type: "pro", title: "Crash before you recall", body: <>Never recall on a wave that's sitting in the middle of the lane. <Gloss term="crash">Crash</Gloss> it into the enemy tower first, then back. You lose zero CS and reset the lane in your favour.</> },
      { type: "pro", title: "Every Teleport is a decision", body: <>Before you <Gloss term="TP">TP</Gloss>, ask if it flips the play. A TP that wins a 2v2 bot or saves a tower is worth a wave. A TP to refill a lane you shoved is usually a mistake you'll feel ten minutes later.</> },
    ],
  },

  errors: {
    title: "The 6 mistakes that cost you games",
    lede: "Symptom, cause, fix.",
    list: [
      {
        title: "You trade into their cooldowns",
        s: "You step up to trade and eat a full combo, losing the exchange every time.",
        c: "You trade on your own timer instead of theirs, so you walk into abilities that are up.",
        f: <>Watch the enemy's key spell. <Gloss term="trade">Trade</Gloss> only when it's down, then back off before it returns. The same trade is a win or a loss depending on one cooldown.</>,
      },
      {
        title: "You push every wave mindlessly",
        s: "Your wave is always shoved, you get ganked over and over, and you can't punish their recalls.",
        c: "You auto-clear with no plan, so you're permanently overextended in the most gankable lane.",
        f: <>Pick a wave state on purpose. <Gloss term="freeze">Freeze</Gloss> when behind, <Gloss term="slow push">slow-push</Gloss> to set up an objective, <Gloss term="crash">crash</Gloss> only when you want to recall or roam.</>,
      },
      {
        title: "You waste your Teleport",
        s: "You TP back to lane to grab a wave, then 90 seconds later there's a fight you can't reach.",
        c: "You treat TP as a farm tool instead of a map-wide play.",
        f: <>Hold <Gloss term="TP">Teleport</Gloss> for a play that changes the game: a bot 2v2, a saved tower, a flank. Eat the lost wave instead. A wave is cheaper than a TP.</>,
      },
      {
        title: "You feed the side lane",
        s: "You push a side lane late game, get collapsed on by three enemies, and hand them a free 5v4.",
        c: "You split with no vision and don't react when enemies go missing.",
        f: <>Ward both sides of your <Gloss term="split push">split</Gloss> and watch the minimap. The moment two enemies vanish, walk away. The pressure is the point, not the kill.</>,
      },
      {
        title: "You build the same items every game",
        s: "You copy one build no matter the enemy, then your damage or your tankiness does nothing.",
        c: "You ignore whether the enemy team is AD or AP, squishy or tanky.",
        f: "Adapt one or two items to the lobby. Armour into an AD team, magic resist into an AP one, armour penetration into stacked tanks. The core stays, the answers change.",
      },
      {
        title: "You group when you should split (or split when you should group)",
        s: "You're off in a side lane while your team gets aced 4v5, or you're grouped doing nothing as a duelist.",
        c: "You don't match your job to your archetype and the game state.",
        f: <>If you're a duelist, <Gloss term="split push">split</Gloss> and pull bodies. If you're a tank or <Gloss term="juggernaut">juggernaut</Gloss>, group and frontline. When your team can't fight without you, you group every time.</>,
      },
    ],
  },

  champions: {
    title: "Your 3 champions to start",
    lede: "Three forgiving top laners, one per archetype. Garen teaches trade windows and snowballing a lead. Malphite teaches surviving a bad matchup and frontlining. Jax teaches dueling and side-lane pressure. Learn one fully before adding a second.",
    list: [
      {
        name: "Garen", tag: "Juggernaut", diff: "Easy",
        desc: "No mana, passive healing, and a simple Q to E to R combo. He survives your early mistakes and punishes the enemy's, which makes him the cleanest champion to learn trading and snowballing on.",
      },
      {
        name: "Malphite", tag: "Tank", diff: "Easy",
        desc: "Stacks armour and becomes an unkillable rock. He survives lanes that would crush other picks, and his ultimate is a game-winning engage. Teaches you to hold a bad matchup and frontline a fight.",
      },
      {
        name: "Jax", tag: "Duelist / split", diff: "Balanced",
        desc: "A point-and-click stun and a counter to auto-attacks, so his combo is forgiving while his ceiling is high. Scales into a monster 1v1. Teaches dueling and side-lane pressure.",
      },
    ],
  },

  build: {
    title: "Runes & build path by champion",
    lede: "A current high-Elo default for each starter, from u.gg (Emerald+, patch " + LL_PATCH + "). Flash + Teleport on all three. Solid to copy, then refine as you learn the champion.",
    modes: {
      garen: {
        label: "Garen",
        runes: [
          ["Keystone",  "Conqueror"],
          ["Minor 1",   "Triumph"],
          ["Minor 2",   "Legend: Haste"],
          ["Minor 3",   "Last Stand"],
          ["Secondary", "Axiom Arcanist · Celerity"],
          ["Summoners", "Flash · Teleport"],
        ],
        build: [
          ["Start",     "Doran's Blade + 1 potion"],
          ["1st item",  "Stridebreaker"],
          ["Boots",     "Berserker's Greaves"],
          ["Follow-up", "Phantom Dancer, Mortal Reminder, Dead Man's Plate"],
        ],
      },
      malphite: {
        label: "Malphite",
        runes: [
          ["Keystone",  "Grasp of the Undying"],
          ["Minor 1",   "Shield Bash"],
          ["Minor 2",   "Conditioning"],
          ["Minor 3",   "Overgrowth"],
          ["Secondary", "Manaflow Band · Transcendence"],
          ["Summoners", "Flash · Teleport"],
        ],
        build: [
          ["Start",     "Doran's Shield + 1 potion"],
          ["1st item",  "Sunfire Aegis"],
          ["Boots",     "Plated Steelcaps"],
          ["Follow-up", "Thornmail, Frozen Heart, Jak'Sho"],
        ],
      },
      jax: {
        label: "Jax",
        runes: [
          ["Keystone",  "Lethal Tempo"],
          ["Minor 1",   "Triumph"],
          ["Minor 2",   "Legend: Alacrity"],
          ["Minor 3",   "Last Stand"],
          ["Secondary", "Bone Plating · Unflinching"],
          ["Summoners", "Flash · Teleport"],
        ],
        build: [
          ["Start",     "Doran's Blade + 1 potion"],
          ["1st item",  "Trinity Force"],
          ["Boots",     "Plated Steelcaps"],
          ["Follow-up", "Sundered Sky, Zhonya's Hourglass, Death's Dance"],
        ],
      },
    },
  },

  checklist: {
    title: "Am I ready to play ranked?",
    lede: "Check the points you validate over 3 games in a row. If you hit 8+, you're ready to queue ranked.",
    storageKey: "ll_top_checklist_v1",
    threshold: 8,
    items: [
      "I decide the wave state (freeze / slow-push / crash) before I touch a wave",
      "I crash the wave into the enemy tower before I recall",
      "I trade only when the enemy's key spell is on cooldown",
      "I keep a river ward up and I hug my minions when the jungler is missing",
      "I hold Teleport for a play, not to refill a lost wave",
      "I know the timing of the first Voidgrubs and Rift Herald",
      "I adapt one or two items to whether the enemy team is AD or AP",
      "Late game I match my job to my archetype (split as a duelist, group as a tank)",
      "When I split, I ward both sides and leave when two enemies go missing",
      "Most of my recent deaths have a cause I can name, not just 'I died'",
    ],
  },

  practice: {
    title: "To practice",
    lede: "Two short videos to watch and two drills to run in the practice tool.",
    videos: [
      { creator: "Skill Capped", url: "https://www.youtube.com/watch?v=nyq8F-ABQ4Y", title: "The COMPLETE Beginners Guide to TOP LANE for Season 16!", desc: "A full walkthrough of top-lane fundamentals from the ground up. Watch this first if the role is new to you." },
      { creator: "Skill Capped", url: "https://www.youtube.com/watch?v=gJ-_7_F9rAI", title: "Why YOU SUCK at TOP LANE (And How To Fix It)!", desc: "The habits that keep top laners stuck, and the fix for each. A clean fundamentals reset." },
    ],
    drills: [
      { tag: "Drill 01 · Practice tool", title: "Set up a freeze", body: <>Solo top lane. Let the enemy wave build slightly bigger than yours, then <Gloss term="freeze">freeze</Gloss> by last-hitting at the last moment. Hold the wave just outside your tower for <b>two minutes</b> without it pushing.</> },
      { tag: "Drill 02 · Practice tool", title: "Crash and reset", body: <>Build a <Gloss term="slow push">slow-push</Gloss>, then <Gloss term="crash">crash</Gloss> the full wave into the enemy tower. Note the timing: you want to recall as the wave hits the tower, losing zero CS. Repeat <b>five times</b>.</> },
    ],
  },
};

window.ROLE_DATA = ROLE_DATA;
