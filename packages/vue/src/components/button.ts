import { defineComponent, h } from "vue";

export const Button = defineComponent({
  name: "Button",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      const { color, loading, variant, ...forwarded } = attrs;
      const data = {
        "data-color": color,
        "data-loading": loading === true || loading === "" ? "" : undefined,
        "data-variant": variant,
      };

      return h(
        "button",
        {
          ...forwarded,
          ...data,
          "aria-busy": loading || undefined,
          disabled: forwarded.disabled || loading,
        },
        slots.default,
      );
    };
  },
});
