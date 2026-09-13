import { useLocation, useNavigate, } from "react-router";

type TeamCardProps = {
  title: string;
  subtitle: string;
  initials: string;
};

function TeamCard({
  title,
  subtitle,
  initials,
}: TeamCardProps) {
  return (
    <article className="teams-class-card">
      <div className="teams-class-header">
        <div className="teams-class-avatar">
          {initials}
        </div>

        <button
          type="button"
          className="teams-class-menu"
          aria-label={`Opzioni per ${title}`}
        >
          ···
        </button>
      </div>

      <div className="teams-class-body">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </article>
  );
}

export function TeamsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const email =
    location.state?.email ??
    sessionStorage.getItem("autenticatedEmail") ??
    "nome.cognome@scuola.it";

  const initial =
    email.trim().charAt(0).toUpperCase() || "U";

  function handleContinueExperiment() {
    sessionStorage.setItem(
      "completedFlowScenarioId",
      "UC07"
    );

    navigate("/experiment", {
      state: {
        completedScenarioID: "UC07",
      },
    });
  }

  return (
    <main className="teams-page">

      {/* Top bar */}
      <header className="teams-topbar">
        <div className="teams-app-launcher" aria-hidden="true">
          ⋮⋮⋮
        </div>

        <div className="teams-brand">
          Microsoft Teams
        </div>

        <div className="teams-search">
          <span aria-hidden="true">⌕</span>
          <span>Cerca</span>
        </div>

        <div className="teams-user">
          <span className="teams-user-email">
            {email}
          </span>

          <div className="teams-user-avatar">
            {initial}
          </div>
        </div>
      </header>

      <div className="teams-layout">

        {/* Sidebar */}
        <aside className="teams-sidebar">
          <nav>
            <button type="button" className="teams-nav-item">
              <span className="teams-nav-icon">◉</span>
              <span>Attività</span>
            </button>

            <button type="button" className="teams-nav-item">
              <span className="teams-nav-icon">▣</span>
              <span>Chat</span>
            </button>

            <button
              type="button"
              className="teams-nav-item teams-nav-item--active"
            >
              <span className="teams-nav-icon">♙</span>
              <span>Teams</span>
            </button>

            <button type="button" className="teams-nav-item">
              <span className="teams-nav-icon">✓</span>
              <span>Compiti</span>
            </button>

            <button type="button" className="teams-nav-item">
              <span className="teams-nav-icon">□</span>
              <span>Calendario</span>
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <section className="teams-content">
          <div className="teams-content-header">
            <div>
              <h1>I tuoi team</h1>
              <p>
                Classi e corsi a cui partecipi
              </p>
            </div>

            <button
              type="button"
              className="teams-join-button"
            >
              Partecipa a un team o creane uno
            </button>
          </div>

          <div className="teams-tabs">
            <button
              type="button"
              className="teams-tab teams-tab--active"
            >
              I tuoi team
            </button>

            <button type="button" className="teams-tab">
              Classi archiviate
            </button>
          </div>

          <div className="teams-grid">
            <TeamCard
              title="Informatica 5A"
              subtitle="Anno scolastico 2026/27"
              initials="IN"
            />

            <TeamCard
              title="Sistemi e Reti 5A"
              subtitle="Anno scolastico 2026/27"
              initials="SR"
            />

            <TeamCard
              title="Matematica 5A"
              subtitle="Anno scolastico 2026/27"
              initials="MA"
            />

            <TeamCard
              title="Inglese 5A"
              subtitle="Anno scolastico 2026/27"
              initials="EN"
            />

            <TeamCard
              title="TPSIT 5A"
              subtitle="Anno scolastico 2026/27"
              initials="TP"
            />

            <TeamCard
              title="Educazione civica"
              subtitle="Anno scolastico 2026/27"
              initials="EC"
            />
          </div>
          <div className="teams-experiment-continue">
            <button
              type="button"
              className="primary-button"
              onClick={handleContinueExperiment}
            >
              Continua e valuta il flusso
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}