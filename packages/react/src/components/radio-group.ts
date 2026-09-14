import React from "react";

export { Radio, type RadioProps } from "./radio.js";

export type RadioGroupProps = React.FieldsetHTMLAttributes<HTMLFieldSetElement>;

export const RadioGroup = React.forwardRef<
  HTMLFieldSetElement,
  RadioGroupProps
>(function RadioGroup({ className, ...props }, ref): React.ReactElement {
  return React.createElement("fieldset", {
    ...props,
    className: ["ore-radio-group", className].filter(Boolean).join(" "),
    ref,
  });
});
