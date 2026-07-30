import { createComponent } from "@lit/react";
import { OreContainer as OreContainerElement } from "@katorlys/oreui/container";
import React from "react";

export const OreContainer = createComponent({
  react: React,
  tagName: "ore-container",
  elementClass: OreContainerElement,
  displayName: "OreContainer",
});

export type OreContainerProps = React.ComponentProps<typeof OreContainer>;
