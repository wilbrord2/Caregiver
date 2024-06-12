import { useAppContext } from "../../context";
import { ReactComponent as LightToggleIcon } from "../../assets/light.svg";
import { ReactComponent as DarkToggleIcon } from "../../assets/dark.svg";
import styles from "./styles";
import { useLayoutEffect } from "react";

function ThemeToggle({ onSmallDevice }: { onSmallDevice?: boolean }) {
  const { isDarkMode, setIsDarkMode, setIsMenuOpen } = useAppContext();
  const name = "name";

  useLayoutEffect(() => {
    const docELement = document.documentElement;
    if (isDarkMode) {
      docELement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      docELement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div
      className={styles.toggleBtnContainer}
      onClick={() => {
        setIsDarkMode(!isDarkMode);
        setIsMenuOpen(false);
      }}
    >
      <button className={styles.toggleBtn}>
        <LightToggleIcon
          className={`${styles.toggleIcon} ${
            !isDarkMode ? styles.onIconClick : ""
          }`}
        />
        <DarkToggleIcon
          className={`${styles.toggleIcon} ${
            isDarkMode ? styles.onIconClick : ""
          }`}
        />
        <span className={styles.scrReaderOnly}>Toggle dark mode</span>
      </button>
      {(name || onSmallDevice) && (
        <p
          className={`${styles.themeLabel} ${
            isDarkMode ? styles.darkMode : styles.lightMode
          }`}
        >
          {isDarkMode ? "DarkMode" : "LightMode"}
        </p>
      )}
    </div>
  );
}

export default ThemeToggle;
