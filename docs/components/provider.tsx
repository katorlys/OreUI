"use client";

import { type ReactNode, useEffect } from "react";
import { RootProvider } from "fumadocs-ui/provider/next";
import { usePathname, useRouter } from "next/navigation";

import DefaultSearchDialog from "@/components/search";
import { i18nUI } from "@/lib/i18n";

export function Provider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.startsWith("/zh-CN/") ? "zh-CN" : "en";

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const provider = i18nUI.provider(locale);

  return (
    <RootProvider
      i18n={{
        ...provider,
        onLocaleChange(nextLocale) {
          const path = pathname.replace(/^\/zh-CN(?=\/|$)/, "") || "/";
          router.push(nextLocale === "zh-CN" ? `/zh-CN${path}` : path);
        },
      }}
      search={{ SearchDialog: DefaultSearchDialog }}
    >
      {children}
    </RootProvider>
  );
}
