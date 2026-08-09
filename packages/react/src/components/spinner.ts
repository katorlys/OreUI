import { createComponent } from "@lit/react";
import { OreSpinner as OreSpinnerElement } from "oreui-web/spinner";
import React from "react";

export const Spinner = createComponent({
  react: React,
  tagName: "ore-spinner",
  elementClass: OreSpinnerElement,
  displayName: "Spinner",
});

export type SpinnerProps = React.ComponentProps<typeof Spinner>;
