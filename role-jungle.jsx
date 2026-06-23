// role-jungle.jsx — content for the Jungle role guide. window.ROLE_DATA.
// Content researched 2026-06-23 against current patch 26.12 + Riot patch notes.
// Builds transcribed from u.gg (pending user screenshot confirmation); videos picked by the user.

const ROLE_DATA = {
  meta: {
    activeKey: "roles",
    breadcrumb: "Jungle",
    eyebrow: <>ROLE <span className="dot"></span> Jungle</>,
    title: "Jungle",
    intro: "Jungle is the role without a lane. You farm the monsters between the lanes, read the whole map, and decide where the game is won. You win by clearing efficiently, ganking at the right moment, and controlling objectives with Smite. Pick Jungle if you like making calls for the whole team and being everywhere at once.",
    meta: [
      <><strong>Difficulty</strong><span className="stars">★★★</span></>,
      <><strong>Read time</strong> ~15 min</>,
      <><strong>Patch</strong> {LL_PATCH}</>,
    ],
    sigilLabel: "SIGIL · JUNGLE",
    sigil: (
      <span className="hero-sigil-icon" style={{ WebkitMaskImage: "url(https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-jungle.png)", maskImage: "url(https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-jungle.png)" }} />
    ),
  },

  phases: {
    title: "What you do, phase by phase",
    lede: "The jungle has no lane, so your map shifts the fastest of any role. Here are the 3 things that matter in each phase.",
    list: [
      {
        title: "Early game",
        timer: "0 → 10 min",
        items: [
          <>Clear efficiently. Follow a set <Gloss term="pathing">path</Gloss> from your first camp to level 3 without losing too much HP. A clean clear is what lets you <Gloss term="gank">gank</Gloss> or contest <Gloss term="scuttle">scuttle</Gloss> on time.</>,
          <>Find your first play. After three camps you have your abilities. Look for a <Gloss term="gank">gank</Gloss> on an overextended lane, or fight for the <Gloss term="scuttle">scuttle</Gloss> crab in the river.</>,
          "Track the enemy jungler. Note where they started, then do the math on their path. If a lane is pushed and you can't see the enemy jungler, that lane is about to be ganked, maybe by you.",
        ],
      },
      {
        title: "Mid game",
        timer: "10 → 25 min",
        items: [
          <>Play around objectives. Path toward the next drake or <Gloss term="Voidgrubs">Voidgrubs</Gloss> before they spawn, not as they're dying, with a <Gloss term="Smite">Smite</Gloss> charge ready and vision up.</>,
          <><Gloss term="gank">Gank</Gloss> with a reward. Go to lanes that can follow up, where your arrival gets a kill or a tower. A gank into a warded, even lane is just lost time.</>,
          <><Gloss term="counter-jungle">Counter-jungle</Gloss> when you're ahead. If you've won a side, take the enemy's camps and deny their jungler XP. Don't do it blind when you're behind.</>,
        ],
      },
      {
        title: "Late game",
        timer: "25 min +",
        items: [
          <><Gloss term="Smite">Smite</Gloss> the objective, not the camp. Hold a charge for Baron and Elder. Starting either with no Smite hands it to the enemy.</>,
          <>Know your teamfight job: a tank engages and peels, a <Gloss term="skirmish">skirmisher</Gloss> dives the carry, a farming carry waits to clean up once the enemy CC is spent.</>,
          "Don't get caught crossing the map. Your Smite and your presence decide objectives. Dying alone in a side jungle loses the Baron happening 50 metres away.",
        ],
      },
    ],
  },

  map: {
    title: "The jungle, camp by camp",
    lede: "Your office. The camps you farm, the crab you fight over, and the objectives that win games. A read of the neutral map.",
    mapSrc: "assets/sr-map-clean.png",
    mapAlt: "Summoner's Rift — official map",
    mapCredit: "RIOT GAMES — SUMMONER'S RIFT",
    legendTitle: "Legend — 6 key points",
    pins: [
      { n: 1, x: 20.0, y: 40.0, short: "Blue buff",        long: "One of your two buffs. Blue gives mana and ability haste, the backbone of a sustained or AP clear. Start here or at red depending on your first play." },
      { n: 2, x: 41.0, y: 71.0, short: "Red buff",         long: "Your other buff. Red adds damage over time and a slow, which makes your early ganks and skirmishes much stronger." },
      { n: 3, x: 45.0, y: 35.0, short: "Scuttle crab",     long: "(river) Free vision and a small speed zone for the team. The first real fight of the game usually happens over it, around 3:30." },
      { n: 4, x: 60.9, y: 59.5, short: "Dragon pit",       long: "Drake spawns from 5:00. Path here with a Smite charge and vision up before it spawns, not as it's dying." },
      { n: 5, x: 38.7, y: 27.5, short: "Objective pit",    long: "Voidgrubs and Rift Herald early, Baron late. The top-side prize. Your clear should set you up to contest it." },
      { n: 6, x: 66.0, y: 42.0, short: "Enemy jungle",     long: "When you're ahead, invade here to steal camps and deny the enemy jungler. Never go in blind when you're behind." },
    ],
  },

  skills: {
    title: "The skills that make the difference",
    lede: "Four skills to prioritize to become a reliable jungler starting in low Elo.",
    list: [
      {
        title: "Pathing & clear",
        desc: <>Follow an efficient <Gloss term="pathing">route</Gloss> through your camps, kite each one so you keep your HP, and reach level 3 ready to make a play. A messy clear delays everything else.</>,
        link: "/macro/jungle-pathing",
      },
      {
        title: "Gank timing",
        desc: <>Read the lane before you commit: an overextended enemy, no ward, your CC up. Knowing <em>when</em> to <Gloss term="gank">gank</Gloss> matters more than how. A perfect gank at the wrong time still fails.</>,
        link: "/macro/ganking",
      },
      {
        title: "Objective control",
        desc: <>Manage your <Gloss term="Smite">Smite</Gloss> and your vision around every <Gloss term="objective">objective</Gloss>. Be there before it spawns, and never start an epic monster without a Smite charge ready.</>,
        link: "/macro/objectives",
      },
      {
        title: "Tracking the enemy jungler",
        desc: "Note where the enemy jungler starts, then predict their next camps. The jungler who always knows where the other one is rarely gets counter-ganked or invaded.",
        link: "/macro/tracking",
      },
    ],
  },

  triangle: {
    title: "The three jungle archetypes",
    tocLabel: "Archetypes",
    lede: "Junglers split into three jobs. Know which one you're playing and how it wants to spend the early game.",
    nodes: {
      tank:       { corner: "top", label: "Tank / engage",       champs: "Amumu · Sejuani · Zac",      x: 50,  y: 8  },
      skirmisher: { corner: "br",  label: "Skirmisher / ganker", champs: "Warwick · Lee Sin · Xin Zhao", x: 100, y: 80 },
      carry:      { corner: "bl",  label: "Farming / carry",     champs: "Master Yi · Graves · Karthus", x: 0,   y: 80 },
    },
    legend: [
      { strong: "Tank / engage", rest: <>controls objectives and starts fights. Weaker at solo duels, so it leans on the team and on a big engage ultimate.</> },
      { strong: "Skirmisher / ganker", rest: <>pressures the map early with ganks and wins small fights. Wants to snowball a lead before the carries scale.</> },
      { strong: "Farming / carry", rest: <>power-farms to hit item spikes, then takes over as a main damage threat. Weak early, so it has to survive and scale.</> },
    ],
  },

  callouts: {
    title: "Key concept: the clear sets up everything",
    tocLabel: "Key concept",
    lede: "Every gank, objective and counter-jungle starts with a clean clear. Your route decides where you can be and when you can be there.",
    list: [
      { type: "key", title: "Clear toward a play", body: <>Plan your <Gloss term="pathing">path</Gloss> so you finish a camp next to a lane that's ready to <Gloss term="gank">gank</Gloss>, or near the next objective. The clear isn't the goal, it's how you arrive on time.</> },
      { type: "pro", title: "Never start an objective without Smite", body: <>A Drake, Baron or Elder started with no <Gloss term="Smite">Smite</Gloss> charge is a free steal for the enemy jungler. Hold a charge, get vision, then commit.</> },
      { type: "pro", title: "Track from the first camp", body: "If you see where the enemy jungler started, you can predict their next three camps. That one read tells you which lanes are safe to gank and where they'll be." },
      { type: "trap", title: "Don't farm through a fight", body: <>Clearing a camp while your team dies 4v5 at drake loses the game with full HP. When a fight starts at an <Gloss term="objective">objective</Gloss>, the camp can wait.</> },
    ],
  },

  errors: {
    title: "The 6 mistakes that cost you games",
    lede: "Symptom, cause, fix.",
    list: [
      {
        title: "You farm with no plan",
        s: "You clear camps all game, never gank, and your lanes lose while you have great CS.",
        c: "You treat the jungle like a farming minigame instead of a map-pressure role.",
        f: <>Clear toward a play. After three camps, look for a <Gloss term="gank">gank</Gloss> or an objective. <Gloss term="power farm">Power farming</Gloss> is a choice for scaling champs, not a default.</>,
      },
      {
        title: "You gank lanes that can't follow up",
        s: "You dive a warded, even lane, get nothing, and fall behind on camps and XP.",
        c: "You gank on impulse instead of reading the lane first.",
        f: <>Gank where you get a reward: an overextended enemy, no ward, a laner with CC up. A <Gloss term="gank">gank</Gloss> into nothing is just lost farm.</>,
      },
      {
        title: "You start objectives with no Smite",
        s: "You begin a Drake or Baron, the enemy jungler walks up, and they Smite-steal it.",
        c: "You used both Smite charges on camps and forgot the timer.",
        f: <>Hold a <Gloss term="Smite">Smite</Gloss> charge for every <Gloss term="objective">objective</Gloss>. Check the spawn timer and path there early, with vision, not as it's dying.</>,
      },
      {
        title: "You don't track the enemy jungler",
        s: "You keep getting counter-ganked or your camps vanish, and you never see it coming.",
        c: "You only watch your own camps and never note where the enemy jungler is.",
        f: "Note their start, then predict their path. When they're missing near you, assume the worst and ward your next camp.",
      },
      {
        title: "You invade blind when behind",
        s: "You walk into the enemy jungle to counter-jungle, get collapsed on, and feed a shutdown.",
        c: <>You <Gloss term="counter-jungle">counter-jungle</Gloss> on autopilot without checking the map.</>,
        f: "Only invade with vision and a lead. When you're behind, farm your own side safely and wait for the enemy to make the mistake.",
      },
      {
        title: "You tunnel on farm and miss fights",
        s: "A fight breaks out at an objective and you arrive after it's already lost, still clearing a camp.",
        c: "You commit to a full clear and stop reading the map mid-camp.",
        f: <>Watch the minimap between camps. When the team groups at an <Gloss term="objective">objective</Gloss>, leave the camp and be there before it starts.</>,
      },
    ],
  },

  champions: {
    title: "Your 3 champions to start",
    lede: "Three forgiving junglers, one per archetype. Amumu teaches objective control and the teamfight engage. Warwick teaches clearing and gank timing with almost no risk. Master Yi teaches farming and when to commit. Learn one fully before adding a second.",
    list: [
      {
        name: "Amumu", tag: "Tank / engage", diff: "Easy",
        desc: "Fast AoE clear, a simple Q-into-R gank, and an ultimate that can win a teamfight on its own. The cleanest way to learn objective control and how to start a fight for your team.",
      },
      {
        name: "Warwick", tag: "Skirmisher / ganker", diff: "Easy",
        desc: "His passive heals him as he clears, so HP is never a worry, and his ultimate is a point-and-click lockdown. Blood Hunt even shows you who to gank. The most forgiving jungler to learn.",
      },
      {
        name: "MasterYi", display: "Master Yi", tag: "Farming / carry", diff: "Balanced",
        desc: "Farm your camps, hit your items, then press R and clean up. Mechanically simple, but he teaches the core jungle skill of efficient farming and reading when it's safe to commit.",
      },
    ],
  },

  build: {
    title: "Runes & build path by champion",
    lede: "A current high-Elo default for each starter, from u.gg (patch " + LL_PATCH + "). Flash + Smite on all three, start your jungle companion + a potion. Solid to copy, then refine as you learn the champion.",
    modes: {
      amumu: {
        label: "Amumu",
        runes: [
          ["Keystone",  "Conqueror"],
          ["Minor 1",   "Triumph"],
          ["Minor 2",   "Legend: Haste"],
          ["Minor 3",   "Last Stand"],
          ["Secondary", "Cheap Shot · Ultimate Hunter"],
          ["Summoners", "Flash · Smite"],
        ],
        build: [
          ["Start",     "Jungle companion + Health Potion"],
          ["1st item",  "Liandry's Torment"],
          ["Boots",     "Plated Steelcaps"],
          ["Follow-up", "Sunfire Aegis, Abyssal Mask, Thornmail"],
        ],
      },
      warwick: {
        label: "Warwick",
        runes: [
          ["Keystone",  "Lethal Tempo"],
          ["Minor 1",   "Triumph"],
          ["Minor 2",   "Legend: Alacrity"],
          ["Minor 3",   "Last Stand"],
          ["Secondary", "Celerity · Waterwalking"],
          ["Summoners", "Flash · Smite"],
        ],
        build: [
          ["Start",     "Jungle companion + Health Potion"],
          ["1st item",  "Stridebreaker"],
          ["Boots",     "Plated Steelcaps"],
          ["Follow-up", "Blade of the Ruined King, Thornmail, Spirit Visage"],
        ],
      },
      masteryi: {
        label: "Master Yi",
        runes: [
          ["Keystone",  "Lethal Tempo"],
          ["Minor 1",   "Triumph"],
          ["Minor 2",   "Legend: Alacrity"],
          ["Minor 3",   "Coup de Grace"],
          ["Secondary", "Cosmic Insight · Magical Footwear"],
          ["Summoners", "Flash · Smite"],
        ],
        build: [
          ["Start",     "Jungle companion + Health Potion"],
          ["1st item",  "Kraken Slayer"],
          ["Boots",     "Gluttonous Greaves"],
          ["Follow-up", "Guinsoo's Rageblade, Experimental Hexplate, Death's Dance"],
        ],
      },
    },
  },

  checklist: {
    title: "Am I ready to play ranked?",
    lede: "Check the points you validate over 3 games in a row. If you hit 8+, you're ready to queue ranked.",
    storageKey: "ll_jungle_checklist_v1",
    threshold: 8,
    items: [
      "I have a first clear path I can follow without thinking",
      "I reach level 3 with healthy HP before my first play",
      "I gank only lanes that can follow up and aren't warded",
      "I note where the enemy jungler starts and track their path",
      "I path toward the next objective before it spawns, with a Smite charge",
      "I never start a Drake or Baron with zero Smite charges",
      "I only counter-jungle with vision and a lead",
      "I check the minimap between camps instead of tunnelling on farm",
      "Late game I know my teamfight job (engage, dive, or clean up)",
      "Most of my recent deaths have a cause I can name, not just 'I died'",
    ],
  },

  practice: {
    title: "To practice",
    lede: "Two short videos to watch and two drills to run in the practice tool.",
    videos: [
      { creator: "Skill Capped", url: "https://www.youtube.com/watch?v=0EQSmjB2MCA", title: "The COMPLETE Beginners Guide to JUNGLE for Season 16!", desc: "A full walkthrough of the jungle from the ground up: pathing, ganking, objectives. Watch this first if the role is new to you." },
      { creator: "Skill Capped", url: "https://www.youtube.com/watch?v=AQpRvcTQ__M", title: "Why You SUCK at JUNGLE (And How to FIX IT)", desc: "The habits that keep junglers stuck, and the fix for each. A clean fundamentals reset." },
    ],
    drills: [
      { tag: "Drill 01 · Practice tool", title: "Timed first clear", body: <>Run your full first <Gloss term="pathing">clear</Gloss> from camp to camp and watch the clock. Aim to finish six camps and reach level 6 by about <b>3:30</b>, ending with most of your HP. Repeat until the route is automatic.</> },
      { tag: "Drill 02 · Practice tool", title: "Smite an objective", body: <>Spawn the Dragon and a target dummy nearby. Practise hitting <Gloss term="Smite">Smite</Gloss> at the right HP while the dummy "contests" you. Learn the damage Smite does at your level so you never lose an objective by a sliver.</> },
    ],
  },
};

window.ROLE_DATA = ROLE_DATA;
