import "oreui-web/toast";
import type { OreToastPosition, OreToastVariant } from "oreui-web/toast";
import {
  defineComponent,
  h,
  onBeforeUnmount,
  type PropType,
  type VNode,
} from "vue";

export const Toast = defineComponent({
  name: "Toast",
  inheritAttrs: false,
  props: {
    defaultOpen: Boolean,
    duration: Number,
    open: { type: Boolean, default: undefined },
    position: {
      type: String as PropType<OreToastPosition>,
      default: "bottom-center",
    },
    variant: {
      type: String as PropType<OreToastVariant>,
      default: "neutral",
    },
  },
  emits: ["openChange"],
  setup(props, { attrs, emit, expose, slots }) {
    let element: HTMLDivElement | undefined;
    const handleOpenChange = (event: Event): void => emit("openChange", event);
    const setElement = (value: Element | null): void => {
      element?.removeEventListener("oreui:openchange", handleOpenChange);
      element = value instanceof HTMLDivElement ? value : undefined;
      element?.addEventListener("oreui:openchange", handleOpenChange);
    };

    expose({ get element() { return element; } });
    onBeforeUnmount(() => {
      element?.removeEventListener("oreui:openchange", handleOpenChange);
    });

    return (): VNode => {
      const elementAttrs: Record<string, unknown> = {
        ...attrs,
        "data-default-open": props.defaultOpen ? "" : undefined,
        "data-duration": props.duration,
        "data-open": props.open ? "" : undefined,
        "data-position": props.position,
        "data-variant": props.variant,
        class: ["ore-toast", attrs.class],
        ref: setElement,
      };

      return h("div", elementAttrs, slots.default?.());
    };
  },
});
