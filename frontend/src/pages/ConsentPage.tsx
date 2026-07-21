import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ProgressSteps } from "../components/ProgressSteps";

export function ConsentPage() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [adultConfirmed, setAdultConfirmed] = useState(false);

  function handleContinue() {
    if (!accepted || !adultConfirmed) {
      return;
    }

    sessionStorage.setItem("studyConsent", "accepted");
    navigate("/participant");
  }

  return (
    <section className="card">
      <ProgressSteps currentStep={2} />

      <h1>Informativa e consenso</h1>

      <p>
        Lo studio analizza il modo in cui gli studenti valutano
        scenari legittimi, ambigui e sospetti nei flussi di
        autenticazione federata.
      </p>

      <h2>Partecipazione</h2>

      <ul className="content-list">
        <li>La partecipazione è volontaria.</li>
        <li>Puoi interrompere il laboratorio in qualsiasi momento.</li>
        <li>Non saranno raccolte password o credenziali reali.</li>
        <li>
          Saranno registrate le risposte, il livello di sicurezza
          dichiarato e il tempo impiegato.
        </li>
        <li>
          I risultati saranno analizzati in forma aggregata.
        </li>
      </ul>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={adultConfirmed}
          onChange={(event) =>
            setAdultConfirmed(event.target.checked)
          }
        />
        <span>Confermo di avere almeno 18 anni.</span>
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(event) =>
            setAccepted(event.target.checked)
          }
        />
        <span>
          Ho letto l'informativa e acconsento volontariamente
          alla partecipazione.
        </span>
      </label>

      <div className="button-row">
        <Link className="secondary-button" to="/">
          Indietro
        </Link>

        <button
          type="button"
          className="primary-button"
          disabled={!accepted || !adultConfirmed}
          onClick={handleContinue}
        >
          Continua
        </button>
      </div>
    </section>
  );
}