"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Spinner } from "@oreui-web/react/spinner";

interface SpinnerPreviewProps {
  decorative: boolean;
  label: string;
  size: number;
}

function SpinnerPreview({ decorative, label, size }: SpinnerPreviewProps) {
  return (
    <span style={{ fontSize: `${size}px` }}>
      <Spinner
        aria-hidden={decorative ? "true" : undefined}
        aria-label={decorative ? undefined : label}
      />
    </span>
  );
}

const { defineStory } = defineStoryFactory();

export const spinnerStory = defineStory({
  Component: SpinnerPreview,
  displayName: "Spinner",
  args: {
    initial: {
      decorative: false,
      label: "Loading",
      size: 32,
    },
  },
});

export const SpinnerStory = spinnerStory.WithControl;
