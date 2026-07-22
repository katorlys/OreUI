import themeCss from "./tokens.css?inline";

const themeAttribute = "data-oreui-default-theme";

if (
  typeof document !== "undefined" &&
  !document.head.querySelector(`style[${themeAttribute}]`)
) {
  const style = document.createElement("style");
  style.setAttribute(themeAttribute, "");
  style.textContent = `@layer oreui-default {\n${themeCss}\n}`;
  document.head.append(style);
}