"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { ProgressRing } from "@oreui-web/react/progress-ring";

interface ProgressRingPreviewProps {
  label: string;
  max: number;
  size: number;
  value: number;
}

function ProgressRingPreview({
  label,
  max,
  size,
  value,
}: ProgressRingPreviewProps) {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const safeValue = Math.min(safeMax, Math.max(0, value));
  const frame = Math.min(15, Math.floor((safeValue / safeMax) * 16));

  return (
    <span style={{ fontSize: `${size}px` }}>
      <ProgressRing
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={safeValue}
        role="progressbar"
        style={{ "--ore-progress-ring-frame": frame } as React.CSSProperties}
      />
    </span>
  );
}

const { defineStory } = defineStoryFactory();

export const progressRingStory = defineStory({
  Component: ProgressRingPreview,
  displayName: "Progress Ring",
  args: {
    initial: {
      label: "World generation progress",
      max: 100,
      size: 32,
      value: 50,
    },
  },
});

export const ProgressRingStory = progressRingStory.WithControl;
