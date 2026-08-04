import {
  type DocsPageProps,
  getDocsMetadata,
  renderDocsPage,
} from "@/components/docs-page";
import { source } from "@/lib/source";

interface LocalizedPageProps {
  params: Promise<{ lang: string; slug?: string[] }>;
}

export default function Page(props: LocalizedPageProps) {
  return renderDocsPage("zh-CN", props as DocsPageProps);
}

export function generateStaticParams() {
  return source
    .getPages("zh-CN")
    .map((page) => ({ lang: "zh-CN", slug: page.slugs }));
}

export function generateMetadata(props: LocalizedPageProps) {
  return getDocsMetadata("zh-CN", props as DocsPageProps);
}