
import { useNavigate, useLocation } from "react-router";

export function EduHubPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const routerEmail = (location.state as { email?: string } | null)?.email;

    const email = routerEmail || sessionStorage.getItem("autenticatedEmail") || "studenti@scuola.it";


/*
    console.log("Router state:", location.state);
    console.log(
        "Session email:",
        sessionStorage.getItem("authenticatedEmail")
    );
*/
    return (
        <main className="classroom-page">
            <header className="classroom-header">
                <div>
                    <span className="classroom-brand">Google Classroom</span>
                    <h1>Corso di Sicurezza Informatica</h1>
                </div>

                <div className="classroom-user">
                    <span>{email}</span>
                </div>
            </header>

            <section className="classroom-banner">
                <div>
                    <p>Anno accademico 2025–2026</p>
                    <h2>Sicurezza Informatica</h2>
                    <span>Prof. Mario Rossi</span>
                </div>
            </section>

            <section className="classroom-content">
                <aside className="classroom-sidebar">
                    <h3>In scadenza</h3>
                    <p>Nessun lavoro in scadenza</p>
                </aside>

                <div className="classroom-stream">
                    <article className="classroom-card">
                        <h3>Materiale del corso</h3>
                        <p>
                            Consulta le risorse pubblicate dal docente per completare
                            l’attività.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/experiment", {
                                state: {completedScenarioID: "UC01"},
                            })}
                        >
                            Continua e valuta il flusso
                        </button>
                    </article>
                </div>
            </section>
        </main>
    );
}