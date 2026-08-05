import { createComponent } from "@lit/react";
import { OreToggles as OreTogglesElement } from "@katorlys/oreui/toggles";
import React from "react";

export { OreTabButton, type OreTabButtonProps } from "./tab-button.js";

export const OreToggles = createComponent({
  react: React,
  tagName: "ore-toggles",
  elementClass: OreTogglesElement,
  displayName: "OreToggles",
});

export type OreTogglesProps = React.ComponentProps<typeof OreToggles>;
