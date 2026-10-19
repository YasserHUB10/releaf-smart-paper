import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://releaf.vercel.app";
  const routes = [
    "/",
    "/features",
    "/how-it-works",
    "/workspace",
    "/assistant",
    "/paper-compatibility",
    "/documentguard",
    "/dashboard",
    "/about",
    "/help",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
