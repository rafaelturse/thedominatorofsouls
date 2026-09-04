import type { MetadataRoute } from "next";
import { books } from "@/lib/data";

const BASE_URL = "https://thedominatorofsouls.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  const bookRoutes: MetadataRoute.Sitemap = books.map((book) => ({
    url: `${BASE_URL}/books/${book.slug}`,
    lastModified: new Date(),
    changeFrequency: book.status === "upcoming" ? "monthly" : "yearly",
    priority: book.status === "published" ? 0.9 : 0.5,
  }));

  return [...staticRoutes, ...bookRoutes];
}