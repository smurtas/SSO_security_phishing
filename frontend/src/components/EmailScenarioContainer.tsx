import { useEffect, useState } from "react";
import EmailScenario from "./EmailScenario";

interface EmailData {
  from: string;
  subject: string;
  body: string;
}

interface EmailScenarioContainerProps {
  scenarioId: string;
}

/*
 * Legge una riga CSV rispettando:
 * - virgole dentro campi racchiusi tra virgolette;
 * - doppi apici;
 * - eventuali tabulazioni.
 */
function parseCsvLine(line: string): string[] {
  const columns: string[] = [];
  let currentValue = "";
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const nextCharacter = line[index + 1];

    if (character === '"') {
      /*
       * Due virgolette consecutive rappresentano
       * una virgoletta interna al testo.
       */
      if (insideQuotes && nextCharacter === '"') {
        currentValue += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (
      (character === "," || character === "\t") &&
      !insideQuotes
    ) {
      columns.push(currentValue.trim());
      currentValue = "";
    } else {
      currentValue += character;
    }
  }

  columns.push(currentValue.trim());

  return columns;
}

export default function EmailScenarioContainer({
  scenarioId,
}: EmailScenarioContainerProps) {
  const [email, setEmail] = useState<EmailData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setEmail(null);
    setError("");

    fetch("/data/fine-tuning-ita.csv")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Errore nel caricamento del file: ${response.status}`,
          );
        }

        return response.text();
      })
      .then((text) => {
        const rows = text
          .split(/\r?\n/)
          .filter((row) => row.trim().length > 0);

        /*
         * La prima riga contiene:
         * From, Subject, Body
         */
        const dataRows = rows.slice(1);

        const parsedEmails = dataRows
          .map((row) => parseCsvLine(row))
          .filter((columns) => columns.length >= 3)
          .map((columns) => ({
            from: columns[0],
            subject: columns[1],
            body: columns.slice(2).join(" "),
          }))
          .filter(
            (parsedEmail) =>
              parsedEmail.from.length > 0 &&
              parsedEmail.subject.length > 0 &&
              parsedEmail.body.length > 0,
          );

        if (parsedEmails.length === 0) {
          throw new Error(
            "Nessuna email valida trovata nel file CSV.",
          );
        }

        const randomIndex = Math.floor(
          Math.random() * parsedEmails.length,
        );

        setEmail(parsedEmails[randomIndex]);
      })
      .catch((fetchError: unknown) => {
        console.error(fetchError);

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Errore sconosciuto durante il caricamento.",
        );
      });
  }, [scenarioId]);

  if (error) {
    return (
      <div className="email-error">
        <strong>Impossibile caricare l’email.</strong>
        <p>{error}</p>
      </div>
    );
  }

  if (!email) {
    return <p>Caricamento email...</p>;
  }

  return (
    <EmailScenario
      from={email.from}
      subject={email.subject}
      body={email.body}
    />
  );
}