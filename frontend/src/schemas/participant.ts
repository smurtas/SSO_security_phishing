import * as z from "zod";

export const participantSchema = z.object({
  participantCode: z
  .string()
  .trim()
  .regex(
    /^[A-Z0-9]{6}$/,
    "Il codice partecipante deve contenere 6 caratteri alfanumerici.",
  ),

sex: z.enum(["male", "female"]),
  age: z
    .number()
    .int()
    .min(18, "È necessario avere almeno 18 anni.")
    .max(25, "Inserisci un'età valida."),

  school: z.enum([
    "buonarroti",
    "marconi",
    "tambosi",
    "other",
  ]),

  studyProgram: z
    .string()
    .trim()
    .min(2, "Indica l'indirizzo di studio.")
    .max(100),

  ssoUsage: z.number().int().min(1).max(5),

  mfaUsage: z.enum([
    "yes",
    "no",
    "unsure",
  ]),

  digitalSkill: z.number().int().min(1).max(5),

  protocolKnowledge: z.number().int().min(1).max(5),
});

export type ParticipantFormData = z.infer<
  typeof participantSchema
>;