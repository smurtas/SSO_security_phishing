import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";

export function MicrosoftLoginPage() {
  const navigate = useNavigate();

  const [step, setStep] =
    useState<"email" | "password">("email");

  const [email, setEmail] = useState("");
  const [transitioning, setTransitioning] = useState(false);

  // domain is displayed with a different url in the second step to simulate a phishing attempt

  const displayedDomain =
    step === "email"
      ? "login.microsoftonline.com"
      : "login.microsoftonline-secure.com";

function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
  event.preventDefault();

  if (step === "email") {
    setTransitioning(true);

    setTimeout(() => {
      setStep("password");
      setTransitioning(false);
    }, 650);

    return;
  }

  const normEmail = email.trim();

  sessionStorage.setItem(
    "autenticatedEmail",
    normEmail
  );

  sessionStorage.setItem(
    "completedFlowScenarioId",
    "UC07"
  );

  navigate("/teams", {
    state: {
      email: normEmail,
      scenarioID: "UC07",
    },
  });

  }

  return (
    <main className="ms-page">

      <p className="ms-study-warning">
        Simulazione didattica: non inserire credenziali reali.
      </p>

      <section className="ms-browser">
        <div className="ms-browser-toolbar">
          <div
            className="ms-browser-controls"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </div>

          <div className="ms-browser-address">
            <span aria-hidden="true">🔒</span>

            <span>
              https://
              <strong>{displayedDomain}</strong>
            </span>
          </div>
        </div>

<div className="ms-auth-background">

  {transitioning ? (
    <div className="ms-transition">
      <div className="ms-spinner" />
      <p>Verifica dell'account...</p>
    </div>
  ) : (
    <div className="ms-auth-wrapper">

      <section className="ms-auth-card">

        <div
          className="ms-logo"
          aria-label="Microsoft"
        >
          <div
            className="ms-logo-symbol"
            aria-hidden="true"
          >
            <span className="ms-logo-red" />
            <span className="ms-logo-green" />
            <span className="ms-logo-blue" />
            <span className="ms-logo-yellow" />
          </div>

          <span className="ms-logo-text">
            Microsoft
          </span>
        </div>

        <form onSubmit={handleSubmit}>

          {step === "email" ? (
            <>
              <h1 className="ms-title">
                Accedi
              </h1>

              <input
                className="ms-input"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Posta elettronica, telefono o Skype"
                autoComplete="off"
                required
              />

              <p className="ms-text">
                Se non si ha un account,{" "}
                <button
                  className="ms-link"
                  type="button"
                >
                  fare clic qui per crearne uno.
                </button>
              </p>

              <button
                className="ms-link ms-help-link"
                type="button"
              >
                Problemi di accesso all'account?
              </button>

              <div className="ms-actions">
                <button
                  type="button"
                  className="ms-button ms-button-secondary"
                >
                  Indietro
                </button>

                <button
                  type="submit"
                  className="ms-button ms-button-primary"
                >
                  Avanti
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                className="ms-account"
                onClick={() => setStep("email")}
              >
                <span aria-hidden="true">←</span>
                <span>{email}</span>
              </button>

              <h1 className="ms-title">
                Immetti la password
              </h1>

              <input
                className="ms-input"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                required
              />

              <div className="ms-actions">
                <button
                  type="button"
                  className="ms-button ms-button-secondary"
                  onClick={() => setStep("email")}
                >
                  Indietro
                </button>

                <button
                  type="submit"
                  className="ms-button ms-button-primary"
                >
                  Accedi
                </button>
              </div>
            </>
          )}

        </form>
      </section>

      {step === "email" && (
        <button
          className="ms-access-options"
          type="button"
        >
          <span
            className="ms-key-icon"
            aria-hidden="true"
          >
            ⚿
          </span>

          <span>Opzioni di accesso</span>
        </button>
      )}

    </div>
  )}

</div>
      </section>
    </main>
  );
}