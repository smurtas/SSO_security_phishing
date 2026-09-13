import { Link, Navigate } from "react-router";
import { ProgressSteps } from "../components/ProgressSteps";

export function InstructionPage() {

  function handleStartExperiment() {
    sessionStorage.removeItem("pilotScenarioResponses");
    sessionStorage.removeItem("pilotScenarioOrder");
    sessionStorage.removeItem("pilotScenarioCurrentIndex");
    sessionStorage.removeItem("completedFlowScenarioId");
  }

  
  const profile =
    sessionStorage.getItem("participantProfile");

  if (!profile) {
    return <Navigate to="/participant" replace />;
  }

  return (
    <section className="card">
      <ProgressSteps currentStep={4} />

      <h1>Come funziona il laboratorio</h1>

      <p>
        Ti verranno presentati 30 scenari. Per ciascuno dovrai
        stabilire se la situazione è:
      </p>

      <div className="classification-grid">
        <article>
          <h2>Legittima</h2>
          <p>
            Il flusso appare coerente e non contiene segnali
            rilevanti di rischio.
          </p>
        </article>

        <article>
          <h2>Sospetta</h2>
          <p>
            Non è possibile stabilire con certezza se il flusso
            sia sicuro.
          </p>
        </article>

        <article>
          <h2>Malevola</h2>
          <p>
            Sono presenti elementi compatibili con phishing,
            impersonificazione o abuso delle autorizzazioni.
          </p>
        </article>
      </div>

      <h2>Per ogni scenario</h2>

      <ol className="content-list">
        <li>osserva attentamente dominio, provider e permessi;</li>
        <li>seleziona la tua valutazione;</li>
        <li>indica quanto sei sicuro della risposta;</li>
        <li>
          descrivi brevemente l'elemento che ha influenzato la
          decisione.
        </li>
      </ol>

      <div className="notice">
        Tutti i login, i domini e le richieste di autorizzazione
        sono simulati. Non inserire dati reali.
      </div>

    <Link className="primary-button" to="/google-login" onClick={handleStartExperiment}>
      Entra
    </Link>
    </section>
  );
}