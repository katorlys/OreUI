import { getMDXComponents } from "@/components/mdx";
import { ViewOptionsPopover } from "@/components/view-options-popover";
import type { Locale } from "@/lib/i18n";
import { getPageImageUrl, getPageMarkdownUrl, source } from "@/lib/source";
import { createRelativeLink } from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
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
  const markdownUrl = getPageMarkdownUrl(page);
  const githubUrl = `https://github.com/katorlys/OreUI/blob/main/docs/content/docs/${page.path}`;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <div className="flex items-center gap-2 border-b pt-2 pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover markdownUrl={markdownUrl} githubUrl={githubUrl} />
      </div>
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
