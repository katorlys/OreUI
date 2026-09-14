import { defineComponent, h, type ComponentPublicInstance } from "vue";

export const Spinner = defineComponent({
  name: "Spinner",
  inheritAttrs: false,
  setup(_, { attrs, expose }) {
    let element: HTMLSpanElement | undefined;

    expose({
      get element() {
        return element;
      },
    });

    return () => {
      const ariaHidden = attrs["aria-hidden"];

      return h("span", {
        ...attrs,
        ref: (value: Element | ComponentPublicInstance | null) => {
          element = value instanceof HTMLSpanElement ? value : undefined;
        },
        class: ["ore-spinner", attrs.class],
        role: ariaHidden ? undefined : "status",
        "aria-label": ariaHidden
          ? undefined
          : (attrs["aria-label"] ?? "Loading"),
      });
    };
  },
});
