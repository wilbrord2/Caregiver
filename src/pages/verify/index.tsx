import styles from "./styles";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import VerifyCode from "../../components/verifyCode";
import { useEffect } from "react";

function Verify() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const phoneNumber = location?.state?.phoneNumber;
  const resetPage = location?.state?.resetPage;
  useEffect(() => {
    if (!phoneNumber) {
      resetPage
        ? navigate("/forgot-password")
        : localStorage.removeItem("access_token");
      navigate("/create-an-account");
    }
  });

  return (
    <section className={styles.homeSection}>
      <div className={styles.homeContainer}>
        <div className={styles.homeContent}>
          <div className={styles.homeTextContainer}>
            <div className={styles.homeTextContent}>
              <h2 className={styles.homeTitle}>{t("verifyPage.title")}</h2>
              <div className={styles.paragraphsContainer}>
                <p>
                  {t("verifyPage.subtitle")} <br className="xl:hidden" />{" "}
                  <span className="font-bold text-defaultGreen">
                    {resetPage ? phoneNumber : `0${phoneNumber}`}
                  </span>
                </p>
              </div>
              <h3 className="font-bold my-6 xl:text-xl xl:my-10 dark:text-defaultTextColor">
                {t("verifyPage.text")}
              </h3>
              <VerifyCode />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Verify;
