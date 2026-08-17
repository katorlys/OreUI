import type { Metadata } from "next";

const isDevelopment = process.env.NODE_ENV === "development";
const isVercelPreview = process.env.VERCEL_ENV === "preview";
const metadataBase = new URL(
  isVercelPreview && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/OreUI/`
    : "https://katorly.dev/OreUI/",
);
const faviconVariant = isDevelopment
  ? ".dev"
  : isVercelPreview
    ? ".preview"
    : "";

export const favicon = {
  ico: `/OreUI/favicon/favicon${faviconVariant}.ico`,
  svg: `/OreUI/favicon/favicon${faviconVariant}.svg`,
};

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "OreUI",
    template: "%s | OreUI",
  },
  description: "Unofficial Ore UI cross-framework component library.",
  icons: {
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
