import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, ResponsibleParty } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo trata ProofCore los datos personales que recibe a través de este sitio web.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Política de privacidad"
      intro="Explicamos qué datos recibimos a través de este sitio, para qué los usamos y cómo puedes ejercer tus derechos, conforme a la Ley 172-13 de protección de datos personales de la República Dominicana."
    >
      <h2>1. Responsable del tratamiento</h2>
      <ResponsibleParty />

      <h2>2. Qué datos recibimos</h2>
      <p>Solo recibimos los datos que tú nos envías voluntariamente en el formulario de contacto:</p>
      <ul>
        <li>Nombre y correo electrónico (obligatorios).</li>
        <li>Teléfono, empresa, cargo y país (opcionales).</li>
        <li>El servicio que te interesa y el mensaje que escribes.</li>
        <li>Tu decisión sobre recibir comunicaciones comerciales.</li>
      </ul>
      <p>
        Por motivos de seguridad, el sistema procesa de forma temporal tu dirección IP para
        limitar envíos abusivos y verificar que la solicitud no proviene de un programa
        automatizado. No usamos esa información para identificarte ni para publicidad.
      </p>
      <p>
        Te pedimos no incluir en el mensaje contraseñas, datos financieros, de salud u otra
        información sensible.
      </p>

      <h2>3. Para qué usamos tus datos</h2>
      <ul>
        <li>Responder tu solicitud y darle seguimiento.</li>
        <li>Preparar, si la pides, una propuesta de servicios.</li>
        <li>
          Enviarte comunicaciones comerciales, solo si lo aceptaste expresamente. Cada envío
          identificará a ProofCore e incluirá un mecanismo para darte de baja, conforme a la Ley
          310-14.
        </li>
      </ul>
      <p>
        La base del tratamiento es tu consentimiento, que otorgas al marcar la casilla del
        formulario y puedes retirar en cualquier momento.
      </p>

      <h2>4. Cómo se procesan</h2>
      <p>
        Este sitio no guarda tus datos en una base de datos. Al enviar el formulario, la
        información se transmite cifrada a nuestro servidor, se valida y se entrega como correo
        electrónico al buzón corporativo de ProofCore, donde la atiende nuestro equipo.
      </p>

      <h2>5. Con quién se comparten</h2>
      <p>
        No vendemos ni cedemos tus datos. Solo intervienen los proveedores técnicos necesarios
        para operar el sitio, bajo obligaciones de confidencialidad:
      </p>
      <ul>
        <li>El proveedor de alojamiento del sitio web.</li>
        <li>El proveedor de correo electrónico corporativo que entrega y almacena los mensajes.</li>
        <li>
          Cloudflare, cuando está activa la verificación anti-bots del formulario (Turnstile).
        </li>
      </ul>
      <p>
        Algunos de estos proveedores pueden procesar datos fuera de la República Dominicana, con
        medidas de seguridad adecuadas.
      </p>

      <h2>6. Cuánto tiempo los conservamos</h2>
      <p>
        Conservamos tus mensajes el tiempo necesario para atender tu solicitud y la relación
        comercial que pueda derivarse de ella, y como máximo 24 meses desde el último contacto,
        salvo que una obligación legal exija conservarlos por más tiempo.
      </p>

      <h2>7. Tus derechos</h2>
      <p>De acuerdo con la Ley 172-13, puedes solicitar en cualquier momento:</p>
      <ul>
        <li>Acceso a los datos que tenemos sobre ti.</li>
        <li>Rectificación de datos inexactos o incompletos.</li>
        <li>Cancelación o supresión de tus datos.</li>
        <li>Oposición a su tratamiento, incluida la baja de comunicaciones comerciales.</li>
      </ul>
      <p>
        Escríbenos
        {site.contact.email ? (
          <>
            {" "}a <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </>
        ) : (
          <>
            {" "}desde el <Link href="/contacto">formulario de contacto</Link>
          </>
        )}{" "}
        indicando tu solicitud. Responderemos en los plazos que establece la ley.
      </p>

      <h2>8. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas para proteger tus datos: transmisión cifrada,
        validación en el servidor, control de acceso al buzón corporativo y protección contra
        envíos abusivos. Puedes conocer más en nuestra <Link href="/seguridad">página de seguridad</Link>.
      </p>

      <h2>9. Cambios a esta política</h2>
      <p>
        Si modificamos esta política publicaremos la nueva versión en esta página con su fecha
        de actualización. Versión vigente: {site.privacyPolicyVersion}.
      </p>
    </LegalPage>
  );
}
