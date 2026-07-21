import googleLogo from "../assets/logoG_google.png";


interface BrowserMockupProps {
  domain: string;
  secure: boolean;
  provider: "google" | "microsoft";
  fakeWindow?: boolean;
}

export function BrowserMockup({
  domain,
  secure,
  provider,
  fakeWindow = false,
}: BrowserMockupProps) {
  const providerName =
    provider === "google" ? "Google" : "Microsoft";

  return (
    <div
      className={[
        "browser-mockup",
        fakeWindow ? "browser-mockup--embedded" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="browser-toolbar">
        <div className="browser-controls" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="browser-address">
          <span aria-label={secure ? "Connessione HTTPS" : "Connessione HTTP"}>
            {secure ? "🔒" : "⚠️"}
          </span>

          <span>{secure ? "https://" : "http://"}</span>
          <strong>{domain}</strong>
        </div>
      </div>

      <div className="provider-login">
         <div className="google-logo" aria-label="Google">
                        {/*
                        <span className="google-blue">G</span>
                        <span className="google-red">o</span>
                        <span className="google-yellow">o</span>
                        <span className="google-blue">g</span>
                        <span className="google-green">l</span>
                        <span className="google-red">e</span>
                        */}
                        <img className="google-logo-image" src={googleLogo} alt="logo Google" />
                    </div>

        <h2>Accedi con {providerName}</h2>

        <p>Utilizza il tuo account per continuare su Student Hub.</p>

        <div className="simulated-input">
          nome.cognome@scuola.it
        </div>

        <button type="button" className="provider-button">
          Avanti
        </button>

        <p className="simulation-label">
          Schermata simulata: non inserire credenziali.
        </p>
      </div>
    </div>
  );
}