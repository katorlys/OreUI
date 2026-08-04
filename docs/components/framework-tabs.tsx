"use client";

import { Tabs as FumadocsTabs, type TabsProps } from "fumadocs-ui/components/tabs";

export function FrameworkTabs({
  className,
  items,
  ...props
}: TabsProps) {
  return (
    <FumadocsTabs
      className={props.groupId === "framework" ? "ore-framework-tabs" : className}
      items={items}
      {...props}
    />
  );
}