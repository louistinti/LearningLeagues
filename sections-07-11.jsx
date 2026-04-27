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
          alt={`Portrait ${name}`}
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
      name: "Soraka", tag: "Enchanter", diff: "Facile",
      desc: "Heal + silence + ult global. Kit simple, te force à lire la map pour ult au bon moment. Bat les poke.",
    },
    {
      name: "Leona", tag: "Engage / All-in", diff: "Équilibré",
      desc: "Tank avec CC enchaîné (E → Q → AA → R). Tu cherches le kill lvl 2. Bat les enchanters.",
    },
    {
      name: "Janna", tag: "Enchanter / Peel", diff: "Enseigne le rôle",
      desc: "Shield + knockup + ult heal. Parfaite pour apprendre le peel et le positioning prudent. Bat les poke.",
    },
  ];
  return (
    <section className="section shell" id="s07">
      <SectionHead
        num="07"
        title="Tes 3 champions pour démarrer"
        lede="Un enchanter (poke-killer), un engage (carries-killer) et un enchanter-peel (tout-terrain)."
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
              <a className="champ-link" href="#">Fiche complète →</a>
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
        ["Mineur 1",   "Manaflow Band"],
        ["Mineur 2",   "Transcendance"],
        ["Mineur 3",   "Scorch · Gathering Storm"],
        ["Summoners",  "Flash · Ignite ou Exhaust"],
      ],
      build: [
        ["Start",      "World Atlas + 2 potions"],
        ["1er item",   "Moonstone ou Lich de Shurelya"],
        ["Bottes",     "Ionian par défaut, Mercurys vs heavy CC"],
        ["Defense",    "Ardent (équipe on-hit), Redemption (teamfight), Mikael (vs stun lourd)"],
      ],
    },
    allin: {
      label: "All-in",
      runes: [
        ["Keystone",   "Aftershock · Grasp of the Undying"],
        ["Mineur 1",   "Font of Life"],
        ["Mineur 2",   "Conditioning · Bone Plating"],
        ["Mineur 3",   "Revitalize · Overgrowth"],
        ["Summoners",  "Flash · Ignite ou Exhaust"],
      ],
      build: [
        ["Start",      "World Atlas + 2 potions"],
        ["1er item",   "Bulwark of the Mountain (quête) puis Locket ou Knight's Vow"],
        ["Bottes",     "Plated Steelcaps vs AD, Mercurys vs CC/AP"],
        ["Tank",       "Locket, Knight's Vow, Zeke's Convergence, Thornmail selon matchup"],
      ],
    },
    poke: {
      label: "Poke",
      runes: [
        ["Keystone",   "Arcane Comet · Summon Aery (selon champion)"],
        ["Mineur 1",   "Manaflow Band"],
        ["Mineur 2",   "Transcendance · Absolute Focus"],
        ["Mineur 3",   "Scorch · Gathering Storm"],
        ["Summoners",  "Flash · Ignite"],
      ],
      build: [
        ["Start",      "Spellthief's Edge + 2 potions"],
        ["1er item",   "Luden's Companion ou Malignance"],
        ["Bottes",     "Sorcerer's Shoes par défaut, Ionian si CDR prioritaire"],
        ["Poursuite",  "Horizon Focus, Shadowflame, Rabadon selon cible"],
      ],
    },
  };
  const cur = data[archetype];

  return (
    <section className="section shell" id="s08">
      <SectionHead
        num="08"
        title="Runes & build path par archétype"
        lede="Un setup par défaut pour chaque archétype — à affiner ensuite via Lolalytics."
      />

      <div className="archetype-switch" role="tablist" aria-label="Archétype">
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
          <h3 className="serif">Runes par défaut<span className="tag">{cur.label}</span></h3>
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
    // ordered: Facile → Jouable → Difficile
    ["Soraka vs Xerath", "Facile",    "Tu heal les Q qui passent, tu call le reset à 50%.", "Tu restes à portée de E sans potion."],
    ["Janna vs Leona",   "Jouable",   "Tu shield ton ADC au moment du E + Q enchaîné.", "Ton ADC se sur-étend sans vision tribush."],
    ["Janna vs Lulu",    "Jouable",   "Tu zones avec W, tu outscales en shields.", "Lulu solo-lock ton ADC en all-in."],
    ["Leona vs Blitz",   "Difficile", "Tu zone les bushes et restes au-dessus de l'ADC.", "Tu traverses le bush sans ward."],
    ["Soraka vs Leona",  "Difficile", "Tu gardes distance, control ward tribush, help mid.", "Leona vient à portée Q avec ult ready."],
  ];
  const pillClass = (d) => "pill pill--" + d.toLowerCase();
  return (
    <section className="section shell" id="s09">
      <SectionHead
        num="09"
        title="5 matchups à connaître"
        lede="Les confrontations que tu verras le plus souvent en bas Elo, avec la ligne de jeu à adopter."
      />
      <table className="matchup-table">
        <thead>
          <tr>
            <th>Matchup</th>
            <th>Difficulté</th>
            <th>Tu gagnes si…</th>
            <th>Tu perds si…</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td data-label="Matchup" className="m-name">{r[0]}</td>
              <td data-label="Difficulté" className="m-diff"><span className={pillClass(r[1])}>{r[1]}</span></td>
              <td data-label="Tu gagnes si" className="m-win"><b>{r[2]}</b></td>
              <td data-label="Tu perds si" className="m-lose">{r[3]}</td>
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
    "Je place ≥ 1 ward à chaque CD de trinket",
    "Je pose un control ward pour chaque objectif (drake, grubs, Herald, Baron) et je régule mes achats en fonction de ma quête support",
    "Je sais quel archétype je joue et contre quel archétype je suis fort",
    "Je check la minimap toutes les 5-10 secondes",
    "Je ne prends pas de CS sauf si mon ADC est absent et que je ne casse pas un freeze pour nous",
    "Je roam au moins 2 fois en early game quand la lane pushe toute seule",
    "Je connais le timing des objectifs (Scuttle 2:55, Drake 5:00, Grubs 6:00, Herald 15:00, Baron 20:00)",
    "Je protège mon ADC en teamfight avant de chercher la kill",
    "J'ai un vision score équivalent à 3× les minutes jouées (ex. 23 min = 69 de vision score)",
    "Je maîtrise 1 champion à fond avant d'en essayer un 2e",
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
        title="Suis-je prêt à jouer ranked ?"
        lede="Coche les points que tu valides sur 3 games d'affilée. Si tu en as 8+, tu peux lancer ta ranked."
      />
      <div className="checklist-wrap">
        <div className="checklist-progress">
          <div className="progress-num">
            {count}<span className="of">/10</span>
          </div>
          <div className="progress-label">Validés · sauvegardé localement</div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${count * 10}%` }} />
          </div>
          <p className={"progress-readout" + (ready ? " ready" : "")}>
            {ready
              ? "✓ Seuil atteint — tu peux lancer ta ranked sur 3 games d'affilée."
              : `Plus que ${8 - count} point${8 - count > 1 ? "s" : ""} avant de lancer tes ranked`}
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
        title="Pour pratiquer"
        lede="Deux vidéos courtes à regarder et deux exercices à faire en practice tool."
      />
      <div className="practice-grid">
        <article className="video-card">
          <div className="video-thumb">
            <span className="video-duration">3:12</span>
          </div>
          <span className="video-meta">Vidéo · Créateur à définir</span>
          <h3 className="video-title serif">Comprendre la vision en bot lane</h3>
          <p className="exercise-text">Ward timings, control ward priority, tribush vs river choice.</p>
        </article>
        <article className="video-card">
          <div className="video-thumb">
            <span className="video-duration">4:48</span>
          </div>
          <span className="video-meta">Vidéo · Créateur à définir</span>
          <h3 className="video-title serif">Engage vs peel : comment choisir</h3>
          <p className="exercise-text">Démonstration par archétype avec exemples teamfight.</p>
        </article>
      </div>

      <div className="exercises">
        <article className="exercise">
          <span className="exercise-tag">Exercice 01 · Practice tool</span>
          <h4 className="exercise-title serif">Placement de wards aveugle</h4>
          <p className="exercise-text">
            Entre en practice tool, place 10 wards aux 10 spots de la map sans regarder leur nom.
            Chronomètre-toi : <b>&lt; 3 min</b> = tu connais la map.
          </p>
        </article>
        <article className="exercise">
          <span className="exercise-tag">Exercice 02 · Practice tool</span>
          <h4 className="exercise-title serif">Combo d'engage Leona</h4>
          <p className="exercise-text">
            Avec Leona, enchaîne <b>E → Q → AA → R</b> sur un dummy <b>20 fois</b>.
            Objectif : fluide, sans rater le Q après le E.
          </p>
        </article>
      </div>
    </section>
  );
}

Object.assign(window, { SectionChampions, SectionBuild, SectionMatchups, SectionChecklist, SectionPractice });
