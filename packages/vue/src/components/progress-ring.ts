import { defineComponent, h, type ComponentPublicInstance } from "vue";

export const ProgressRing = defineComponent({
  name: "ProgressRing",
  inheritAttrs: false,
  setup(_, { attrs, expose }) {
    let element: HTMLSpanElement | undefined;

    expose({
      get element() {
        return element;
      },
    });

    return () =>
      h("span", {
        ...attrs,
        ref: (value: Element | ComponentPublicInstance | null) => {
          element = value instanceof HTMLSpanElement ? value : undefined;
        },
        class: ["ore-progress-ring", attrs.class],
      });
  },
});
