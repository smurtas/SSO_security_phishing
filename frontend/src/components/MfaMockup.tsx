export function MfaMockup() {
  return (
    <div className="mfa-mockup">
      <div className="mfa-mockup__header">
        <span className="mfa-icon" aria-hidden="true">
          🛡️
        </span>

        <div>
          <h2>Verifica della richiesta di accesso</h2>
          <p>Microsoft School Security</p>
        </div>
      </div>

      <div className="mfa-details">
        <dl>
          <div>
            <dt>Account</dt>
            <dd>nome.cognome@scuola.it</dd>
          </div>

          <div>
            <dt>Origine</dt>
            <dd>school-security-check.net</dd>
          </div>

          <div>
            <dt>Posizione</dt>
            <dd>Località non disponibile</dd>
          </div>

          <div>
            <dt>Stato</dt>
            <dd>Richiesta non avviata dall'utente</dd>
          </div>
        </dl>
      </div>

      <p>
        È stata ricevuta una richiesta di accesso. Seleziona
        un'azione per continuare.
      </p>

      <div className="mfa-actions" aria-hidden="true">
        <button type="button" tabIndex={-1}>
          Approva
        </button>

        <button type="button" tabIndex={-1}>
          Rifiuta
        </button>
      </div>

      <p className="simulation-label">
        I pulsanti fanno parte dello scenario e non sono interattivi.
      </p>
    </div>
  );
}