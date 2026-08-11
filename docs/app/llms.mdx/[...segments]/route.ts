import { getLLMText } from "@/lib/get-llm-text";
import type { Locale } from "@/lib/i18n";
import { source } from "@/lib/source";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

interface MarkdownRouteProps {
  params: Promise<{ segments: string[] }>;
}

export async function GET(_request: Request, { params }: MarkdownRouteProps) {
  const { segments } = await params;
  const localized = segments[0] === "zh-CN";
  const locale: Locale = localized ? "zh-CN" : "en";
  const docsIndex = localized ? 1 : 0;

  if (segments[docsIndex] !== "docs" || segments.at(-1) !== "content.md") {
    notFound();
  }

  const page = source.getPage(segments.slice(docsIndex + 1, -1), locale);

  if (!page) {
    notFound();
  }

  return new Response(await getLLMText(page), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    segments: [
      ...(page.locale === "zh-CN" ? [page.locale] : []),
      "docs",
      ...page.slugs,
      "content.md",
    ],
  }));
}
