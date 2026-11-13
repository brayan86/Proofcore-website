import { site } from "@/lib/site";
import { ButtonLink } from "./button-link";
import { HeroBackdrop } from "./hero-backdrop";

interface CtaBandProps {
  title?: string;
  description?: string;
}

export function CtaBand({
  title = "Cuéntanos qué necesitas resolver.",
  description = `Te respondemos en ${site.responseTime} con los siguientes pasos y lo que necesitaremos de tu equipo.`,
}: CtaBandProps) {
  return (
    <section className="container-pc py-14 md:py-20">
      <div className="reveal bg-hero relative overflow-hidden rounded-3xl px-6 py-10 sm:px-8 sm:py-14 md:px-14">
        <HeroBackdrop />
        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-balance text-white">
              {title}
            </h2>
            <p className="mt-3 text-blue-100/80">{description}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contacto" arrow>
              Hablar con ProofCore
            </ButtonLink>
            <ButtonLink href="/servicios" variant="ghost-light">
              Explorar soluciones
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
