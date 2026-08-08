"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Popup } from "@katorlys/oreui-react/popup";

interface PopupPreviewProps {
  duration: number;
  label: string;
  open: boolean;
  position:
    | "top-start"
    | "top-center"
    | "top-end"
    | "bottom-start"
    | "bottom-center"
    | "bottom-end";
  variant:
    | "neutral"
    | "secondary"
    | "primary"
    | "informative"
    | "notice"
    | "warning"
    | "realms-informative";
}

function PopupPreview({
  duration,
  label,
  open,
  position,
  variant,
}: PopupPreviewProps) {
  return (
    <Popup
      aria-label={label}
      duration={duration}
      open={open}
      position={position}
      variant={variant}
    >
      Saved
    </Popup>
  );
}

const { defineStory } = defineStoryFactory();

export const popupStory = defineStory({
  Component: PopupPreview,
  displayName: "Popup",
  args: {
    initial: {
      duration: 0,
      label: "World saved",
      open: true,
      position: "bottom-center",
      variant: "primary",
    },
  },
});

export const PopupStory = popupStory.WithControl;
