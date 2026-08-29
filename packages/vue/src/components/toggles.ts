import { defineComponent, h } from "vue";

export const Toggles = defineComponent({
  name: "Toggles",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h("div", {
      ...attrs,
      class: ["ore-toggles", attrs.class],
      role: "tablist",
    }, slots.default?.());
  },
});
