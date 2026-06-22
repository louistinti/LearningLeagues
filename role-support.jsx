// role-support.jsx — content for the Support role guide. window.ROLE_DATA.

const ROLE_DATA = {
  meta: {
    key: "support",
    activeKey: "roles",
    breadcrumb: "Support",
    eyebrow: <>ROLE <span className="dot"></span> SUPPORT</>,
    title: "Support",
    intro: "Support is the team's connective role. You don't farm and you don't hunt kills for yourself. You provide vision, you start or cancel engages, and you keep your ADC alive. Pick Support if reading the map beats executing combos for you.",
    meta: [
      <><strong>Difficulty</strong><span className="stars">★</span><span style={{opacity:.3}}>★★</span></>,
      <><strong>Read time</strong> ~15 min</>,
      <><strong>Patch</strong> 26.X</>,
    ],
    sigilLabel: "SIGIL · SUPPORT",
    sigil: (
      <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
        <polygon points="100,10 180,55 180,145 100,190 20,145 20,55" strokeWidth="1" opacity="0.6" />
        <polygon points="100,40 155,72 155,128 100,160 45,128 45,72" strokeWidth="0.8" opacity="0.4" />
        <line x1="100" y1="10" x2="100" y2="40" opacity=".5" />
        <line x1="180" y1="55" x2="155" y2="72" opacity=".5" />
        <line x1="180" y1="145" x2="155" y2="128" opacity=".5" />
        <line x1="100" y1="190" x2="100" y2="160" opacity=".5" />
        <line x1="20" y1="145" x2="45" y2="128" opacity=".5" />
        <line x1="20" y1="55" x2="45" y2="72" opacity=".5" />
        <path d="M100 70 L130 82 L130 108 C130 120 116 128 100 134 C84 128 70 120 70 108 L70 82 Z" strokeWidth="1.2" />
        <circle cx="100" cy="102" r="8" strokeWidth="1" />
        <circle cx="100" cy="102" r="2.5" fill="currentColor" stroke="none" />
        <path d="M100 88 L100 70 M100 116 L100 134 M80 102 L70 96 M120 102 L130 96" opacity=".5" />
      </svg>
    ),
  },

  phases: {
    title: "What you do, phase by phase",
    lede: "An effective Support shifts priorities over time. Here are the 3 things that matter in each phase.",
    list: [
    {
      title: "Early game",
      timer: "0 → 14 min",
      items: [
        "Level 2 prio: you hit level 2 with the first 6 minions + the 3 melees from the 2nd wave. Hit each minion in the first two waves without last-hitting. Your ADC takes the gold, you both rush level 2.",
        <>First ward at 1:25 (not before): river bush opposite the jungler's starting side, to spot the first <Gloss term="scuttle">scuttle</Gloss>. Pre-1:25 you bush-camp to scout <Gloss term="invade">invades</Gloss>, saving your <Gloss term="trinket">trinket</Gloss> charge for an impactful spot. Save the <Gloss term="control ward">control ward</Gloss> (pink) to defend a zone against a gank or to set up an objective.</>,
        <>Leave <Gloss term="CS">CS</Gloss> to the ADC (damage without killing). Protect them in trades.</>,
      ],
    },
    {
      title: "Mid game",
      timer: "14 → 25 min",
      items: [
        "Roam when your lane is ahead or even. Behind, look for tempo on a stronger lane instead of dying in bot.",
        <>Set up vision before the objective spawns. Reaction time = distance from the <Gloss term="pit">pit</Gloss> to your deepest ward (the further out you ward, the more seconds you have to react). Pair pit wards with control wards in high-traffic bushes.</>,
        "Start or shut down teamfights based on your archetype (engage / enchanter / poke).",
      ],
    },
    {
      title: "Late game",
      timer: "25 min +",
      items: [
        "Deep vision around Baron pit; pink wards on choke points (entrances, jungle routes near objectives) to catch rotations.",
        <><Gloss term="peel">Peel</Gloss> your carry: your CC, shields, or heals keep them alive.</>,
        "Engage or peel with the team, never isolated.",
      ],
    },
  ],
  },

  map: {
    title: "The Rift from your point of view",
    lede: "Your zones, vision angles and typical threats. A Support-specific map read.",
    mapSrc: "assets/sr-map-clean.png",
    mapAlt: "Summoner's Rift — official map",
    mapCredit: "RIOT GAMES — SUMMONER'S RIFT",
    legendTitle: "Legend — 6 key points",
    pins: [
    { n: 1, x: 70.3, y: 57.9, short: "Tri-brush",         long: "Sees the jungler arrive at tower fights. Defensive when you're stuck under yours (dive risk), offensive when you're pushed under theirs (counter-gank risk)." },
    { n: 1, x: 64.3, y: 67.5, short: "Tri-brush",         long: "Sees the jungler arrive at tower fights. Defensive when you're stuck under yours (dive risk), offensive when you're pushed under theirs (counter-gank risk)." },
    { n: 2, x: 78.2, y: 75.1, short: "Lane brush",        long: "Central early-game control bush. Decisive when you're the hooker, risky against enemy hooks (Blitz/Thresh/Pyke). Ward it when the matchup allows." },
    { n: 3, x: 68.3, y: 62.9, short: "Pixel brush",       long: "High-traffic spot near Drake setup. A control ward here holds the area." },
    { n: 4, x: 67.1, y: 43.2, short: "Deep jungle brush", long: "Deep vision when you're ahead. Never solo. Spots the enemy jungler before objectives." },
    { n: 4, x: 52.7, y: 64.4, short: "Deep jungle brush", long: "Deep vision when you're ahead. Never solo. Spots the enemy jungler before objectives." },
    { n: 5, x: 60.9, y: 59.5, short: "Dragon pit",        long: "Ward before every spawn; pair with a deep ward upstream so you see jungler rotations earlier." },
    { n: 6, x: 38.7, y: 27.5, short: "Nashor's pit",      long: "Late-game key. Pink the pit, deep-ward the entrances. Reaction time = distance to your deepest ward." },
  ],
  },

  skills: {
    title: "The skills that make the difference",
    lede: "Four skills to prioritize to become a reliable Support starting in low Elo.",
    list: [
    {
      title: "Vision placement",
      desc: "Learn the 8 key ward placements. Faelight bonus: a ward placed on a ring of glowing mushrooms becomes a super-ward (+25% range, 45s bonus vision zone). Swap your trinket to Oracle Lens the moment your support quest completes. That's when real vision denial starts.",
      link: "/macro/vision",
    },
    {
      title: "Lane reading",
      desc: <>Know when to push for level-2 prio, when to <Gloss term="freeze">freeze</Gloss> to starve the enemy ADC, when to trade based on cooldowns.</>,
      link: "/macro/wave-management",
    },
    {
      title: "Roam timing",
      desc: "Only roam if you'll get a reward (kill, plate, vision setup). Trigger conditions: wave pushing under tower + ADC safe + a target downstream (mid weak, jungler bot side, drake spawning). With CC-heavy champs (Leona, Blitz), roams convert more reliably than with enchanters.",
      link: "/macro/rotations-and-tempo",
    },
    {
      title: "Teamfight positioning",
      desc: "Engage = go in first, enchanter = stay behind the ADC, peel = place yourself between your carry and the threat.",
      link: "/macro/teamfight",
    },
  ],
  },

  triangle: {
    title: "The archetype triangle",
    lede: "Your archetype beats one type and loses to another. Memorize which.",
    nodes: {
      poke:      { corner: "top", label: "Poke",      champs: "Karma · Lux · Senna · Xerath", x: 50,  y: 8  },
      engage:    { corner: "br",  label: "Engage",    champs: "Leona · Nautilus · Rell · Pyke", x: 100, y: 80 },
      enchanter: { corner: "bl",  label: "Enchanter", champs: "Soraka · Janna · Nami · Yuumi",  x: 0,   y: 80 },
    },
    legend: [
      { strong: "Poke", rest: <>wears down the engage champion before they can ever reach you.<br /><strong>Poke &gt; Engage</strong>.</> },
      { strong: "Engage", rest: <>locks the ADC before the enchanter has time to react.<br /><strong>Engage &gt; Enchanter</strong>.</> },
      { strong: "Enchanter", rest: <>heals and shields enough to nullify poke pressure.<br /><strong>Enchanter &gt; Poke</strong>.</> },
    ],
  },

  callouts: {
    title: "Key concept: level 2 prio",
    lede: "Whoever hits level 2 first takes the engage. The highest-stakes window in botlane.",
    list: [
      { type: "key", title: "How do you hit level 2 first?", body: <><b>Level 2</b> is decided on the 1st wave (6 minions) + the 3 melee minions of the 2nd wave. Damage all those minions <b>without killing them</b>. Your ADC last-hits while you stack XP. You both hit level 2 before the enemy ADC. Engage window open.</> },
      { type: "pro", title: "Judge the force-2 on damage, not fear", body: <>Forcing level 2 works if <b>your two champions deal more level-2 damage</b> than the enemy duo. Braum is stronger at level 2 than most supports, even into Blitz. Compare the kits before reflexively backing off.</> },
      { type: "pro", title: "Engage windows = enemy cooldowns", body: <>Aggression isn't random. It opens when the enemy spends a key cooldown. Enemy ADC just used <b><Gloss term="Ezreal E">Ezreal E</Gloss> / <Gloss term="Lucian E">Lucian E</Gloss></b>? You have a 5–10s window of weak retaliation. Trade now. Hook champions (<b>Blitz, Thresh</b>) land hooks much more reliably once the enemy ADC's dash is on cooldown. No Flash up on the enemy ADC? Repeat-engage to zone them off CS.</> },
      { type: "pro", title: "Position alone is a threat", body: <>Where you stand at level 1 already sets the lane tone. Tank/engage (<b>Leona, Naut</b>) = in front of your ADC. You telegraph the threat and force the enemy to respect a 2v2 before level 2 even hits. Damage/poke (<b>Lux, Senna</b>) = in line with ADC, in trading range. Enchanter (<b>Soraka, Janna</b>) = slightly behind, where you can heal/shield without eating poke. Wrong stance = your archetype plays against itself.</> },
    ],
  },

  errors: {
    title: "The 6 mistakes that cost you games",
    lede: "Symptom, cause, fix.",
    list: [
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
  ],
  },

  champions: {
    title: "Your 3 champions to start",
    lede: "One champion per archetype, picked for the difficulty curve. Soraka teaches map-reading without combos. Leona teaches level-2 engages and CC chains. Janna teaches peel and cautious positioning. Cover the triangle, swap as you learn the role.",
    list: [
    {
      name: "Soraka", tag: "Enchanter", diff: "Easy",
      desc: "Heal + silence + global ult. Simple kit, forces you to read the map to ult at the right moment. Beats poke.",
    },
    {
      name: "Leona", tag: "Engage", diff: "Balanced",
      desc: "Tank with chained CC (E → Q → AA → R). You hunt the level-2 kill. Beats enchanters.",
    },
    {
      name: "Janna", tag: "Enchanter / Peel", diff: "Teaches the role",
      desc: "Shield + knockup + ult heal. Perfect to learn peel and cautious positioning. Beats poke.",
    },
  ],
  },

  build: {
    title: "Runes & build path by archetype",
    lede: "A default setup for each archetype. Refine afterwards via Lolalytics.",
    modes: {
    enchanter: {
      label: "Enchanter",
      runes: [
        ["Keystone",   "Aery · Guardian · Glacial Augment"],
        ["Minor 1",    "Manaflow Band"],
        ["Minor 2",    "Transcendence"],
        ["Minor 3",    "Scorch · Gathering Storm"],
        ["Summoners",  "Flash · Ignite or Exhaust"],
      ],
      build: [
        ["Start",      "World Atlas + 2 potions"],
        ["1st item",   "Moonstone or Shurelya's Lich"],
        ["Boots",      "Ionian by default, Mercurys vs heavy CC"],
        ["Defense",    "Ardent (on-hit team), Redemption (teamfight), Mikael (vs heavy stun)"],
      ],
    },
    engage: {
      label: "Engage",
      runes: [
        ["Keystone",   "Aftershock · Grasp of the Undying"],
        ["Minor 1",    "Font of Life"],
        ["Minor 2",    "Conditioning · Bone Plating"],
        ["Minor 3",    "Revitalize · Overgrowth"],
        ["Summoners",  "Flash · Ignite or Exhaust"],
      ],
      build: [
        ["Start",      "World Atlas + 2 potions"],
        ["1st item",   "Bulwark of the Mountain (quest) then Locket or Knight's Vow"],
        ["Boots",      "Plated Steelcaps vs AD, Mercurys vs CC/AP"],
        ["Tank",       "Locket, Knight's Vow, Zeke's Convergence, Thornmail depending on matchup"],
      ],
    },
    poke: {
      label: "Poke",
      runes: [
        ["Keystone",   "Arcane Comet · Summon Aery (champion-dependent)"],
        ["Minor 1",    "Manaflow Band"],
        ["Minor 2",    "Transcendence · Absolute Focus"],
        ["Minor 3",    "Scorch · Gathering Storm"],
        ["Summoners",  "Flash · Ignite"],
      ],
      build: [
        ["Start",      "Spellthief's Edge + 2 potions"],
        ["1st item",   "Luden's Companion or Malignance"],
        ["Boots",      "Sorcerer's Shoes by default, Ionian if CDR is priority"],
        ["Followup",   "Horizon Focus, Shadowflame, Rabadon depending on target"],
      ],
    },
  },
  },

  matchups: {
    title: "5 matchups to know",
    lede: "The matchups you'll see most often in low Elo, with the playbook to use.",
    rows: [
    // ordered: Easy → Playable → Hard
    ["Soraka vs Xerath", "Easy",     "You heal the Qs that land, call the reset at 50%.", "You stay in E range with no potion."],
    ["Janna vs Leona",   "Playable", "You shield your ADC the instant Leona starts her E + Q chain.", "Your ADC overextends with no tribush vision."],
    ["Janna vs Lulu",    "Playable", "You zone with W, you outscale on shields.", "Lulu solo-locks your ADC in an engage."],
    ["Leona vs Blitz",   "Hard",     "You zone the bushes and stay above the ADC.", "You walk through a bush without warding."],
    ["Soraka vs Leona",  "Hard",     "You keep distance, control ward tribush, help mid.", "Leona reaches Q range with ult ready."],
  ],
  },

  checklist: {
    title: "Am I ready to play ranked?",
    lede: "Check the points you validate over 3 games in a row. If you hit 8+, you're ready to queue ranked.",
    storageKey: "ll_support_checklist_v1",
    threshold: 8,
    items: [
    "I place ≥ 1 ward on every trinket CD",
    "I place a control ward for every objective (drake, grubs, Herald, Baron) and pace my buys around the support quest",
    "I know which archetype I play and which archetype I'm strong against",
    "I check the minimap every 5-10 seconds",
    "I don't take CS unless my ADC is absent and I'm not breaking a freeze for us",
    "I roam at least 2 times in early game when the lane is pushing on its own",
    "I know objective timings (Scuttle 2:55, Drake 5:00, Grubs 6:00, Herald 15:00, Baron 20:00)",
    "I protect my ADC in teamfights before hunting the kill",
    "I have a vision score equal to 3× the minutes played (e.g. 23 min = 69 vision score)",
    "I fully master 1 champion before trying a 2nd",
  ],
  },

  practice: {
    title: "To practice",
    lede: "Two short videos to watch and two drills to run in the practice tool.",
    videos: [
      { duration: "3:12", creator: "Coach Curtis", title: "Understanding bot lane vision", desc: "Ward timings, control ward priority, tribush vs river choice." },
      { duration: "4:48", creator: "Hi Im Gosu", title: "Engage vs peel: how to choose", desc: "Per-archetype demonstration with teamfight examples." },
    ],
    drills: [
      { tag: "Drill 01 · Practice tool", title: "Blind ward placement", body: <>Enter the practice tool, place 10 wards on the 10 map spots without checking their names. Time yourself: <b>&lt; 3 min</b> = you know the map.</> },
      { tag: "Drill 02 · Practice tool", title: "Leona engage combo", body: <>With Leona, chain <b>E → Q → AA → R</b> on a dummy <b>20 times</b>. Goal: smooth, without missing the Q after the E.</> },
    ],
  },
};

window.ROLE_DATA = ROLE_DATA;
