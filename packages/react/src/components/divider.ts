import { createComponent } from "@lit/react";
import { OreDivider as OreDividerElement } from "oreui-web/divider";
import React from "react";

export const Divider = createComponent({
  react: React,
  tagName: "ore-divider",
  elementClass: OreDividerElement,
  displayName: "Divider",
});

export type DividerProps = React.ComponentProps<typeof Divider>;
