"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Button } from "@oreui-web/react/button";
import chevronLeftUrl from "oreui-web/icons/chevron-left";
import chevronRightUrl from "oreui-web/icons/chevron-right";

const chevronLeftSource =
  typeof chevronLeftUrl === "string" ? chevronLeftUrl : chevronLeftUrl.src;
const chevronRightSource =
  typeof chevronRightUrl === "string" ? chevronRightUrl : chevronRightUrl.src;

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
  loading: boolean;
  type: "button" | "reset" | "submit";
  variant: "default" | "hero";
}

function ButtonPreview({
  color,
  children,
  disabled,
  loading,
  type,
  variant,
}: ButtonPreviewProps) {
  return (
    <Button
      color={color}
      disabled={disabled}
      loading={loading}
      type={type}
      variant={variant}
    >
      {children}
    </Button>
  );
}

export function LinkButtonPreview() {
  return (
    <Button
      href="https://github.com/katorlys/OreUI"
      target="_blank"
      rel="noreferrer"
    >
      Open OreUI on GitHub
    </Button>
  );
}

export function ButtonAffixesPreview() {
  const iconStyle = (source: string) => ({
    backgroundColor: "currentColor",
    display: "block",
    flex: "0 0 8px",
    height: "8px",
    maskImage: `url(${source})`,
    maskPosition: "center",
    maskRepeat: "no-repeat",
    maskSize: "contain",
    WebkitMaskImage: `url(${source})`,
    WebkitMaskPosition: "center",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    width: "8px",
  });

  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Button>
        <span
          className="ore-button-prefix"
          style={iconStyle(chevronLeftSource)}
          aria-hidden="true"
        />
        Back
      </Button>
      <Button>
        Continue
        <span
          className="ore-button-suffix"
          style={iconStyle(chevronRightSource)}
          aria-hidden="true"
        />
      </Button>
    </div>
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
      loading: false,
      type: "button",
      variant: "default",
    },
  },
});

export const ButtonStory = buttonStory.WithControl;
