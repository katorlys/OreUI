import type { ReactNode } from "react";

import { Provider } from "@/components/provider";
import { metadata } from "@/lib/metadata";

import "../global.css";

export { metadata };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}