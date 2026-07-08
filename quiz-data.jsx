// quiz-data.jsx — Role quiz content: roles, questions, weights.
// Weights map answers to roles. Result = ranked score across the 5 roles.

const QUIZ_ROLES = {
  top: {
    key: "top",
    name: "Top",
    article: "a Top laner",
    icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-top.png",
    href: "Top.html",
    blurb: "The island dweller. You want a fair 1v1 — and by \u201cfair\u201d you mean you win. Teleport is your one concession to teamwork.",
  },
  jungle: {
    key: "jungle",
    name: "Jungle",
    article: "a Jungler",
    icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-jungle.png",
    href: "Jungle.html",
    blurb: "The conductor. You don\u2019t play a lane — you play the whole map. Everyone blames you, and everyone needs you.",
  },
  mid: {
    key: "mid",
    name: "Mid",
    article: "a Mid laner",
    icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-middle.png",
    href: "Mid.html",
    blurb: "The protagonist. Short lane, quick trades, and a roam timer where your heartbeat should be.",
  },
  adc: {
    key: "adc",
    name: "ADC",
    article: "an ADC",
    icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-bottom.png",
    href: "ADC.html",
    blurb: "The investment. Fragile for twenty minutes, then a metronome of pain. Protect accordingly.",
  },
  support: {
    key: "support",
    name: "Support",
    article: "a Support",
    icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-utility.png",
    href: "Support.html",
    blurb: "The playmaker. You see everything, start everything, and take credit for nothing. Your KDA lies — your vision score doesn\u2019t.",
  },
};

const QUIZ_ROLE_ORDER = ["top", "jungle", "mid", "adc", "support"];

const QUIZ_QUESTIONS = [
  {
    tag: "SCENARIO",
    q: "Minute 15. A fight breaks out at Dragon — without you. What were you doing?",
    options: [
      { label: "Split-pushing top. Someone has to make them pay for it.", w: { top: 3 } },
      { label: "Nothing — I pinged that Dragon 40 seconds ago and nobody came.", w: { jungle: 3 } },
      { label: "Shoving mid so I could arrive fashionably late and clean up.", w: { mid: 3 } },
      { label: "Taking the tower they abandoned. Objectives don\u2019t fight back.", w: { adc: 2, top: 1 } },
    ],
  },
  {
    tag: "PERSONALITY",
    q: "Your ideal amount of company in lane:",
    options: [
      { label: "Zero. It\u2019s not a lane, it\u2019s a duel.", w: { top: 3 } },
      { label: "Lane? The whole map is my lane.", w: { jungle: 3 } },
      { label: "A short lane with two exits — I don\u2019t stay anywhere for long.", w: { mid: 3 } },
      { label: "One partner who trusts me with their life.", w: { support: 2, adc: 2 } },
    ],
  },
  {
    tag: "SCENARIO",
    q: "Your ADC facechecks a bush and dies. Your first thought:",
    options: [
      { label: "\u201cShould have warded it. That one\u2019s on me.\u201d", w: { support: 3 } },
      { label: "\u201cAnd that\u2019s why I play a lane with one bush.\u201d", w: { mid: 2, top: 1 } },
      { label: "\u201cI saw it coming on the minimap ten seconds ago.\u201d", w: { jungle: 3 } },
      { label: "\u201cNoted. I will never facecheck again. Probably.\u201d", w: { adc: 3 } },
    ],
  },
  {
    tag: "PERSONALITY",
    q: "Pick a superpower:",
    options: [
      { label: "Unkillable. Fights end when I decide they end.", w: { top: 3 } },
      { label: "Omniscient. I always know where all ten champions are.", w: { jungle: 2, support: 1 } },
      { label: "Instant burst. Problem deleted in 0.4 seconds.", w: { mid: 3 } },
      { label: "Endless, consistent damage. A metronome of pain.", w: { adc: 3 } },
    ],
  },
  {
    tag: "SCENARIO",
    q: "Your team loses three fights in a row. Your fix:",
    options: [
      { label: "Stop fighting. I\u2019ll drag three of them top while you take mid.", w: { top: 3 } },
      { label: "We fight on my timers, around my objectives — not on tilt.", w: { jungle: 3 } },
      { label: "Catch someone first. Fights are much easier at 5v4.", w: { support: 2, mid: 1 } },
      { label: "Buy me ten more minutes. I\u2019ll win the fights myself.", w: { adc: 3 } },
    ],
  },
  {
    tag: "PERSONALITY",
    q: "What tilts you the most?",
    options: [
      { label: "Getting camped before minute six.", w: { top: 3 } },
      { label: "Reading \u201cjungle diff\u201d in chat at minute four.", w: { jungle: 3 } },
      { label: "My roam works — and my wave dies under tower behind me.", w: { mid: 3 } },
      { label: "Landing the perfect engage and turning around to find nobody followed.", w: { support: 3 } },
    ],
  },
  {
    tag: "SCENARIO",
    q: "Minute 40. One Baron fight decides the game. Where are you?",
    options: [
      { label: "Front line. Someone has to eat the first three spells.", w: { top: 3 } },
      { label: "In the pit, Smite ready, hands sweating.", w: { jungle: 3 } },
      { label: "Flanking from the one bush they forgot to ward.", w: { mid: 3 } },
      { label: "As far back as humanly possible, hitting whatever\u2019s closest.", w: { adc: 2, support: 1 } },
    ],
  },
  {
    tag: "PERSONALITY",
    q: "Honestly — why do you play?",
    options: [
      { label: "To beat one person so thoroughly it feels personal.", w: { top: 3 } },
      { label: "To run the game like a chess clock everyone else forgot about.", w: { jungle: 3 } },
      { label: "To be the main character. It\u2019s called mid for a reason.", w: { mid: 3 } },
      { label: "To be the reason we won — even if I finish 0/2/24.", w: { support: 2, adc: 1 } },
    ],
  },
];

function quizComputeScores(answers) {
  const scores = { top: 0, jungle: 0, mid: 0, adc: 0, support: 0 };
  answers.forEach((pick, i) => {
    const opt = QUIZ_QUESTIONS[i] && QUIZ_QUESTIONS[i].options[pick];
    if (!opt) return;
    Object.entries(opt.w).forEach(([role, pts]) => { scores[role] += pts; });
  });
  return QUIZ_ROLE_ORDER
    .map((key) => ({ role: QUIZ_ROLES[key], score: scores[key] }))
    .sort((a, b) => b.score - a.score || QUIZ_ROLE_ORDER.indexOf(a.role.key) - QUIZ_ROLE_ORDER.indexOf(b.role.key));
}

Object.assign(window, { QUIZ_ROLES, QUIZ_ROLE_ORDER, QUIZ_QUESTIONS, quizComputeScores });
