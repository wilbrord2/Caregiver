import styles from "./styles";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import { ReactComponent as LockIcon } from "../../assets/lock.svg";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { signin } from "../../store/features/authSlice";
import Toast from "../../components/toast";
import checkUserRole from "../../helpers/checkUserRole";
import { Icon } from "@iconify/react";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState({ value: "", error: false });
  const [password, setPassword] = useState({ value: "", error: false });
  const [isToastShown, setIsToastShown] = useState(false);
  const { signinLoading, signinError } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token: string = JSON.parse(localStorage.getItem("access_token")!);
    if (token) {
      navigate("/admin");
      // const { role } = checkUserRole();
      // if (role === "admin") return navigate("/admin");
      // else if (role === "admin") return navigate("/admin");
      // localStorage.clear();
      // navigate("/");
    }
  });

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    navigate("/admin");
    dispatch(signin({ phone: phoneNumber.value, password: password.value }));
  };

  useEffect(() => {
    if (signinError) {
      setIsToastShown(true);
      let id = setTimeout(() => {
        setIsToastShown(false);
      }, 5000);
      return () => clearTimeout(id);
    }
  }, [signinError]);
  return (
    <section className={styles.homeSection}>
      <div className={styles.homeContainer}>
        <div className={styles.homeContent}>
          <div className={styles.homeTextContainer}>
            <div className={styles.homeTextContent}>
              <h2 className={styles.homeTitle}>Login</h2>
              <div className={styles.paragraphsContainer}>
                <p>Provide your Email and password</p>
              </div>
              <form onSubmit={handleSubmit}>
                <InputField
                  type="email"
                  label="Email"
                  placeholder={"example@gmail.com"}
                  value={phoneNumber.value}
                  setValue={(evt: ChangeEvent<HTMLInputElement>) => {
                    setPhoneNumber({
                      error: false,
                      value: evt.target.value,
                    });
                  }}
                >
                  <Icon
                    icon="ic:baseline-email"
                    width="20"
                    height="20"
                    style={{ color: "#787373" }}
                  />
                </InputField>
                <InputField
                  type="password"
                  label="Password"
                  value={password.value}
                  setValue={(evt: ChangeEvent<HTMLInputElement>) => {
                    setPassword({ error: false, value: evt.target.value });
                  }}
                  placeholder="Enter your password"
                  error={
                    password.error
                      ? "Include uppercase letters, numbers and symbols"
                      : ""
                  }
                >
                  <LockIcon className="w-5 h-5" />
                </InputField>
                <Link
                  to={"/"}
                  className=" block text-blue-600 dark:text-secondaryGreen hover:underline text-sm text-right my-4"
                >
                  Forgot password?
                </Link>
                <div className="flex flex-col gap-4 items-center">
                  <button
                    type="submit"
                    className="w-full text-white bg-defaultGreen hover focus:outline-none  font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700  disabled:cursor-not-allowed disabled:bg-defaultGreen/70 disabled:dark:bg-defaultGreen/50 disabled:text-gray-400 disabled:dark:text-gray-600"
                    disabled={
                      signinLoading ||
                      !phoneNumber.value ||
                      !password.value ||
                      phoneNumber.error
                    }
                  >
                    {signinLoading && (
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
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    Login
                  </button>
                </div>
              </form>
              <div className="my-8">
                <Toast
                  isToastShown={isToastShown}
                  setIsToastShown={setIsToastShown}
                  message={signinError}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Login;
