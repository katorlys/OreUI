"use client";

import { type ReactNode, useEffect } from "react";
import { RootProvider } from "fumadocs-ui/provider/next";
import { usePathname, useRouter } from "next/navigation";

import DefaultSearchDialog from "@/components/search";
import { i18nUI } from "@/lib/i18n";

const localeStorageKey = "oreui-locale";

function saveLocale(locale: string) {
  try {
    localStorage.setItem(localeStorageKey, locale);
  } catch {}
}

export function Provider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = /^\/zh-CN(?:\/|$)/.test(pathname) ? "zh-CN" : "en";

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    let savedLocale: string | null = null;

    try {
      savedLocale = localStorage.getItem(localeStorageKey);
    } catch {}

    if (savedLocale === "en" || savedLocale === "zh-CN") {
      return;
    }

    if (locale === "zh-CN") {
      saveLocale(locale);
      return;
    }

    const browserLanguages = navigator.languages.length
      ? navigator.languages
      : [navigator.language];
    const preferredLocale = browserLanguages.some((language) =>
      /^zh(?:-|$)/i.test(language),
    )
      ? "zh-CN"
      : "en";

    saveLocale(preferredLocale);

    if (preferredLocale === "zh-CN") {
      router.replace(`/zh-CN${pathname === "/" ? "" : pathname}`);
    }
  }, [locale, pathname, router]);

  const provider = i18nUI.provider(locale);

  return (
    <RootProvider
      i18n={{
        ...provider,
        onLocaleChange(nextLocale) {
          saveLocale(nextLocale);
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
