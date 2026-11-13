import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { serviceOptions } from "@/lib/services";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    `Cuéntanos qué necesitas resolver. Respondemos en ${site.responseTime}.`,
};

const nextSteps = [
  `Revisamos tu solicitud y te respondemos en ${site.responseTime}.`,
  "Agendamos una reunión de descubrimiento para entender el problema y los objetivos.",
  "Te enviamos por escrito el resumen del problema y los siguientes pasos.",
];

export default function ContactPage(props: PageProps<"/contacto">) {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY || undefined;
  const { contact } = site;

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Hablemos de lo que necesitas resolver."
        description="Escríbenos con el mayor detalle posible. Una persona del equipo de ProofCore leerá tu mensaje y te responderá directamente."
      />

      <section className="container-pc grid gap-12 py-16 lg:grid-cols-[1.4fr_0.6fr] lg:py-20">
        <div className="relative z-10 -mt-28 lg:-mt-32">
          <Suspense fallback={<ContactForm turnstileSiteKey={turnstileSiteKey} />}>
            <ContactFormWithService
              searchParams={props.searchParams}
              turnstileSiteKey={turnstileSiteKey}
            />
          </Suspense>
        </div>

        <aside className="space-y-10">
          <div>
            <h2 className="text-sm font-bold tracking-[0.14em] text-pc-navy uppercase">
              Qué pasa después
            </h2>
            <ol className="mt-5 space-y-5">
              {nextSteps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-pc-navy text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-pc-dark">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="text-sm font-bold tracking-[0.14em] text-pc-navy uppercase">
              Otros canales
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              {contact.email && (
                <Channel icon={<Mail />} label="Correo" href={`mailto:${contact.email}`}>
                  {contact.email}
                </Channel>
              )}
              {contact.phone && (
                <Channel
                  icon={<Phone />}
                  label="Teléfono"
                  href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                >
                  {contact.phone}
                </Channel>
              )}
              {contact.whatsapp && (
                <Channel
                  icon={<MessageCircle />}
                  label="WhatsApp"
                  href={whatsappUrl(contact.whatsapp)}
                  external
                >
                  {contact.whatsapp}
                </Channel>
              )}
              <Channel icon={<MapPin />} label="Ubicación">
                {contact.address ?? site.country}
              </Channel>
              {contact.hours && (
                <Channel icon={<Clock />} label="Horario">
                  {contact.hours}
                </Channel>
              )}
            </ul>
          </div>

          <div className="rounded-2xl bg-pc-surface p-6">
            <ShieldCheck aria-hidden className="size-6 text-pc-electric" strokeWidth={1.75} />
            <p className="mt-3 text-sm leading-relaxed text-pc-dark">
              Usamos tus datos solo para responder esta solicitud. No los vendemos ni los
              compartimos con fines publicitarios. Ley 172-13 de protección de datos personales.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}

async function ContactFormWithService({
  searchParams,
  turnstileSiteKey,
}: {
  searchParams: PageProps<"/contacto">["searchParams"];
  turnstileSiteKey?: string;
}) {
  const { servicio } = await searchParams;
  const defaultService = serviceOptions.some((o) => o.value === servicio)
    ? (servicio as string)
    : undefined;
  return <ContactForm turnstileSiteKey={turnstileSiteKey} defaultService={defaultService} />;
}

function Channel({
  icon,
  label,
  href,
  external,
  children,
}: {
  icon: React.ReactElement;
  label: string;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const value = href ? (
    <a
      href={href}
      className="font-medium text-pc-blue hover:text-pc-navy"
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  ) : (
    <span className="font-medium text-pc-dark">{children}</span>
  );
  return (
    <li className="flex gap-3">
      <span aria-hidden className="mt-0.5 text-pc-electric [&>svg]:size-5">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-xs text-pc-muted">{label}</span>
        {value}
      </span>
    </li>
  );
}
