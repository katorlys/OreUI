import { createComponent } from "@lit/react";
import { OreProgressRing as OreProgressRingElement } from "oreui-web/progress-ring";
import React from "react";

export const ProgressRing = createComponent({
  react: React,
  tagName: "ore-progress-ring",
  elementClass: OreProgressRingElement,
  displayName: "ProgressRing",
});

export type ProgressRingProps = React.ComponentProps<typeof ProgressRing>;
