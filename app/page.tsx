import Link from "next/link";
import {
  ArrowRight,
  Database,
  Lock,
  RefreshCw,
  Share2,
  ShieldCheck,
  Workflow,
  FileCheck2,
  KeyRound,
} from "lucide-react";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { SectionHeading } from "@/components/section-heading";
import { TechMarquee } from "@/components/tech-marquee";
import { industries } from "@/lib/industries";
import { methodology } from "@/lib/method";
import { serviceGroups } from "@/lib/services";
import { site } from "@/lib/site";

const pillars = [
  {
    icon: Database,
    title: "Arquitectura de datos",
    text: "Bases sólidas para decisiones confiables.",
  },
  {
    icon: Workflow,
    title: "Automatización inteligente",
    text: "Procesos más simples, mayor capacidad.",
  },
  {
    icon: Share2,
    title: "Integración de sistemas",
    text: "Un ecosistema que trabaja junto.",
  },
  {
    icon: RefreshCw,
    title: "Evolución continua",
    text: "Hoy más capacidad que ayer.",
  },
];

const securityPrinciples = [
  { icon: KeyRound, title: "Acceso mínimo", text: "Cada persona y sistema accede solo a lo que necesita, con autenticación multifactor." },
  { icon: Lock, title: "Datos protegidos", text: "Cifrado en tránsito y en reposo, respaldo verificado y retención definida." },
  { icon: FileCheck2, title: "Todo documentado", text: "Cambios, accesos y entregables con registro y trazabilidad." },
  { icon: ShieldCheck, title: "Pruebas autorizadas", text: "Ninguna prueba de seguridad sin autorización escrita del titular del sistema." },
];

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

