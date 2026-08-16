import "oreui-web/progress-ring";

import type { OreProgressRing } from "oreui-web/progress-ring";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type ProgressRingProps = OreComponentProps<
  OreProgressRing,
  "max" | "value"
>;

export const ProgressRing = createOreComponent<
  OreProgressRing,
  ProgressRingProps
>({
  properties: ["max", "value"],
  tagName: "ore-progress-ring",
});