import { createComponent } from "@lit/react";
import { OreCard as OreCardElement } from "@katorlys/oreui/card";
import React from "react";

export const OreCard = createComponent({
  react: React,
  tagName: "ore-card",
  elementClass: OreCardElement,
  displayName: "OreCard",
});

export type OreCardProps = React.ComponentProps<typeof OreCard>;
