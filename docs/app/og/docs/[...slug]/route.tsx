import { getPageImageUrl, source } from "@/lib/source";
import { generateOGImage } from "fumadocs-ui/og";
import { notFound } from "next/navigation";

export const revalidate = false;

interface ImageRouteProps {
  params: Promise<{ slug: string[] }>;
}

export async function GET(_request: Request, { params }: ImageRouteProps) {
  const { slug } = await params;
  const [locale, ...segments] = slug;
  const page = source.getPage(segments.slice(0, -1), locale);

  if (!page || segments.at(-1) !== "image.png") {
    notFound();
  }

  return generateOGImage({
    title: page.data.title,
    description: page.data.description,
    site: "OreUI",
  });
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getPageImageUrl(page).segments,
  }));
}
