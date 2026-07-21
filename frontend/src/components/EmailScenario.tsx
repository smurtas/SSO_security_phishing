interface EmailScenarioProps {
  from: string;
  subject: string;
  body: string;
}

function formatEmailBody(body: string): string[] {
  return body
    /*
     * Inserisce una nuova riga prima di alcuni elementi
     * che normalmente iniziano una sezione.
     */
    .replace(
      /\s+(https?:\/\/)/g,
      "\n$1",
    )
    .replace(
      /\s+(-\s+)/g,
      "\n$1",
    )
    .replace(
      /\s+(Registrati ora|Ulteriori informazioni|Data e ora:|Dettagli|Percorsi in evidenza|Relatori in primo piano|Cosa dicono i nostri clienti|Se preferisci non ricevere|Amazon Web Services, Inc\.)/g,
      "\n\n$1",
    )
    .replace(
      /\s+([123]\s+(?:Nozioni|Percorsi|Strumenti))/g,
      "\n\n$1",
    )
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);
}

function renderParagraph(paragraph: string, index: number) {
  const isUrl = paragraph.startsWith("http");

  if (isUrl) {
    return (
      <p key={index} className="email-link-line">
        <a
          href={paragraph}
          target="_blank"
          rel="noreferrer"
        >
          {paragraph}
        </a>
      </p>
    );
  }

  if (paragraph.startsWith("-")) {
    return (
      <p key={index} className="email-list-item">
        {paragraph}
      </p>
    );
  }

  return <p key={index}>{paragraph}</p>;
}

export default function EmailScenario({
  from,
  subject,
  body,
}: EmailScenarioProps) {
  const paragraphs = formatEmailBody(body);

  return (
    <div className="email-client">
      <div className="email-toolbar">
        <span aria-hidden="true">←</span>
        <span aria-hidden="true">🗑</span>
        <span aria-hidden="true">✉</span>
        <span aria-hidden="true">⋮</span>
      </div>

      <article className="email-message">
        <header className="email-message-header">
          <h2>{subject}</h2>

          <div className="email-sender-row">
            <div className="email-avatar" aria-hidden="true">
              {from.charAt(0).toUpperCase()}
            </div>

            <div className="email-sender-details">
              <strong>{from}</strong>
              <small>A me</small>
            </div>

            <time>10:32</time>
          </div>
        </header>

        <div className="email-message-body">
          {paragraphs.map(renderParagraph)}
        </div>

        <footer className="email-message-actions">
          <button type="button">Rispondi</button>
          <button type="button">Inoltra</button>
        </footer>
      </article>
    </div>
  );
}