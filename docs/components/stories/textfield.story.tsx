"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Textfield } from "@oreui-web/react/textfield";
import { type CSSProperties, useEffect, useState } from "react";

interface TextfieldPreviewProps {
  description: string;
  disabled: boolean;
  error: string;
  label: string;
  placeholder: string;
  required: boolean;
  type: string;
}

const textfieldStyle = {
  "--ore-textfield-description": "var(--color-fd-muted-foreground)",
  "--ore-textfield-foreground": "var(--color-fd-foreground)",
} as CSSProperties;

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
    <div style={{ display: "grid", gap: "2rem" }}>
      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 1fr))",
        }}
      >
        <div>
          <p>default</p>
          <Textfield
            aria-label="Default textfield"
            placeholder="Placeholder"
            style={textfieldStyle}
          />
        </div>
        <div>
          <p>hover</p>
          <Textfield
            aria-label="Hover textfield"
            placeholder="Placeholder"
            style={
              {
                ...textfieldStyle,
                "--ore-textfield-background":
                  "var(--ore-color-neutral-surface)",
                "--ore-textfield-shadow": "var(--ore-color-neutral-shadow)",
              } as CSSProperties
            }
          />
        </div>
        <div>
          <p>focus</p>
          <Textfield
            aria-label="Focus textfield"
            autoFocus
            placeholder="Placeholder"
            style={textfieldStyle}
          />
        </div>
        <div>
          <p>pressed</p>
          <Textfield
            aria-label="Pressed textfield"
            placeholder="Placeholder"
            style={
              {
                ...textfieldStyle,
                "--ore-textfield-background":
                  "var(--ore-color-neutral-surface-sunken)",
                "--ore-textfield-shadow": "var(--ore-color-neutral-border)",
              } as CSSProperties
            }
          />
        </div>
        <div>
          <p>disabled</p>
          <Textfield
            aria-label="Disabled textfield"
            disabled
            placeholder="Placeholder"
            style={textfieldStyle}
          />
        </div>
      </div>

      <div style={{ display: "grid", gap: "1rem" }}>
        <Textfield
          description={description}
          disabled={disabled}
          error={error}
          label={label}
          placeholder={placeholder}
          required={required}
          type={type}
          value={value}
          style={textfieldStyle}
          onInput={(event) => {
            const field = event.currentTarget as HTMLInputElement;
            setValue(field.value);
          }}
        />
        <Textfield
          aria-label="Readonly textfield"
          readOnly
          value="Readonly value"
          style={textfieldStyle}
        />
        <form
          onReset={() => setValue("")}
          onSubmit={(event) => event.preventDefault()}
          style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
        >
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
          <output aria-live="polite">Value: {value || "empty"}</output>
        </form>
      </div>
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
