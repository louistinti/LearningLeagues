// quiz-app.jsx — Role quiz flow: intro → 8 questions (one per screen) → ranked result.
// Ledger question style; shared Nav/Footer from components.jsx.

const QZ_LS_KEY = "ll-quiz-v1";

function qzLoad() {
  try { return JSON.parse(localStorage.getItem(QZ_LS_KEY)) || {}; } catch (e) { return {}; }
}
function qzSave(patch) {
  const cur = qzLoad();
  localStorage.setItem(QZ_LS_KEY, JSON.stringify({ ...cur, ...patch }));
}

const QZ_LETTERS = ["A", "B", "C", "D"];
const QZ_TOTAL = QUIZ_QUESTIONS.length;

function QuizBreadcrumb() {
  return (
    <div className="shell">
      <div className="breadcrumb">
        <a href="Landing.html">Home</a>
        <span className="sep">›</span>
        <span className="current">Role quiz</span>
      </div>
    </div>
  );
}

function QzIntro({ onStart }) {
  return (
    <div className="qz-intro">
      <div className="eyebrow eyebrow--accent">ROLE QUIZ</div>
      <h1 className="qz-intro-title">Which role <em>suits you?</em></h1>
      <p className="qz-intro-lede">
        Eight questions — half in-game situations, half honest personality checks.
        No wrong answers, no meta knowledge required. We rank all five roles for
        you at the end, not just one.
      </p>
      <div className="qz-intro-meta">
        <span><strong>Questions</strong> 8</span>
        <span><strong>Time</strong> ~2 min</span>
        <span><strong>Result</strong> all 5 roles, ranked</span>
      </div>
      <button className="btn-primary" onClick={onStart} data-comment-anchor="quiz-start">
        <span>Start the quiz</span>
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square">
          <path d="M3 8h10M8 3l5 5-5 5" />
        </svg>
      </button>
      <div className="qz-intro-roles" aria-hidden="true">
        <span className="qz-intro-roles-label">Top · Jungle · Mid · ADC · Support</span>
        {QUIZ_ROLE_ORDER.map((k) => (
          <img key={k} src={QUIZ_ROLES[k].icon} alt="" />
        ))}
      </div>
    </div>
  );
}

function QzProgress({ index, onBack }) {
  return (
    <div className="qz-progress">
      <span className="qz-progress-count">
        Q {String(index + 1).padStart(2, "0")} <span className="of">/ {String(QZ_TOTAL).padStart(2, "0")}</span>
      </span>
      <div className="qz-progress-bar">
        <div className="qz-progress-fill" style={{ width: `${(index / QZ_TOTAL) * 100}%` }}></div>
      </div>
      <button className="qz-progress-back" onClick={onBack} disabled={index === 0}>
        ← Back
      </button>
    </div>
  );
}

