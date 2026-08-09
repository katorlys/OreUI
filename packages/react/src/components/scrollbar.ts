import { createComponent } from "@lit/react";
import { OreScrollbar as OreScrollbarElement } from "oreui-web/scrollbar";
import React from "react";

export const Scrollbar = createComponent({
  react: React,
  tagName: "ore-scrollbar",
  elementClass: OreScrollbarElement,
  displayName: "Scrollbar",
});

export type ScrollbarProps = React.ComponentProps<typeof Scrollbar>;
