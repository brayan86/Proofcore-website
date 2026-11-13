import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { industries } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industrias",
  description:
    "Soluciones tecnológicas para banca, cooperativas, salud, retail, industria, construcción, gobierno, PyME y startups.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industrias"
        title="Soluciones para sectores exigentes."
        description="Cada sector tiene su propio lenguaje, sus riesgos y su regulador. Entramos por el problema concreto de tu industria, no por una lista de productos."
      />

      <section className="container-pc py-14 md:py-20">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map(({ title, challenge, focus, icon: Icon }) => (
            <li
              key={title}
              className="reveal card-hover flex flex-col rounded-2xl border border-pc-line bg-white p-6 shadow-card sm:p-7"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-pc-surface text-pc-blue">
                <Icon aria-hidden className="size-5" strokeWidth={1.75} />
              </span>
              <h2 className="mt-5 text-lg font-semibold text-pc-navy">{title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-pc-muted">{challenge}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Enfoque">
                {focus.map((f) => (
                  <li
                    key={f}
                    className="rounded-full bg-pc-surface px-3 py-1 text-xs font-medium text-pc-navy"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        title="¿Tu sector tiene requisitos regulatorios específicos?"
        description="Diseñamos la solución alrededor de tus obligaciones de cumplimiento, no al revés."
      />
    </>
  );
}
