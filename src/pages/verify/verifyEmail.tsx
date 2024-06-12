import styles from "./styles";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import VerifyCode from "../../components/verifyCode";
import { useEffect } from "react";

function VerifyEmail() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state?.email;
  const token = location?.state?.token;
  useEffect(() => {
    if (!email && !token) {
      navigate("/forgot-password");
    }
  });

  return (
    <section className={styles.homeSection}>
      <div className={styles.homeContainer}>
        <div className={styles.homeContent}>
          <div className={styles.homeTextContainer}>
            <div className={styles.homeTextContent}>
              <h2 className={styles.homeTitle}>{t("verifyPage.titleEmail")}</h2>
              <div className={styles.paragraphsContainer}>
                <p>
                  {t("verifyPage.subtitleEmail")} <br className="xl:hidden" />
                  <span className="font-bold text-defaultGreen underline">
                    {email}
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
export default VerifyEmail;
