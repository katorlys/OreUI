"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Textarea } from "@oreui-web/react/textarea";
import { type CSSProperties, useEffect, useState } from "react";

interface TextareaPreviewProps {
  description: string;
  disabled: boolean;
  error: string;
  label: string;
  placeholder: string;
  readonly: boolean;
  required: boolean;
  rows: number;
  spellcheck: boolean;
  wrap: "hard" | "off" | "soft";
}

function TextareaPreview({
  description,
  disabled,
  error,
  label,
  placeholder,
  readonly,
  required,
  rows,
  spellcheck,
  wrap,
}: TextareaPreviewProps) {
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
      <Textarea
        description={description}
        disabled={disabled}
        error={error}
        label={label}
        placeholder={placeholder}
        readonly={readonly}
        required={required}
        rows={rows}
        spellCheck={spellcheck}
        value={value}
        wrap={wrap}
        style={
          {
            "--ore-textarea-description": "var(--color-fd-muted-foreground)",
            "--ore-textarea-foreground": "var(--color-fd-foreground)",
          } as CSSProperties
        }
        onInput={(event) => {
          const textarea = event.target as HTMLElement & { value: string };
          setValue(textarea.value);
        }}
      />
      <output aria-live="polite">Characters: {value.length}</output>
    </div>
  );
}

const { defineStory } = defineStoryFactory();

export const textareaStory = defineStory({
  Component: TextareaPreview,
  displayName: "Textarea",
  args: {
    initial: {
      description: "Shown on the world selection screen",
      disabled: false,
      error: "",
      label: "World description",
      placeholder: "Describe your world",
      readonly: false,
      required: false,
      rows: 3,
      spellcheck: true,
      wrap: "soft",
    },
  },
});

export const TextareaStory = textareaStory.WithControl;
