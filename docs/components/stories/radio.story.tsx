"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { OreRadio } from "@katorlys/oreui-react/radio";
import { useEffect, useId, useState } from "react";

interface RadioPreviewProps {
  disabled: boolean;
  initialChecked: boolean;
  label: string;
  required: boolean;
}

function RadioPreview({
  disabled,
  initialChecked,
  label,
  required,
}: RadioPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const [checked, setChecked] = useState(initialChecked);
  const name = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <OreRadio
      checked={checked}
      disabled={disabled}
      name={name}
      required={required}
      value="creative"
      onChange={() => setChecked(true)}
    >
      {label}
    </OreRadio>
  );
}

const { defineStory } = defineStoryFactory();

export const radioStory = defineStory({
  Component: RadioPreview,
  displayName: "Radio",
  args: {
    initial: {
      disabled: false,
      initialChecked: false,
      label: "Creative",
      required: false,
    },
  },
});

export const RadioStory = radioStory.WithControl;