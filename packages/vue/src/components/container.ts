import { defineComponent, h } from "vue";

export const Container = defineComponent({
  name: "Container",
  inheritAttrs: false,
  props: {
    variant: {
      type: String,
      default: "dark",
    },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          class: ["ore-container", attrs.class],
          "data-variant": props.variant,
        },
        slots.default?.(),
      );
  },
});
