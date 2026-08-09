import { createComponent } from "@lit/react";
import { OreContainer as OreContainerElement } from "oreui-web/container";
import React from "react";

export const Container = createComponent({
  react: React,
  tagName: "ore-container",
  elementClass: OreContainerElement,
  displayName: "Container",
});

export type ContainerProps = React.ComponentProps<typeof Container>;
