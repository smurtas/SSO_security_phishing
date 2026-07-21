import { Link } from "react-router";
import { ProgressSteps } from "../components/ProgressSteps";

export function LandingPage() {
  return (
    <section className="card">
      <ProgressSteps currentStep={1} />

      <p className="eyebrow">Studio sperimentale</p>

      <h1>
        Sicurezza nei processi di autenticazione federata
      </h1>

      <p className="lead">
        Durante il laboratorio valuterai una serie di situazioni
        relative a login Google e Microsoft, autorizzazioni OAuth,
        OpenID Connect, SAML ed email collegate ai processi di
        autenticazione.
      </p>

      <div className="info-grid">
        <article>
          <h2>Durata</h2>
          <p>Circa 20–25 minuti.</p>
        </article>

        <article>
          <h2>Scenari</h2>
          <p>30 casi selezionati casualmente.</p>
        </article>

        <article>
          <h2>Dati</h2>
          <p>
            Le risposte saranno associate a un codice anonimo.
          </p>
        </article>
      </div>

      <div className="notice">
        <strong>Importante:</strong> non inserire mai password,
        credenziali reali o codici di autenticazione.
      </div>

      <Link className="primary-button" to="/consent">
        Inizia
      </Link>
    </section>
  );
}