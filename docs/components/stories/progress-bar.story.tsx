"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { ProgressBar } from "@oreui-web/react/progress-bar";

interface ProgressBarPreviewProps {
  label: string;
  labelAlign: "center" | "end" | "start";
  labelPosition: "bottom" | "top";
  max: number;
  value: number;
}

function ProgressBarPreview({
  label,
  labelAlign,
  labelPosition,
  max,
  value,
}: ProgressBarPreviewProps) {
  const output = label ? (
    <output className="ore-progress-bar-label" data-align={labelAlign}>
      {label}
    </output>
  ) : null;

  return (
    <div style={{ color: "var(--color-fd-foreground)" }}>
      {labelPosition === "top" ? output : null}
      <ProgressBar value={value} max={max} aria-label={label || "Progress"} />
      {labelPosition === "bottom" ? output : null}
    </div>
  );
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
    },
  },
});

export const ProgressBarStory = progressBarStory.WithControl;
