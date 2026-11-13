import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, ResponsibleParty } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Términos de uso",
  description: "Condiciones de uso del sitio web de ProofCore.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Términos de uso"
      intro="Condiciones que aplican al uso de este sitio web. Al navegarlo aceptas estos términos."
    >
      <h2>1. Titular del sitio</h2>
      <ResponsibleParty />

      <h2>2. Finalidad del sitio</h2>
      <p>
        Este sitio presenta información sobre ProofCore y sus servicios, y ofrece un canal para
        contactarnos. Su contenido es informativo y no constituye una oferta vinculante. Las
        condiciones de cualquier servicio se establecen en una propuesta y un contrato por
        escrito.
      </p>

      <h2>3. Uso permitido</h2>
      <p>Te comprometes a usar el sitio de forma lícita. En particular, no está permitido:</p>
      <ul>
        <li>Enviar información falsa, de terceros sin autorización o contenido ilícito.</li>
        <li>Usar el formulario para enviar publicidad no solicitada o mensajes automatizados.</li>
        <li>
          Intentar acceder sin autorización, interferir o probar la seguridad del sitio fuera
          del proceso de <Link href="/seguridad#reportar">divulgación responsable</Link>. Estas
          conductas pueden constituir delitos según la Ley 53-07 sobre crímenes y delitos de
          alta tecnología.
        </li>
      </ul>

      <h2>4. Propiedad intelectual</h2>
      <p>
        La marca ProofCore, su logotipo, el slogan “Technology You Can Trust.”, los textos,
        diseños y demás contenidos de este sitio pertenecen a su titular o se usan con
        autorización, y están protegidos por la Ley 20-00 sobre propiedad industrial y la Ley
        65-00 sobre derecho de autor. No se permite su reproducción sin autorización previa por
        escrito.
      </p>

      <h2>5. Responsabilidad</h2>
      <p>
        Procuramos que la información del sitio sea exacta y esté actualizada, pero puede
        contener errores u omisiones. No somos responsables de decisiones tomadas únicamente con
        base en el contenido informativo del sitio. Los enlaces a sitios de terceros se ofrecen
        como referencia; no controlamos su contenido.
      </p>

      <h2>6. Comunicaciones electrónicas</h2>
      <p>
        Las comunicaciones que intercambiemos por medios electrónicos tienen validez conforme a
        la Ley 126-02 sobre comercio electrónico, documentos y firmas digitales.
      </p>

      <h2>7. Ley aplicable</h2>
      <p>
        Estos términos se rigen por las leyes de la República Dominicana. Cualquier controversia
        se someterá a los tribunales competentes de la República Dominicana.
      </p>

      <h2>8. Cambios</h2>
      <p>
        Podemos actualizar estos términos. La versión vigente es siempre la publicada en esta
        página.
      </p>
    </LegalPage>
  );
}
