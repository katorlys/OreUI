"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { OreTabButton } from "@katorlys/oreui-react/tab-button";
import { OreToggles } from "@katorlys/oreui-react/toggles";
import { useEffect, useState } from "react";

interface TogglesPreviewProps {
  disabledOption: boolean;
  initialValue: string;
}

const options = ["Day", "Night", "Always"];

function TogglesPreview({ disabledOption, initialValue }: TogglesPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <OreToggles aria-label="Daylight cycle">
        {options.map((option) => {
          const optionValue = option.toLowerCase();
          return (
            <OreTabButton
              key={optionValue}
              disabled={disabledOption && optionValue === "always"}
              selected={value === optionValue}
              onChange={() => setValue(optionValue)}
            >
              {option}
            </OreTabButton>
          );
        })}
      </OreToggles>
      <output aria-live="polite">Selected: {value}</output>
    </div>
  );
}

const { defineStory } = defineStoryFactory();

export const togglesStory = defineStory({
  Component: TogglesPreview,
  displayName: "Toggles",
  args: {
    initial: {
      disabledOption: false,
      initialValue: "day",
    },
  },
});

export const TogglesStory = togglesStory.WithControl;
