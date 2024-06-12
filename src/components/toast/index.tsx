import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import { ReactComponent as CheckIcon } from "../../assets/alertCircle.svg";
import { ReactComponent as CheckSuccess } from "../../assets/Vectorcheck.svg";

type IsToastShown = boolean;
interface ToastProps {
  isToastShown: IsToastShown;
  setIsToastShown: (isToastShown: IsToastShown) => void;
  isSuccess?: boolean;
  message: string | boolean;
}

function Toast({
  isToastShown,
  setIsToastShown,
  isSuccess,
  message,
}: ToastProps) {
  return (
    <>
      {isToastShown && (
        <div className="text-white my-3">
          <div
            className={`${
              isSuccess
                ? "bg-green-700 flex items-center justify-between w-full p-2.5 rounded-lg"
                : "bg-red-500 flex items-center justify-between w-full p-2.5 rounded-lg"
            }`}
            role="alert"
          >
            <div>
              {isSuccess ? (
                <>
                  <CheckSuccess className="inline w-6 h-6" />
                  <span className="sr-only">successfully icon</span>{" "}
                </>
              ) : (
                <>
                  <CheckIcon className="inline w-6 h-6" />
                  <span className="sr-only">info icon</span>{" "}
                </>
              )}
            </div>
            <div className="text-sm mx-4 font-normal xl:text-lg ">
              {message}
            </div>
            <CloseIcon
              className="w-5 h-5 cursor-pointer"
              onClick={() => setIsToastShown(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Toast;
