import usersIcon from "../../assets/users.svg";
import usersIconWhite from "../../assets/users-white.svg";
import Logout from "../../components/logout";
import ThemeToggle from "../../components/themeToggle";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { logout } from "../../store/features/userProfileSlice";
import { useAppContext } from "../../context";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearToken } from "../../store/features/authSlice";

const AdminDashboard = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    isDarkMode,
    isSessionEnd,
    setIsSessionEnd,
    isServerError,
    setIsServerError,
  } = useAppContext();
  const { t } = useTranslation();

  useEffect(() => {
    if (isServerError) navigate("/error");
  });

  const handleLogin = () => {
    setIsSessionEnd(false);
    setIsServerError(false);
    dispatch(logout());
    dispatch(clearToken());
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <aside
        className={`${styles.sideBar} border-r  border-secondGray/60 dark:border-defaultGray/60 overflow-x-auto`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="">
            <NavLink
              to={"/admin"}
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              <img
                src={isDarkMode ? usersIconWhite : usersIcon}
                alt="ikimina-icon"
                className="w-7 md:w-5 text-defaultBlack dark:text-defaultTextColor"
              />
              <h2>Subscribers</h2>
            </NavLink>
          </div>
          <div className="flex flex-col gap-5">
            <ThemeToggle />
            <Logout />
          </div>
        </div>
      </aside>
      <main className={styles.right}>
        <div className={styles.main}>{children}</div>
      </main>
      <div
        className={`${
          isSessionEnd ? "flex" : "hidden"
        } overflow-x-hidden overflow-y-hidden fixed top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-full bg-defaultBlack/50 z-50`}
      >
        <div className="relative w-96 h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-defaultBlack dark:border-defaultGray border border-gray-400">
            <div className="relative w-full h-auto p-8">
              <h1 className="font-semibold pb-2 border-b-2 dark:border-defaultGray border-gray-400">
                {t("sessionExpires.head")}
              </h1>
              <p className="text-center text-sm my-6">
                {t("sessionExpires.text")}
              </p>
              <button
                className="w-full text-white bg-defaultGreen font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800  "
                onClick={handleLogin}
              >
                {t("homePage.loginText")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
