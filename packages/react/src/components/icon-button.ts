import { createComponent } from "@lit/react";
import { OreIconButton as OreIconButtonElement } from "@katorlys/oreui/icon-button";
import React from "react";

export const OreIconButton = createComponent({
  react: React,
  tagName: "ore-icon-button",
  elementClass: OreIconButtonElement,
  displayName: "OreIconButton",
});

export type OreIconButtonProps = React.ComponentProps<typeof OreIconButton>;
