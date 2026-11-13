"use server";

import { headers } from "next/headers";
import { isIP } from "node:net";
import {
  contactFields,
  contactFormSchema,
  type ChatSubmission,
  type ChatSubmitResult,
  type ContactField,
  type ContactFormState,
} from "@/lib/contact-schema";
import { site } from "@/lib/site";

const MIN_FILL_TIME_MS = 3_000;
const MAX_FILL_TIME_MS = 24 * 60 * 60 * 1000;

type ContactData = ReturnType<typeof contactFormSchema.parse>;

type DeliveryResult = { ok: true; reference: string } | { ok: false; message: string };

function readValues(formData: FormData) {
  const values: Partial<Record<ContactField, string>> = {};
  for (const field of contactFields) {
    const value = formData.get(field);
    if (typeof value === "string") values[field] = value.slice(0, 5000);
  }
  return values;
}

function looksAutomated(honeypot: unknown, startedAt: unknown) {
  if (typeof honeypot === "string" && honeypot.length > 0) return true;
  // The timestamp is set by client JS, so it is only checked when present.
  if (startedAt === undefined || startedAt === null || startedAt === "") return false;
  const elapsed = Date.now() - Number(startedAt);
  return !Number.isFinite(elapsed) || elapsed < MIN_FILL_TIME_MS || elapsed > MAX_FILL_TIME_MS;
}

async function clientContext() {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  const candidate = forwarded || h.get("x-real-ip") || "";
  return {
    ip: isIP(candidate) ? candidate : undefined,
    userAgent: (h.get("user-agent") ?? "").slice(0, 300),
  };
}

async function deliver(
  data: ContactData,
  options: { channel: "formulario" | "asistente"; sourcePath: string; turnstileToken?: unknown },
): Promise<DeliveryResult> {
  const apiUrl = process.env.API_URL;
  const apiKey = process.env.API_INTERNAL_KEY;
  if (!apiUrl || !apiKey) {
    console.error("Contact delivery misconfigured: API_URL or API_INTERNAL_KEY missing");
    return { ok: false, message: unavailableMessage() };
  }

  const { consentPrivacy, ...rest } = data;
  const token = options.turnstileToken;
  const client = await clientContext();

  try {
    const response = await fetch(new URL("/v1/contact", apiUrl), {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        ...(client.ip && { "x-client-ip": client.ip }),
        "x-client-user-agent": client.userAgent,
      },
      body: JSON.stringify({
        ...rest,
        consentPrivacy: consentPrivacy === "on",
        privacyPolicyVersion: site.privacyPolicyVersion,
        sourcePath: options.sourcePath,
        channel: options.channel,
        ...(typeof token === "string" && token && { turnstileToken: token.slice(0, 2048) }),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });

    if (response.status === 202) {
      const { reference } = (await response.json()) as { reference: string };
      return { ok: true, reference };
    }
    if (response.status === 429) {
      return {
        ok: false,
        message: "Has enviado varias solicitudes seguidas. Espera unos minutos e inténtalo de nuevo.",
      };
    }
    if (response.status === 403) {
      return {
        ok: false,
        message: "No pudimos verificar que no eres un robot. Completa la verificación e inténtalo de nuevo.",
      };
    }
    if (response.status === 400) {
      return { ok: false, message: "Revisa la información e inténtalo de nuevo." };
    }
    console.error(`Contact API responded ${response.status}`);
  } catch (error) {
    console.error("Contact API unreachable", error);
  }
  return { ok: false, message: unavailableMessage() };
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = readValues(formData);

  // Bots fill every field and submit instantly. Pretend success so they don't adapt.
  if (looksAutomated(formData.get("website"), formData.get("startedAt"))) {
    return { status: "success", reference: "PC-RECIBIDO" };
  }

  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      fieldErrors[field] ??= issue.message;
    }
    return { status: "error", message: "Revisa los campos marcados.", fieldErrors, values };
  }

  const result = await deliver(parsed.data, {
    channel: "formulario",
    sourcePath: "/contacto",
    turnstileToken: formData.get("cf-turnstile-response"),
  });
  return result.ok
    ? { status: "success", reference: result.reference }
    : { status: "error", message: result.message, values };
}

/** Same pipeline as the form, fed by the step-by-step site assistant. */
export async function submitChatContact(input: ChatSubmission): Promise<ChatSubmitResult> {
  if (typeof input !== "object" || input === null) {
    return { ok: false, message: "Revisa la información e inténtalo de nuevo." };
  }
  if (looksAutomated(input.website, input.startedAt)) {
    return { ok: true, reference: "PC-RECIBIDO" };
  }

  // Mirror what an HTML form posts: skipped text fields arrive as "", unchecked boxes are absent.
  const values: Partial<Record<ContactField, string>> = {};
  for (const field of contactFields) {
    const value = input[field];
    if (typeof value === "string") values[field] = value.slice(0, 5000);
    else if (field !== "consentPrivacy" && field !== "consentMarketing") values[field] = "";
  }
  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Revisa la información." };
  }

  const sourcePath =
    typeof input.sourcePath === "string" && input.sourcePath.startsWith("/")
      ? input.sourcePath.slice(0, 200)
      : "/";
  return deliver(parsed.data, {
    channel: "asistente",
    sourcePath,
    turnstileToken: input.turnstileToken,
  });
}

function unavailableMessage() {
  const email = site.contact.email;
  return email
    ? `No pudimos enviar tu mensaje en este momento. Inténtalo de nuevo o escríbenos a ${email}.`
    : "No pudimos enviar tu mensaje en este momento. Inténtalo de nuevo en unos minutos.";
}
