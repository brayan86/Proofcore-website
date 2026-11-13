"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ExternalLink, Loader2, Mail, MessageCircle, Phone, SendHorizontal, X } from "lucide-react";
import { submitChatContact } from "@/app/contacto/actions";
import { contactFormSchema, type ChatSubmission } from "@/lib/contact-schema";
import { serviceOptions } from "@/lib/services";
import iconWhite from "@/public/brand/proofcore-icon-white.svg";

type Step =
  | "menu"
  | "name"
  | "email"
  | "phone"
  | "company"
  | "service"
  | "message"
  | "consentPrivacy"
  | "consentMarketing"
  | "review"
  | "sending"
  | "done";

interface Action {
  label: string;
  href: string;
  external?: boolean;
  icon?: "mail" | "phone" | "whatsapp" | "link";
}

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  actions?: Action[];
  tone?: "fallback" | "success";
}

interface ChatAssistantProps {
  contactEmail: string;
  phone?: string;
  whatsappUrl?: string;
  turnstileSiteKey?: string;
}

interface TurnstileApi {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
}

const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const MENU_OPTIONS = ["Solicitar información o cotización", "Ver servicios", "Otros canales"];
const SKIP = /^(omitir|no|ninguno|ninguna|n\/a|-)$/;
const YES = /^(si|acepto|claro|ok|de acuerdo|dale|correcto|enviar|confirmo)\b/;
const NO = /^(no|no acepto|rechazo|nunca)\b/;

/** Lowercase without accents, for forgiving keyword matching. */
const normalize = (text: string) =>
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

const serviceKeywords: [string, RegExp][] = [
  ["drones-geoespacial", /dron|aere|fotogrametr|\b3d\b|topograf|georref|levantamiento|ortomosaico/],
  ["ciberseguridad", /ciber|seguridad|hack|vulnerab|pentest|ataque|ransomware/],
  ["inteligencia-artificial", /\bia\b|inteligencia|artificial|automatiz|chatbot|\bbot\b|machine/],
  ["software", /software|\bapp|aplicaci|pagina web|sitio web|sistema|plataforma|desarroll|programa/],
  ["infraestructura", /\bred\b|redes|wifi|servidor|nube|cloud|cablead|telecom|infraestructura/],
  ["servicios-administrados", /soporte|mantenimiento|mesa de ayuda|helpdesk|administrad/],
  ["transformacion-digital", /consultor|transformaci|auditor|estrategia|asesor|digitaliz/],
  ["marketing-digital", /marketing|redes sociales|publicidad|instagram|facebook|tiktok|seo|campana/],
  ["produccion-audiovisual", /foto|video|audiovisual|evento|filmaci|edicion/],
  ["suministro-tecnologico", /equipo|compra|venta|laptop|computador|licencia|hardware|importa/],
  ["capacitacion", /capacita|curso|taller|\bformaci|entrenamiento/],
  ["otro", /^otro|no se|no estoy seguro/],
];

function matchService(text: string) {
  const value = normalize(text);
  const exact = serviceOptions.find((o) => normalize(o.label) === value || o.value === value);
  if (exact) return exact;
  const hit = serviceKeywords.find(([, re]) => re.test(value));
  return hit && serviceOptions.find((o) => o.value === hit[0]);
}

