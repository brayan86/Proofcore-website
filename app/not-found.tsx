import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <section className="container-pc flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-pc-navy">
        No encontramos esta página.
      </h1>
      <p className="mt-4 max-w-lg text-lg text-pc-muted">
        Es posible que el enlace haya cambiado. Puedes volver al inicio o escribirnos si buscabas
        algo en particular.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/" arrow>
          Ir al inicio
        </ButtonLink>
        <ButtonLink href="/contacto" variant="secondary">
          Contactar
        </ButtonLink>
      </div>
    </section>
  );
}
