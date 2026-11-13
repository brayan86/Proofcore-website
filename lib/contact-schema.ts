import { z } from "zod";
import { serviceOptions } from "./services";

const serviceValues = serviceOptions.map((o) => o.value) as [string, ...string[]];

const optionalText = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, message)
    .transform((v) => v || undefined);

/** Mirrors the API validation so visitors get field-level feedback in Spanish. */
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre completo.").max(120, "Máximo 120 caracteres."),
  email: z
    .string()
    .trim()
    .max(254, "Correo demasiado largo.")
    .pipe(z.email("Escribe un correo electrónico válido.")),
  phone: optionalText(30, "Máximo 30 caracteres.").refine(
    (v) => v === undefined || /^[+()\d\s.-]{7,30}$/.test(v),
    "Escribe un número de teléfono válido.",
  ),
  company: optionalText(160, "Máximo 160 caracteres."),
  jobTitle: optionalText(120, "Máximo 120 caracteres."),
  country: optionalText(80, "Máximo 80 caracteres."),
  service: z.enum(serviceValues, "Selecciona el servicio que te interesa."),
  message: z
    .string()
    .trim()
    .min(20, "Cuéntanos un poco más (mínimo 20 caracteres).")
    .max(5000, "Máximo 5000 caracteres."),
  consentPrivacy: z.literal("on", "Debes aceptar la política de privacidad para enviar el formulario."),
  consentMarketing: z
    .literal("on")
    .optional()
    .transform((v) => v === "on"),
});

export type ContactField = keyof z.input<typeof contactFormSchema>;

export const contactFields = [
  "name",
  "email",
  "phone",
  "company",
  "jobTitle",
  "country",
  "service",
  "message",
  "consentPrivacy",
  "consentMarketing",
] as const satisfies readonly ContactField[];

/** Answers collected by the site assistant; consent fields use the form's `"on"` convention. */
export type ChatSubmission = Partial<Record<ContactField, string>> & {
  sourcePath?: string;
  startedAt?: number;
  website?: string;
  turnstileToken?: string;
};

export type ChatSubmitResult = { ok: true; reference: string } | { ok: false; message: string };

export type ContactFormState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<ContactField, string>>;
      values: Partial<Record<ContactField, string>>;
    }
  | { status: "success"; reference: string };
