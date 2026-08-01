"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { OreCheckbox } from "@katorlys/oreui-react/checkbox";
import { useEffect, useState } from "react";

interface CheckboxPreviewProps {
  disabled: boolean;
  initialChecked: boolean;
  label: string;
  required: boolean;
}

function CheckboxPreview({
  disabled,
  initialChecked,
  label,
  required,
}: CheckboxPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const [checked, setChecked] = useState(initialChecked);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <OreCheckbox
        checked={checked}
        disabled={disabled}
        required={required}
        onChange={(event) => {
          const checkbox = event.target as HTMLElement & { checked: boolean };
          setChecked(checkbox.checked);
        }}
      >
        {label}
      </OreCheckbox>
      <output aria-live="polite">{checked ? "Checked" : "Not checked"}</output>
    </div>
  );
}

const { defineStory } = defineStoryFactory();

export const checkboxStory = defineStory({
  Component: CheckboxPreview,
  displayName: "Checkbox",
  args: {
    initial: {
      disabled: false,
      initialChecked: false,
      label: "Receive updates",
      required: false,
    },
  },
});

export const CheckboxStory = checkboxStory.WithControl;