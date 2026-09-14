import { syncSlider } from "oreui-web/slider";
import React from "react";

export type SliderProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "color" | "type"
> & {
  color?: string;
  orientation?: "horizontal" | "vertical";
  variant?: string;
};

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  function Slider(
    { className, color, orientation, variant, ...props },
    ref,
  ): React.ReactElement {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
      if (inputRef.current) {
        syncSlider(inputRef.current);
      }
    }, [props.max, props.min, props.step, props.value]);

    return React.createElement("input", {
      ...props,
      className: className ? `ore-slider ${className}` : "ore-slider",
      "aria-orientation": orientation,
      "data-color": color,
      "data-orientation": orientation,
      "data-variant": variant,
      ref: (element: HTMLInputElement | null) => {
        inputRef.current = element;
        if (typeof ref === "function") {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
      },
      type: "range",
    });
  },
);
