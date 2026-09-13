import { useEffect, useMemo, useRef, useState, } from "react";
import { Navigate, useNavigate, useLocation } from "react-router";
import { ScenarioVisual } from "../components/ScenarioVisual";
import { pilotScenarios } from "../data/scenarios";
import { selectExperimentScenarios } from "../components/selectExperimentScenarios";
import teamsLoginHero from "../assets/ms-background.png";

import type {
  ScenarioClassification,
  ScenarioResponse,
} from "../data/scenarioTypes";

const STORAGE_KEY = "pilotScenarioResponses";

const SCENARIO_ORDER_KEY = "pilotScenarioOrder";
const CURRENT_INDEX_KEY = "pilotScenarioCurrentIndex";
/*
function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1),
    );

    [result[index], result[randomIndex]] = [
      result[randomIndex],
      result[index],
    ];
  }

  return result;
}*/

/**************** */
console.log(
  "participantProfile:",
  sessionStorage.getItem("participantProfile"),
);
export function ExperimentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  /************* */
  const participantProfile =
    sessionStorage.getItem("participantProfile");

  const completedScenarioID =
    (
      location.state as {
        completedScenarioID?: string;
      } | null
    )?.completedScenarioID;

  const scenarios = useMemo(() => {
    /*
     * If experiment was already started, restore
     * exactly the same order of scenarios.
     */
    const storedOrder =
      sessionStorage.getItem(SCENARIO_ORDER_KEY);

    if (storedOrder) {
      try {
        const storedIds =
          JSON.parse(storedOrder) as string[];

        const restoredScenarios = storedIds.flatMap(
          (id) => {
            const scenario = pilotScenarios.find(
              (item) => item.id === id
            );

            return scenario ? [scenario] : [];
          }
        );

        if (
          restoredScenarios.length > 0 &&
          restoredScenarios.length === storedIds.length
        ) {
          return restoredScenarios;
        }
      } catch {
        sessionStorage.removeItem(
          SCENARIO_ORDER_KEY
        );
      }
    }

    const uc01 = pilotScenarios.find(
      (scenario) => scenario.id === "UC01"
    );

    const uc07 = pilotScenarios.find(
      (scenario) => scenario.id === "UC07"
    );

    const randomPool = pilotScenarios.filter(
      (scenario) =>
        scenario.id !== "UC01" &&
        scenario.id !== "UC07"
    );

    const randomScenarios =
      selectExperimentScenarios(randomPool, 28);

    if (!uc01 || !uc07) {
      return randomScenarios;
    }

const totalScenarios =
  randomScenarios.length + 2; // + UC01 + UC07

/*
 * UO07 will be collocated in the middle of the experiment.
 *
 * Examples:
 * 30 scenari -> position 15
 * 9 scenari  -> position 5
 * 8 scenari  -> position 4
 */
const uc07Position =
  Math.ceil(totalScenarios / 2);

/*
 * UC01 is in the first position,
 * so we calculate how many random scenarios
 * should come before UC07.
 */
const randomBeforeUc07 =
  uc07Position - 2;

const orderedScenarios = [
  uc01,

  ...randomScenarios.slice(
    0,
    randomBeforeUc07
  ),

  uc07,

  ...randomScenarios.slice(
    randomBeforeUc07
  ),
];

    sessionStorage.setItem(
      SCENARIO_ORDER_KEY,
      JSON.stringify(
        orderedScenarios.map(
          (scenario) => scenario.id
        )
      )
    );

    return orderedScenarios;
  }, []);


  const [currentIndex, setCurrentIndex] =
    useState(() => {
      const storedIndex =
        sessionStorage.getItem(CURRENT_INDEX_KEY);

      if (storedIndex === null) {
        return 0;
      }

      const parsedIndex = Number(storedIndex);

      if (
        Number.isInteger(parsedIndex) &&
        parsedIndex >= 0 &&
        parsedIndex < scenarios.length
      ) {
        return parsedIndex;
      }

      return 0;
    });

  /******** */
  const [answer, setAnswer] =
    useState<ScenarioClassification | null>(null);
  const [confidence, setConfidence] = useState(3);
  const [explanation, setExplanation] = useState("");

  const [responses, setResponses] =
    useState<ScenarioResponse[]>(() => {
      const storedResponses =
        sessionStorage.getItem(STORAGE_KEY);

      if (!storedResponses) {
        return [];
      }

      try {
        return JSON.parse(
          storedResponses
        ) as ScenarioResponse[];
      } catch {
        return [];
      }
    });

  const startedAtRef = useRef<number>(performance.now());

  const currentScenario = scenarios[currentIndex];


  const completedFlowScenarioId =
    completedScenarioID ??
    sessionStorage.getItem(
      "completedFlowScenarioId"
    );

  useEffect(() => {
    startedAtRef.current = performance.now();
    setAnswer(null);
    setConfidence(3);
    setExplanation("");
  }, [currentIndex]);

  if (!participantProfile) {
    return <Navigate to="/participant" replace />;
  }

  function handleStartMicrosoftFlow() {
    sessionStorage.setItem(
      CURRENT_INDEX_KEY,
      String(currentIndex)
    );

    sessionStorage.removeItem(
      "completedFlowScenarioId"
    );

    navigate("/microsoft-login");
  }
  function handleSubmit() {
    if (!answer) {
      return;
    }

    const reactionTimeMs = Math.round(
      performance.now() - startedAtRef.current,
    );

    const response: ScenarioResponse = {
      scenarioId: currentScenario.id,
      shownOrder: currentIndex + 1,
      answer,
      expectedAnswer: currentScenario.expectedAnswer,
      isCorrect:
        answer === currentScenario.expectedAnswer,
      confidence,
      reactionTimeMs,
      explanation: explanation.trim(),
      answeredAt: new Date().toISOString(),
    };

    const updatedResponses = [...responses, response];

    setResponses(updatedResponses);

    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedResponses),
    );

    const isLastScenario =
      currentIndex === scenarios.length - 1;

    if (isLastScenario) {
      navigate("/results");
      return;
    }

    setCurrentIndex((value) => value + 1);
  }

  return (
    <section className="experiment-card">
      <header className="experiment-header">
        <div>
          <p className="eyebrow">
            Scenario {currentIndex + 1} di {scenarios.length}
          </p>

          <h1>{currentScenario.title}</h1>
        </div>

        <div
          className="experiment-progress"
          aria-label={`Completamento: ${currentIndex + 1
            } di ${scenarios.length}`}
        >
          <span
            style={{
              width: `${((currentIndex + 1) / scenarios.length) * 100
                }%`,
            }}
          />
        </div>
      </header>

      <div className="scenario-context">
        <h2>Contesto</h2>
        <p>{currentScenario.instruction}</p>
      </div>

      {currentScenario.id === "UC01" ? (
        <div className="completed-flow-summary">
          <h2>Flusso completato</h2>

          <p>
            Hai completato il flusso simulato di autenticazione Google
            e hai raggiunto la pagina del corso su Google Classroom.
          </p>

          <div className="completed-flow-steps">
            <span>Google Login</span>
            <span aria-hidden="true">→</span>
            <span>Inserimento password</span>
            <span aria-hidden="true">→</span>
            <span>Google Classroom</span>
          </div>
        </div>
) : currentScenario.id === "UC07" &&
  completedFlowScenarioId !== "UC07" ? (
  <div
    className="teams-login-hero"
    style={{
      backgroundImage: `url(${teamsLoginHero})`,
    }}
  >
    <div className="teams-login-hero-content">
      <h2>
        Accesso a Microsoft
        <br />
        Teams
      </h2>

      <p>
        Teams ti aiuta a organizzare lavoro e tempo libero,
        a chiamare e a chattare con chi vuoi e ad accedere
        ai tuoi file in modo sicuro.
      </p>

      <div className="teams-login-hero-actions">
        <button
          type="button"
          className="teams-login-access-button"
          onClick={handleStartMicrosoftFlow}
        >
          Accedi
        </button>

        <button
          type="button"
          className="teams-login-download-button"
        >
          Scarica Teams
        </button>
      </div>
    </div>
  </div>
      ) : currentScenario.id === "UC07" ? (
        <div className="completed-flow-summary">
          <h2>Flusso completato</h2>

          <p>
            Hai completato il flusso simulato di autenticazione
            Microsoft e hai raggiunto Microsoft Teams.
          </p>

          <div className="completed-flow-steps">
            <span>Microsoft Login</span>
            <span aria-hidden="true">→</span>
            <span>Inserimento password</span>
            <span aria-hidden="true">→</span>
            <span>Microsoft Teams</span>
          </div>
        </div>
      ) : (
        <ScenarioVisual scenario={currentScenario} />
      )}


      {!(
        currentScenario.id === "UC07" &&
        completedFlowScenarioId !== "UC07"
      ) && (
          <div className="scenario-question">        <fieldset>
            <legend>
              Come valuti la situazione mostrata?
            </legend>

            <label className="answer-option">
              <input
                type="radio"
                name="classification"
                checked={answer === "legitimate"}
                onChange={() => setAnswer("legitimate")}
              />

              <span>
                <strong>Legittima</strong>
                <small>
                  Non vedo anomalie rilevanti.
                </small>
              </span>
            </label>

            <label className="answer-option">
              <input
                type="radio"
                name="classification"
                checked={answer === "suspicious"}
                onChange={() => setAnswer("suspicious")}
              />

              <span>
                <strong>Sospetta</strong>
                <small>
                  Non dispongo di informazioni sufficienti.
                </small>
              </span>
            </label>

            <label className="answer-option">
              <input
                type="radio"
                name="classification"
                checked={answer === "malicious"}
                onChange={() => setAnswer("malicious")}
              />

              <span>
                <strong>Malevola</strong>
                <small>
                  Sono presenti segnali compatibili con un attacco.
                </small>
              </span>
            </label>
          </fieldset>

            <label className="range-field">
              <span>
                Quanto sei sicuro della risposta?
                <strong>{confidence}/5</strong>
              </span>

              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={confidence}
                onChange={(event) =>
                  setConfidence(Number(event.target.value))
                }
              />
            </label>

            <label className="text-field">
              Quale elemento ha influenzato maggiormente la tua
              decisione?

              <textarea
                value={explanation}
                onChange={(event) =>
                  setExplanation(event.target.value)
                }
                rows={4}
                maxLength={500}
                placeholder="Ad esempio: dominio, lucchetto, provider, richiesta inattesa..."
              />

              <small>
                {explanation.length}/500 caratteri
              </small>
            </label>

            <button
              type="button"
              className="primary-button"
              disabled={!answer}
              onClick={handleSubmit}
            >
              {currentIndex === scenarios.length - 1
                ? "Completa il test"
                : "Conferma e continua"}
            </button>
          </div>
        )}
    </section>
  );
}