import "oreui-web/accordion";

import type { OreAccordion } from "oreui-web/accordion";
import { createOreComponent } from "../factory.js";
import type { OpenChangeProps, OreComponentProps } from "../types.js";

export type AccordionProps = OreComponentProps<
  OreAccordion,
  "defaultOpen" | "open" | "value"
> &
  OpenChangeProps;

export const Accordion = createOreComponent<OreAccordion, AccordionProps>({
  events: { onOpenChange: "open-change" },
  properties: ["defaultOpen", "open", "value"],
  tagName: "ore-accordion",
});
