import { useEffect, useMemo, useRef, useState, } from "react";
import { Navigate, useNavigate, useLocation } from "react-router";
import { ScenarioVisual } from "../components/ScenarioVisual";
import { pilotScenarios } from "../data/scenarios";
import { selectExperimentScenarios } from "../components/selectExperimentScenarios";

import type {
  ScenarioClassification,
  ScenarioResponse,
} from "../data/scenarioTypes";

const STORAGE_KEY = "pilotScenarioResponses";
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
  const selectedScenarios =
    selectExperimentScenarios(pilotScenarios, 30);

  /*
   * Quando arriviamo dalla EduHubPage,
   * UC01 viene spostato all'inizio dell'esperimento.
   */
  if (completedScenarioID === "UC01") {
    const uc01 = pilotScenarios.find(
      (scenario) => scenario.id === "UC01",
    );

    const scenariosWithoutUc01 =
      selectedScenarios.filter(
        (scenario) => scenario.id !== "UC01",
      );

    if (uc01) {
      return [
        uc01,
        ...scenariosWithoutUc01.slice(0, 29),
      ];
    }
  }

  return selectedScenarios;
}, [completedScenarioID]);

const [currentIndex, setCurrentIndex] = useState(0);


/******** */
  const [answer, setAnswer] =
    useState<ScenarioClassification | null>(null);
  const [confidence, setConfidence] = useState(3);
  const [explanation, setExplanation] = useState("");
  const [responses, setResponses] =
    useState<ScenarioResponse[]>([]);

  const startedAtRef = useRef<number>(performance.now());

  const currentScenario = scenarios[currentIndex];
  

  useEffect(() => {
    startedAtRef.current = performance.now();
    setAnswer(null);
    setConfidence(3);
    setExplanation("");
  }, [currentIndex]);

  if (!participantProfile) {
    return <Navigate to="/participant" replace />;
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
      ) : (
        <ScenarioVisual scenario={currentScenario} />
      )}

      <div className="scenario-question">
        <fieldset>
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
    </section>
  );
}