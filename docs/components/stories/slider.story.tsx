"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { OreSlider } from "@katorlys/oreui-react/slider";
import { useEffect, useState } from "react";

interface SliderPreviewProps {
  disabled: boolean;
  initialValue: number;
  max: number;
  min: number;
  orientation: "horizontal" | "vertical";
  step: number;
  variant: "default" | "segmented";
}

function SliderPreview({
  disabled,
  initialValue,
  max,
  min,
  orientation,
  step,
  variant,
}: SliderPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div style={{ display: "grid", gap: "1rem", justifyItems: "start" }}>
      <OreSlider
        aria-label="Render distance"
        disabled={disabled}
        max={max}
        min={min}
        orientation={orientation}
        step={step}
        value={value}
        variant={variant}
        onInput={(event) => {
          const slider = event.target as HTMLElement & { value: number };
          setValue(slider.value);
        }}
      />
      <output aria-live="polite">Render distance: {value}</output>
    </div>
  );
}

const { defineStory } = defineStoryFactory();

export const sliderStory = defineStory({
  Component: SliderPreview,
  displayName: "Slider",
  args: {
    initial: {
      disabled: false,
      initialValue: 12,
      max: 32,
      min: 2,
      orientation: "horizontal",
      step: 1,
      variant: "segmented",
    },
  },
});

export const SliderStory = sliderStory.WithControl;