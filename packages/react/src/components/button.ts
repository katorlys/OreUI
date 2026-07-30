import { createComponent } from "@lit/react";
import { OreButton as OreButtonElement } from "@katorlys/oreui/button";
import React from "react";

export const OreButton = createComponent({
  react: React,
  tagName: "ore-button",
  elementClass: OreButtonElement,
  displayName: "OreButton",
});

export type OreButtonProps = React.ComponentProps<typeof OreButton>;
