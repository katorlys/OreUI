import "oreui-web/button";

import type {
  OreButton,
  OreButtonColor,
  OreButtonType,
  OreButtonVariant,
} from "oreui-web/button";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type ButtonProps = OreComponentProps<
  OreButton,
  "color" | "disabled" | "type" | "variant"
> & {
  color?: OreButtonColor;
  type?: OreButtonType;
  variant?: OreButtonVariant;
};

export const Button = createOreComponent<OreButton, ButtonProps>({
  properties: ["color", "disabled", "type", "variant"],
  tagName: "ore-button",
});