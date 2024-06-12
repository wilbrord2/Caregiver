import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./style";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { ReactComponent as FlagIconRW } from "../../assets/rw.svg";
import { ReactComponent as EmailIcon } from "../../assets/emailIcon.svg";
import InputField from "../../components/InputField";
import { useNavigate } from "react-router-dom";
import {
  requestCodeOnEmail,
  requestCodeOnPhone,
} from "../../store/features/authSlice";
import { calculateRequestCodeTokenExp } from "../../helpers/dateFilter";
import Toast from "../../components/toast";
import { useAppDispatch, useAppSelector } from "../../hooks";

function ForgetPassword() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { requestCodeLoading, requestCodeSuccess, token, requestCodeError } =
    useAppSelector((state) => state.auth);
  const [phoneNumber, setPhoneNumber] = useState({ value: "", error: false });
  const [email, setEmail] = useState({ value: "", error: false });
  const [selectedOption, setSelectedOption] = useState("Email");
  const [isToastShown, setIsToastShown] = useState(false);

  useEffect(() => {
    const expireTime = calculateRequestCodeTokenExp();
    if (token && requestCodeSuccess) {
      selectedOption === "Email"
        ? navigate("/verify-email", {
            state: {
              email: email.value,
              expireTime: expireTime,
              token: token,
              resetPage: true,
            },
          })
        : navigate("/verify-phone", {
            state: {
              expireTime: expireTime,
              token: token,
              phoneNumber: `0${phoneNumber.value}`,
              resetPage: true,
            },
          });
    }
  });

  useEffect(() => {
    if (requestCodeError) {
      setIsToastShown(true);
      let id = setTimeout(() => {
        setIsToastShown(false);
      }, 5000);
      return () => clearTimeout(id);
    }
  }, [requestCodeError]);

  const handleSelectResetOption = (e:ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
    e.target.value === "Email"
      ? setPhoneNumber({ value: "", error: false })
      : setEmail({ value: "", error: false });
  };

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    selectedOption === "Email"
      ? dispatch(requestCodeOnEmail({ email: email.value }))
      : dispatch(requestCodeOnPhone({ phone: "0" + phoneNumber.value }));
  };
  return (
    <section className={styles.homeSection}>
      <div className={styles.homeContainer}>
        <div className={styles.homeContent}>
          <div className={styles.homeTextContainer}>
            <div className={styles.homeTextContent}>
              <h2 className={styles.homeTitle}>{t("forgetPage.title")}</h2>
              <div className={styles.paragraphsContainer}></div>
              <h3 className="font-medium my-6 xl:text-lg xl:my-10 dark:text-defaultTextColor">
                {t("forgetPage.Description")}
              </h3>
              <form>
                <div className="flex flex-row gap-8 md:gap-12 flex-wrap  px-5 mb-8">
                  <div className={"flex flex-row gap-2 items-center"}>
                    <input
                      type="radio"
                      value="Email"
                      name="Email"
                      checked={selectedOption === "Email"}
                      onChange={handleSelectResetOption}
                      className="accent-[#004945] hover:accent-green-700 dark:bg-[#000]"
                    />
                    <label className="text-sm">{t("forgetPage.email")}</label>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <input
                      type="radio"
                      value="Phone Number"
                      name="Phone"
                      checked={selectedOption === "Phone Number"}
                      onChange={handleSelectResetOption}
                      className="accent-[#004945] hover:accent-green-700 dark:bg-[#000]"
                    />
                    <label className="text-sm"> {t("forgetPage.phone")}</label>
                  </div>
                </div>
                <div
                  className={`${
                    selectedOption === "Email" ? "hidden" : "block"
                  }`}
                >
                  <InputField
                    type={"number"}
                    label={t("homePage.phoneInputLabel")}
                    placeholder={"7xxxxxxxx"}
                    value={phoneNumber.value}
                    setValue={(evt:ChangeEvent<HTMLInputElement>) => {
                      if (
                        evt.target.value.startsWith("0") ||
                        evt.target.value.length < 9
                      ) {
                        setPhoneNumber({
                          value: evt.target.value,
                          error: true,
                        });
                      } else if (evt.target.value.length > 9) {
                        setPhoneNumber({
                          error: true,
                          value: evt.target.value,
                        });
                      } else {
                        setPhoneNumber({
                          error: false,
                          value: evt.target.value,
                        });
                      }
                    }}
                  
                  >
                    <FlagIconRW className="w-5 h-5" /> +250
                  </InputField>
                </div>
                <div
                  className={`${
                    selectedOption === "Email" ? "block" : "hidden"
                  }`}
                >
                  <InputField
                    type={"email"}
                    label={t("forgetPage.email")}
                    placeholder={t("forgetPage.emailPlaceholder")}
                    value={email.value}
                    setValue={(evt:ChangeEvent<HTMLInputElement>) => {
                      const isValidEmail = (email:string) => {
                        return /\S+@\S+\.\S+/.test(email);
                      };
                      if (!isValidEmail(evt.target.value)) {
                        setEmail({ value: evt.target.value, error: true });
                      } else {
                        setEmail({ value: evt.target.value, error: false });
                      }
                    }}
                    error={email.error ? "Email is invalid" : ""}
                  >
                    <EmailIcon className="w-5 h-5" />
                  </InputField>
                </div>
                <div className="flex flex-col gap-4 mt-8 items-center">
                  <button
                    type="submit"
                    className="w-3/5 text-white dark:text-defaultTextColor  bg-defaultGreen hover focus:outline-none  font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700  disabled:cursor-not-allowed disabled:bg-defaultGreen/70 disabled:dark:bg-defaultGreen/50 disabled:text-gray-400 disabled:dark:text-gray-600"
                    onClick={handleSubmit}
                    disabled={
                      (requestCodeLoading || !email.value || email.error) &&
                      (!phoneNumber.value || phoneNumber.error)
                    }
                  >
                    {requestCodeLoading && (
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
                    {t("forgetPage.requestButton")}
                  </button>
                </div>
              </form>
              <div className="my-2">
                <Toast
                  isToastShown={isToastShown}
                  setIsToastShown={setIsToastShown}
                  message={requestCodeError}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ForgetPassword;
