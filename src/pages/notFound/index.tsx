import { useAppContext } from "../../context";
import errorDark from "../../assets/error_dark.svg";
import errorLight from "../../assets/error_light.svg";
import homeIcon from "../../assets/homeIcon.svg";
import styles from "./styles";
import { Link } from "react-router-dom";

function NotFoundPage() {
  const { isDarkMode } = useAppContext();
  return (
    <div
      className={`${
        isDarkMode ? styles.darkContainer : styles.whiteContainer
      } ${styles.container}`}
    >
      <div className={styles.contentBackground}>
        <img
          src={isDarkMode ? errorDark : errorLight}
          alt="error-illustration"
        />
        <div className={styles.content}>
          <h1 className={styles.heading}>Oops! Page Not Found</h1>
          <p>Sorry, the page you are trying to access is not found.</p>
        </div>
      </div>
      <div className={styles.linkContainer}>
        <Link to="/" className={styles.link}>
          <p>Back Home</p>
          <img src={homeIcon} alt="home-icon" className={styles.homeIcon} />
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
