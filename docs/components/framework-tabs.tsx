"use client";

import {
  Tabs as FumadocsTabs,
  type TabsProps,
} from "fumadocs-ui/components/tabs";

export function FrameworkTabs({ className, items, ...props }: TabsProps) {
  const isFrameworkGroup = props.groupId === "framework";

  return (
    <FumadocsTabs
      {...props}
      className={isFrameworkGroup ? "ore-framework-tabs" : className}
      groupId={isFrameworkGroup ? "oreui-framework" : props.groupId}
      items={items}
    />
  );
}
