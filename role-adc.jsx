// role-adc.jsx — content for the ADC role guide. window.ROLE_DATA.
// Content researched 2026-06-22 against current patch 26.12 + Riot patch notes.
// Builds and video picks are flagged for expert validation before merge.

const ROLE_DATA = {
  meta: {
    activeKey: "roles",
    breadcrumb: "ADC",
    eyebrow: <>ROLE <span className="dot"></span> ADC</>,
    title: "ADC",
    intro: "ADC is the team's primary ranged damage. You turn farm into items, then deal sustained damage from the backline. You win by staying alive and hitting the right target, not by chasing kills. Pick ADC if you like clean mechanics and scaling into a late-game threat.",
    meta: [
      <><strong>Difficulty</strong><span className="stars">★★</span><span style={{opacity:.3}}>★</span></>,
      <><strong>Read time</strong> ~15 min</>,
      <><strong>Patch</strong> {LL_PATCH}</>,
    ],
    sigilLabel: "SIGIL · ADC",
    sigil: (
      <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
        {/* outer hex */}
        <polygon points="100,10 180,55 180,145 100,190 20,145 20,55" strokeWidth="1" opacity="0.6" />
        {/* inner hex */}
        <polygon points="100,40 155,72 155,128 100,160 45,128 45,72" strokeWidth="0.8" opacity="0.4" />
        {/* radial spokes */}
        <line x1="100" y1="10" x2="100" y2="40" opacity=".5" />
        <line x1="180" y1="55" x2="155" y2="72" opacity=".5" />
        <line x1="180" y1="145" x2="155" y2="128" opacity=".5" />
        <line x1="100" y1="190" x2="100" y2="160" opacity=".5" />
        <line x1="20" y1="145" x2="45" y2="128" opacity=".5" />
        <line x1="20" y1="55" x2="45" y2="72" opacity=".5" />
        {/* marksman reticle — aim + range */}
        <circle cx="100" cy="102" r="30" strokeWidth="1.2" />
        <circle cx="100" cy="102" r="18" strokeWidth="0.8" opacity=".5" />
        <circle cx="100" cy="102" r="2.5" fill="currentColor" stroke="none" />
        <path d="M100 60 L100 78 M100 126 L100 144 M58 102 L76 102 M124 102 L142 102" strokeWidth="1.2" />
      </svg>
    ),
  },

  phases: {
    title: "What you do, phase by phase",
    lede: "An ADC's job shifts as the game scales. Here are the 3 things that matter in each phase.",
    list: [
      {
        title: "Early game",
        timer: "0 → 14 min",
        items: [
          <>Farming is the job. Aim for 80+ <Gloss term="CS">CS</Gloss> by 10 minutes. Learn turret last-hits: a melee minion takes two tower shots then your auto, a caster takes your auto then a tower shot.</>,
          "Level 2 is the first kill window. The first wave plus the melees of the second push you to level 2. Hit it before the enemy and trade with your support. If you can't, step back.",
          <>When your support roams, stop pushing. Let the wave drift toward your tower so you can't be caught out. Trade only when your support is in lane.</>,
        ],
      },
      {
        title: "Mid game",
        timer: "14 → 25 min",
        items: [
          <>Play around your two-item <Gloss term="power spike">power spike</Gloss> (roughly 18 to 22 minutes). That is your biggest jump. Once your first item is done, group for drakes and towers.</>,
          "Keep farming side waves between objectives. Standing in mid with nothing to fight for wastes gold.",
          "Only rotate if your arrival changes the fight. When you're unsure, clear a wave instead.",
        ],
      },
      {
        title: "Late game",
        timer: "25 min +",
        items: [
          <>One death can lose the game. <Gloss term="shutdown">Shutdown</Gloss> gold is high, so the fed ADC dying is the worst outcome on the map. Stay behind your frontline.</>,
          <>Hit the closest safe target, not the enemy carry through their team. <Gloss term="kiting">Kite</Gloss> between every auto: auto, step, auto, step.</>,
          "Never face-check a bush. Take the objective instead of chasing a low target into the fog.",
        ],
      },
    ],
  },

  map: {
    title: "The Rift from the backline",
    lede: "Where you stand, where danger comes from, and where to fight. A bot-lane read from the ADC's side.",
    mapSrc: "assets/sr-map-clean.png",
    mapAlt: "Summoner's Rift — official map",
    mapCredit: "RIOT GAMES — SUMMONER'S RIFT",
    legendTitle: "Legend — 6 key points",
    pins: [
      { n: 1, x: 70.3, y: 57.9, short: "Tri-brush",        long: "Gank entry. The jungler arrives here for dives. When it's unwarded, hug the far side of your minions." },
      { n: 1, x: 64.3, y: 67.5, short: "Tri-brush",        long: "Gank entry. The jungler arrives here for dives. When it's unwarded, hug the far side of your minions." },
      { n: 2, x: 78.2, y: 75.1, short: "Lane brush",       long: "Don't sit in it unwarded. Hooks and engages start here. Trade from the open side, in line with your support." },
      { n: 3, x: 68.3, y: 62.9, short: "Pixel brush",      long: "Drake-setup control point. Hold it with a control ward before the objective so you can siege safely." },
      { n: 4, x: 67.1, y: 43.2, short: "Deep jungle brush", long: "Only when ahead and with your team. Gives you the angle on the enemy jungler before a fight. Never alone." },
      { n: 4, x: 52.7, y: 64.4, short: "Deep jungle brush", long: "Only when ahead and with your team. Gives you the angle on the enemy jungler before a fight. Never alone." },
      { n: 5, x: 60.9, y: 59.5, short: "Dragon pit",       long: "Your mid-game home after the first item. Group here, hit the drake from max range, stay behind your frontline." },
      { n: 6, x: 38.7, y: 27.5, short: "Baron pit",        long: "Late-game. Deal damage from the entrance with a wall behind you. Never walk in to face-check." },
    ],
  },

  skills: {
    title: "The skills that make the difference",
    lede: "Four skills to prioritize to become a reliable ADC starting in low Elo.",
    list: [
      {
        title: "Kiting",
        desc: <>Cancel the auto-attack backswing: auto, then move, then auto. Use <Gloss term="attack-move">attack-move</Gloss> (A + click) so you never stand still and never mis-click the ground in a fight.</>,
        link: "/macro/kiting",
      },
      {
        title: "CS under pressure",
        desc: <>Last-hit while a trade is happening, not just in an empty lane. Target 80+ <Gloss term="CS">CS</Gloss> at 10 minutes. Learn the turret last-hit rhythm so you don't bleed farm when you're shoved in.</>,
        link: "/macro/farming",
      },
      {
        title: "Wave management",
        desc: <>Decide the wave state before you touch a minion: crash before you back, <Gloss term="freeze">freeze</Gloss> when behind, slow-push to set up a drake or a roam.</>,
        link: "/macro/wave-management",
      },
      {
        title: "Positioning",
        desc: "Know the range of every dash, CC and burst on the enemy team. Stand where you can deal damage with a retreat path always open.",
        link: "/macro/teamfight",
      },
    ],
  },

  triangle: {
    title: "The three ADC archetypes",
    tocLabel: "Archetypes",
    lede: "ADCs aren't a rock-paper-scissors like supports. They sit on a power curve. Know which one you're playing and when you're strongest.",
    nodes: {
      bully:   { corner: "top", label: "Lane bully",     champs: "Draven · Lucian · Miss Fortune", x: 50,  y: 8  },
      scaling: { corner: "br",  label: "Hypercarry",      champs: "Jinx · Kog'Maw · Vayne",         x: 100, y: 80 },
      utility: { corner: "bl",  label: "Utility / poke",  champs: "Ashe · Jhin · Varus",            x: 0,   y: 80 },
    },
    legend: [
      { strong: "Lane bully", rest: <>peaks early. Convert your lane lead into towers and drakes before the scaling carries come online.</> },
      { strong: "Hypercarry", rest: <>is weak early and explosive after two items. Survive the laning phase, then take over the late game.</> },
      { strong: "Utility / poke", rest: <>trades raw damage for range, CC or global pressure. Safer to pilot and useful at every stage.</> },
    ],
  },

  callouts: {
    title: "Key concept: farm and power spikes",
    tocLabel: "Key concept",
    lede: "Gold buys items, items are your damage. Last-hitting is not downtime, it's the job.",
    list: [
      { type: "key", title: "What CS is worth", body: <>Each wave is roughly 110 to 130 gold. Missing 10 <Gloss term="CS">CS</Gloss> over ten minutes is about an item component. Treat last-hitting as your main task in lane: aim for 80+ by 10 minutes.</> },
      { type: "pro", title: "Turret last-hitting", body: <>Shoved under tower, let it hit a melee minion once then you auto for the kill. For a caster, you auto first then the tower finishes. Learn this rhythm or you bleed <Gloss term="CS">CS</Gloss> every time you're pushed in.</> },
      { type: "pro", title: "Trade around cooldowns", body: <>Step up when the enemy ADC's key spell (<Gloss term="Ezreal E">Ezreal E</Gloss> / <Gloss term="Lucian E">Lucian E</Gloss>) or the enemy support's engage is down. No Flash on the enemy ADC? You can push your advantage harder.</> },
      { type: "pro", title: "Know your two-item spike", body: <>Your biggest jump is your first two completed items. Play safe before it, look for fights right after. As a <Gloss term="hypercarry">hypercarry</Gloss>, don't force 2v2s until you're online.</> },
    ],
  },

  errors: {
    title: "The 6 mistakes that cost you games",
    lede: "Symptom, cause, fix.",
    list: [
      {
        title: "You stand still in fights",
        s: "You take three abilities to the face while auto-attacking and die mid-combo.",
        c: "You value damage uptime over staying alive, and you right-click the target so you're rooted in place.",
        f: <>Use <Gloss term="attack-move">attack-move</Gloss> (A + click), never right-click, during a fight. Auto, step, auto, step. Only full-retreat when a threat actually reaches you.</>,
      },
      {
        title: "You fight without your support",
        s: "You take 2v2s when your support has roamed or already died.",
        c: "You don't check the minimap before you commit.",
        f: "Before every trade, find your support. No support in lane means no fight. Farm safely until they're back.",
      },
      {
        title: "You autopush every wave",
        s: "Your wave is always shoved under the enemy tower, so you get ganked and you can't punish their mistakes.",
        c: "You clear as fast as possible with no plan for the wave.",
        f: <>Decide the wave state before you touch minions. Crash when you want to recall, <Gloss term="freeze">freeze</Gloss> when you're behind, slow-push to set up a drake or a roam.</>,
      },
      {
        title: "You frontline when you're fed",
        s: "The fed ADC walks ahead of the team and gets bursted by a dive or a CC chain.",
        c: "A gold lead makes you feel safe, so you push your luck.",
        f: <>Your life is the objective. More gold on you means more <Gloss term="shutdown">shutdown</Gloss> for them. Stay behind your <Gloss term="peel">peel</Gloss> no matter the lead.</>,
      },
      {
        title: "You chase kills into the fog",
        s: "You follow a low-HP target into a bush and die to someone you never saw.",
        c: "Kill-focus, with no thought for what's hidden in the fog of war.",
        f: "When they run into fog, reset and take the tower or the drake instead. A kill plus an objective beats a kill alone.",
      },
      {
        title: "You stop farming after a kill",
        s: "You get a kill, then roam or sit in lane, and reach your first item minutes later than you should.",
        c: "You chase momentum instead of gold.",
        f: <>After a kill, farm to your <Gloss term="power spike">power spike</Gloss> before you rotate. One more minute of CS can pull your two-item spike forward by several.</>,
      },
    ],
  },

  champions: {
    title: "Your 3 champions to start",
    lede: "Three forgiving marksmen, picked for the difficulty curve. Miss Fortune teaches converting a lead. Caitlyn teaches range control and safe farming. Ashe teaches kiting and teamfight discipline. Learn one fully before adding a second.",
    list: [
      {
        name: "MissFortune", display: "Miss Fortune", tag: "Lane bully", diff: "Easy",
        desc: "Strong early burst with no dashes or hard combos. Her Q and her ult are point-and-click pressure. Punishes the bot lane early and teaches you to convert a lead.",
      },
      {
        name: "Caitlyn", tag: "Poke / range", diff: "Balanced",
        desc: "The longest auto range of any ADC. You farm and poke from safety, and her traps punish all-ins. Teaches range control and patient laning.",
      },
      {
        name: "Ashe", tag: "Utility / kite", diff: "Easy",
        desc: "Every auto slows, so kiting is built into the kit, and her global ult teaches map impact. Forgiving and useful at every stage of the game.",
      },
    ],
  },

  build: {
    title: "Runes & build path by champion",
    lede: "A current high-Elo default for each starter, from Lolalytics (master, patch " + LL_PATCH + "). Solid to copy, then refine as you learn the champion.",
    modes: {
      missfortune: {
        label: "Miss Fortune",
        runes: [
          ["Keystone",  "First Strike"],
          ["Minor 1",   "Biscuit Delivery"],
          ["Minor 2",   "Manaflow Band"],
          ["Minor 3",   "Gathering Storm"],
          ["Summoners", "Flash · Heal"],
        ],
        build: [
          ["Start",     "Doran's Blade + 1 potion"],
          ["1st item",  "Hubris"],
          ["Boots",     "Boots of Swiftness"],
          ["Follow-up", "The Collector, Infinity Edge, Lord Dominik's Regards"],
        ],
      },
      caitlyn: {
        label: "Caitlyn",
        runes: [
          ["Keystone",  "Lethal Tempo"],
          ["Minor 1",   "Presence of Mind"],
          ["Minor 2",   "Legend: Alacrity"],
          ["Minor 3",   "Coup de Grace"],
          ["Summoners", "Flash · Heal"],
        ],
        build: [
          ["Start",     "Doran's Bow + 1 potion"],
          ["1st item",  "Hexoptics C44"],
          ["Boots",     "Berserker's Greaves"],
          ["Follow-up", "Infinity Edge, Rapid Firecannon, Lord Dominik's Regards"],
        ],
      },
      ashe: {
        label: "Ashe",
        runes: [
          ["Keystone",  "Lethal Tempo"],
          ["Minor 1",   "Triumph"],
          ["Minor 2",   "Legend: Alacrity"],
          ["Minor 3",   "Coup de Grace"],
          ["Summoners", "Flash · Heal"],
        ],
        build: [
          ["Start",     "Doran's Bow + 1 potion"],
          ["1st item",  "Hexoptics C44"],
          ["Boots",     "Berserker's Greaves"],
          ["Follow-up", "Phantom Dancer, Infinity Edge, Lord Dominik's Regards"],
        ],
      },
    },
  },

  checklist: {
    title: "Am I ready to play ranked?",
    lede: "Check the points you validate over 3 games in a row. If you hit 8+, you're ready to queue ranked.",
    storageKey: "ll_adc_checklist_v1",
    threshold: 8,
    items: [
      "I hit 80+ CS at 10 minutes on my main champion in a normal game",
      "I know my champion's first power spike and I play safe until I reach it",
      "I know the turret last-hit timing for melee and caster minions",
      "I decide the wave state (crash / freeze / slow-push) before I touch a wave",
      "I use attack-move (A + click), never right-click, to auto in fights",
      "I know my auto-attack range and I've tested it in the practice tool",
      "I check my support's position before every trade",
      "When my support roams, I let the wave push to my tower instead of shoving",
      "In a teamfight I hit the closest safe target, not the enemy carry through their team",
      "Most of my recent deaths have a cause I can name, not just 'I died'",
    ],
  },

  practice: {
    title: "To practice",
    lede: "Two short videos to watch and two drills to run in the practice tool.",
    videos: [
      { creator: "Skill Capped", url: "https://www.youtube.com/watch?v=LrOqispLPLg", title: "Why You SUCK at ADC (and how to fix it)", desc: "The habits that keep ADC players stuck, and the fixes. A clean fundamentals reset." },
      { creator: "Neon", url: "https://www.youtube.com/watch?v=5dc9EzeCnes", title: "The Ultimate ADC Guide for 2026", desc: "A full walkthrough of ADC fundamentals from a pro player's point of view." },
    ],
    drills: [
      { tag: "Drill 01 · Practice tool", title: "Clean CS, no abilities", body: <>Solo bot lane, no items, no abilities on minions. Hit <b>80 CS by 10:00</b>, then 100 by 13:00. Step away from the wave every 15 to 20s to mimic a trade.</> },
      { tag: "Drill 02 · Practice tool", title: "Kite a dummy", body: <>Attack-move a target dummy across the lane: auto, step, auto. Never stop moving, never stop attacking. <b>Two minutes</b> without standing still.</> },
    ],
  },
};

window.ROLE_DATA = ROLE_DATA;
