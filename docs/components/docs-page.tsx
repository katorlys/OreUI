import { getMDXComponents } from "@/components/mdx";
import type { Locale } from "@/lib/i18n";
import { getPageImageUrl, source } from "@/lib/source";
import { createRelativeLink } from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export interface DocsPageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function renderDocsPage(
  locale: Locale,
  { params }: DocsPageProps,
) {
  const { slug } = await params;
  const page = source.getPage(slug, locale);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function getDocsMetadata(
  locale: Locale,
  { params }: DocsPageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug, locale);

  if (!page) {
    notFound();
  }

  const image = getPageImageUrl(page).url;

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: image,
    },
    twitter: {
      images: image,
    },
  };
}
