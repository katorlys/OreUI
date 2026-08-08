"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Radio, RadioGroup } from "@katorlys/oreui-react/radio-group";
import { useEffect, useId, useState } from "react";

interface RadioGroupPreviewProps {
  color:
    | "primary"
    | "secondary"
    | "destructive"
    | "dungeons"
    | "legends"
    | "realms"
    | "gold";
  disabledOption: boolean;
  label: string;
}

const options = ["Survival", "Creative", "Hardcore"];

function RadioGroupPreview({
  color,
  disabledOption,
  label,
}: RadioGroupPreviewProps) {
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
      <RadioGroup aria-label={label}>
        {options.map((option) => {
          const optionValue = option.toLowerCase();
          return (
            <Radio
              className="text-current"
              key={optionValue}
              checked={value === optionValue}
              color={color}
              disabled={disabledOption && optionValue === "hardcore"}
              name={name}
              value={optionValue}
              onChange={() => setValue(optionValue)}
            >
              {option}
            </Radio>
          );
        })}
      </RadioGroup>
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
      color: "primary",
      disabledOption: true,
      label: "World type",
    },
  },
});

export const RadioGroupStory = radioGroupStory.WithControl;
