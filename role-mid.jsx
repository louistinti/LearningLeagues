// role-mid.jsx — content for the Mid role guide. window.ROLE_DATA.
// Content researched 2026-06-23 against current patch 26.12 + Riot patch notes.
// Builds transcribed from u.gg (pending user confirmation at master tier); videos picked by the user.

const ROLE_DATA = {
  meta: {
    activeKey: "roles",
    breadcrumb: "Mid",
    eyebrow: <>ROLE <span className="dot"></span> Mid</>,
    title: "Mid",
    intro: "Mid is the centre of the map. You play a short lane next to every objective, which puts you in the best spot to roam and swing fights all over the Rift. You win by managing the wave to create roam timers, keeping lane priority, and turning that map presence into kills and vision. Pick Mid if you like influencing the whole game, not just one lane.",
    meta: [
      <><strong>Difficulty</strong><span className="stars">★★</span><span style={{opacity:.3}}>★</span></>,
      <><strong>Read time</strong> ~15 min</>,
      <><strong>Patch</strong> {LL_PATCH}</>,
    ],
    sigilLabel: "SIGIL · MID",
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
        {/* arcane core — the crossroads of the map */}
        <polygon points="100,72 128,102 100,132 72,102" strokeWidth="1.2" />
        <line x1="100" y1="58" x2="100" y2="146" strokeWidth="0.8" opacity=".55" />
        <line x1="56" y1="102" x2="144" y2="102" strokeWidth="0.8" opacity=".55" />
        <circle cx="100" cy="102" r="6" strokeWidth="1" />
        <circle cx="100" cy="102" r="2.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },

  phases: {
    title: "What you do, phase by phase",
    lede: "Your influence on the map grows every minute. Here are the 3 things that matter in each phase.",
    list: [
      {
        title: "Early game",
        timer: "0 → 14 min",
        items: [
          <>Win <Gloss term="lane priority">lane priority</Gloss>. Use your abilities to reach level 2 and 3 first, then last-hit safely. Priority is what lets you contest <Gloss term="scuttle">scuttle</Gloss> and answer the enemy mid.</>,
          <>Don't die to ganks. Mid is flanked by both jungles, so you can be hit from two sides. Keep a ward in one river and track the enemy jungler before you step up.</>,
          <>Create your first <Gloss term="roam">roam</Gloss> timer. <Gloss term="shove">Shove</Gloss> the wave, then look to the river or bot. Only leave when the wave is gone and your arrival changes something.</>,
        ],
      },
      {
        title: "Mid game",
        timer: "14 → 25 min",
        items: [
          <>Trade lanes for objectives. When you've shoved mid, move to the next drake or a side lane. A wave of <Gloss term="CS">CS</Gloss> is worth less than a kill or a tower elsewhere.</>,
          "Control the river. The first mid to the river decides the next objective. A 10-second move to ward or deny is often worth more than two more CS.",
          "Group with intent. Once the mid towers start trading, play with your jungler and ADC around objectives instead of farming mid with nothing to fight for.",
        ],
      },
      {
        title: "Late game",
        timer: "25 min +",
        items: [
          <>Position for your archetype. A <Gloss term="control mage">control mage</Gloss> zones from behind the frontline, an <Gloss term="assassin">assassin</Gloss> waits for the flank, a <Gloss term="burst">burst</Gloss> mage holds the combo for the right target.</>,
          "One pick wins the game. A single kill on the enemy carry before an objective is usually the whole fight. Look for the catch, with vision, before you commit.",
          <>Don't get caught. Your damage is the team's. Walking up alone for a wave and dying hands them Baron or Elder. <Gloss term="recall">Recall</Gloss> and farm safe lanes with vision only.</>,
        ],
      },
    ],
  },

  map: {
    title: "The Rift from the centre",
    lede: "Where you stand, where ganks come from on both sides, and where your roams go. A mid-lane read of the map.",
    mapSrc: "assets/sr-map-clean.png",
    mapAlt: "Summoner's Rift — official map",
    mapCredit: "RIOT GAMES — SUMMONER'S RIFT",
    legendTitle: "Legend — 6 key points",
    pins: [
      { n: 1, x: 44.0, y: 45.0, short: "Mid brush",        long: "The lane bushes. You fight and dodge ganks around them. Both junglers flank mid through here, so don't sit in them blind." },
      { n: 1, x: 55.0, y: 54.0, short: "Mid brush",        long: "The lane bushes. You fight and dodge ganks around them. Both junglers flank mid through here, so don't sit in them blind." },
      { n: 2, x: 40.0, y: 37.0, short: "Top river mouth",  long: "Ganks from the top jungle and your roams to top come through here. A ward here shows the jungler before the gank lands." },
      { n: 3, x: 60.0, y: 63.0, short: "Bot river mouth",  long: "Your fastest path to gank or roam bot, and a common gank route into mid. Shove the wave, then move through here." },
      { n: 4, x: 60.9, y: 59.5, short: "Dragon pit",       long: "Drake. Your mid priority lets your team contest it. Get river vision before it spawns, not as it's dying." },
      { n: 5, x: 38.7, y: 27.5, short: "Objective pit",    long: "Voidgrubs and Rift Herald early, Baron late. Mid priority decides who gets to start them uncontested." },
      { n: 6, x: 33.0, y: 44.0, short: "Enemy jungle flank", long: "When you push, ward here. It spots the enemy jungler setting up a gank or an invade before it reaches you." },
    ],
  },

  skills: {
    title: "The skills that make the difference",
    lede: "Four skills to prioritize to become a reliable mid laner starting in low Elo.",
    list: [
      {
        title: "Wave management for roams",
        desc: <><Gloss term="shove">Shove</Gloss> the wave to create a roam timer, <Gloss term="freeze">freeze</Gloss> when you want to deny the enemy and stay safe. Every wave decision is about whether you can leave.</>,
        link: "/macro/wave-management",
      },
      {
        title: "Roaming",
        desc: <>Leave lane only with <Gloss term="lane priority">priority</Gloss> and a target in mind, and arrive when your presence changes the play. A <Gloss term="roam">roam</Gloss> with no reward is just lost CS.</>,
        link: "/macro/roaming",
      },
      {
        title: "Landing skillshots",
        desc: <>Your damage is your aim. Practise last-hitting and poking with abilities, not just autos, so your <Gloss term="skillshot">skillshots</Gloss> land when a fight breaks out.</>,
        link: "/macro/skillshots",
      },
      {
        title: "Map awareness",
        desc: "Track both junglers, keep a river ward up, and read the minimap before every step forward. Mid sees the most of the map, so it should die to the fewest surprises.",
        link: "/macro/vision",
      },
    ],
  },

  triangle: {
    title: "The three mid-lane archetypes",
    tocLabel: "Archetypes",
    lede: "Mid laners split into three jobs. Know which one you're playing and how it wants to win the game.",
    nodes: {
      burst:    { corner: "top", label: "Burst mage",        champs: "Annie · Syndra · Veigar", x: 50,  y: 8  },
      assassin: { corner: "br",  label: "Assassin / roamer", champs: "Ahri · Zed · Talon",      x: 100, y: 80 },
      control:  { corner: "bl",  label: "Control / poke",    champs: "Lux · Orianna · Viktor",  x: 0,   y: 80 },
    },
    legend: [
      { strong: "Burst mage", rest: <>combos a target from full to dead in one rotation. Big pick potential, but it has to land the setup and survive the cooldown after.</> },
      { strong: "Assassin / roamer", rest: <>snowballs by roaming and killing isolated targets. Explosive when ahead, and close to useless when behind, so it has to get going early.</> },
      { strong: "Control / poke", rest: <>chips HP and clears waves from range, then zones space in teamfights. Safer to pilot and scales hard into the late game.</> },
    ],
  },

  callouts: {
    title: "Key concept: the wave creates the roam",
    tocLabel: "Key concept",
    lede: "Mid is the shortest lane and it sits next to every objective. What you do with the wave decides whether you're free to leave and make a play.",
    list: [
      { type: "key", title: "Shove, then leave", body: <><Gloss term="shove">Fast-push</Gloss> the wave with your abilities, then <Gloss term="roam">roam</Gloss> while the enemy is stuck last-hitting under their tower. By the time they clear it, you're already back or you've made something happen.</> },
      { type: "pro", title: "Priority is permission", body: <>Only roam when the enemy must choose between following you and losing CS. With <Gloss term="lane priority">priority</Gloss> your move costs almost nothing. Without it, you're just giving up your own wave.</> },
      { type: "pro", title: "River first", body: <>The first mid to reach the river decides the next objective. A short move to place or deny a ward shapes the next minute far more than two extra <Gloss term="CS">CS</Gloss> do.</> },
      { type: "trap", title: "Don't roam into nothing", body: <>A roam that gets no kill, no tower and no vision is just lost farm and a missed wave. Only leave for a reward you can actually see, not a hope.</> },
    ],
  },

  errors: {
    title: "The 6 mistakes that cost you games",
    lede: "Symptom, cause, fix.",
    list: [
      {
        title: "You never leave lane",
        s: "You have great CS but no kills, no map pressure, and your side lanes lose while you farm mid.",
        c: "You treat mid like a 1v1 lane and ignore that it sits next to everything.",
        f: <>Build <Gloss term="roam">roam</Gloss> timers on purpose: <Gloss term="shove">shove</Gloss> the wave, then look at the map. CS is your income, but map pressure is how mid carries.</>,
      },
      {
        title: "You die to ganks from both sides",
        s: "You get collapsed on by the jungler over and over, often from the side you weren't watching.",
        c: "You push up with no vision and forget mid can be flanked from two rivers.",
        f: <>Ward one river mouth, track the enemy jungler, and don't overextend without <Gloss term="lane priority">priority</Gloss>. When you can't see the jungler, assume they're coming for you.</>,
      },
      {
        title: "You roam with no priority or no reward",
        s: "You leave lane, the enemy follows or just farms freely, and you lose your wave for nothing.",
        c: "You roam on a whim instead of off a shoved wave and a real target.",
        f: <>Roam only after you <Gloss term="shove">shove</Gloss>, and only toward something you can win: a gank, a tower, a ward. No <Gloss term="lane priority">priority</Gloss> means no roam.</>,
      },
      {
        title: "You can't land your damage",
        s: "Your combos miss, your poke does nothing, and you lose trades you should win.",
        c: "You only practise auto last-hitting and never your ability aim under pressure.",
        f: <>Treat last-hitting and poking with <Gloss term="skillshot">skillshots</Gloss> as the same skill you'll need in a fight. Practise the combo in the practice tool until it's automatic.</>,
      },
      {
        title: "You walk up alone and get caught",
        s: "Late game you grab a wave or a ward solo, get picked, and the enemy takes Baron 5v4.",
        c: "You forget that your death is worth the whole map once teams are grouped.",
        f: "Move with a teammate or with full vision once it's late. A wave is never worth handing them a free objective.",
      },
      {
        title: "You ignore the minimap",
        s: "You get surprised by flanks, miss objective setups, and react to fights after they're already lost.",
        c: "You stare at your own lane and only glance at the map when it's too late.",
        f: "Look at the minimap between every few last-hits. Mid has the best view of the map, so it should be the last role to get surprised.",
      },
    ],
  },

  champions: {
    title: "Your 3 champions to start",
    lede: "Three forgiving mid laners, one per archetype. Annie teaches landing a pick and a clean combo. Lux teaches range, poke and safe positioning. Ahri teaches roaming and map pressure. Learn one fully before adding a second.",
    list: [
      {
        name: "Annie", tag: "Burst mage", diff: "Easy",
        desc: "A point-and-click stun and the simplest combo in the game. She has no skillshots to miss, so she's the cleanest way to learn trading, comboing, and setting up a pick for your team.",
      },
      {
        name: "Lux", tag: "Control / poke", diff: "Easy",
        desc: "Long range, fast waveclear, and a shield to stay safe. Her skillshots teach you to aim while her range keeps you out of danger. Forgiving, and useful at every stage of the game.",
      },
      {
        name: "Ahri", tag: "Assassin / roamer", diff: "Balanced",
        desc: "Mobility, a charm to catch targets, and healing to survive mistakes, which makes her the most forgiving roamer to learn. Teaches you to leave lane and pressure the whole map.",
      },
    ],
  },

  build: {
    title: "Runes & build path by champion",
    lede: "A current high-Elo default for each starter, from u.gg (patch " + LL_PATCH + "). Flash + Ignite on all three, start Doran's Ring + 2 potions. Solid to copy, then refine as you learn the champion.",
    modes: {
      annie: {
        label: "Annie",
        runes: [
          ["Keystone",  "Electrocute"],
          ["Minor 1",   "Cheap Shot"],
          ["Minor 2",   "Grisly Mementos"],
          ["Minor 3",   "Relentless Hunter"],
          ["Secondary", "Absolute Focus · Axiom Arcanist"],
          ["Summoners", "Flash · Ignite"],
        ],
        build: [
          ["Start",     "Doran's Ring + 2 potions"],
          ["1st item",  "Malignance"],
          ["Boots",     "Sorcerer's Shoes"],
          ["Follow-up", "Hextech Rocketbelt, Shadowflame, Zhonya's Hourglass"],
        ],
      },
      lux: {
        label: "Lux",
        runes: [
          ["Keystone",  "Arcane Comet"],
          ["Minor 1",   "Manaflow Band"],
          ["Minor 2",   "Transcendence"],
          ["Minor 3",   "Scorch"],
          ["Secondary", "Cheap Shot · Ultimate Hunter"],
          ["Summoners", "Flash · Ignite"],
        ],
        build: [
          ["Start",     "Doran's Ring + 2 potions"],
          ["1st item",  "Malignance"],
          ["Boots",     "Sorcerer's Shoes"],
          ["Follow-up", "Stormsurge, Shadowflame, Rabadon's Deathcap, Void Staff"],
        ],
      },
      ahri: {
        label: "Ahri",
        runes: [
          ["Keystone",  "Electrocute"],
          ["Minor 1",   "Taste of Blood"],
          ["Minor 2",   "Grisly Mementos"],
          ["Minor 3",   "Ultimate Hunter"],
          ["Secondary", "Manaflow Band · Transcendence"],
          ["Summoners", "Flash · Ignite"],
        ],
        build: [
          ["Start",     "Doran's Ring + 2 potions"],
          ["1st item",  "Malignance"],
          ["Boots",     "Sorcerer's Shoes"],
          ["Follow-up", "Shadowflame, Zhonya's Hourglass, Rabadon's Deathcap"],
        ],
      },
    },
  },

  checklist: {
    title: "Am I ready to play ranked?",
    lede: "Check the points you validate over 3 games in a row. If you hit 8+, you're ready to queue ranked.",
    storageKey: "ll_mid_checklist_v1",
    threshold: 8,
    items: [
      "I shove the wave before I roam, instead of leaving on a whim",
      "I only roam with lane priority and a target I can actually win",
      "I keep a river ward up and I track the enemy jungler",
      "I check the minimap between every few last-hits",
      "I can land my champion's core combo in the practice tool without thinking",
      "I know the first Dragon and Voidgrubs / Herald timers",
      "I move to help an objective once my wave is shoved",
      "Late game I position for my archetype (zone, flank, or hold the combo)",
      "I don't walk up alone for a wave once teams are grouped",
      "Most of my recent deaths have a cause I can name, not just 'I died'",
    ],
  },

  practice: {
    title: "To practice",
    lede: "Two short videos to watch and two drills to run in the practice tool.",
    videos: [
      { creator: "Mysteriaslol", url: "https://www.youtube.com/watch?v=jTZHMkXvGko", title: "How to Play Mid Lane in Season 16 - Gameplay Guide", desc: "A live gameplay walkthrough of how a mid laner thinks, wave to wave. Good for seeing the macro in motion." },
      { creator: "Skill Capped", url: "https://www.youtube.com/watch?v=pGTUL2g0mwc", title: "Why YOU SUCK at MID LANE (And How To Fix It)", desc: "The habits that keep mid laners stuck, and the fix for each. A clean fundamentals reset." },
    ],
    drills: [
      { tag: "Drill 01 · Practice tool", title: "Shove and roam timer", body: <>Solo mid. <Gloss term="shove">Shove</Gloss> the wave into the enemy tower with abilities, then jog to a side lane and back. Count how long your roam window lasts before the wave returns. Repeat <b>five times</b>.</> },
      { tag: "Drill 02 · Practice tool", title: "Combo on a dummy", body: <>Set a target dummy at range. Land your champion's full combo: poke, then the all-in. Do it <b>twenty times</b> until the inputs are automatic, then try it while moving.</> },
    ],
  },
};

window.ROLE_DATA = ROLE_DATA;
