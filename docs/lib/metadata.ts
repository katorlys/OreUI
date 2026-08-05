import type { Metadata } from "next";

const metadataBase = new URL("https://lab.katorly.com/OreUI/");

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "OreUI",
    template: "%s | OreUI",
  },
  description: "Unofficial Ore UI cross-framework component library.",
  icons: {
    icon: [
      {
        url: new URL("favicon/favicon.svg", metadataBase),
        type: "image/svg+xml",
      },
      { url: new URL("favicon/favicon.ico", metadataBase), sizes: "32x32" },
    ],
    apple: new URL("favicon/apple-touch-icon.png", metadataBase),
  },
  manifest: new URL("favicon/site.webmanifest", metadataBase),
  openGraph: {
    type: "website",
    siteName: "OreUI",
    images: [{ url: new URL("og-image.png", metadataBase) }],
  },
  twitter: {
    card: "summary_large_image",
    images: [new URL("og-image.png", metadataBase)],
  },
};
