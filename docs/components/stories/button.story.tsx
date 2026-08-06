"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Button } from "@katorlys/oreui-react/button";

interface ButtonPreviewProps {
  color:
    | "destructive"
    | "dungeons"
    | "gold"
    | "legends"
    | "primary"
    | "realms"
    | "secondary";
  children: string;
  disabled: boolean;
  type: "button" | "reset" | "submit";
  variant: "default" | "hero";
}

function ButtonPreview({
  color,
  children,
  disabled,
  type,
  variant,
}: ButtonPreviewProps) {
  return (
    <Button color={color} disabled={disabled} type={type} variant={variant}>
      {children}
    </Button>
  );
}

const { defineStory } = defineStoryFactory();

export const buttonStory = defineStory({
  Component: ButtonPreview,
  displayName: "Button",
  args: {
    initial: {
      children: "Create new world",
      color: "primary",
      disabled: false,
      type: "button",
      variant: "default",
    },
  },
});

export const ButtonStory = buttonStory.WithControl;
