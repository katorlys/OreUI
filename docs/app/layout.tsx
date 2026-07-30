import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Provider } from "@/components/provider";

import "./global.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lab.katorly.com/OreUI/"),
  title: {
    default: "OreUI",
    template: "%s | OreUI",
  },
  description: "An unofficial Ore UI cross-framework component library.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
