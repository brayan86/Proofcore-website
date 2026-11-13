import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  BrainCircuit,
  Camera,
  Code,
  GraduationCap,
  LifeBuoy,
  Megaphone,
  Network,
  ScanSearch,
  ShieldCheck,
  Waypoints,
} from "lucide-react";

// Keep slugs in sync with proofcore-api/src/contact/contact.schema.ts
export type ServiceSlug =
  | "software"
  | "ciberseguridad"
  | "inteligencia-artificial"
  | "infraestructura"
  | "transformacion-digital"
  | "servicios-administrados"
  | "marketing-digital"
  | "produccion-audiovisual"
  | "drones-geoespacial"
  | "suministro-tecnologico"
  | "capacitacion";

export interface Service {
  slug: ServiceSlug;
  title: string;
  summary: string;
  problem: string;
  includes: string[];
  icon: LucideIcon;
}

export interface ServiceGroup {
  id: string;
  title: string;
  description: string;
  services: Service[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: "ingenieria",
    title: "Ingeniería, datos e inteligencia",
    description:
      "Software, inteligencia artificial y consultoría para convertir procesos en sistemas que se pueden medir y evolucionar.",
    services: [
      {
        slug: "software",
        title: "Desarrollo de software",
        summary:
          "Diseño, desarrollo e implementación de aplicaciones web, móviles, APIs y plataformas a la medida.",
        problem:
          "Sistemas heredados, procesos en hojas de cálculo e integraciones que nadie mantiene.",
        includes: [
          "Aplicaciones web y móviles",
          "APIs e integraciones entre sistemas",
          "Modernización de sistemas existentes",
          "Plataformas SaaS",
          "DevOps y DevSecOps",
          "Licenciamiento y mantenimiento evolutivo",
        ],
        icon: Code,
      },
      {
        slug: "inteligencia-artificial",
        title: "Inteligencia artificial y automatización",
        summary:
          "Casos de uso de IA con datos controlados y trazables, y automatización de tareas repetitivas.",
        problem:
          "Equipos dedicando horas a tareas manuales y conocimiento interno que no se aprovecha.",
        includes: [
          "Consultoría y selección de casos de uso",
          "Agentes y asistentes corporativos",
          "Búsqueda sobre documentos internos (RAG)",
          "Extracción y clasificación documental",
          "Automatización de procesos",
          "Gobierno y seguridad de la IA",
        ],
        icon: BrainCircuit,
      },
      {
        slug: "transformacion-digital",
        title: "Consultoría y transformación digital",
        summary:
          "Consultoría, asesoría, estudios, investigación y auditoría tecnológica orientados a decisiones de negocio.",
        problem:
          "Inversiones en tecnología sin hoja de ruta, proveedores que no se coordinan y sistemas aislados.",
        includes: [
          "Diagnóstico y hoja de ruta tecnológica",
          "Arquitectura empresarial y de sistemas de información",
          "Gestión y automatización de procesos (BPM)",
          "Auditoría tecnológica",
          "Estudios e investigación aplicada",
          "Acompañamiento en la adopción",
        ],
        icon: Waypoints,
      },
    ],
  },
  {
    id: "seguridad",
    title: "Seguridad, infraestructura y operación",
    description:
      "La base sobre la que todo lo demás funciona: redes, servidores, nube y la seguridad que los protege.",
    services: [
      {
        slug: "ciberseguridad",
        title: "Ciberseguridad",
        summary:
          "Evaluaciones, arquitectura de seguridad y controles diseñados desde el inicio, no añadidos al final.",
        problem:
          "Riesgos que no se ven hasta que ocurre un incidente, accesos sin control y auditorías que encuentran brechas.",
        includes: [
          "Evaluaciones de seguridad (assessments)",
          "Gestión de vulnerabilidades",
          "Gestión de identidades y accesos (IAM/PAM)",
          "Arquitectura de seguridad y cloud",
          "Gobierno, riesgo y cumplimiento (GRC)",
          "Preparación y respuesta ante incidentes",
        ],
        icon: ShieldCheck,
      },
      {
        slug: "infraestructura",
        title: "Infraestructura, redes y telecomunicaciones",
        summary:
          "Diseño, implementación y administración de redes, servidores, almacenamiento y nube.",
        problem:
          "Redes lentas o inestables, servidores sin respaldo y caídas que detienen la operación.",
        includes: [
          "Redes cableadas e inalámbricas",
          "Firewalls y seguridad perimetral",
          "Servidores y almacenamiento",
          "Migración y gestión de nube",
          "Respaldo y recuperación ante desastres",
          "Telecomunicaciones y monitoreo",
        ],
        icon: Network,
      },
      {
        slug: "servicios-administrados",
        title: "Servicios administrados y soporte técnico",
        summary:
          "Administración, mantenimiento y soporte continuo con acuerdos de nivel de servicio definidos.",
        problem:
          "TI que solo se atiende cuando algo falla y sin nadie responsable del resultado.",
        includes: [
          "Mesa de ayuda y soporte técnico",
          "Mantenimiento preventivo y correctivo",
          "Administración de plataformas",
          "Seguridad administrada",
          "Monitoreo continuo",
          "Reportes periódicos de servicio",
        ],
        icon: LifeBuoy,
      },
    ],
  },
  {
    id: "digital",
    title: "Comunicación digital y audiovisual",
    description:
      "Presencia digital, contenido y captura de datos visuales del territorio con equipos profesionales.",
    services: [
      {
        slug: "marketing-digital",
        title: "Marketing digital y redes sociales",
        summary:
          "Estrategia, publicidad digital y gestión profesional de redes sociales con métricas claras.",
        problem:
          "Presencia digital inconsistente y campañas sin medición de resultados.",
        includes: [
          "Estrategia de marketing digital",
          "Gestión de redes sociales",
          "Publicidad digital",
          "Producción de contenido",
          "Analítica y reportes",
        ],
        icon: Megaphone,
      },
      {
        slug: "produccion-audiovisual",
        title: "Fotografía, video y producción audiovisual",
        summary:
          "Fotografía, videografía y producción audiovisual corporativa, de producto y de eventos.",
        problem:
          "Material visual que no refleja el nivel real de la empresa.",
        includes: [
          "Fotografía corporativa y de producto",
          "Videografía y producción audiovisual",
          "Cobertura de eventos",
          "Edición y postproducción",
          "Contenido publicitario",
        ],
        icon: Camera,
      },
      {
        slug: "drones-geoespacial",
        title: "Drones, fotogrametría y modelado 3D",
        summary:
          "Fotografía y video aéreo, fotogrametría, georreferenciación y modelos 3D a partir de vuelos con drones.",
        problem:
          "Levantamientos lentos y costosos, y falta de información visual precisa de terrenos, obras e instalaciones.",
        includes: [
          "Fotografía y videografía aérea",
          "Fotogrametría y ortomosaicos",
          "Georreferenciación",
          "Modelado 3D de terrenos y estructuras",
          "Seguimiento de avance de obras",
          "Inspección visual de instalaciones",
        ],
        icon: ScanSearch,
      },
    ],
  },
  {
    id: "suministro",
    title: "Suministro tecnológico y formación",
    description:
      "Los equipos, licencias y conocimientos que cada solución necesita para funcionar y sostenerse.",
    services: [
      {
        slug: "suministro-tecnologico",
        title: "Suministro y comercialización de tecnología",
        summary:
          "Compra, venta, importación, exportación, distribución y alquiler de equipos y licencias.",
        problem:
          "Equipos comprados sin criterio técnico, sin garantía clara ni soporte posterior.",
        includes: [
          "Equipos informáticos y electrónicos",
          "Equipos audiovisuales y de telecomunicaciones",
          "Drones y accesorios",
          "Software y licencias",
          "Hardware, componentes y accesorios",
          "Importación, representación, distribución y alquiler",
        ],
        icon: Boxes,
      },
      {
        slug: "capacitacion",
        title: "Capacitación y formación técnica",
        summary:
          "Talleres y programas de formación en tecnología, seguridad, herramientas digitales y producción audiovisual.",
        problem:
          "Herramientas implementadas que el equipo no sabe aprovechar.",
        includes: [
          "Talleres corporativos",
          "Concienciación en ciberseguridad",
          "Formación en herramientas implementadas",
          "Capacitación técnica especializada",
          "Programas a la medida",
        ],
        icon: GraduationCap,
      },
    ],
  },
];

export const allServices: Service[] = serviceGroups.flatMap((g) => g.services);

export const serviceOptions: { value: ServiceSlug | "otro"; label: string }[] = [
  ...allServices.map((s) => ({ value: s.slug, label: s.title })),
  { value: "otro", label: "Otro / no estoy seguro" },
];