const NAME_PATTERN = /^[\p{L}][\p{L}'’.\- ]{1,119}$/u;

export function ChatAssistant({ contactEmail, phone, whatsappUrl, turnstileSiteKey }: ChatAssistantProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<Step>("menu");
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState<ChatSubmission>({});
  const [token, setToken] = useState<string>();
  const strikes = useRef(0);
  const nextId = useRef(0);
  const startedAt = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);

  const channelActions = (draft?: string): Action[] => {
    const subject = encodeURIComponent("Consulta desde el sitio web de ProofCore");
    const body = draft ? `&body=${encodeURIComponent(draft.slice(0, 500))}` : "";
    return [
      { label: `Escribir a ${contactEmail}`, href: `mailto:${contactEmail}?subject=${subject}${body}`, icon: "mail" },
      ...(whatsappUrl ? [{ label: "WhatsApp", href: whatsappUrl, external: true, icon: "whatsapp" as const }] : []),
      ...(phone ? [{ label: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}`, icon: "phone" as const }] : []),
    ];
  };

  const push = (msg: Omit<Message, "id">) =>
    setMessages((list) => [...list, { ...msg, id: nextId.current++ }]);

  /** Bot replies arrive after a short "typing" pause, then move to the next step. */
  const say = (replies: Omit<Message, "id" | "from">[], next: Step) => {
    setTyping(true);
    window.setTimeout(() => {
      setMessages((list) => [
        ...list,
        ...replies.map((r) => ({ ...r, from: "bot" as const, id: nextId.current++ })),
      ]);
      setTyping(false);
      setStep(next);
    }, 550);
  };

  const fallback = (draft: string, next: Step, extra?: string) =>
    say(
      [
        {
          text:
            "No tengo una respuesta para eso. Favor contactarnos en nuestros canales y un especialista te atenderá directamente:",
          actions: channelActions(draft),
          tone: "fallback",
        },
        ...(extra ? [{ text: extra }] : []),
      ],
      next,
    );

  const prompts: Partial<Record<Step, string>> = {
    name: "¿Cuál es tu nombre completo?",
    email: "¿A qué correo electrónico te escribimos?",
    phone: "¿Un teléfono de contacto? Puedes escribir «omitir» si prefieres no darlo.",
    company: "¿Para qué empresa u organización es la solicitud? («omitir» si es personal)",
    service: "¿Qué servicio te interesa? Elige una opción o descríbelo con tus palabras.",
    message:
      "Cuéntanos qué necesitas resolver: el problema, el plazo y cualquier detalle relevante (mínimo 20 caracteres). No incluyas contraseñas ni datos sensibles.",
    consentPrivacy:
      "Para registrar tu solicitud necesito tu autorización para tratar estos datos con el único fin de responderte, según nuestra política de privacidad (Ley 172-13). ¿La aceptas?",
    consentMarketing: "¿Te gustaría recibir comunicaciones comerciales de ProofCore? Puedes darte de baja cuando quieras.",
  };

  const ask = (next: Step, lead?: string) =>
    say(
      [
        ...(lead ? [{ text: lead }] : []),
        {
          text: prompts[next] ?? "",
          ...(next === "consentPrivacy" && {
            actions: [{ label: "Leer la política de privacidad", href: "/privacidad", external: true, icon: "link" as const }],
          }),
        },
      ],
      next,
    );

  const startForm = (lead?: string, preset: Partial<ChatSubmission> = {}) => {
    strikes.current = 0;
    setAnswers(preset);
    setToken(undefined);
    ask("name", lead ?? "Perfecto, te pediré algunos datos para registrar tu solicitud. Un especialista te contactará.");
  };

  const openChat = () => {
    setOpen(true);
    setTeaser(false);
    sessionStorage.setItem("pc-chat-teaser", "1");
    if (messages.length === 0) {
      say(
        [
          { text: "¡Hola! Soy el asistente virtual de ProofCore." },
          {
            text: "Puedo registrar tu solicitud de información o cotización para que un especialista te contacte. ¿Qué deseas hacer?",
          },
        ],
        "menu",
      );
    }
  };

  const invalid = (raw: string, current: Step, hint: string) => {
    strikes.current += 1;
    if (strikes.current >= 2) {
      strikes.current = 0;
      fallback(raw, current, `Si prefieres seguir aquí: ${prompts[current]}`);
    } else {
      say([{ text: `${hint} ${prompts[current]}` }], current);
    }
  };

  const advance = (patch: Partial<ChatSubmission>, next: Step, lead?: string) => {
    strikes.current = 0;
    const updated = { ...answers, ...patch };
    setAnswers(updated);
    if (next === "review") {
      say([{ text: summary(updated) }, { text: "¿Envío tu solicitud?" }], "review");
    } else {
      ask(next, lead);
    }
  };

  const handleMenu = (raw: string) => {
    const text = normalize(raw);
    if (text === normalize(MENU_OPTIONS[0]) || /cotiz|precio|costo|presupuesto|informaci|contrat|necesit|quier|interes|propuesta|reunion|asesor|ayuda|solicit|proyecto/.test(text)) {
      const service = matchService(raw);
      startForm(undefined, service && service.value !== "otro" ? { service: service.value } : {});
      return;
    }
    if (text === normalize(MENU_OPTIONS[1]) || /servicio|que hacen|que ofrecen/.test(text)) {
      say(
        [
          {
            text: "Ofrecemos software, inteligencia artificial, consultoría, ciberseguridad, infraestructura y redes, soporte técnico, marketing digital, producción audiovisual, drones y modelado 3D, suministro de tecnología y capacitación.",
            actions: [{ label: "Ver todos los servicios", href: "/servicios", icon: "link" }],
          },
          { text: "¿Quieres que registre una solicitud?" },
        ],
        "menu",
      );
      return;
    }
    if (text === normalize(MENU_OPTIONS[2]) || /canal|correo|email|telefono|whatsapp|llamar|contacto/.test(text)) {
      say([{ text: "Puedes escribirnos directamente por estos canales:", actions: channelActions() }], "menu");
      return;
    }
    if (/^(hola|buen[oa]s|saludos|hey|que tal)/.test(text)) {
      say([{ text: "¡Hola! ¿En qué te puedo ayudar? Elige una opción:" }], "menu");
      return;
    }
    fallback(raw, "menu");
  };

  const handle = (raw: string) => {
    const value = raw.trim();
    if (!value || typing || step === "sending") return;
    push({ from: "user", text: value });
    setInput("");
    const text = normalize(value);

    switch (step) {
      case "menu":
      case "done":
        if (step === "done" && /nueva|otra|si/.test(text)) return startForm("Claro, registremos una nueva solicitud.");
        return handleMenu(value);
      case "name":
        if (!NAME_PATTERN.test(value) || value.split(/\s+/).length > 6 || /\d|\?/.test(value)) {
          return invalid(value, "name", "Necesito un nombre válido, solo con letras.");
        }
        return advance({ name: value }, "email", `Mucho gusto, ${value.split(" ")[0]}.`);
      case "email": {
        const parsed = contactFormSchema.shape.email.safeParse(value);
        if (!parsed.success) return invalid(value, "email", "Ese correo no parece válido.");
        return advance({ email: parsed.data }, "phone");
      }
      case "phone":
        if (SKIP.test(text)) return advance({ phone: undefined }, "company");
        if (!contactFormSchema.shape.phone.safeParse(value).success) {
          return invalid(value, "phone", "Ese número no parece válido (ejemplo: +1 809 555 0100).");
        }
        return advance({ phone: value }, "company");
      case "company":
        if (SKIP.test(text)) return advance({ company: undefined }, answers.service ? "message" : "service");
        if (value.length > 160) return invalid(value, "company", "El nombre es demasiado largo.");
        return advance(
          { company: value },
          answers.service ? "message" : "service",
          answers.service ? `Anoté que te interesa: ${labelFor(answers.service)}.` : undefined,
        );
      case "service": {
        const service = matchService(value);
        if (!service) {
          strikes.current = 0;
          return fallback(value, "service", "También puedes elegir una de las opciones o «Otro / no estoy seguro».");
        }
        return advance({ service: service.value }, "message", `Anotado: ${service.label}.`);
      }
      case "message": {
        const parsed = contactFormSchema.shape.message.safeParse(value);
        if (!parsed.success) return invalid(value, "message", parsed.error.issues[0]?.message ?? "");
        return advance({ message: parsed.data }, "consentPrivacy");
      }
      case "consentPrivacy":
        if (NO.test(text)) {
          strikes.current = 0;
          return say(
            [
              {
                text: "Entendido. Sin tu autorización no puedo registrar los datos aquí, pero puedes escribirnos directamente:",
                actions: channelActions(answers.message),
              },
            ],
            "done",
          );
        }
        if (YES.test(text)) return advance({ consentPrivacy: "on" }, "consentMarketing");
        return fallback(value, "consentPrivacy", "Responde «Acepto» o «No acepto» para continuar.");
      case "consentMarketing":
        if (NO.test(text)) return advance({ consentMarketing: undefined }, "review");
        if (YES.test(text)) return advance({ consentMarketing: "on" }, "review");
        return fallback(value, "consentMarketing", "Responde «Sí» o «No» para continuar.");
      case "review":
        if (/empezar|corregir|cambiar|editar|de nuevo/.test(text)) return startForm("Sin problema, empecemos de nuevo.");
        if (YES.test(text)) return send();
        return fallback(value, "review", "Pulsa «Enviar solicitud» o «Empezar de nuevo».");
    }
  };

  const send = async () => {
    if (turnstileSiteKey && !token) {
      say([{ text: "Completa la verificación de seguridad que aparece abajo y pulsa «Enviar solicitud»." }], "review");
      return;
    }
    setStep("sending");
    setTyping(true);
    const result = await submitChatContact({
      ...answers,
      sourcePath: pathname,
      startedAt: startedAt.current,
      turnstileToken: token,
    });
    setTyping(false);
    if (result.ok) {
      push({
        from: "bot",
        tone: "success",
        text: `¡Listo! Registramos tu solicitud con la referencia ${result.reference}. Te contactaremos al correo ${answers.email}.`,
      });
      push({ from: "bot", text: "¿Necesitas algo más?" });
      setAnswers({});
      setToken(undefined);
      setStep("done");
    } else {
      setToken(undefined);
      push({ from: "bot", text: result.message, actions: channelActions(answers.message), tone: "fallback" });
      setStep("review");
    }
  };

  const quickReplies = (): string[] => {
    switch (step) {
      case "menu":
        return MENU_OPTIONS;
      case "phone":
      case "company":
        return ["Omitir"];
      case "service":
        return serviceOptions.map((o) => o.label);
      case "consentPrivacy":
        return ["Acepto", "No acepto"];
      case "consentMarketing":
        return ["Sí", "No"];
      case "review":
        return ["Enviar solicitud", "Empezar de nuevo"];
      case "done":
        return ["Nueva solicitud", ...MENU_OPTIONS.slice(1)];
      default:
        return [];
    }
  };

  const onQuickReply = (label: string) => {
    if (step === "review" && label === "Enviar solicitud") {
      push({ from: "user", text: label });
      void send();
      return;
    }
    handle(label);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handle(input);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handle(input);
    }
  };

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Gentle prompt after a few seconds, once per browser session.
  useEffect(() => {
    if (sessionStorage.getItem("pc-chat-teaser")) return;
    const timer = window.setTimeout(() => setTeaser(true), 9000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    // Only autofocus with a mouse: on phones it would pop the keyboard over the options.
    if (open && !typing && window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
  }, [open, typing, step]);

  useEffect(() => {
    if (!open || step !== "review" || !turnstileSiteKey || !turnstileRef.current) return;
    const el = turnstileRef.current;
    let widgetId: string | undefined;
    let cancelled = false;
    const getApi = () => (window as unknown as { turnstile?: TurnstileApi }).turnstile;
    const render = () => {
      const api = getApi();
      if (cancelled || !api) return false;
      widgetId = api.render(el, {
        sitekey: turnstileSiteKey,
        language: "es",
        size: "flexible",
        callback: (t: string) => setToken(t),
        "expired-callback": () => setToken(undefined),
      });
      return true;
    };
    let poll: number | undefined;
    if (!render()) {
      if (!document.querySelector('script[src^="https://challenges.cloudflare.com/turnstile"]')) {
        const script = document.createElement("script");
        script.src = TURNSTILE_SRC;
        script.async = true;
        document.head.appendChild(script);
      }
      poll = window.setInterval(() => render() && window.clearInterval(poll), 200);
    }
    return () => {
      cancelled = true;
      window.clearInterval(poll);
      if (widgetId) getApi()?.remove(widgetId);
    };
  }, [open, step, turnstileSiteKey]);

  const replies = typing ? [] : quickReplies();
  const multiline = step === "message";
  const inputProps = {
    name: { autoComplete: "name", placeholder: "Tu nombre completo" },
    email: { autoComplete: "email", inputMode: "email" as const, placeholder: "nombre@empresa.com" },
    phone: { autoComplete: "tel", inputMode: "tel" as const, placeholder: "+1 809 000 0000" },
    company: { autoComplete: "organization", placeholder: "Nombre de la empresa" },
  }[step as "name"] ?? { autoComplete: "off", placeholder: "Escribe tu mensaje…" };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <section
          id="pc-chat"
          role="dialog"
          aria-label="Asistente virtual de ProofCore"
          className="fixed inset-x-3 bottom-3 flex h-[min(85dvh,640px)] flex-col overflow-hidden rounded-2xl border border-pc-line bg-white shadow-2xl shadow-pc-navy/25 motion-safe:animate-[enter_0.3s_ease_both] sm:static sm:h-[min(600px,calc(100dvh-8rem))] sm:w-[380px]"
        >
          <header className="bg-hero relative flex items-center gap-3 px-4 py-3.5 text-white">
            <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
              <Image src={iconWhite} alt="" className="size-5" />
              <span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-pc-teal ring-2 ring-pc-navy" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Asistente ProofCore</p>
              <p className="text-xs text-blue-100/75">Registra tu solicitud en minutos</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar asistente"
              className="inline-flex size-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="size-5" />
            </button>
          </header>

          <div
            ref={listRef}
            role="log"
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-pc-surface px-4 py-4"
          >
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line motion-safe:animate-[enter_0.3s_ease_both] ${
                    m.from === "user"
                      ? "rounded-br-md bg-pc-electric text-white"
                      : m.tone === "fallback"
                        ? "rounded-bl-md border border-amber-200 bg-amber-50 text-pc-dark"
                        : m.tone === "success"
                          ? "rounded-bl-md border border-emerald-200 bg-emerald-50 text-pc-dark"
                          : "rounded-bl-md bg-white text-pc-dark shadow-sm"
                  }`}
                >
                  {m.text}
                  {m.actions && (
                    <div className="mt-2.5 flex flex-col gap-1.5">
                      {m.actions.map((a) => (
                        <ActionLink key={a.href} action={a} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start" aria-label="El asistente está escribiendo">
                <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="size-1.5 rounded-full bg-pc-sky motion-safe:animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            {step === "review" && turnstileSiteKey && !typing && <div ref={turnstileRef} className="pt-1" />}
          </div>

          {replies.length > 0 && (
            <div className="max-h-36 overflow-y-auto border-t border-pc-line bg-white px-3 pt-3 pb-1">
              <div className="flex flex-wrap gap-2">
                {replies.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => onQuickReply(label)}
                    className="rounded-full border border-pc-electric/30 bg-pc-electric/5 px-3 py-1.5 text-xs font-medium text-pc-blue transition-colors hover:bg-pc-electric hover:text-white"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={onSubmit} noValidate className="flex items-end gap-2 border-t border-pc-line bg-white p-3">
            <label htmlFor="pc-chat-input" className="sr-only">
              Escribe tu respuesta
            </label>
            {multiline ? (
              <textarea
                id="pc-chat-input"
                ref={inputRef}
                rows={3}
                maxLength={5000}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Describe lo que necesitas…"
                className="max-h-32 min-h-11 flex-1 resize-none rounded-xl border border-pc-line px-3 py-2.5 text-base text-pc-dark focus:border-pc-electric focus:ring-2 focus:ring-pc-electric/20 focus:outline-none sm:text-sm"
              />
            ) : (
              <input
                id="pc-chat-input"
                ref={inputRef}
                type={step === "email" ? "email" : step === "phone" ? "tel" : "text"}
                maxLength={step === "email" ? 254 : 500}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                {...inputProps}
                className="h-11 min-w-0 flex-1 rounded-xl border border-pc-line px-3 text-base text-pc-dark focus:border-pc-electric focus:ring-2 focus:ring-pc-electric/20 focus:outline-none sm:text-sm"
              />
            )}
            <button
              type="submit"
              disabled={!input.trim() || typing || step === "sending"}
              aria-label="Enviar respuesta"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-pc-electric text-white transition-colors hover:bg-pc-blue disabled:opacity-40"
            >
              {step === "sending" ? <Loader2 className="size-5 animate-spin" /> : <SendHorizontal className="size-5" />}
            </button>
          </form>
          <p className="bg-white px-4 pb-2.5 text-[11px] text-pc-muted">
            Tus datos se usan solo para responder tu solicitud.{" "}
            <Link href="/privacidad" className="underline underline-offset-2 hover:text-pc-blue">
              Privacidad
            </Link>
          </p>
        </section>
      )}

      {teaser && !open && (
        <div className="relative max-w-[16rem] rounded-2xl rounded-br-md border border-pc-line bg-white p-3.5 pr-8 text-sm text-pc-dark shadow-xl motion-safe:animate-[enter_0.4s_ease_both]">
          <button type="button" onClick={openChat} className="text-left">
            <span className="font-semibold text-pc-navy">¿Te ayudamos?</span> Registra tu solicitud de
            información o cotización aquí.
          </button>
          <button
            type="button"
            onClick={() => {
              setTeaser(false);
              sessionStorage.setItem("pc-chat-teaser", "1");
            }}
            aria-label="Cerrar aviso"
            className="absolute top-2 right-2 rounded-full p-1 text-pc-muted hover:bg-pc-surface"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openChat())}
        aria-expanded={open}
        aria-controls="pc-chat"
        aria-label={open ? "Cerrar asistente" : "Abrir asistente virtual"}
        className={`group relative size-14 items-center justify-center rounded-full bg-pc-electric text-white shadow-lg shadow-pc-electric/40 transition-transform duration-300 hover:scale-105 focus-visible:outline-offset-4 sm:size-16 ${open ? "hidden sm:inline-flex" : "inline-flex"}`}
      >
        {!open && (
          <span aria-hidden className="absolute inset-0 rounded-full bg-pc-electric motion-safe:animate-ping-slow" />
        )}
        <span className="relative flex items-center justify-center">
          {open ? (
            <X className="size-6" />
          ) : (
            <>
              <Image src={iconWhite} alt="" className="size-7 transition-transform duration-300 group-hover:rotate-12" />
              <span className="absolute -top-2 -right-2.5 flex size-5 items-center justify-center rounded-full bg-pc-teal ring-2 ring-white">
                <MessageCircle className="size-3 text-pc-navy" strokeWidth={2.5} />
              </span>
            </>
          )}
        </span>
      </button>
    </div>
  );
}

function labelFor(slug: string) {
  return serviceOptions.find((o) => o.value === slug)?.label ?? slug;
}

function summary(a: ChatSubmission) {
  return [
    "Revisa tu solicitud:",
    `• Nombre: ${a.name}`,
    `• Correo: ${a.email}`,
    a.phone && `• Teléfono: ${a.phone}`,
    a.company && `• Empresa: ${a.company}`,
    `• Servicio: ${labelFor(a.service ?? "")}`,
    `• Mensaje: ${a.message}`,
    `• Comunicaciones comerciales: ${a.consentMarketing === "on" ? "Sí" : "No"}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function ActionLink({ action }: { action: Action }) {
  const Icon = { mail: Mail, phone: Phone, whatsapp: MessageCircle, link: ExternalLink }[action.icon ?? "link"];
  const className =
    "inline-flex items-center gap-2 rounded-lg bg-pc-navy px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-pc-blue";
  const content = (
    <>
      <Icon aria-hidden className="size-3.5 shrink-0" />
      <span className="break-all">{action.label}</span>
    </>
  );
  if (action.href.startsWith("/") && !action.external) {
    return (
      <Link href={action.href} className={className}>
        {content}
      </Link>
    );
  }
  return (
    <a
      href={action.href}
      className={className}
      {...(action.external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {content}
    </a>
  );
}
