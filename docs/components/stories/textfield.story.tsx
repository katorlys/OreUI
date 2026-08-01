"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { OreTextfield } from "@katorlys/oreui-react/textfield";
import { useEffect, useState } from "react";

interface TextfieldPreviewProps {
  description: string;
  disabled: boolean;
  error: string;
  label: string;
  placeholder: string;
  required: boolean;
  type: string;
}

function TextfieldPreview({
  description,
  disabled,
  error,
  label,
  placeholder,
  required,
  type,
}: TextfieldPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <OreTextfield
        description={description}
        disabled={disabled}
        error={error}
        label={label}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
        onInput={(event) => {
          const field = event.target as HTMLElement & { value: string };
          setValue(field.value);
        }}
      />
      <output aria-live="polite">Value: {value || "empty"}</output>
    </div>
  );
}

const { defineStory } = defineStoryFactory();

export const textfieldStory = defineStory({
  Component: TextfieldPreview,
  displayName: "Textfield",
  args: {
    initial: {
      description: "Shown to other players",
      disabled: false,
      error: "",
      label: "World name",
      placeholder: "New World",
      required: false,
      type: "text",
    },
  },
});

export const TextfieldStory = textfieldStory.WithControl;