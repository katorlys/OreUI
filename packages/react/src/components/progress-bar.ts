import { createComponent } from "@lit/react";
import { OreProgressBar as OreProgressBarElement } from "@katorlys/oreui/progress-bar";
import React from "react";

export const OreProgressBar = createComponent({
  react: React,
  tagName: "ore-progress-bar",
  elementClass: OreProgressBarElement,
  displayName: "OreProgressBar",
});

export type OreProgressBarProps = React.ComponentProps<typeof OreProgressBar>;
