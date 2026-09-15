import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import {
  participantSchema,
  type ParticipantFormData,
} from "../schemas/participant";
import { ProgressSteps } from "../components/ProgressSteps";
import { supabase } from "../lib/supabase";

const initialForm: ParticipantFormData = {
  participantCode: "",
  age: 18,
  sex: "male",
  school: "buonarroti",
  studyProgram: "",
  ssoUsage: 3,
  mfaUsage: "unsure",
  digitalSkill: 3,
  protocolKnowledge: 1,
};

export function ParticipantPage() {
  const navigate = useNavigate();
  const [form, setForm] =
    useState<ParticipantFormData>(initialForm);
  const [errors, setErrors] = useState<string[]>([]);
  const [isValidatingCode, setIsValidatingCode] = useState(false);

  const hasConsent =
    sessionStorage.getItem("studyConsent") === "accepted";

  if (!hasConsent) {
    return <Navigate to="/consent" replace />;
  }

  function updateField<K extends keyof ParticipantFormData>(
    field: K,
    value: ParticipantFormData[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent,
  ) {
    event.preventDefault();

    const result =
      participantSchema.safeParse(form);

    if (!result.success) {
      setErrors(
        result.error.issues.map(
          (issue) => issue.message,
        ),
      );
      return;
    }

    setIsValidatingCode(true);
    setErrors([]);

    try {
      const { data, error } =
        await supabase.functions.invoke(
          "validate-participant-code",
          {
            body: {
              code: result.data.participantCode,
            },
          },
        );

      if (error) {
        console.error(
          "Code validation error:",
          error,
        );

        setErrors([
          "Non è stato possibile verificare il codice. Riprova.",
        ]);

        return;
      }

      if (
        !data?.valid ||
        typeof data.studyId !== "string"
      ) {
        setErrors([
          "Il codice partecipante non è valido.",
        ]);

        return;
      }

      /*
       * Rimuoviamo il codice originale dai dati
       * conservati nel browser.
       */
      const {
        participantCode: _participantCode,
        ...participantData
      } = result.data;

      sessionStorage.setItem(
        "studyId",
        data.studyId,
      );

      sessionStorage.setItem(
        "participantProfile",
        JSON.stringify(participantData),
      );

      navigate("/instructions");

    } catch (error) {
      console.error(
        "Unexpected validation error:",
        error,
      );

      setErrors([
        "Si è verificato un errore durante la verifica del codice.",
      ]);

    } finally {
      setIsValidatingCode(false);
    }
  }

  return (
    <section className="card">
      <ProgressSteps currentStep={3} />

      <h1>Informazioni iniziali</h1>

      <p>
        Le informazioni saranno utilizzate esclusivamente per
        confrontare gruppi aggregati di partecipanti.
      </p>

      {errors.length > 0 && (
        <div className="error-box" role="alert">
          <strong>Controlla i seguenti campi:</strong>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="form-grid__wide">
            Codice partecipante
            <input
              type="text"
              value={form.participantCode}
              onChange={(event) =>
                updateField(
                  "participantCode",
                  event.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9]/g, "")
                )
              }
              placeholder="Esempio: A7K4P9RX2M"
              maxLength={10}
              autoComplete="off"
              required
            />

            <small>
              Inserisci il codice casuale che ti è stato assegnato.
              Il codice serve a collegare le diverse fasi dello studio.
            </small>
          </label>
          <label>
            Età
            <input
              type="number"
              min="18"
              max="25"
              value={form.age}
              onChange={(event) =>
                updateField(
                  "age",
                  Number(event.target.value),
                )
              }
            />
          </label>
          <label>
            Sesso
            <select
              value={form.sex}
              onChange={(event) =>
                updateField(
                  "sex",
                  event.target.value as ParticipantFormData["sex"],
                )
              }
            >
              <option value="male">Maschile</option>
              <option value="female">Femminile</option>
            </select>
          </label>

          <label>
            Istituto
            <select
              value={form.school}
              onChange={(event) =>
                updateField(
                  "school",
                  event.target.value as ParticipantFormData["school"],
                )
              }
            >
              <option value="buonarroti">Buonarroti</option>
              <option value="marconi">Marconi</option>
              <option value="tambosi">Tambosi</option>
              <option value="other">Altro</option>
            </select>
          </label>

          <label className="form-grid__wide">
            Indirizzo di studio
            <input
              type="text"
              value={form.studyProgram}
              onChange={(event) =>
                updateField(
                  "studyProgram",
                  event.target.value,
                )
              }
              placeholder="Esempio: Informatica"
            />
          </label>

          <label>
            Quanto spesso utilizzi “Accedi con Google”,
            Microsoft o servizi simili?
            <select
              value={form.ssoUsage}
              onChange={(event) =>
                updateField(
                  "ssoUsage",
                  Number(event.target.value),
                )
              }
            >
              <option value={1}>Mai</option>
              <option value={2}>Raramente</option>
              <option value={3}>Qualche volta</option>
              <option value={4}>Spesso</option>
              <option value={5}>Quasi sempre</option>
            </select>
          </label>

          <label>
            Utilizzi l'autenticazione multifattore?
            <select
              value={form.mfaUsage}
              onChange={(event) =>
                updateField(
                  "mfaUsage",
                  event.target.value as ParticipantFormData["mfaUsage"],
                )
              }
            >
              <option value="yes">Sì</option>
              <option value="no">No</option>
              <option value="unsure">Non so</option>
            </select>
          </label>

          <label>
            Come valuti le tue competenze digitali?
            <select
              value={form.digitalSkill}
              onChange={(event) =>
                updateField(
                  "digitalSkill",
                  Number(event.target.value),
                )
              }
            >
              <option value={1}>1 — Molto basse</option>
              <option value={2}>2</option>
              <option value={3}>3 — Medie</option>
              <option value={4}>4</option>
              <option value={5}>5 — Molto alte</option>
            </select>
          </label>

          <label>
            Quanto conosci OAuth, OpenID Connect o SAML?
            <select
              value={form.protocolKnowledge}
              onChange={(event) =>
                updateField(
                  "protocolKnowledge",
                  Number(event.target.value),
                )
              }
            >
              <option value={1}>1 — Per nulla</option>
              <option value={2}>2</option>
              <option value={3}>3 — Conoscenza di base</option>
              <option value={4}>4</option>
              <option value={5}>5 — Molto bene</option>
            </select>
          </label>
        </div>

        <div className="button-row">
          <Link className="secondary-button" to="/consent">
            Indietro
          </Link>

          <button
            className="primary-button"
            type="submit"
            disabled={isValidatingCode}
          >
            {isValidatingCode
              ? "Verifica codice..."
              : "Continua"}
          </button>
        </div>
      </form>
    </section>
  );
}