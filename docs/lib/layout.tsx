import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { SiteBrand, SiteBrandSlot } from "@/components/site-brand";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <SiteBrand />,
    },
    slots: {
      navTitle: SiteBrandSlot,
    },
    githubUrl: "https://github.com/katorlys/OreUI",
  };
}
