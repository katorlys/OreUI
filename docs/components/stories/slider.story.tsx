"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Slider } from "@oreui-web/react/slider";
import { useEffect, useState } from "react";

interface SliderPreviewProps {
  color:
    | "primary"
    | "secondary"
    | "destructive"
    | "dungeons"
    | "legends"
    | "realms"
    | "gold";
  disabled: boolean;
  initialValue: number;
  initialValueStart: number;
  max: number;
  min: number;
  orientation: "horizontal" | "vertical";
  range: boolean;
  step: number;
  variant: "default" | "segmented";
}

function SliderPreview({
  color,
  disabled,
  initialValue,
  initialValueStart,
  max,
  min,
  orientation,
  range,
  step,
  variant,
}: SliderPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [valueStart, setValueStart] = useState(initialValueStart);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div style={{ display: "grid", gap: "1rem", justifyItems: "start" }}>
      <Slider
        aria-label="Render distance"
        color={color}
        disabled={disabled}
        max={max}
        min={min}
        orientation={orientation}
        range={range}
        step={step}
        value={value}
        valueStart={valueStart}
        variant={variant}
        onInput={(event) => {
          const slider = event.target as HTMLElement & {
            value: number;
            valueStart: number;
          };
          setValue(slider.value);
          setValueStart(slider.valueStart);
        }}
      />
      <output aria-live="polite">
        Render distance: {range ? `${valueStart}-${value}` : value}
      </output>
    </div>
  );
}

const { defineStory } = defineStoryFactory();

export const sliderStory = defineStory({
  Component: SliderPreview,
  displayName: "Slider",
  args: {
    initial: {
      color: "primary",
      disabled: false,
      initialValue: 12,
      initialValueStart: 4,
      max: 32,
      min: 2,
      orientation: "horizontal",
      range: false,
      step: 1,
      variant: "segmented",
    },
  },
});

export const SliderStory = sliderStory.WithControl;
