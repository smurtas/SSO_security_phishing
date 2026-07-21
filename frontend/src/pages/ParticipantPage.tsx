import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import {
  participantSchema,
  type ParticipantFormData,
} from "../schemas/participant";
import { ProgressSteps } from "../components/ProgressSteps";

const initialForm: ParticipantFormData = {
  age: 18,
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

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const result = participantSchema.safeParse(form);

    if (!result.success) {
      setErrors(
        result.error.issues.map((issue) => issue.message),
      );
      return;
    }

    sessionStorage.setItem(
      "participantProfile",
      JSON.stringify(result.data),
    );

    setErrors([]);
    navigate("/instructions");
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

          <button className="primary-button" type="submit">
            Continua
          </button>
        </div>
      </form>
    </section>
  );
}