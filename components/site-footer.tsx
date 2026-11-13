import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { allServices } from "@/lib/services";
import { navigation, site, whatsappUrl } from "@/lib/site";
import { Logo } from "./logo";

const legal = [
  { href: "/privacidad", label: "Política de privacidad" },
  { href: "/terminos", label: "Términos de uso" },
  { href: "/cookies", label: "Política de cookies" },
  { href: "/seguridad#reportar", label: "Reportar una vulnerabilidad" },
];

export function SiteFooter() {
  const { contact } = site;
  return (
    <footer className="bg-pc-navy-deep text-blue-100/80">
      <div className="container-pc grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo variant="white" className="h-8 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{site.essence}</p>
          <p className="mt-2 text-sm font-semibold text-pc-teal">{site.slogan}</p>
        </div>

        <FooterColumn title="Servicios" className="md:col-span-3">
          {allServices.slice(0, 6).map((s) => (
            <FooterLink key={s.slug} href={`/servicios#${s.slug}`}>
              {s.title}
            </FooterLink>
          ))}
          <FooterLink href="/servicios">Ver todos</FooterLink>
        </FooterColumn>

        <FooterColumn title="Empresa" className="md:col-span-2">
          {navigation
            .filter((n) => n.href !== "/servicios")
            .map((n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
              </FooterLink>
            ))}
          <FooterLink href="/contacto">Contacto</FooterLink>
        </FooterColumn>

        <FooterColumn title="Contacto" className="md:col-span-3">
          {contact.email && (
            <ContactItem icon={<Mail />} href={`mailto:${contact.email}`}>
              {contact.email}
            </ContactItem>
          )}
          {contact.phone && (
            <ContactItem icon={<Phone />} href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>
              {contact.phone}
            </ContactItem>
          )}
          {contact.whatsapp && (
            <ContactItem icon={<MessageCircle />} href={whatsappUrl(contact.whatsapp)} external>
              WhatsApp
            </ContactItem>
          )}
          <ContactItem icon={<MapPin />}>{contact.address ?? site.country}</ContactItem>
          <FooterLink href="/contacto">Escríbenos desde el formulario</FooterLink>
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <div className="container-pc flex flex-col gap-4 pt-6 pb-24 text-xs sm:pb-6 md:flex-row md:items-center md:justify-between md:pr-28">
          <p>
            © {site.copyrightYear} {site.legalName}
            {site.rnc && ` · RNC ${site.rnc}`}. Todos los derechos reservados.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <h2 className="text-xs font-bold tracking-[0.14em] text-white uppercase">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}

function ContactItem({
  icon,
  href,
  external,
  children,
}: {
  icon: React.ReactElement;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const content = (
    <span className="flex items-start gap-2.5">
      <span aria-hidden className="mt-0.5 text-pc-teal [&>svg]:size-4">
        {icon}
      </span>
      <span className="break-all">{children}</span>
    </span>
  );
  return (
    <li>
      {href ? (
        <a
          href={href}
          className="transition-colors hover:text-white"
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}
