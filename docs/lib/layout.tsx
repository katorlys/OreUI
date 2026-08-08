import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { SiteBrand, SiteBrandSlot } from "@/components/site-brand";

export function baseOptions(showNavLinks = false): BaseLayoutProps {
  return {
    nav: {
      title: <SiteBrand />,
    },
    slots: {
      navTitle: SiteBrandSlot,
    },
    links: showNavLinks
      ? [
          {
            text: "Docs",
            url: "/docs",
            active: "nested-url",
          },
          {
            text: "Components",
            url: "/docs/overview",
            active: "url",
          },
        ]
      : [],
    githubUrl: "https://github.com/katorlys/OreUI",
  };
}
