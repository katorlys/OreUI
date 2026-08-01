"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { OreSwitch } from "@katorlys/oreui-react/switch";
import { useEffect, useState } from "react";

interface SwitchPreviewProps {
  disabled: boolean;
  initialChecked: boolean;
  label: string;
  variant: "default" | "icons";
}

function SwitchPreview({
  disabled,
  initialChecked,
  label,
  variant,
}: SwitchPreviewProps) {
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
      <OreSwitch
        checked={checked}
        disabled={disabled}
        variant={variant}
        onChange={(event) => {
          const control = event.target as HTMLElement & { checked: boolean };
          setChecked(control.checked);
        }}
      >
        {label}
      </OreSwitch>
      <output aria-live="polite">{checked ? "On" : "Off"}</output>
    </div>
  );
}

const { defineStory } = defineStoryFactory();

export const switchStory = defineStory({
  Component: SwitchPreview,
  displayName: "Switch",
  args: {
    initial: {
      disabled: false,
      initialChecked: false,
      label: "Enable autosave",
      variant: "icons",
    },
  },
});

export const SwitchStory = switchStory.WithControl;