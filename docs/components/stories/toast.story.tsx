"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Toast } from "@katorlys/oreui-react/toast";

interface ToastPreviewProps {
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

function ToastPreview({
  duration,
  label,
  open,
  position,
  variant,
}: ToastPreviewProps) {
  return (
    <Toast
      aria-label={label}
      duration={duration}
      open={open}
      position={position}
      variant={variant}
    >
      Saved
    </Toast>
  );
}

const { defineStory } = defineStoryFactory();

export const toastStory = defineStory({
  Component: ToastPreview,
  displayName: "Toast",
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

export const ToastStory = toastStory.WithControl;
