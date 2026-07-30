import { createComponent } from "@lit/react";
import { OreNavbar as OreNavbarElement } from "@katorlys/oreui/navbar";
import React from "react";

export const OreNavbar = createComponent({
  react: React,
  tagName: "ore-navbar",
  elementClass: OreNavbarElement,
  displayName: "OreNavbar",
});

export type OreNavbarProps = React.ComponentProps<typeof OreNavbar>;
