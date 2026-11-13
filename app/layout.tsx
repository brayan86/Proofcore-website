import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ChatAssistant } from "@/components/chat-assistant";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site, whatsappUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.slogan}`,
    template: `%s · ${site.name}`,
  },
  description: `${site.essence} ${site.description}`,
  applicationName: site.name,
  keywords: [
    "ProofCore",
    "consultoría tecnológica",
    "ciberseguridad",
    "desarrollo de software",
    "inteligencia artificial",
    "infraestructura",
    "redes",
    "transformación digital",
    "drones",
    "fotogrametría",
    "República Dominicana",
  ],
  openGraph: {
    type: "website",
    locale: "es_DO",
    siteName: site.name,
    title: `${site.name} · ${site.slogan}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#06264d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={inter.variable} data-scroll-behavior="smooth">
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenido"
          className="sr-only z-50 rounded-md bg-pc-electric px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <ChatAssistant
          contactEmail={site.contact.email ?? "contacto@proofcore.com"}
          phone={site.contact.phone}
          whatsappUrl={site.contact.whatsapp && whatsappUrl(site.contact.whatsapp)}
          turnstileSiteKey={process.env.TURNSTILE_SITE_KEY || undefined}
        />
      </body>
    </html>
  );
}
