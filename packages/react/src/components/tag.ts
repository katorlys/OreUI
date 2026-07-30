import { createComponent } from "@lit/react";
import { OreTag as OreTagElement } from "@katorlys/oreui/tag";
import React from "react";

export const OreTag = createComponent({
  react: React,
  tagName: "ore-tag",
  elementClass: OreTagElement,
  displayName: "OreTag",
});

export type OreTagProps = React.ComponentProps<typeof OreTag>;
