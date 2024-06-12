const preferredTheme = localStorage.getItem("color-theme");

/**
 * Checking if preferred theme is dark
 * @return boolean
 */
export default function checkTheme() {
  return preferredTheme === "dark";
}
