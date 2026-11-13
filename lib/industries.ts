import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Rocket,
  ShoppingBag,
  Users,
  HardHat,
} from "lucide-react";

export interface Industry {
  title: string;
  challenge: string;
  focus: string[];
  icon: LucideIcon;
}

export const industries: Industry[] = [
  {
    title: "Banca y entidades financieras",
    challenge:
      "Proveedores tecnológicos evaluados con el mismo rigor que la propia entidad, bajo el Reglamento de Seguridad Cibernética y de la Información.",
    focus: ["Seguridad y continuidad", "Gestión de accesos", "Integración de sistemas"],
    icon: Landmark,
  },
  {
    title: "Cooperativas de ahorro y crédito",
    challenge:
      "Controles de acceso, inventario de activos y continuidad del negocio con equipos de TI reducidos.",
    focus: ["Matriz de accesos", "Inventario de activos", "Infraestructura y respaldo"],
    icon: Users,
  },
  {
    title: "Salud",
    challenge:
      "Proteger datos clínicos, modernizar sistemas y mantener la operación disponible las 24 horas.",
    focus: ["Protección de datos", "Modernización", "Continuidad"],
    icon: HeartPulse,
  },
  {
    title: "Retail, hotelería y logística",
    challenge:
      "Operación distribuida en sucursales, puntos de venta y redes que no pueden detenerse.",
    focus: ["Redes y sucursales", "Nube", "Monitoreo y soporte"],
    icon: ShoppingBag,
  },
  {
    title: "Industria y manufactura",
    challenge:
      "Integrar la planta con los sistemas administrativos y automatizar procesos sin detener la producción.",
    focus: ["Automatización", "Infraestructura", "Datos operativos"],
    icon: Factory,
  },
  {
    title: "Construcción, agrimensura e inmobiliario",
    challenge:
      "Información precisa del terreno y del avance de obra sin depender de levantamientos lentos.",
    focus: ["Fotogrametría con drones", "Modelado 3D", "Registro audiovisual"],
    icon: HardHat,
  },
  {
    title: "Gobierno y educación",
    challenge:
      "Modernización de servicios y sistemas conforme a las normas NORTIC y a los procesos de compras públicas.",
    focus: ["Sistemas de información", "Seguridad", "Capacitación"],
    icon: GraduationCap,
  },
  {
    title: "Mediana empresa y PyME",
    challenge:
      "Digitalizarse y protegerse con un solo socio tecnológico, sin coordinar múltiples proveedores.",
    focus: ["Paquetes cerrados", "Seguridad básica", "Soporte"],
    icon: Building2,
  },
  {
    title: "Startups y empresas tecnológicas",
    challenge:
      "Construir producto rápido sin acumular deuda técnica ni riesgos de seguridad.",
    focus: ["Ingeniería de software", "Nube", "Seguridad de aplicaciones"],
    icon: Rocket,
  },
];
