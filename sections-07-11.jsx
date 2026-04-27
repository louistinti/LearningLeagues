// sections-07-11.jsx — Champions, Runes/Build, Matchups, Checklist, Practice

// ── Champion portrait with Data Dragon + graceful fallback ────────────────
function ChampionPortrait({ name, label }) {
  const [failed, setFailed] = React.useState(false);
  const src = `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${name}.png`;
  return (
    <div className="champ-portrait" data-fallback={failed ? "1" : "0"}>
      {!failed && (
        <img
          src={src}
          alt={`${name} portrait`}
          onError={() => setFailed(true)}
          loading="lazy"
        />
      )}
      {failed && <span className="placeholder-label">{label}</span>}
    </div>
  );
}

// ── Section 07 : Champions ────────────────────────────────────────────────
function SectionChampions() {
  const champs = [
    {
      name: "Soraka", tag: "Enchanter", diff: "Easy",
      desc: "Heal + silence + global ult. Simple kit, forces you to read the map to ult at the right moment. Beats poke.",
    },
    {
      name: "Leona", tag: "Engage / All-in", diff: "Balanced",
      desc: "Tank with chained CC (E → Q → AA → R). You hunt the level-2 kill. Beats enchanters.",
    },
    {
      name: "Janna", tag: "Enchanter / Peel", diff: "Teaches the role",
      desc: "Shield + knockup + ult heal. Perfect to learn peel and cautious positioning. Beats poke.",
    },
  ];
  return (
    <section className="section shell" id="s07">
      <SectionHead
        num="07"
        title="Your 3 champions to start"
        lede="One enchanter (poke-killer), one engage (carry-killer) and one enchanter-peel (all-terrain)."
      />
      <div className="champ-grid">
        {champs.map((c) => (
          <article key={c.name} className="champ-card">
            <ChampionPortrait name={c.name} label={`PORTRAIT · ${c.name.toUpperCase()}`} />
            <div className="champ-body">
              <div className="champ-meta">
                <span className="tag">{c.tag}</span>
                <span>Diff · {c.diff}</span>
              </div>
              <h3 className="champ-name serif">{c.name}</h3>
              <p className="champ-desc">{c.desc}</p>
              <a className="champ-link" href="#">Full profile →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ── Section 08 : Runes & Build ────────────────────────────────────────────
function SectionBuild() {
  const [archetype, setArchetype] = React.useState("enchanter");
  const data = {
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
    allin: {
      label: "All-in",
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
  };
  const cur = data[archetype];

  return (
    <section className="section shell" id="s08">
      <SectionHead
        num="08"
        title="Runes & build path by archetype"
        lede="A default setup for each archetype — refine afterwards via Lolalytics."
      />

      <div className="archetype-switch" role="tablist" aria-label="Archetype">
        {Object.entries(data).map(([k, v]) => (
          <button
            key={k}
            role="tab"
            aria-selected={archetype === k}
            className={"archetype-tab" + (archetype === k ? " is-active" : "")}
            onClick={() => setArchetype(k)}
          >
            <span className="mono tag">0{Object.keys(data).indexOf(k) + 1}</span>
            <span className="label serif">{v.label}</span>
          </button>
        ))}
      </div>

      <div className="build-grid">
        <div className="build-block">
          <h3 className="serif">Default runes<span className="tag">{cur.label}</span></h3>
          <dl>
            {cur.runes.map(([k, v], i) => (
              <div key={i} className="build-row">
                <dt>{k}</dt><dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="build-block">
          <h3 className="serif">Build path<span className="tag">{cur.label}</span></h3>
          <dl>
            {cur.build.map(([k, v], i) => (
              <div key={i} className="build-row">
                <dt>{k}</dt><dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

// ── Section 09 : Matchups ─────────────────────────────────────────────────
function SectionMatchups() {
  const rows = [
    // ordered: Easy → Playable → Hard
    ["Soraka vs Xerath", "Easy",     "You heal the Qs that land, call the reset at 50%.", "You stay in E range with no potion."],
    ["Janna vs Leona",   "Playable", "You shield your ADC the moment E + Q chains.", "Your ADC overextends with no tribush vision."],
    ["Janna vs Lulu",    "Playable", "You zone with W, you outscale on shields.", "Lulu solo-locks your ADC in an all-in."],
    ["Leona vs Blitz",   "Hard",     "You zone the bushes and stay above the ADC.", "You walk through a bush without warding."],
    ["Soraka vs Leona",  "Hard",     "You keep distance, control ward tribush, help mid.", "Leona reaches Q range with ult ready."],
  ];
  const pillClass = (d) => "pill pill--" + d.toLowerCase();
  return (
    <section className="section shell" id="s09">
      <SectionHead
        num="09"
        title="5 matchups to know"
        lede="The matchups you'll see most often in low Elo, with the playbook to use."
      />
      <table className="matchup-table">
        <thead>
          <tr>
            <th>Matchup</th>
            <th>Difficulty</th>
            <th>You win if…</th>
            <th>You lose if…</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td data-label="Matchup" className="m-name">{r[0]}</td>
              <td data-label="Difficulty" className="m-diff"><span className={pillClass(r[1])}>{r[1]}</span></td>
              <td data-label="You win if" className="m-win"><b>{r[2]}</b></td>
              <td data-label="You lose if" className="m-lose">{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

// ── Section 10 : Checklist ────────────────────────────────────────────────
const CHECKLIST_KEY = "ll_support_checklist_v1";
function SectionChecklist() {
  const items = [
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
  ];
  const [checked, setChecked] = React.useState(() => {
    try {
      const raw = localStorage.getItem(CHECKLIST_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return Array(items.length).fill(false);
  });
  React.useEffect(() => {
    try { localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checked)); } catch (e) {}
  }, [checked]);

  const toggle = (i) => setChecked(checked.map((v, j) => (i === j ? !v : v)));
  const count = checked.filter(Boolean).length;
  const ready = count >= 8;

  return (
    <section className="section shell" id="s10">
      <SectionHead
        num="10"
        title="Am I ready to play ranked?"
        lede="Check the points you validate over 3 games in a row. If you hit 8+, you can launch your ranked."
      />
      <div className="checklist-wrap">
        <div className="checklist-progress">
          <div className="progress-num">
            {count}<span className="of">/10</span>
          </div>
          <div className="progress-label">Validated · saved locally</div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${count * 10}%` }} />
          </div>
          <p className={"progress-readout" + (ready ? " ready" : "")}>
            {ready
              ? "✓ Threshold reached — you can launch your ranked over 3 games in a row."
              : `${8 - count} more point${8 - count > 1 ? "s" : ""} before launching ranked`}
          </p>
        </div>
        <ul className="checklist" role="list">
          {items.map((txt, i) => (
            <li
              key={i}
              className={checked[i] ? "done" : ""}
              onClick={() => toggle(i)}
              onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(i); } }}
              tabIndex="0"
              role="checkbox"
              aria-checked={checked[i]}
            >
              <span className="checklist-box" aria-hidden="true"></span>
              <span className="checklist-text">{txt}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Section 11 : Pratique ─────────────────────────────────────────────────
function SectionPractice() {
  return (
    <section className="section shell" id="s11">
      <SectionHead
        num="11"
        title="To practice"
        lede="Two short videos to watch and two drills to run in the practice tool."
      />
      <div className="practice-grid">
        <article className="video-card">
          <div className="video-thumb">
            <span className="video-duration">3:12</span>
          </div>
          <span className="video-meta">Video · Creator TBD</span>
          <h3 className="video-title serif">Understanding bot lane vision</h3>
          <p className="exercise-text">Ward timings, control ward priority, tribush vs river choice.</p>
        </article>
        <article className="video-card">
          <div className="video-thumb">
            <span className="video-duration">4:48</span>
          </div>
          <span className="video-meta">Video · Creator TBD</span>
          <h3 className="video-title serif">Engage vs peel: how to choose</h3>
          <p className="exercise-text">Per-archetype demonstration with teamfight examples.</p>
        </article>
      </div>

      <div className="exercises">
        <article className="exercise">
          <span className="exercise-tag">Drill 01 · Practice tool</span>
          <h4 className="exercise-title serif">Blind ward placement</h4>
          <p className="exercise-text">
            Enter the practice tool, place 10 wards on the 10 map spots without checking their names.
            Time yourself: <b>&lt; 3 min</b> = you know the map.
          </p>
        </article>
        <article className="exercise">
          <span className="exercise-tag">Drill 02 · Practice tool</span>
          <h4 className="exercise-title serif">Leona engage combo</h4>
          <p className="exercise-text">
            With Leona, chain <b>E → Q → AA → R</b> on a dummy <b>20 times</b>.
            Goal: smooth, without missing the Q after the E.
          </p>
        </article>
      </div>
    </section>
  );
}

Object.assign(window, { SectionChampions, SectionBuild, SectionMatchups, SectionChecklist, SectionPractice });
