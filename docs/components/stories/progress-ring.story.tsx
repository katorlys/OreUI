"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { ProgressRing } from "@oreui-web/react/progress-ring";
import { useEffect, useState } from "react";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <span style={{ fontSize: `${size}px` }}>
      <ProgressRing aria-label={label} max={max} value={value} />
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
