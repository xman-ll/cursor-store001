import type { MetadataRoute } from "next";
import { categories, products, siteConfig } from "@/lib/store-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const categoryRoutes = categories
    .filter((category) => category.slug !== "all")
    .map((category) => ({
      url: `${siteConfig.domain}/categories/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const productRoutes = products.map((product) => ({
    url: `${siteConfig.domain}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteConfig.domain,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...categoryRoutes,
    ...productRoutes,
  ];
}
