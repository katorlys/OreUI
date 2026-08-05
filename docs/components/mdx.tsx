import defaultMdxComponents from "fumadocs-ui/mdx";
import { Tab } from "fumadocs-ui/components/tabs";
import { BookOpen, Rocket, Component } from "lucide-react";
import type { MDXComponents } from "mdx/types";

import { FrameworkTabs } from "@/components/framework-tabs";
import { MdxCard } from "@/components/mdx-card";
import { SoftwareTabsTrigger } from "@/components/software-tabs";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    BookOpen,
    Card: MdxCard,
    CodeBlockTabsTrigger: SoftwareTabsTrigger,
    Component,
    Rocket,
    Tab,
    Tabs: FrameworkTabs,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
