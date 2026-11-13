import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  { path: "", priority: 1 },
  { path: "/servicios", priority: 0.9 },
  { path: "/contacto", priority: 0.9 },
  { path: "/industrias", priority: 0.8 },
  { path: "/nosotros", priority: 0.7 },
  { path: "/seguridad", priority: 0.6 },
  { path: "/privacidad", priority: 0.3 },
  { path: "/terminos", priority: 0.3 },
  { path: "/cookies", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
