import Link from "next/link";
import { site } from "@/lib/site";

export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="border-b border-pc-line bg-pc-surface">
        <div className="container-pc py-16">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-pc-navy">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-pc-muted">{intro}</p>
          <p className="mt-6 text-sm text-pc-muted">
            Última actualización: {site.privacyPolicyUpdated}
          </p>
        </div>
      </section>
      <article className="container-pc py-14">
        <div className="prose-pc text-pc-dark">{children}</div>
      </article>
    </>
  );
}

export function ResponsibleParty() {
  const { legalName, rnc, contact, country } = site;
  return (
    <ul>
      <li>
        <strong>Responsable:</strong> {legalName}
        {rnc && `, RNC ${rnc}`}.
      </li>
      <li>
        <strong>Domicilio:</strong> {contact.address ?? country}.
      </li>
      <li>
        <strong>Contacto:</strong>{" "}
        {contact.email ? (
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        ) : (
          <Link href="/contacto">formulario de contacto</Link>
        )}
        .
      </li>
    </ul>
  );
}
