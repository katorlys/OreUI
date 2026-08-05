import { createComponent } from "@lit/react";
import { OreTabBar as OreTabBarElement } from "@katorlys/oreui/tab-bar";
import React from "react";

export { OreTabButton, type OreTabButtonProps } from "./tab-button.js";

export const OreTabBar = createComponent({
  react: React,
  tagName: "ore-tab-bar",
  elementClass: OreTabBarElement,
  displayName: "OreTabBar",
});

export type OreTabBarProps = React.ComponentProps<typeof OreTabBar>;
