import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { Provider } from "@/components/provider";
import { favicon, metadata } from "@/lib/metadata";

import "../global.css";

export { metadata };

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = await params;

  if (lang !== "zh-CN") {
    notFound();
  }

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link rel="icon" href={favicon.svg} type="image/svg+xml" />
        <link rel="icon" href={favicon.ico} sizes="32x32" />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
