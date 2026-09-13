import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ProgressSteps } from "../components/ProgressSteps";

export function ConsentPage() {
  const navigate = useNavigate();

  const [adultConfirmed, setAdultConfirmed] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [privacyNoticeRead, setPrivacyNoticeRead] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const canContinue =
    adultConfirmed &&
    accepted &&
    privacyNoticeRead &&
    privacyConsent;

  function handleContinue() {
    if (!canContinue) {
      return;
    }

    sessionStorage.setItem("studyConsent", "accepted");
    sessionStorage.setItem("adultConfirmed", "true");
    sessionStorage.setItem("privacyNoticeRead", "true");
    sessionStorage.setItem("privacyConsent", "accepted");

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
          Ho letto le informazioni relative allo studio e acconsento
          volontariamente alla partecipazione.
        </span>
      </label>

      <h2>Trattamento dei dati personali (Progetto XXX)</h2>

      <p>
        Ai sensi dell'art. 13 del Regolamento UE n. 2016/679 (GDPR),
        i tuoi dati personali saranno trattati per finalità di ricerca
        scientifica connesse al progetto XX.
      </p>

      <p>
        I dati saranno trattati tramite strumenti manuali, informatici
        e telematici, comunque idonei a garantire la sicurezza e la
        riservatezza dei dati stessi.
      </p>

      <p>
        La versione integrale dell'informativa sulla privacy è disponibile
        al seguente link:{" "}
        <a
          href="/informativa-privacy.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Informativa sulla privacy
        </a>
        .
      </p>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={privacyNoticeRead}
          onChange={(event) =>
            setPrivacyNoticeRead(event.target.checked)
          }
        />
        <span>
          Ho ricevuto, letto e compreso l’informativa sul trattamento
          dei dati personali.
        </span>
      </label>

      <h2>Consenso al trattamento dei dati</h2>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={privacyConsent}
          onChange={(event) =>
            setPrivacyConsent(event.target.checked)
          }
        />
        <span>
          Acconsento al trattamento dei dati personali forniti per le
          finalità e con le modalità indicate nell'informativa.
        </span>
      </label>

      <div className="button-row">
        <Link className="secondary-button" to="/">
          Indietro
        </Link>

        <button
          type="button"
          className="primary-button"
          disabled={!canContinue}
          onClick={handleContinue}
        >
          Continua
        </button>
      </div>
    </section>
  );
}