const essenceSplit = site.essence.lastIndexOf(" ");
const essenceLead = site.essence.slice(0, essenceSplit);
const essenceAccent = site.essence.slice(essenceSplit + 1);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero relative overflow-hidden">
        <HeroBackdrop />
        <div className="container-pc relative grid items-center gap-10 py-16 sm:py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <p className="eyebrow enter text-pc-teal!">Tecnología + Arquitectura + Personas</p>
            <h1
              className="enter mt-5 text-[2.5rem] leading-[1.08] font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
              style={delay(100)}
            >
              {essenceLead} <span className="text-shine">{essenceAccent}</span>
            </h1>
            <p
              className="enter mt-6 max-w-xl text-base leading-relaxed text-blue-100/85 sm:text-lg"
              style={delay(200)}
            >
              {site.description}
            </p>
            <div className="enter mt-9 flex flex-col gap-3 sm:flex-row" style={delay(300)}>
              <ButtonLink href="/contacto" arrow>
                Hablar con ProofCore
              </ButtonLink>
              <ButtonLink href="/servicios" variant="ghost-light">
                Explorar soluciones
              </ButtonLink>
            </div>
          </div>
          <div className="enter" style={delay(250)}>
            <ArchitectureDiagram className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none" />
          </div>
        </div>
      </section>

      <TechMarquee />

      {/* Pillars */}
      <section aria-label="Pilares" className="border-b border-pc-line bg-white">
        <div className="container-pc">
          <div className="grid gap-px bg-pc-line sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, text }) => (
              <div key={title} className="reveal group flex gap-4 bg-white px-2 py-8 sm:px-6">
                <Icon
                  aria-hidden
                  className="size-6 shrink-0 text-pc-electric transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  strokeWidth={1.5}
                />
                <div>
                  <h2 className="font-semibold text-pc-navy">{title}</h2>
                  <p className="mt-1 text-sm text-pc-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-pc py-16 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Capacidades"
            title="Un solo socio tecnológico, responsable del resultado completo."
            description="Integramos capacidades que normalmente obligan a coordinar varios proveedores: desde la estrategia y el software hasta la infraestructura, la seguridad y el contenido visual."
          />
          <ButtonLink href="/servicios" variant="ghost-dark" arrow className="shrink-0">
            Ver todos los servicios
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {serviceGroups.map((group) => (
            <article
              key={group.id}
              className="reveal card-hover rounded-2xl border border-pc-line bg-white p-6 shadow-card sm:p-8"
            >
              <h3 className="text-xl font-semibold text-pc-navy">{group.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-pc-muted">{group.description}</p>
              <ul className="mt-6 divide-y divide-pc-line">
                {group.services.map(({ slug, title, icon: Icon }) => (
                  <li key={slug}>
                    <Link
                      href={`/servicios#${slug}`}
                      className="group flex items-center gap-3 py-3 text-pc-dark hover:text-pc-blue"
                    >
                      <span className="flex size-9 items-center justify-center rounded-lg bg-pc-surface text-pc-blue transition-colors group-hover:bg-pc-electric group-hover:text-white">
                        <Icon aria-hidden className="size-4.5" strokeWidth={1.75} />
                      </span>
                      <span className="flex-1 font-medium">{title}</span>
                      <ArrowRight
                        aria-hidden
                        className="size-4 text-pc-line transition-all group-hover:translate-x-0.5 group-hover:text-pc-blue"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Consulting / methodology */}
      <section className="bg-pc-surface">
        <div className="container-pc grid gap-10 py-16 md:py-24 lg:gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Consultoría estratégica"
              title="De la complejidad a la capacidad."
              description="Acompañamos la transformación con visión técnica y de negocio, no con presentaciones. Cada etapa tiene un entregable y un criterio de salida, para que sepas siempre qué ocurre y qué sigue."
            />
            <ButtonLink href="/nosotros" variant="secondary" className="mt-8" arrow>
              Cómo trabajamos
            </ButtonLink>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {methodology.map((m) => (
              <li key={m.step} className="reveal card-hover rounded-2xl border border-pc-line bg-white p-6">
                <span className="text-sm font-bold text-pc-sky">{m.step}</span>
                <h3 className="mt-2 font-semibold text-pc-navy">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pc-muted">{m.description}</p>
                <p className="mt-4 border-t border-pc-line pt-3 text-xs font-medium text-pc-blue">
                  Entregable: {m.deliverable}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-pc-navy">
        <div className="container-pc py-16 md:py-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              tone="dark"
              eyebrow="Industrias"
              title="Soluciones para sectores exigentes."
              description="Arquitecturas que se adaptan a tu realidad operativa y regulatoria."
            />
            <ButtonLink href="/industrias" variant="ghost-light" arrow className="shrink-0">
              Ver industrias
            </ButtonLink>
          </div>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {industries.slice(0, 6).map(({ title, challenge, icon: Icon }) => (
              <li key={title} className="reveal group bg-pc-navy p-7 transition-colors duration-300 hover:bg-pc-blue/25">
                <Icon aria-hidden className="size-6 text-pc-teal transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                <h3 className="mt-4 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-100/70">{challenge}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Security by Design */}
      <section className="container-pc grid gap-10 py-16 md:py-24 lg:gap-14 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          eyebrow="Security by Design"
          title="Seguridad integrada en cada solución, desde el diseño."
          description="Para una empresa que se llama ProofCore, la seguridad no es un servicio adicional: es la forma de construir. Aplicamos los mismos controles que recomendamos a nuestros clientes."
        />
        <ul className="grid gap-4 sm:grid-cols-2">
          {securityPrinciples.map(({ icon: Icon, title, text }) => (
            <li key={title} className="reveal card-hover group rounded-2xl border border-pc-line p-6">
              <span className="flex size-10 items-center justify-center rounded-xl bg-pc-navy text-pc-teal transition-transform duration-300 group-hover:-rotate-6">
                <Icon aria-hidden className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 font-semibold text-pc-navy">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-pc-muted">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Quote */}
      <section className="border-y border-pc-line bg-pc-surface">
        <figure className="container-pc py-20 text-center">
          <blockquote className="reveal mx-auto max-w-3xl text-2xl leading-snug font-medium tracking-tight text-balance text-pc-navy md:text-3xl">
            “No se trata solo de tecnología, sino de capacidad para hacer más con lo que ya
            tienes.”
          </blockquote>
          <figcaption className="mt-6 text-sm font-semibold text-pc-blue">
            ProofCore · {site.slogan}
          </figcaption>
        </figure>
      </section>

      <CtaBand />
    </>
  );
}
