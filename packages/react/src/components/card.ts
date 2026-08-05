import { createComponent } from "@lit/react";
import { OreCard as OreCardElement } from "@katorlys/oreui/card";
import React from "react";

export const Card = createComponent({
  react: React,
  tagName: "ore-card",
  elementClass: OreCardElement,
  displayName: "Card",
});

export type CardProps = React.ComponentProps<typeof Card>;
