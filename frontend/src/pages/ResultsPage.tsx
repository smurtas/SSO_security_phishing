import { useMemo } from "react";
import {
  Navigate,
  useNavigate,
} from "react-router";
import type { ScenarioResponse } from "../data/scenarioTypes";

const STORAGE_KEY = "pilotScenarioResponses";

function formatTime(milliseconds: number): string {
  return `${(milliseconds / 1000).toFixed(1)} s`;
}

export function ResultsPage() {
  const navigate = useNavigate();

  const responses = useMemo(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    try {
      return JSON.parse(stored) as ScenarioResponse[];
    } catch {
      return [];
    }
  }, []);

  if (responses.length === 0) {
    return <Navigate to="/experiment" replace />;
  }

  const correctResponses = responses.filter(
    (response) => response.isCorrect,
  ).length;

  const averageConfidence =
    responses.reduce(
      (total, response) => total + response.confidence,
      0,
    ) / responses.length;

  const averageReactionTime =
    responses.reduce(
      (total, response) =>
        total + response.reactionTimeMs,
      0,
    ) / responses.length;

  function restartPilot() {
    sessionStorage.removeItem(STORAGE_KEY);
    navigate("/");
  }

  return (
    <section className="card">
      <p className="eyebrow">Test pilota completato</p>

      <h1>Risultati tecnici della sessione</h1>

      <p>
        Questa schermata è temporanea e serve a verificare che
        risposte e tempi vengano registrati correttamente.
      </p>

      <div className="results-grid">
        <article>
          <span>Risposte corrette</span>
          <strong>
            {correctResponses}/{responses.length}
          </strong>
        </article>

        <article>
          <span>Confidenza media</span>
          <strong>
            {averageConfidence.toFixed(1)}/5
          </strong>
        </article>

        <article>
          <span>Tempo medio</span>
          <strong>
            {formatTime(averageReactionTime)}
          </strong>
        </article>
      </div>

      <div className="response-list">
        {responses.map((response) => (
          <article key={response.scenarioId}>
            <header>
              <strong>{response.scenarioId}</strong>

              <span
                className={
                  response.isCorrect
                    ? "status status--correct"
                    : "status status--wrong"
                }
              >
                {response.isCorrect
                  ? "Corretta"
                  : "Errata"}
              </span>
            </header>

            <dl>
              <div>
                <dt>Risposta</dt>
                <dd>{response.answer}</dd>
              </div>

              <div>
                <dt>Confidenza</dt>
                <dd>{response.confidence}/5</dd>
              </div>

              <div>
                <dt>Tempo</dt>
                <dd>
                  {formatTime(response.reactionTimeMs)}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="secondary-button"
        onClick={restartPilot}
      >
        Ripeti il test 
      </button>
    </section>
  );
}