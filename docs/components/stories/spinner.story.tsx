"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Spinner } from "@oreui-web/react/spinner";
import { useEffect, useState } from "react";

interface SpinnerPreviewProps {
  decorative: boolean;
  label: string;
  size: number;
}

function SpinnerPreview({ decorative, label, size }: SpinnerPreviewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
