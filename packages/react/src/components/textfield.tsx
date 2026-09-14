import React from "react";

export type TextfieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "children" | "color"
> & {
  description?: string;
  error?: string;
  label?: string;
};

export const Textfield = React.forwardRef<HTMLInputElement, TextfieldProps>(
  function Textfield(
    { className, description, error, id, label, onInput, style, ...props },
    ref,
  ): React.ReactElement {
    const generatedId = React.useId();
    const inputId = id ?? `ore-textfield-${generatedId}`;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(" ");
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
      inputRef.current?.setCustomValidity(error ?? "");
    }, [error]);

    return (
      <div
        className={className ? `ore-textfield ${className}` : "ore-textfield"}
        style={style}
      >
        {label ? (
          <label className="ore-textfield-label" htmlFor={inputId}>
            {label}
          </label>
        ) : null}
        <span className="ore-textfield-control">
          <input
            {...props}
            ref={(element) => {
              inputRef.current = element;
              if (typeof ref === "function") {
                ref(element);
              } else if (ref) {
                ref.current = element;
              }
            }}
            aria-describedby={describedBy || undefined}
            aria-invalid={error ? true : undefined}
            className="ore-textfield-input"
            id={inputId}
            onInput={onInput}
          />
        </span>
        {description ? (
          <span className="ore-textfield-description" id={descriptionId}>
            {description}
          </span>
        ) : null}
        {error ? (
          <span className="ore-textfield-error" id={errorId} aria-live="polite">
            {error}
          </span>
        ) : null}
      </div>
    );
  },
);
