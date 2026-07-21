import { Navigate } from "react-router";

export function ExperimentPlaceholderPage() {
  const profile =
    sessionStorage.getItem("participantProfile");

  if (!profile) {
    return <Navigate to="/participant" replace />;
  }

  return (
    <section className="card">
      <p className="eyebrow">Milestone completata</p>
      <h1>Il questionario iniziale funziona</h1>

      <p>
        Nel prossimo passaggio collegheremo questa pagina ai
        primi tre scenari sperimentali.
      </p>
    </section>
  );
}