import { createComponent } from "@lit/react";
import { OreNavbar as OreNavbarElement } from "oreui-web/navbar";
import React from "react";

export const Navbar = createComponent({
  react: React,
  tagName: "ore-navbar",
  elementClass: OreNavbarElement,
  displayName: "Navbar",
});

export type NavbarProps = React.ComponentProps<typeof Navbar>;
