import { ReactiveElement } from "lit";

const spinnerPath =
  "M5.5.5v1H3.503v-1zm1.003 2v-1h-1v1zm0 3v-3h1v3zm0 0h-1v1h1zM5.5 6.5v1H3.503v-1zM23.5.5v1h-1v-1zm1.003 2v-1h-1v1zm0 3v-3h1v3zm0 0h-1v1h1zm-1.003 1v1h-3v-1zM42.503 2.5v-1h-1v1zm0 3v-3h1v3zm0 0h-1v1h1zm-4.003 0v1h-1v-1zm0 1v1h3v-1zM61.503 2.5v3h-1v-3zm-6.006 2v1h-1v-1zm1.003 2v-1h-1v1zm0 0h3v1h-3zm4.003 0v-1h-1v1zM79.503 3.5v2h-1v-2zm-6.006 0v2h-1v-2zm1.003 3v-1h-1v1zm0 0h3v1h-3zm4.003 0v-1h-1v1zM91.497 2.5v3h-1v-3zm6.006 2v1h-1v-1zm-5.003 2v-1h-1v1zm0 0h3v1h-3zm4.003 0v-1h-1v1zM110.497 2.5v-1h-1v1h-1v3h1v-3zm.003 3v1h-1v-1zm0 1v1h3v-1zm4.003 0v-1h-1v1zM129.5.5v1h-1v-1zm-1.003 2v-1h-1v1h-1v3h1v-3zm.003 4v-1h-1v1zm0 0h3v1h-3zM148.5.5v1h-2v-1zm-2.003 2v-1h-1v1h-1v3h1v-3zm.003 4v-1h-1v1zm0 0h2v1h-2zM167.5.5v1h-3v-1zm-3.003 2v-1h-1v1h-1v3h1v-3zm.003 4v-1h-1v1zm0 0h1v1h-1zM185.5.5v1h-3v-1zm-3.003 2v-1h-1v1h-1v3h1v-3zm4.006 0v-1h-1v1zm-4.003 3v1h-1v-1zM203.5.5v1h-3v-1zm-3.003 2v-1h-1v1h-1v3h1v-3zm4.006 0v-1h-1v1zm0 0h1v1h-1zM221.5.5v1h-3v-1zm-3.003 2v-1h-1v1h-1v2h1v-2zm4.006 0v-1h-1v1zm0 0h1v2h-1zM239.5.5v1h-3v-1zm-3.003 2v-1h-1v1h-1v1h1v-1zm4.006 0v-1h-1v1zm0 0h1v3h-1zM257.5.5v1h-3v-1zm-3.003 2v-1h-1v1zm4.006 0v-1h-1v1zm0 0v3h1v-3zm0 3v1h-1v-1zM275.5.5v1h-3v-1zm1.003 2v-1h-1v1zm0 3v-3h1v3zm0 0h-1v1h1zm-1.004 1v1h-1v-1z";

export class OreSpinner extends ReactiveElement {
  override connectedCallback(): void {
    super.connectedCallback();

    if (!this.firstElementChild) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );

      svg.setAttribute("viewBox", "0 0 278 8");
      svg.setAttribute("aria-hidden", "true");
      path.setAttribute("fill", "currentColor");
      path.setAttribute("fill-rule", "evenodd");
      path.setAttribute("d", spinnerPath);
      svg.append(path);
      this.append(svg);
    }

    if (!this.hasAttribute("aria-label") && !this.hasAttribute("aria-hidden")) {
      this.setAttribute("aria-label", "Loading");
    }

    if (!this.hasAttribute("aria-hidden")) {
      this.setAttribute("role", "status");
    }
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }
}

if (!customElements.get("ore-spinner")) {
  customElements.define("ore-spinner", OreSpinner);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-spinner": OreSpinner;
  }
}
