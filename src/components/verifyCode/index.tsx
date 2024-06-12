import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import OtpInput from "react-otp-input";
import {
  resendCodeOnEmail,
  resendCodeOnPhone,
  verifyCodeOnEmail,
  verifyCodeOnPhone,
} from "../../store/features/authSlice";
import Toast from "../toast";
import { useTranslation } from "react-i18next";
import {
  calculateRequestCodeTokenExp,
  calculateResetTokenExp,
} from "../../helpers/dateFilter";
import { useAppDispatch, useAppSelector } from "../../hooks";

const VerifyCode = () => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  const [showToast, setshowToast] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const password = location?.state?.password;
  const phoneNumber: string = location?.state?.phoneNumber;
  const email: string = location?.state?.email;
  const resetPage: string = location?.state?.resetPage;
  const signUpPage = location?.state?.signUpPage;
  const currentTime = new Date().getTime();
  const tokenReset: string = location?.state?.token;
  const expireTimeReset: number = location?.state?.expireTime;
  const min =
    resetPage && expireTimeReset > currentTime
      ? Math.floor((expireTimeReset - currentTime) / 60000)
      : 5;
  const expireTime: string = JSON.parse(
    localStorage.getItem("expiration_time") as string
  );
  const [timeOTP, setTimeOTP] = useState({ min: min, sec: 0 });

  useEffect(() => {
    const token: string = JSON.parse(
      localStorage.getItem("access_token") as string
    );
    if (tokenReset && resetPage && auth?.verifyCodeSuccess) {
      navigate("/change-password", {
        state: {
          expireTime: calculateResetTokenExp(),
          token: auth?.token,
        },
      });
    }
    if (token && expireTime && signUpPage) {
      navigate("/crowdfund");
    }
  }, [
    auth?.verifyCodeSuccess,
    auth?.resendCodeSuccess,
    signUpPage,
    expireTime,
  ]);

  useEffect(() => {
    if (auth?.resendCodeSuccess) {
      navigate(location.pathname, {
        state: {
          expireTime: calculateRequestCodeTokenExp(),
          token: auth?.token,
          email: email,
          phoneNumber: phoneNumber,
          resetPage: true,
        },
      });
    }
  }, [auth?.resendCodeSuccess]);

  useEffect(() => {
    if (auth.resendCodeSuccess) {
      setTimeOTP((timeOTP) => ({ min: min, sec: 0 }));
    }
  }, [auth]);

  useEffect(() => {
    if (auth.signupError || auth.resendCodeError || auth.requestCodeError) {
      setshowToast(true);
      let id = setTimeout(() => {
        setshowToast(false);
      }, 5000);
      return () => clearTimeout(id);
    }
  }, [auth.signupError, auth.resendCodeError, auth.requestCodeError]);

  useEffect(() => {
    let id: number | undefined;
    if (timeOTP.min !== 0 || timeOTP.sec !== 0) {
      id = setInterval(() => {
        setTimeOTP((timeOTP) => ({ ...timeOTP, sec: timeOTP.sec - 1 }));
        if (timeOTP.sec === 0) {
          setTimeOTP({ min: timeOTP.min - 1, sec: 59 });
        }
      }, 1000);
    } else setOtp("");
    return () => clearInterval(id);
  }, [timeOTP.min, timeOTP.sec]);

  const handleSubmit = () => {
    email
      ? dispatch(
          verifyCodeOnEmail({
            code: otp,
            email: email,
            token: tokenReset,
          })
        )
      : dispatch(
          verifyCodeOnPhone({
            code: otp,
            phone: phoneNumber,
            token: tokenReset,
          })
        );
  };

  const handleResend = () => {
    email
      ? dispatch(resendCodeOnEmail({ email: email }))
      : dispatch(resendCodeOnPhone({ phone: phoneNumber }));
  };
  return (
    <div className="flex flex-col gap-4 mt-4">
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        inputType="tel"
        shouldAutoFocus={true}
        renderSeparator={<span className="mx-3"></span>}
        renderInput={(props) => (
          <input
            {...props}
            className="!w-8 xl:!w-12 xl:!h-12 h-8 md:!w-10 md:!h-10 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-[#DEEBEE] dark:border-[#3D404B]  focus:border-defaultGreen dark:focus:border-defaultGreen text-defaultBlack dark:text-white transition  disabled:cursor-not-allowed"
            disabled={timeOTP.min === 0 && timeOTP.sec === 0}
          />
        )}
      />
      <>
        {timeOTP.min !== 0 || timeOTP.sec !== 0 ? (
          <p className="self-start my-4 dark:text-white xl:text-xl ">
            {t("verifyPage.expireText.part1")}{" "}
            <span className="text-defaultGreen font-bold">
              {timeOTP.min}:{timeOTP.sec}
            </span>{" "}
            {t("verifyPage.expireText.part2")}
          </p>
        ) : (
          <div
            className="self-start my-4 dark:text-white xl:text-xl "
            onClick={() => handleResend()}
          >
            {" "}
            {t("verifyPage.request")}{" "}
            {auth?.resendCodeLoading ? (
              <svg
                className="inline animate-spin -ml-1 mr-3 h-4 w-4 text-green-800"
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
            ) : (
              <span className="text-defaultGreen font-bold cursor-pointer hover:underline">
                {t("verifyPage.resend")}
              </span>
            )}
          </div>
        )}
        <button
          type="submit"
          className={`w-full md:w-2/3 xl:text-xl text-white bg-defaultGreen hover focus:outline-none  font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700  disabled:cursor-not-allowed disabled:bg-defaultGreen/70 disabled:dark:bg-defaultGreen/50 disabled:text-gray-400 disabled:dark:text-gray-600 mb-4 md:mb-0`}
          disabled={
            otp.length < 6 || auth.signupLoading || auth.requestCodeLoading
          }
          onClick={handleSubmit}
        >
          {(auth.signupLoading || auth.requestCodeLoading) && (
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
          {t("verifyPage.verify")}
        </button>
      </>

      <Toast
        isToastShown={showToast}
        setIsToastShown={setshowToast}
        message={`${
          auth.signupError || auth.requestCodeError
            ? auth.signupError || auth.requestCodeError
            : auth.resendCodeError
        } `}
      />
    </div>
  );
};

export default VerifyCode;
