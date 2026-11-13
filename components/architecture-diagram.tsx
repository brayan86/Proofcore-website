const nodes = [
  { label: "Software", sub: "Apps · APIs" },
  { label: "Seguridad", sub: "Security by Design" },
  { label: "IA", sub: "Datos · Automatización" },
  { label: "Infraestructura", sub: "Redes · Nube" },
  { label: "Operación", sub: "Soporte · Monitoreo" },
  { label: "Digital", sub: "Marketing · Audiovisual" },
];

const CX = 240;
const CY = 240;
const R = 172;

const centerOrigin = { transformOrigin: `${CX}px ${CY}px`, transformBox: "view-box" } as const;

/** Hero visual: capabilities connected to a single core (Proof + Core). */
export function ArchitectureDiagram({ className = "" }: { className?: string }) {
  const points = nodes.map((node, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return { ...node, x: CX + R * Math.cos(angle), y: CY + R * Math.sin(angle) };
  });

  return (
    <svg
      viewBox="0 0 480 480"
      role="img"
      aria-labelledby="arch-title arch-desc"
      className={`overflow-visible ${className}`}
    >
      <title id="arch-title">Arquitectura de capacidades ProofCore</title>
      <desc id="arch-desc">
        Software, seguridad, inteligencia artificial, infraestructura, operación y
        servicios digitales conectados a un mismo núcleo.
      </desc>
      <defs>
        <linearGradient id="arch-line" x1="0" x2="1">
          <stop offset="0" stopColor="#14c6b3" stopOpacity="0.9" />
          <stop offset="1" stopColor="#1e8ddd" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="arch-glow">
          <stop offset="0" stopColor="#2464e6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2464e6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="motion-safe:animate-spin-slow" style={centerOrigin}>
        <circle
          cx={CX}
          cy={CY}
          r="222"
          fill="none"
          stroke="rgb(255 255 255 / 0.10)"
          strokeDasharray="2 10"
        />
        <circle cx={CX} cy={CY - 222} r="3" fill="#14c6b3" />
        <circle cx={CX + 222} cy={CY} r="2" fill="#1e8ddd" />
      </g>

      <polygon
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="rgb(255 255 255 / 0.12)"
        strokeDasharray="4 6"
      />
      {points.map((p, i) => (
        <g key={`l-${p.label}`}>
          <line x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="url(#arch-line)" strokeWidth="1.5" />
          <line
            x1={CX}
            y1={CY}
            x2={p.x}
            y2={p.y}
            stroke="#5eead4"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="flow-line"
            style={{
              animationDelay: `${i * -0.5}s`,
              animationDirection: i % 2 ? "reverse" : "normal",
            }}
          />
        </g>
      ))}

      <circle cx={CX} cy={CY} r="110" fill="url(#arch-glow)" className="glow-pulse" />
      <circle cx={CX} cy={CY} r="62" fill="#041a36" stroke="rgb(255 255 255 / 0.18)" />
      <circle
        cx={CX}
        cy={CY}
        r="70"
        fill="none"
        stroke="#14c6b3"
        strokeOpacity="0.35"
        strokeDasharray="30 410"
        strokeLinecap="round"
        className="motion-safe:animate-[spin_6s_linear_infinite]"
        style={centerOrigin}
      />
      <image href="/brand/proofcore-icon-white.svg" x={CX - 30} y={CY - 31} width="60" height="62" />

      {points.map((p, i) => (
        <g key={p.label} transform={`translate(${p.x} ${p.y})`}>
          <g className="motion-safe:animate-float" style={{ animationDelay: `${i * -1}s` }}>
            <rect
              x="-76"
              y="-25"
              width="152"
              height="50"
              rx="12"
              fill="rgb(6 38 77 / 0.92)"
              stroke="rgb(255 255 255 / 0.16)"
            />
            {/* Phones: the SVG renders at ~70% scale, so show only a larger, centered label. */}
            <text
              x="0"
              y="6"
              fill="#ffffff"
              fontSize="17"
              fontWeight="600"
              textAnchor="middle"
              className="sm:hidden"
            >
              {p.label}
            </text>
            <g className="max-sm:hidden">
              <circle
                cx="-60"
                cy="0"
                r="4"
                fill="#14c6b3"
                className="motion-safe:animate-ping-slow"
                style={{ transformBox: "fill-box", transformOrigin: "center", animationDelay: `${i * 0.4}s` }}
              />
              <circle cx="-60" cy="0" r="4" fill="#14c6b3" />
              <text x="-48" y="-3" fill="#ffffff" fontSize="13" fontWeight="600">
                {p.label}
              </text>
              <text x="-48" y="13" fill="rgb(219 234 254 / 0.7)" fontSize="9.5">
                {p.sub}
              </text>
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}
