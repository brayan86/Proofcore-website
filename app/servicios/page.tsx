import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { serviceGroups } from "@/lib/services";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Consultoría, software, ciberseguridad, inteligencia artificial, infraestructura y redes, servicios administrados, marketing digital, producción audiovisual, drones y fotogrametría, suministro tecnológico y capacitación.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Capacidades conectadas para resolver el problema completo."
        description="Prestamos servicios de consultoría, diseño, desarrollo, implementación, administración, mantenimiento, soporte y capacitación en todas las áreas tecnológicas, digitales, audiovisuales y de telecomunicaciones."
      >
        <nav aria-label="Áreas de servicio" className="mt-10 flex flex-wrap gap-2">
          {serviceGroups.map((g) => (
            <Link
              key={g.id}
              href={`#${g.id}`}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
            >
              {g.title}
            </Link>
          ))}
        </nav>
      </PageHero>

      {serviceGroups.map((group, gi) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`${group.id}-title`}
          className={`scroll-mt-24 ${gi % 2 === 1 ? "bg-pc-surface" : "bg-white"}`}
        >
          <div className="container-pc py-14 md:py-20">
            <div className="max-w-2xl">
              <p className="eyebrow">Área {String(gi + 1).padStart(2, "0")}</p>
              <h2
                id={`${group.id}-title`}
                className="mt-3 text-3xl font-semibold tracking-tight text-pc-navy"
              >
                {group.title}
              </h2>
              <p className="mt-3 text-lg text-pc-muted">{group.description}</p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {group.services.map(({ slug, title, summary, problem, includes, icon: Icon }) => (
                <article
                  key={slug}
                  id={slug}
                  className="reveal card-hover flex scroll-mt-24 flex-col rounded-2xl border border-pc-line bg-white p-6 shadow-card sm:p-7"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-pc-navy text-white">
                    <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-pc-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-pc-dark">{summary}</p>
                  <p className="mt-4 rounded-lg bg-pc-surface p-3 text-sm leading-relaxed text-pc-muted">
                    <span className="font-semibold text-pc-navy">Lo que resolvemos: </span>
                    {problem}
                  </p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {includes.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-pc-dark">
                        <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-pc-electric" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink
                    href={`/contacto?servicio=${slug}`}
                    variant="ghost-dark"
                    arrow
                    className="mt-6 self-start"
                  >
                    Solicitar información
                  </ButtonLink>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="container-pc pt-20">
        <div className="reveal rounded-2xl border border-pc-line p-6 sm:p-8 md:p-10">
          <h2 className="text-xl font-semibold text-pc-navy">
            ¿Tu necesidad no encaja exactamente en una categoría?
          </h2>
          <p className="mt-2 max-w-3xl text-pc-muted">
            También realizamos cualquier actividad comercial, profesional o técnica relacionada o
            conexa con estos servicios. Cuéntanos el problema y te diremos con transparencia si
            podemos resolverlo, con qué aliados y en qué plazo.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
