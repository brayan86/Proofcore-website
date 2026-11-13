import type { Metadata } from "next";
import { Compass, Eye, Target } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { methodology, values } from "@/lib/method";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "ProofCore es una empresa tecnológica de origen dominicano que ayuda a las organizaciones a diseñar, implementar, asegurar y evolucionar sus capacidades digitales.",
};

const statements = [
  {
    icon: Compass,
    title: "Propósito",
    text: "Ayudar a las organizaciones a convertir tecnología compleja en capacidades empresariales seguras, útiles y sostenibles.",
  },
  {
    icon: Target,
    title: "Misión",
    text: "Diseñar, implementar y operar soluciones tecnológicas que integren software, infraestructura, inteligencia artificial, automatización y ciberseguridad para ayudar a las organizaciones a crecer de forma segura y sostenible.",
  },
  {
    icon: Eye,
    title: "Visión",
    text: "Construir desde República Dominicana una compañía tecnológica regional reconocida por integrar innovación, software, IA, infraestructura y ciberseguridad en soluciones empresariales escalables.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title="Evidencia en el núcleo."
        description="Proof es prueba, evidencia, demostración. Core es el núcleo, lo esencial. Construimos tecnología que se puede demostrar, auditar y sostener."
      />

      <section className="container-pc grid gap-12 py-14 md:py-20 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Quiénes somos"
            title="Un socio tecnológico que responde por el resultado."
          />
          <div className="mt-6 space-y-4 leading-relaxed text-pc-dark">
            <p>
              ProofCore es una empresa tecnológica de origen dominicano enfocada en ayudar a las
              organizaciones a diseñar, implementar, asegurar y evolucionar sus capacidades
              digitales.
            </p>
            <p>
              Muchas empresas tienen su tecnología repartida entre proveedores y equipos que no se
              hablan entre sí: costos duplicados, riesgos invisibles y proyectos que no se
              terminan. Integramos estrategia, arquitectura, implementación, seguridad y operación
              bajo una sola responsabilidad.
            </p>
            <p>
              Ser un solo socio no significa hacerlo todo internamente. Significa responder por el
              resultado completo, con especialización real y una red de aliados que siempre te
              presentamos con transparencia.
            </p>
          </div>
        </div>
        <ul className="grid gap-4">
          {statements.map(({ icon: Icon, title, text }) => (
            <li key={title} className="reveal card-hover flex gap-5 rounded-2xl border border-pc-line p-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-pc-navy text-pc-teal">
                <Icon aria-hidden className="size-5" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="font-semibold text-pc-navy">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-pc-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-pc-surface">
        <div className="container-pc py-14 md:py-20">
          <SectionHeading
            eyebrow="Valores"
            title="Un valor solo sirve si se puede incumplir."
            description="Por eso cada uno viene acompañado de la conducta que lo hace verificable."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <li key={v.title} className="reveal card-hover rounded-2xl border border-pc-line bg-white p-6">
                <h3 className="font-semibold text-pc-navy">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pc-muted">{v.practice}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-pc py-14 md:py-20">
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title="Sabes qué ocurre, qué necesitamos y cómo se mide."
          description={`Cada etapa tiene un entregable y un criterio de salida. Respondemos a cada contacto en ${site.responseTime}.`}
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-pc-line bg-pc-line md:grid-cols-3">
          {methodology.map((m) => (
            <li key={m.step} className="bg-white p-6">
              <span className="text-sm font-bold text-pc-sky">{m.step}</span>
              <h3 className="mt-2 font-semibold text-pc-navy">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-pc-muted">{m.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-pc-navy">
        <div className="container-pc grid gap-10 py-16 md:grid-cols-3">
          {[
            ["Origen", site.country],
            ["Modelo", "Socio tecnológico B2B"],
            ["Principio", "Security by Design"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="eyebrow text-pc-teal!">{k}</p>
              <p className="mt-2 text-xl font-semibold text-white">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
