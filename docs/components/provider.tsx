"use client";

import { type ReactNode, useEffect } from "react";
import { RootProvider } from "fumadocs-ui/provider/next";
import { usePathname, useRouter } from "next/navigation";

import DefaultSearchDialog from "@/components/search";
import { i18nUI } from "@/lib/i18n";

const localeStorageKey = "oreui-locale";

type Locale = "en" | "zh-CN";

function saveLocale(locale: string) {
  try {
    localStorage.setItem(localeStorageKey, locale);
  } catch {}
}

function localizePath(pathname: string, locale: Locale) {
  const path = pathname.replace(/^\/zh-CN(?=\/|$)/, "") || "/";
  const suffix = `${window.location.search}${window.location.hash}`;

  return `${locale === "zh-CN" ? `/zh-CN${path === "/" ? "" : path}` : path}${suffix}`;
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

    if (locale === "zh-CN") {
      saveLocale(locale);
      return;
    }

    if (savedLocale === "en") {
      return;
    }

    if (savedLocale === "zh-CN") {
      router.replace(localizePath(pathname, savedLocale));
      return;
    }

    const browserLanguages = navigator.languages.length
      ? navigator.languages
      : [navigator.language];
    const preferredLocale =
      browserLanguages
        .map((language): Locale | null => {
          if (/^zh(?:-|$)/i.test(language)) {
            return "zh-CN";
          }

          return /^en(?:-|$)/i.test(language) ? "en" : null;
        })
        .find((language) => language !== null) ?? "en";

    saveLocale(preferredLocale);

    if (preferredLocale === "zh-CN") {
      router.replace(localizePath(pathname, preferredLocale));
    }
  }, [locale, pathname, router]);

  const provider = i18nUI.provider(locale);

  return (
    <RootProvider
      i18n={{
        ...provider,
        onLocaleChange(nextLocale) {
          if (nextLocale !== "en" && nextLocale !== "zh-CN") {
            return;
          }

          saveLocale(nextLocale);
          router.push(localizePath(pathname, nextLocale));
        },
      }}
      search={{ SearchDialog: DefaultSearchDialog }}
    >
      {children}
    </RootProvider>
  );
}