function QzOptionRows({ question, picked, onPick }) {
  return (
    <ul className="qz-options">
      {question.options.map((opt, i) => (
        <li key={i}>
          <button
            className={"qz-opt" + (picked === i ? " is-picked" : "")}
            onClick={() => onPick(i)}
          >
            <span className="qz-opt-letter">{QZ_LETTERS[i]}</span>
            <span className="qz-opt-label">{opt.label}</span>
            <span className="qz-opt-arrow">→</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function QzKbdHint() {
  return (
    <p className="qz-kbd-hint">
      Keyboard — <b>A</b><b>B</b><b>C</b><b>D</b> to answer · <b>⌫</b> to go back
    </p>
  );
}

function QzQuestion({ index, picked, onPick, onBack }) {
  const question = QUIZ_QUESTIONS[index];
  return (
    <div className="qz-v-ledger">
      <QzProgress index={index} onBack={onBack} />
      <div className="qz-tag">{question.tag}</div>
      <h2 className="qz-question">{question.q}</h2>
      <QzOptionRows question={question} picked={picked} onPick={onPick} />
      <QzKbdHint />
    </div>
  );
}

function QzResult({ answers, onRetake }) {
  const ranking = quizComputeScores(answers);
  const first = ranking[0];
  const max = Math.max(1, first.score);
  return (
    <div className="qz-result">
      <div className="eyebrow eyebrow--accent">VERDICT · {QZ_TOTAL}/{QZ_TOTAL} ANSWERED</div>
      <h1 className="qz-result-title">You&rsquo;re <em>{first.role.article}.</em></h1>
      <blockquote className="qz-result-blurb">{first.role.blurb}</blockquote>

      <ol className="qz-ranking">
        {ranking.map((r, i) => (
          <li key={r.role.key} className={"qz-rank-row" + (i === 0 ? " is-first" : "")}>
            <span className="qz-rank-pos">{String(i + 1).padStart(2, "0")}</span>
            <img className="qz-rank-icon" src={r.role.icon} alt="" />
            <span className="qz-rank-name">{r.role.name}</span>
            <span className="qz-rank-bar-wrap">
              <span
                className="qz-rank-bar"
                style={{ width: `${(r.score / max) * 100}%`, animationDelay: `${i * 90}ms` }}
              ></span>
            </span>
            <span className="qz-rank-score">{r.score} PTS</span>
          </li>
        ))}
      </ol>

      <div className="qz-result-ctas">
        <a className="btn-primary" href={first.role.href}>
          <span>Read the {first.role.name} guide</span>
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square">
            <path d="M3 8h10M8 3l5 5-5 5" />
          </svg>
        </a>
        <button className="btn-ghost" onClick={onRetake}>Retake the quiz</button>
      </div>
    </div>
  );
}

function QuizApp() {
  const saved = React.useMemo(qzLoad, []);
  const [screen, setScreen] = React.useState(saved.screen || "intro"); // intro | q | result
  const [index, setIndex] = React.useState(Number.isInteger(saved.index) ? saved.index : 0);
  const [answers, setAnswers] = React.useState(Array.isArray(saved.answers) ? saved.answers : []);
  const [leaving, setLeaving] = React.useState(false);
  const leavingRef = React.useRef(false);

  React.useEffect(() => {
    qzSave({ screen, index, answers });
  }, [screen, index, answers]);

  const transition = (fn) => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    setTimeout(() => {
      fn();
      leavingRef.current = false;
      setLeaving(false);
    }, 210);
  };

  const start = () => transition(() => { setScreen("q"); setIndex(0); });

  const pick = (optIdx) => {
    const next = answers.slice();
    next[index] = optIdx;
    setAnswers(next);
    transition(() => {
      if (index + 1 >= QZ_TOTAL) setScreen("result");
      else setIndex(index + 1);
    });
  };

  const back = () => {
    if (index === 0) return;
    transition(() => setIndex(index - 1));
  };

  const retake = () => transition(() => {
    setAnswers([]);
    setIndex(0);
    setScreen("intro");
  });

  // Keyboard shortcuts
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      if (screen === "intro" && e.key === "Enter") { start(); return; }
      if (screen !== "q") return;
      const k = e.key.toLowerCase();
      const letterIdx = ["a", "b", "c", "d"].indexOf(k);
      const numIdx = ["1", "2", "3", "4"].indexOf(k);
      const i = letterIdx >= 0 ? letterIdx : numIdx;
      if (i >= 0 && i < QUIZ_QUESTIONS[index].options.length) { e.preventDefault(); pick(i); }
      else if (e.key === "Backspace") { e.preventDefault(); back(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const screenKey = screen === "q" ? `q-${index}` : screen;

  return (
    <>
      <Nav activeKey="quiz" />
      <div className="qz-main" data-screen-label={screen === "q" ? `Question ${index + 1}` : screen === "result" ? "Result" : "Quiz intro"}>
        <QuizBreadcrumb />
        <div className="shell qz-stage">
          <div key={screenKey} className={"qz-screen" + (leaving ? " is-leaving" : "")}>
            {screen === "intro" && <QzIntro onStart={start} />}
            {screen === "q" && (
              <QzQuestion
                index={index}
                picked={answers[index]}
                onPick={pick}
                onBack={back}
              />
            )}
            {screen === "result" && <QzResult answers={answers} onRetake={retake} />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<QuizApp />);
