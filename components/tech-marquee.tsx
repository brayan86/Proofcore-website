const items = [
  "Software a la medida",
  "Ciberseguridad",
  "Inteligencia artificial",
  "Automatización",
  "Redes y telecomunicaciones",
  "Nube e infraestructura",
  "Soporte y servicios administrados",
  "Marketing digital",
  "Producción audiovisual",
  "Drones",
  "Fotogrametría",
  "Modelado 3D",
  "Suministro tecnológico",
  "Capacitación técnica",
];

/** Continuous capability ticker under the hero; the duplicate copy makes the loop seamless. */
export function TechMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-pc-navy-deep py-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            aria-label={copy === 0 ? "Capacidades" : undefined}
            className="flex shrink-0 items-center"
          >
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 px-5 text-sm font-medium whitespace-nowrap text-blue-100/80"
              >
                <span aria-hidden className="size-1.5 rounded-full bg-pc-teal" />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
