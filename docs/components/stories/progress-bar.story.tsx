"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { ProgressBar } from "@katorlys/oreui-react/progress-bar";

interface ProgressBarPreviewProps {
  label: string;
  labelAlign: "center" | "end" | "start";
  labelPosition: "bottom" | "top";
  max: number;
  value: number;
  variant: "labeled" | "plain";
}

function ProgressBarPreview(props: ProgressBarPreviewProps) {
  return <ProgressBar {...props} />;
}

const { defineStory } = defineStoryFactory();

export const progressBarStory = defineStory({
  Component: ProgressBarPreview,
  displayName: "Progress Bar",
  args: {
    initial: {
      label: "",
      labelAlign: "center",
      labelPosition: "bottom",
      max: 100,
      value: 65,
      variant: "labeled",
    },
  },
});

export const ProgressBarStory = progressBarStory.WithControl;
