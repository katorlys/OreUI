import { defineI18n } from "fumadocs-core/i18n";
import { defineI18nUI } from "fumadocs-ui/i18n";

export const i18n = defineI18n({
  defaultLanguage: "en",
  languages: ["en", "zh-CN"],
  hideLocale: "default-locale",
});

export const i18nUI = defineI18nUI(i18n, {
  en: {
    displayName: "English",
  },
  "zh-CN": {
    displayName: "简体中文",
    "Choose a language(language switcher)": "选择语言",
    "Choose a language(language switcher)(aria-label)": "选择语言",
    "Close Search(search dialog)(aria-label)": "关闭搜索",
    "No results found(search dialog)": "未找到结果",
    "On this page(table of contents)": "目录",
    "Open Search(search trigger)(aria-label)": "打开搜索",
    "Previous Page(pagination)": "上一页",
    "Next Page(pagination)": "下一页",
    "Search(search dialog)": "搜索文档",
    "Search(search trigger)": "搜索",
    "Table of Contents(inline table of contents)": "目录",
  },
});

export type Locale = (typeof i18n.languages)[number];