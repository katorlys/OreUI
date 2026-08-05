import { createComponent } from "@lit/react";
import { OreTabBar as OreTabBarElement } from "@katorlys/oreui/tab-bar";
import React from "react";

export { TabButton, type TabButtonProps } from "./tab-button.js";

export const TabBar = createComponent({
  react: React,
  tagName: "ore-tab-bar",
  elementClass: OreTabBarElement,
  displayName: "TabBar",
});

export type TabBarProps = React.ComponentProps<typeof TabBar>;
