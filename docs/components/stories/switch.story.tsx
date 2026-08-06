"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Switch } from "@katorlys/oreui-react/switch";
import { useEffect, useState } from "react";

interface SwitchPreviewProps {
  color: "primary" | "secondary" | "destructive" | "dungeons" | "legends" | "realms" | "gold";
  disabled: boolean;
  initialChecked: boolean;
  label: string;
  variant: "default" | "icons";
}

function SwitchPreview({
  color,
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
      <Switch
        checked={checked}
        color={color}
        disabled={disabled}
        variant={variant}
        onChange={(event) => {
          const control = event.target as HTMLElement & { checked: boolean };
          setChecked(control.checked);
        }}
      >
        {label}
      </Switch>
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
      color: "primary",
      disabled: false,
      initialChecked: false,
      label: "Enable autosave",
      variant: "icons",
    },
  },
});

export const SwitchStory = switchStory.WithControl;
