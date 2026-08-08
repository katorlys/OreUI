"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Checkbox } from "@katorlys/oreui-react/checkbox";
import { useEffect, useState } from "react";

interface CheckboxPreviewProps {
  color:
    | "primary"
    | "secondary"
    | "destructive"
    | "dungeons"
    | "legends"
    | "realms"
    | "gold";
  disabled: boolean;
  initialChecked: boolean;
  label: string;
  required: boolean;
}

function CheckboxPreview({
  color,
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
      <Checkbox
        className="text-current"
        checked={checked}
        color={color}
        disabled={disabled}
        required={required}
        onChange={(event) => {
          const checkbox = event.target as HTMLElement & { checked: boolean };
          setChecked(checkbox.checked);
        }}
      >
        {label}
      </Checkbox>
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
      color: "primary",
      disabled: false,
      initialChecked: false,
      label: "Receive updates",
      required: false,
    },
  },
});

export const CheckboxStory = checkboxStory.WithControl;
