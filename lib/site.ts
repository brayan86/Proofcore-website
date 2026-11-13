const optional = (value: string | undefined) => (value?.trim() ? value.trim() : undefined);

/**
 * Company data shown on the site. Values come from the environment so nothing
 * unverified (phone, address, RNC) is published by accident: empty values are
 * simply not rendered.
 */
export const site = {
  name: "ProofCore",
  legalName: optional(process.env.COMPANY_LEGAL_NAME) ?? "ProofCore",
  rnc: optional(process.env.COMPANY_RNC),
  slogan: "Technology You Can Trust.",
  essence: "Conocimiento que convierte complejidad en capacidad.",
  description:
    "Diseñamos, integramos, aseguramos y operamos tecnología para empresas que necesitan avanzar.",
  url: optional(process.env.SITE_URL) ?? "https://proofcore.com",
  country: "República Dominicana",
  copyrightYear: 2026,
  /** Public response-time commitment shown across the site; must match real operations. */
  responseTime: "menos de 24 horas laborables",
  contact: {
    email: optional(process.env.CONTACT_EMAIL),
    phone: optional(process.env.CONTACT_PHONE),
    whatsapp: optional(process.env.CONTACT_WHATSAPP),
    address: optional(process.env.COMPANY_ADDRESS),
    hours: optional(process.env.BUSINESS_HOURS),
    securityEmail: optional(process.env.SECURITY_EMAIL),
  },
  social: {
    linkedin: optional(process.env.SOCIAL_LINKEDIN),
    instagram: optional(process.env.SOCIAL_INSTAGRAM),
  },
  privacyPolicyVersion: "2026-11",
  privacyPolicyUpdated: "13 de noviembre de 2026",
} as const;

export const navigation = [
  { href: "/servicios", label: "Servicios" },
  { href: "/industrias", label: "Industrias" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/seguridad", label: "Seguridad" },
] as const;

export function whatsappUrl(number: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}`;
}
