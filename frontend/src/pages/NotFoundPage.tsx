import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <section className="card">
      <h1>Pagina non trovata</h1>
      <p>Il percorso richiesto non esiste.</p>

      <Link className="primary-button" to="/">
        Torna alla pagina iniziale
      </Link>
    </section>
  );
}