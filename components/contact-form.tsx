"use client";

import Link from "next/link";
import Script from "next/script";
import { useActionState, useEffect, useRef } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitContact } from "@/app/contacto/actions";
import type { ContactField, ContactFormState } from "@/lib/contact-schema";
import { serviceOptions } from "@/lib/services";
import { site } from "@/lib/site";

declare global {
  interface Window {
    turnstile?: { reset: (widget?: string | HTMLElement) => void };
  }
}

const initialState: ContactFormState = { status: "idle" };

interface ContactFormProps {
  turnstileSiteKey?: string;
  defaultService?: string;
}

export function ContactForm({ turnstileSiteKey, defaultService }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === "idle") return;
    statusRef.current?.focus();
    // A Turnstile token is single-use; get a fresh one for the next attempt.
    if (state.status === "error") window.turnstile?.reset();
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-pc-line bg-white p-8 text-center shadow-card outline-none md:p-12"
      >
        <CheckCircle2 aria-hidden className="mx-auto size-12 text-pc-teal" strokeWidth={1.5} />
        <h2 className="mt-5 text-2xl font-semibold text-pc-navy">Recibimos tu mensaje</h2>
        <p className="mx-auto mt-3 max-w-md text-pc-muted">
          Te responderemos en {site.responseTime}. Guarda tu número de referencia por si
          necesitas darnos seguimiento.
        </p>
        <p className="mt-6 inline-block rounded-lg bg-pc-surface px-5 py-3 font-mono text-lg font-semibold tracking-wider text-pc-navy">
          {state.reference}
        </p>
      </div>
    );
  }

  const error = state.status === "error" ? state : undefined;
  const value = (field: ContactField) => error?.values[field];
  const fieldError = (field: ContactField) => error?.fieldErrors?.[field];

  return (
    <form
      action={formAction}
      noValidate
      aria-describedby={error ? "form-status" : undefined}
      className="rounded-2xl border border-pc-line bg-white p-6 shadow-card md:p-10"
    >
      <div
        id="form-status"
        ref={statusRef}
        tabIndex={-1}
        role="alert"
        className={error ? "mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 outline-none" : "sr-only"}
      >
        {error?.message}
      </div>

      {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Sitio web</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre completo" name="name" required error={fieldError("name")}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            defaultValue={value("name")}
            {...invalid("name", fieldError("name"))}
            className={inputClass}
          />
        </Field>
        <Field label="Correo electrónico" name="email" required error={fieldError("email")}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            defaultValue={value("email")}
            {...invalid("email", fieldError("email"))}
            className={inputClass}
          />
        </Field>
        <Field label="Teléfono" name="phone" error={fieldError("phone")}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={30}
            defaultValue={value("phone")}
            {...invalid("phone", fieldError("phone"))}
            className={inputClass}
          />
        </Field>
        <Field label="Empresa u organización" name="company" error={fieldError("company")}>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            maxLength={160}
            defaultValue={value("company")}
            {...invalid("company", fieldError("company"))}
            className={inputClass}
          />
        </Field>
        <Field label="Cargo" name="jobTitle" error={fieldError("jobTitle")}>
          <input
            id="jobTitle"
            name="jobTitle"
            autoComplete="organization-title"
            maxLength={120}
            defaultValue={value("jobTitle")}
            {...invalid("jobTitle", fieldError("jobTitle"))}
            className={inputClass}
          />
        </Field>
        <Field label="País" name="country" error={fieldError("country")}>
          <input
            id="country"
            name="country"
            autoComplete="country-name"
            maxLength={80}
            defaultValue={value("country") ?? "República Dominicana"}
            {...invalid("country", fieldError("country"))}
            className={inputClass}
          />
        </Field>
        <Field
          label="¿Qué servicio te interesa?"
          name="service"
          required
          error={fieldError("service")}
          className="sm:col-span-2"
        >
          <select
            id="service"
            name="service"
            required
            defaultValue={value("service") ?? defaultService ?? ""}
            {...invalid("service", fieldError("service"))}
            className={inputClass}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="¿Qué necesitas resolver?"
          name="message"
          required
          error={fieldError("message")}
          hint="Describe el problema, el plazo y cualquier restricción relevante. No incluyas contraseñas ni datos sensibles."
          className="sm:col-span-2"
        >
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            minLength={20}
            maxLength={5000}
            defaultValue={value("message")}
            {...invalid("message", fieldError("message"), true)}
            className={`${inputClass} resize-y`}
          />
        </Field>
      </div>

      <fieldset className="mt-6 space-y-4">
        <legend className="sr-only">Consentimiento</legend>
        <Checkbox name="consentPrivacy" required error={fieldError("consentPrivacy")} defaultChecked={value("consentPrivacy") === "on"}>
          He leído y acepto la{" "}
          <Link href="/privacidad" target="_blank" className="font-medium text-pc-blue underline underline-offset-2">
            política de privacidad
          </Link>{" "}
          y autorizo a ProofCore a tratar mis datos para responder esta solicitud.{" "}
          <span className="text-red-700">*</span>
        </Checkbox>
        <Checkbox name="consentMarketing" defaultChecked={value("consentMarketing") === "on"}>
          Acepto recibir comunicaciones comerciales de ProofCore. Puedo darme de baja en cualquier
          momento.
        </Checkbox>
      </fieldset>

      {turnstileSiteKey && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />
          <div className="cf-turnstile mt-6" data-sitekey={turnstileSiteKey} data-language="es" />
        </>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-pc-muted">
          <span className="text-red-700">*</span> Campos obligatorios
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-pc-electric px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pc-blue disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" /> Enviando…
            </>
          ) : (
            <>
              Enviar solicitud <Send aria-hidden className="size-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "block w-full rounded-lg border border-pc-line bg-white px-3.5 py-2.5 text-pc-dark shadow-xs transition-colors placeholder:text-pc-muted/60 hover:border-pc-sky focus:border-pc-electric focus:ring-2 focus:ring-pc-electric/20 focus:outline-none aria-invalid:border-red-500 aria-invalid:ring-red-500/20";

function invalid(field: string, error: string | undefined, describedByHint = false) {
  const describedBy = [describedByHint && `${field}-hint`, error && `${field}-error`]
    .filter(Boolean)
    .join(" ");
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy || undefined,
  } as const;
}

function Field({
  label,
  name,
  required,
  error,
  hint,
  className = "",
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-pc-navy">
        {label}
        {required && <span className="text-red-700"> *</span>}
      </label>
      {children}
      {hint && (
        <p id={`${name}-hint`} className="mt-1.5 text-xs text-pc-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function Checkbox({
  name,
  required,
  error,
  defaultChecked,
  children,
}: {
  name: string;
  required?: boolean;
  error?: string;
  defaultChecked?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex gap-3 text-sm leading-relaxed text-pc-dark">
        <input
          type="checkbox"
          name={name}
          required={required}
          defaultChecked={defaultChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
          className="mt-1 size-4 shrink-0 rounded border-pc-line accent-pc-electric"
        />
        <span>{children}</span>
      </label>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 ml-7 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
