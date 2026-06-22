// app.jsx — generic role-guide composition. Reads window.ROLE_DATA, renders
// only the sections whose data key is present, derives section numbers/ids
// and the TOC from the rendered set.

// Ordered section registry: [dataKey, Component, tocLabel].
const SECTION_ORDER = [
  ["phases",    SectionPhases,   "Phases"],
  ["map",       SectionMap,      "Map"],
  ["skills",    SectionSkills,   "Skills"],
  ["triangle",  SectionTriangle, "Triangle"],
  ["callouts",  SectionCallouts, "Prio lvl 2"],
  ["errors",    SectionErrors,   "Mistakes"],
  ["champions", SectionChampions,"Champions"],
  ["build",     SectionBuild,    "Build"],
  ["matchups",  SectionMatchups, "Matchups"],
  ["checklist", SectionChecklist,"Checklist"],
  ["practice",  SectionPractice, "Practice"],
];

// A section renders only if its data key is present and non-empty. To DROP a
// section for a role, OMIT the key entirely — do not set it to {} or null, or
// the component renders with undefined title/lede/payload.
function hasData(v) {
  if (!v) return false;
  if (Array.isArray(v)) return v.length > 0;
  return true;
}

// Spread the section's data object as props. For sections whose payload is an
// array under `list`/`rows`/`modes`, map it to the component's expected prop.
function sectionProps(key, data) {
  const d = data[key];
  switch (key) {
    case "phases":   return { title: d.title, lede: d.lede, phases: d.list };
    case "skills":   return { title: d.title, lede: d.lede, skills: d.list };
    case "callouts": return { title: d.title, lede: d.lede, callouts: d.list };
    case "errors":   return { title: d.title, lede: d.lede, errors: d.list };
    case "champions":return { title: d.title, lede: d.lede, champions: d.list };
    case "matchups": return { title: d.title, lede: d.lede, matchups: d.rows };
    case "build":    return { title: d.title, lede: d.lede, build: d.modes };
    case "map":      return d; // already has title/lede/pins/mapSrc/…
    case "triangle": return d; // already has title/lede/nodes/legend
    case "checklist":return d; // already has title/lede/storageKey/items/threshold
    case "practice": return d; // already has title/lede/videos/drills
    default:         return d;
  }
}

function App() {
  const data = window.ROLE_DATA;
  if (!data) {
    return <p style={{ padding: "120px 24px", textAlign: "center" }}>No ROLE_DATA found. Ensure the role data file (role-&lt;role&gt;.jsx) loads before app.jsx.</p>;
  }
  const rendered = SECTION_ORDER.filter(([key]) => hasData(data[key]));
  const tocItems = rendered.map(([key, , label], i) => ({
    id: "s" + String(i + 1).padStart(2, "0"),
    num: String(i + 1).padStart(2, "0"),
    label,
  }));
  return (
    <>
      <Nav activeKey={data.meta.activeKey} />
      <TocSidebar items={tocItems} />
      <Breadcrumb current={data.meta.breadcrumb} />
      <Hero
        eyebrow={data.meta.eyebrow}
        title={data.meta.title}
        intro={data.meta.intro}
        meta={data.meta.meta}
        sigil={data.meta.sigil}
        sigilLabel={data.meta.sigilLabel}
      />
      {rendered.map(([key, Component], i) => {
        const num = String(i + 1).padStart(2, "0");
        return <Component key={key} num={num} id={"s" + num} {...sectionProps(key, data)} />;
      })}
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
