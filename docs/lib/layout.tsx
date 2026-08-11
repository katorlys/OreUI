import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import {
  SiteBrand,
  SiteBrandSlot,
  SiteBrandZhCnSlot,
} from "@/components/site-brand";

export function baseOptions(
  showNavLinks = false,
  lang?: "zh-CN",
): BaseLayoutProps {
  const prefix = lang === "zh-CN" ? "/zh-CN" : "";
  const docsText = lang === "zh-CN" ? "文档" : "Docs";
  const componentsText = lang === "zh-CN" ? "组件" : "Components";

  return {
    nav: {
      title: <SiteBrand lang={lang} />,
    },
    slots: {
      navTitle: lang === "zh-CN" ? SiteBrandZhCnSlot : SiteBrandSlot,
    },
    links: showNavLinks
      ? [
          {
            text: docsText,
            url: `${prefix}/docs`,
            active: "nested-url",
          },
          {
            text: componentsText,
            url: `${prefix}/docs/overview`,
            active: "url",
          },
        ]
      : [],
    githubUrl: "https://github.com/katorlys/OreUI",
  };
}
