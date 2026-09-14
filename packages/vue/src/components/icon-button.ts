import { defineComponent, h } from "vue";

export const IconButton = defineComponent({
  name: "IconButton",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        "button",
        {
          ...attrs,
          class: ["ore-icon-button", attrs.class],
        },
        slots.default?.(),
      );
  },
});
