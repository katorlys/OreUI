import { createRenderEffect, splitProps, type JSX } from "solid-js";

export type TextfieldProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  "children" | "color" | "oninput" | "value"
> & {
  children?: JSX.Element;
  description?: string;
  error?: string;
  label?: string;
  onInput?: (event: InputEvent & { currentTarget: HTMLInputElement }) => void;
  value?: string;
  onValueChange?: (value: string) => void;
};

export function Textfield(props: TextfieldProps): JSX.Element {
  const [local, inputProps] = splitProps(props, [
    "children",
    "description",
    "error",
    "id",
    "label",
    "class",
    "onInput",
    "onValueChange",
    "style",
    "value",
  ]);
  let element: HTMLInputElement | undefined;
  const generatedId = `ore-textfield-${crypto.randomUUID()}`;

  createRenderEffect(() => {
    element?.setCustomValidity(local.error ?? "");
  });

  const inputId = () => local.id ?? generatedId;
  const descriptionId = () =>
    local.description ? `${inputId()}-description` : undefined;
  const errorId = () => (local.error ? `${inputId()}-error` : undefined);

  return (
    <div
      class="ore-textfield"
      classList={{ [local.class ?? ""]: true }}
      style={local.style}
    >
      {local.label ? (
        <label class="ore-textfield-label" for={inputId()}>
          {local.label}
        </label>
      ) : null}
      <span class="ore-textfield-control">
        {local.children}
        <input
          {...inputProps}
          aria-describedby={
            [descriptionId(), errorId()].filter(Boolean).join(" ") || undefined
          }
          aria-invalid={local.error ? "true" : undefined}
          class="ore-textfield-input"
          id={inputId()}
          onInput={(event) => {
            if (typeof local.onInput === "function") {
              local.onInput(event);
            }
            local.onValueChange?.(event.currentTarget.value);
          }}
          ref={(value) => {
            element = value;
          }}
          value={local.value}
        />
      </span>
      {local.description ? (
        <span class="ore-textfield-description" id={descriptionId()}>
          {local.description}
        </span>
      ) : null}
      {local.error ? (
        <span class="ore-textfield-error" id={errorId()} aria-live="polite">
          {local.error}
        </span>
      ) : null}
    </div>
  );
}
