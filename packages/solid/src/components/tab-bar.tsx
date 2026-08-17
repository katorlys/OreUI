import "oreui-web/tab-bar";

import type { OreTabBar } from "oreui-web/tab-bar";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type TabBarProps = OreComponentProps<OreTabBar>;

export const TabBar = createOreComponent<OreTabBar, TabBarProps>({
  tagName: "ore-tab-bar",
});
