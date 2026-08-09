import { createComponent } from "@lit/react";
import { OreToggles as OreTogglesElement } from "oreui-web/toggles";
import React from "react";

export { TabButton, type TabButtonProps } from "./tab-button.js";

export const Toggles = createComponent({
  react: React,
  tagName: "ore-toggles",
  elementClass: OreTogglesElement,
  displayName: "Toggles",
});

export type TogglesProps = React.ComponentProps<typeof Toggles>;
