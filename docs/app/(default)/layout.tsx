import type { ReactNode } from "react";

import { Provider } from "@/components/provider";
import { favicon, metadata } from "@/lib/metadata";

import "../global.css";

export { metadata };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
