import { createComponent } from "@lit/react";
import { OreProgressBar as OreProgressBarElement } from "oreui-web/progress-bar";
import React from "react";

export const ProgressBar = createComponent({
  react: React,
  tagName: "ore-progress-bar",
  elementClass: OreProgressBarElement,
  displayName: "ProgressBar",
});

export type ProgressBarProps = React.ComponentProps<typeof ProgressBar>;
