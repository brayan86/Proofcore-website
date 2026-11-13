import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Seguridad",
  description:
    "Cómo aplica ProofCore el principio Security by Design, cómo protegemos la información de nuestros clientes y cómo reportar una vulnerabilidad.",
};

const practices = [
  {
    title: "Identidad y acceso",
    items: [
      "Autenticación multifactor en las cuentas corporativas",
      "Acceso mínimo necesario y revisión periódica de permisos",
      "Credenciales de clientes en bóvedas separadas, nunca en notas ni chats",
    ],
  },
  {
    title: "Protección de la información",
    items: [
      "Cifrado de disco en los equipos de trabajo",
      "Respaldo con regla 3-2-1 y pruebas de restauración",
      "Clasificación de datos y política de retención definida",
    ],
  },
  {
    title: "Desarrollo seguro",
    items: [
      "Revisión de dependencias y detección de secretos en el código",
      "Análisis estático según la criticidad del sistema",
      "Separación entre código, configuración y datos reales",
    ],
  },
  {
    title: "Operación y respuesta",
    items: [
      "Plan de respuesta a incidentes con contactos y plazos",
      "Notificación oportuna al cliente ante cualquier incidente que le afecte",
      "Pruebas de seguridad solo con autorización escrita del titular del sistema (Ley 53-07)",
    ],
  },
];

const websiteMeasures = [
  "Conexión cifrada HTTPS con HSTS",
  "Política de seguridad de contenido (CSP) restrictiva y protección contra clickjacking",
  "Formulario de contacto validado en el servidor, con límite de envíos y protección contra bots",
  "Sin cookies de publicidad ni rastreadores de terceros",
  "Los datos del formulario se envían únicamente al buzón de ProofCore; el sitio no los almacena",
];

export default function SecurityPage() {
  const securityEmail = site.contact.securityEmail ?? site.contact.email;
  return (
    <>
      <PageHero
        eyebrow="Security by Design"
        title="La seguridad es la forma de construir, no un añadido."
        description="Un cliente que confía en nosotros su tecnología tiene derecho a saber cómo nos protegemos. Estas son las prácticas que aplicamos internamente y en cada proyecto."
      />

      <section className="container-pc py-14 md:py-20">
        <SectionHeading eyebrow="Prácticas" title="Controles que aplicamos en ProofCore." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {practices.map((p) => (
            <article key={p.title} className="reveal card-hover rounded-2xl border border-pc-line p-6 sm:p-7">
              <h3 className="text-lg font-semibold text-pc-navy">{p.title}</h3>
              <ul className="mt-4 space-y-3">
                {p.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-pc-dark">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-pc-electric" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-pc-surface">
        <div className="container-pc grid gap-12 py-14 md:py-20 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Cumplimiento"
              title="Alineación progresiva, sin promesas falsas."
            />
            <div className="mt-6 space-y-4 leading-relaxed text-pc-dark">
              <p>
                Trabajamos para alinear progresivamente nuestros procesos con la norma ISO/IEC
                27001 y con el marco del Centro Nacional de Ciberseguridad de la República
                Dominicana.
              </p>
              <p>
                Nunca comunicaremos una certificación que no tengamos. Si en una propuesta
                necesitas evidencia de un control, te la mostramos.
              </p>
              <p>
                El tratamiento de datos personales se rige por la Ley 172-13 de protección de
                datos personales. Consulta nuestra{" "}
                <Link href="/privacidad" className="text-pc-blue underline underline-offset-3">
                  política de privacidad
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="reveal rounded-2xl border border-pc-line bg-white p-6 sm:p-7">
            <h3 className="text-lg font-semibold text-pc-navy">Este sitio web</h3>
            <ul className="mt-4 space-y-3">
              {websiteMeasures.map((m) => (
                <li key={m} className="flex gap-2.5 text-sm text-pc-dark">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-pc-electric" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="reportar" className="container-pc scroll-mt-24 py-14 md:py-20">
        <div className="reveal rounded-2xl bg-pc-navy p-6 text-blue-100/85 sm:p-8 md:p-12">
          <p className="eyebrow text-pc-teal!">Divulgación responsable</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Reportar una vulnerabilidad</h2>
          <div className="mt-5 max-w-3xl space-y-3 leading-relaxed">
            <p>
              Si encuentras una vulnerabilidad en este sitio o en un sistema de ProofCore,
              repórtala de forma privada
              {securityEmail ? (
                <>
                  {" "}a{" "}
                  <a href={`mailto:${securityEmail}`} className="font-semibold text-pc-teal underline underline-offset-3">
                    {securityEmail}
                  </a>
                </>
              ) : (
                <>
                  {" "}desde el{" "}
                  <Link href="/contacto" className="font-semibold text-pc-teal underline underline-offset-3">
                    formulario de contacto
                  </Link>
                </>
              )}
              , con una descripción y los pasos para reproducirla.
            </p>
            <p>
              Te pedimos no acceder a datos de terceros, no degradar el servicio y darnos un plazo
              razonable para corregir antes de publicar. Confirmaremos la recepción y te
              mantendremos informado.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
