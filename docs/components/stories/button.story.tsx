"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { OreButton } from "@katorlys/oreui-react/button";

interface ButtonPreviewProps {
  children: string;
  disabled: boolean;
  type: "button" | "reset" | "submit";
  variant: "destructive" | "hero" | "primary" | "secondary";
}

function ButtonPreview({
  children,
  disabled,
  type,
  variant,
}: ButtonPreviewProps) {
  return (
    <OreButton disabled={disabled} type={type} variant={variant}>
      {children}
    </OreButton>
  );
}

const { defineStory } = defineStoryFactory();

export const buttonStory = defineStory({
  Component: ButtonPreview,
  displayName: "Button",
  args: {
    initial: {
      children: "Create new world",
      disabled: false,
      type: "button",
      variant: "primary",
    },
  },
});

export const ButtonStory = buttonStory.WithControl;