import { useAppContext } from "../../context";
import { ReactComponent as ErrorLight } from "../../assets/serverError.svg";
import { useTranslation } from "react-i18next";
import homeIcon from "../../assets/homeIcon.svg";
import styles from "./styles";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const { isDarkMode, setIsServerError } = useAppContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div
      className={`${
        isDarkMode ? styles.darkContainer : styles.whiteContainer
      } ${styles.container}`}
    >
      <div className="flex flex-col items-center">
        <ErrorLight className="bg-defaultGreen p-4 w-full rounded-2xl" />
        <div className={styles.content}>
          <h1 className={styles.heading}>Internal Server Error</h1>
          <p>Something went wrong on our end, we'll fix it soon.</p>
        </div>
      </div>
      <div className={styles.linkContainer}>
        <button
          className={styles.link}
          onClick={() => {
            setIsServerError(false);
            navigate("/");
          }}
        >
          <p>Back Home</p>
          <img src={homeIcon} alt="home-icon" className={styles.homeIcon} />
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
