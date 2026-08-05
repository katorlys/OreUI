import {
  type DocsPageProps,
  getDocsMetadata,
  renderDocsPage,
} from "@/components/docs-page";
import { source } from "@/lib/source";

export default function Page(props: DocsPageProps) {
  return renderDocsPage("en", props);
}

export function generateStaticParams() {
  return source.getPages("en").map((page) => ({ slug: page.slugs }));
}

export function generateMetadata(props: DocsPageProps) {
  return getDocsMetadata("en", props);
}
