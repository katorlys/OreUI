import { createComponent } from "@lit/react";
import { OreScrollbar as OreScrollbarElement } from "@katorlys/oreui/scrollbar";
import React from "react";

export const OreScrollbar = createComponent({
  react: React,
  tagName: "ore-scrollbar",
  elementClass: OreScrollbarElement,
  displayName: "OreScrollbar",
});

export type OreScrollbarProps = React.ComponentProps<typeof OreScrollbar>;
