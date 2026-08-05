import { createComponent } from "@lit/react";
import { OreButton as OreButtonElement } from "@katorlys/oreui/button";
import React from "react";

export const Button = createComponent({
  react: React,
  tagName: "ore-button",
  elementClass: OreButtonElement,
  displayName: "Button",
});

export type ButtonProps = React.ComponentProps<typeof Button>;
