import { defineComponent, h } from "vue";

export const Navbar = defineComponent({
  name: "Navbar",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        "nav",
        {
          ...attrs,
          class: ["ore-navbar", attrs.class],
        },
        slots.default?.(),
      );
  },
});
