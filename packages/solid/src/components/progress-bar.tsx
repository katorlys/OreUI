import "oreui-web/progress-bar";

import type { OreProgressBar } from "oreui-web/progress-bar";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type ProgressBarProps = OreComponentProps<
  OreProgressBar,
  "label" | "labelAlign" | "labelPosition" | "max" | "value" | "variant"
>;

export const ProgressBar = createOreComponent<
  OreProgressBar,
  ProgressBarProps
>({
  properties: [
    "label",
    "labelAlign",
    "labelPosition",
    "max",
    "value",
    "variant",
  ],
  tagName: "ore-progress-bar",
});