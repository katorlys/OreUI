import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { notFound } from "next/navigation";

import { baseOptions } from "@/lib/layout";
import { source } from "@/lib/source";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { lang } = await params;

  if (lang !== "zh-CN") {
    notFound();
  }

  return (
    <DocsLayout tree={source.getPageTree(lang)} {...baseOptions(false, lang)}>
      {children}
    </DocsLayout>
  );
}

export function generateStaticParams() {
  return [{ lang: "zh-CN" }];
}
