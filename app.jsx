// app.jsx — root composition for the Support page.

function App() {
  return (
    <>
      <Nav />
      <TocSidebar />
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
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
