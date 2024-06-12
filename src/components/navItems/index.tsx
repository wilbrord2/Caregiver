import styles from "./styles";
import { ReactComponent as MenuICon } from "../../assets/menu.svg";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import { useAppContext } from "../../context";
import ThemeToggle from "../themeToggle";
import Avatar from "../avatar";
import usersIcon from "../../assets/users.svg";
import usersIconWhite from "../../assets/users-white.svg";
import { NavLink, useLocation } from "react-router-dom";
import Logout from "../logout";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks";

function NavItems() {
  const { isMenuOpen, setIsMenuOpen } = useAppContext();
  const location = useLocation();
  const { t } = useTranslation();
  const { phone, role } = useAppSelector((state) => state.userProfile);
  const { isDarkMode } = useAppContext();
  const token = JSON.parse(localStorage.getItem("access_token") as string);
  return (
    <div>
      {/* mobile view */}
      <div className={styles.menuBtnContainer}>
        {phone && <Avatar />}
        <button
          type={styles.btn}
          className={styles.menuBtn}
          onClick={() => {
            setIsMenuOpen(true);
          }}
        >
          <span className={styles.scrReaderOnly}>Open main menu</span>
          <MenuICon className={styles.menuIcon} />
        </button>
      </div>
      <div className={styles.mobileView}>
        <div
          className={`${styles.linksContainer} ${
            isMenuOpen ? styles.onMenuOpen : styles.onMenuClose
          }`}
        >
          <div className="w-full md:w-1/2 bg-white overflow-y-scroll  dark:bg-black relative  top-0 bottom-0 z-20 h-full">
            <div className={styles.closeBtnContainer}>
              <button
                type={styles.btn}
                className={`${styles.closeBtn}`}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                <CloseIcon className={styles.closeIcon} />
                <span className={styles.scrReaderOnly}>Close main menu</span>
              </button>
            </div>
            {phone && role === "admin" && (
              <div className="flex flex-col font-bold  text-lg text-black dark:text-defaultTextColor gap-5 py-2 ">
                <NavLink
                  to={"/admin"}
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.link
                  }
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  <img
                    src={isDarkMode ? usersIconWhite : usersIcon}
                    alt="ikimina-icon"
                    className="w-7 md:w-5 text-black dark:text-defaultTextColor"
                  />
                  <h2>{t("adminTabs.users")}</h2>
                </NavLink>
              </div>
            )}
            <div className="flex flex-col font-bold text-lg text-white gap-5">
              <ThemeToggle onSmallDevice={true} />
              {phone && <Logout />}
            </div>
          </div>
        </div>
      </div>

      {/* desktop view */}
      <div className={styles.desktopView}>
        {token &&
        !location.pathname.includes("/verify-phone") &&
        !location.pathname.includes("/change-password") ? (
          <Avatar />
        ) : (
          <>
            <ThemeToggle />
          </>
        )}
      </div>
    </div>
  );
}

export default NavItems;
