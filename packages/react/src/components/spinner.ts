import { createComponent } from "@lit/react";
import { OreSpinner as OreSpinnerElement } from "@katorlys/oreui/spinner";
import React from "react";

export const OreSpinner = createComponent({
  react: React,
  tagName: "ore-spinner",
  elementClass: OreSpinnerElement,
  displayName: "OreSpinner",
});

export type OreSpinnerProps = React.ComponentProps<typeof OreSpinner>;
