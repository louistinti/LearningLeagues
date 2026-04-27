// app.jsx — root composition, tweaks wiring.

function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);

  // Reflect tweaks onto <html> — CSS reads data-attrs.
  React.useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-palette", t.palette);
    r.setAttribute("data-density", t.density);
    r.setAttribute("data-accent",  t.accent);
  }, [t.palette, t.density, t.accent]);

  return (
    <>
      <Nav />
      <Breadcrumb />
      <Hero />
      <SectionPhases />
      <SectionMap />
      <SectionSkills />
      <SectionTriangle />
      <SectionPrio2 />
      <SectionErrors />
      <SectionChampions />
      <SectionBuild />
      <SectionMatchups />
      <SectionChecklist />
      <SectionPractice />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Visual direction" />
        <TweakRadio
          label="Palette"
          value={t.palette}
          options={[
            { value: "hextech", label: "Hextech" },
            { value: "codex",   label: "Codex"   },
            { value: "esport",  label: "Esport"  },
          ]}
          onChange={(v) => setTweak("palette", v)}
        />
        <TweakRadio
          label="Accent"
          value={t.accent}
          options={[
            { value: "or",    label: "Gold"  },
            { value: "ambre", label: "Amber" },
            { value: "bleu",  label: "Blue"  },
          ]}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={[
            { value: "aere",    label: "Airy"    },
            { value: "compact", label: "Compact" },
          ]}
          onChange={(v) => setTweak("density", v)}
        />
      </TweaksPanel>
    </>
  );
}

// Set initial attributes BEFORE mount so there's no flash.
(function bootstrap() {
  const d = window.TWEAK_DEFAULTS;
  const r = document.documentElement;
  r.setAttribute("data-palette", d.palette);
  r.setAttribute("data-density", d.density);
  r.setAttribute("data-accent",  d.accent);
})();

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
