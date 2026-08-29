import "oreui-web/tooltip";
import type { OreTooltipSide } from "oreui-web/tooltip";
import {
  defineComponent,
  h,
  onBeforeUnmount,
  type PropType,
  type VNode,
} from "vue";

export const Tooltip = defineComponent({
  name: "Tooltip",
  inheritAttrs: false,
  props: {
    defaultOpen: Boolean,
    delay: Number,
    open: {
      type: Boolean,
      default: undefined,
    },
    side: {
      type: String as PropType<OreTooltipSide>,
      default: "top",
    },
  },
  emits: ["openChange"],
  setup(props, { attrs, emit, expose, slots }) {
    let element: HTMLSpanElement | undefined;

    const handleOpenChange = (event: Event): void => {
      emit("openChange", event);
    };
    const setElement = (value: Element | null): void => {
      element?.removeEventListener("oreui:openchange", handleOpenChange);
      element = value instanceof HTMLSpanElement ? value : undefined;
      element?.addEventListener("oreui:openchange", handleOpenChange);
    };

    expose({
      get element() {
        return element;
      },
    });
    onBeforeUnmount(() => {
      element?.removeEventListener("oreui:openchange", handleOpenChange);
    });

    return (): VNode => {
      const elementAttrs: Record<string, unknown> = {
        ...attrs,
        "data-default-open": props.defaultOpen ? "" : undefined,
        "data-delay": props.delay,
        "data-open": props.open === undefined ? undefined : String(props.open),
        "data-side": props.side,
        class: ["ore-tooltip", attrs.class],
        ref: setElement,
      };

      return h("span", elementAttrs, slots.default?.());
    };
  },
});
