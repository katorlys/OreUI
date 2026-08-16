import "oreui-web/tooltip";

import type { OreTooltip } from "oreui-web/tooltip";
import { createOreComponent } from "../factory.js";
import type { OpenChangeProps, OreComponentProps } from "../types.js";

export type TooltipProps = OreComponentProps<
  OreTooltip,
  "defaultOpen" | "delay" | "open" | "side"
> &
  OpenChangeProps;

export const Tooltip = createOreComponent<OreTooltip, TooltipProps>({
  events: { onOpenChange: "open-change" },
  properties: ["defaultOpen", "delay", "open", "side"],
  tagName: "ore-tooltip",
});