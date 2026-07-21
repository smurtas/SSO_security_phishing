import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <span className="site-title">SSO Phishing Lab</span>
          <span className="site-subtitle">
            Studio sull'autenticazione federata
          </span>
        </div>
      </header>

      <main className="page-container">{children}</main>

      <footer className="site-footer">
        <p>
          Piattaforma sperimentale. Non vengono richieste credenziali reali.
        </p>
      </footer>
    </div>
  );
}