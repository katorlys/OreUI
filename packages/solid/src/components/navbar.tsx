import "oreui-web/navbar";

import type { OreNavbar } from "oreui-web/navbar";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type NavbarProps = OreComponentProps<OreNavbar>;

export const Navbar = createOreComponent<OreNavbar, NavbarProps>({
  tagName: "ore-navbar",
});