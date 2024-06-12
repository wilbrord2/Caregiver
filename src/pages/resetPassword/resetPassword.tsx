import {ChangeEvent, FormEvent, useState } from "react";
import { useEffect } from "react";
import styles from "./style";
import { useTranslation } from "react-i18next";
import { ReactComponent as LockIcon } from "../../assets/lock.svg";
import { resetPassword } from "../../store/features/authSlice";
import InputField from "../../components/InputField";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/toast";
import { useLocation } from "react-router-dom";
import { clearToken } from "../../store/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

function ResetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { resetPasswordLoading, resetPasswordError, resetPasswordSuccess } =
    useAppSelector((state) => state.auth);
  const [isToastShown, setIsToastShown] = useState(false);
  const [password, setPassword] = useState({ value: "", error: false });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: false,
  });
  const token:string = location?.state?.token;
  const expireTime:number= location?.state?.expireTime;
  const currentTime = new Date().getTime();

  useEffect(() => {
    if (!token || currentTime > expireTime) {
      dispatch(clearToken());
      navigate("/forgot-password");
    }
  });
  useEffect(() => {
    if (resetPasswordError.message || resetPasswordSuccess) {
      setIsToastShown(true);
      let id = setTimeout(() => {
        setIsToastShown(false);
        if (resetPasswordSuccess) {
          dispatch(clearToken());
          navigate("/");
        }
        if (resetPasswordError.statusCode === 500) {
          dispatch(clearToken());
          navigate("/forgot-password");
        }
      }, 5000);
      return () => clearTimeout(id);
    }
  }, [resetPasswordError, currentTime, resetPasswordSuccess]);

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    dispatch(resetPassword({ password: confirmPassword.value, token: token }));
  };
  return (
    <section className={styles.homeSection}>
      <div className={styles.homeContainer}>
        <div className={styles.homeContent}>
          <div className={styles.homeTextContainer}>
            <div className={styles.homeTextContent}>
              <h2 className={styles.homeTitle}>{t("resetPage.title")}</h2>
              <div className={styles.paragraphsContainer}></div>
              <h3 className="font-medium my-6 xl:text-lg xl:my-10 dark:text-defaultTextColor ">
                {t("resetPage.Description")}
              </h3>
              <form>
                <InputField
                  type="password"
                  label={t("resetPage.password")}
                  placeholder={t("homePage.passwordPlaceholder")}
                  value={password.value}
                  setValue={(evt: ChangeEvent<HTMLInputElement>) => {
                    if (
                      !evt.target.value.match(
                        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/
                      )
                    ) {
                      setPassword({ value: evt.target.value, error: true });
                    } else
                      setPassword({ error: false, value: evt.target.value });
                  }}
                  error={
                    password.error
                      ? "Include uppercase letters, numbers and symbols"
                      : ""
                  }
                >
                  <LockIcon className="w-5 h-5" />
                </InputField>
                <InputField
                  type="password"
                  label={t("resetPage.confirm")}
                  placeholder={t("homePage.passwordPlaceholder")}
                  value={confirmPassword.value}
                  setValue={(evt:ChangeEvent<HTMLInputElement>) => {
                    if (evt.target.value !== password.value) {
                      setConfirmPassword({
                        error: true,
                        value: evt.target.value,
                      });
                    } else
                      setConfirmPassword({
                        error: false,
                        value: evt.target.value,
                      });
                  }}
                  error={confirmPassword.error ? "Passwords do not match" : ""}
                >
                  <LockIcon className="w-5 h-5" />
                </InputField>
                <div className="flex flex-col gap-4 mt-8 items-center">
                  <button
                    type="submit"
                    className="w-3/5 text-white bg-defaultGreen hover focus:outline-none  font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700  disabled:cursor-not-allowed disabled:bg-defaultGreen/70 disabled:dark:bg-defaultGreen/50 disabled:text-gray-400 disabled:dark:text-gray-600"
                    onClick={handleSubmit}
                    disabled={
                      resetPasswordLoading ||
                      !password.value ||
                      password.error ||
                      !confirmPassword.value ||
                      confirmPassword.error
                    }
                  >
                    {resetPasswordLoading && (
                      <svg
                        className="inline animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    {t("resetPage.resetButton")}
                  </button>
                </div>
              </form>
              <div className="my-2">
                <Toast
                  isSuccess={resetPasswordSuccess ? true : false}
                  isToastShown={isToastShown}
                  setIsToastShown={setIsToastShown}
                  message={resetPasswordError?.message || resetPasswordSuccess}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
