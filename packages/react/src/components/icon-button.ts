import { createComponent } from "@lit/react";
import { OreIconButton as OreIconButtonElement } from "@katorlys/oreui/icon-button";
import React from "react";

export const IconButton = createComponent({
  react: React,
  tagName: "ore-icon-button",
  elementClass: OreIconButtonElement,
  displayName: "IconButton",
});

export type IconButtonProps = React.ComponentProps<typeof IconButton>;
