"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { OreIconButton } from "@katorlys/oreui-react/icon-button";
import { createElement } from "react";

const closeIcon = (
  <svg viewBox="0 0 8 8">
    <path
      d="M.5.5h1v1h.966v1h-1v-1H.5zm7 1h-1v-1h1zm-2 1v-1h1v1zm-1 1h1v-1h-1zm0 1v-1h-1v-1h-1v1h1v1h-1v1h-1v1h-1v1h1v-1h1v-1h1v-1zm0 0h1v1h-1zm1.034 2H6.5v1h1v-1h-.966v-1h-1z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

interface IconButtonPreviewProps {
  disabled: boolean;
  label: string;
  type: "button" | "reset" | "submit";
}

function IconButtonPreview({
  disabled,
  label,
  type,
}: IconButtonPreviewProps) {
  return (
    <OreIconButton aria-label={label} disabled={disabled} type={type}>
      {createElement("ore-icon", { "aria-hidden": "true" }, closeIcon)}
    </OreIconButton>
  );
}

const { defineStory } = defineStoryFactory();

export const iconButtonStory = defineStory({
  Component: IconButtonPreview,
  displayName: "Icon Button",
  args: {
    initial: {
      disabled: false,
      label: "Close",
      type: "button",
    },
  },
});

export const IconButtonStory = iconButtonStory.WithControl;