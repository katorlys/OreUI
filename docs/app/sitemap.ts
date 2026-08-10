import type { MetadataRoute } from "next";

import { source } from "@/lib/source";

const siteUrl = "https://katorly.dev/OreUI";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/` },
    { url: `${siteUrl}/zh-CN/` },
    ...source.getPages().map((page) => ({
      url: `${siteUrl}${page.url}/`,
    })),
  ];
}
