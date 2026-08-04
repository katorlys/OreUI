import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://lab.katorly.com/OreUI/"),
  title: {
    default: "OreUI",
    template: "%s | OreUI",
  },
  description: "An unofficial Ore UI cross-framework component library.",
};