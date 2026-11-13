import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Uso de cookies y tecnologías similares en el sitio web de ProofCore.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Política de cookies"
      intro="Este sitio no utiliza cookies de publicidad, de seguimiento ni de analítica de terceros."
    >
      <h2>1. Qué son las cookies</h2>
      <p>
        Las cookies son pequeños archivos que un sitio web guarda en tu navegador para recordar
        información entre visitas.
      </p>

      <h2>2. Cookies que usamos</h2>
      <p>
        El sitio de ProofCore no instala cookies propias de publicidad, perfilado ni analítica.
        Por eso no te mostramos un aviso de aceptación de cookies.
      </p>
      <p>
        Cuando la verificación anti-bots del formulario de contacto está activa, Cloudflare
        Turnstile puede usar almacenamiento técnico estrictamente necesario para comprobar que la
        solicitud la envía una persona. Ese almacenamiento no se usa con fines publicitarios.
      </p>

      <h2>3. Cambios</h2>
      <p>
        Si en el futuro incorporamos analítica u otras cookies no esenciales, actualizaremos esta
        política y te pediremos tu consentimiento antes de activarlas, con la opción de
        rechazarlas.
      </p>

      <h2>4. Cómo gestionarlas</h2>
      <p>
        Puedes ver y eliminar las cookies desde la configuración de tu navegador en cualquier
        momento.
      </p>
    </LegalPage>
  );
}
