"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { OreRadio } from "@katorlys/oreui-react/radio";
import { OreRadioGroup } from "@katorlys/oreui-react/radio-group";
import { useEffect, useId, useState } from "react";

interface RadioGroupPreviewProps {
  disabledOption: boolean;
  label: string;
}

const options = ["Survival", "Creative", "Hardcore"];

function RadioGroupPreview({ disabledOption, label }: RadioGroupPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState("survival");
  const name = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <OreRadioGroup aria-label={label}>
        {options.map((option) => {
          const optionValue = option.toLowerCase();
          return (
            <OreRadio
              key={optionValue}
              checked={value === optionValue}
              disabled={disabledOption && optionValue === "hardcore"}
              name={name}
              value={optionValue}
              onChange={() => setValue(optionValue)}
            >
              {option}
            </OreRadio>
          );
        })}
      </OreRadioGroup>
      <output aria-live="polite">Selected: {value}</output>
    </div>
  );
}

const { defineStory } = defineStoryFactory();

export const radioGroupStory = defineStory({
  Component: RadioGroupPreview,
  displayName: "Radio Group",
  args: {
    initial: {
      disabledOption: true,
      label: "World type",
    },
  },
});

export const RadioGroupStory = radioGroupStory.WithControl;