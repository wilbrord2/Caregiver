import { ChangeEvent, ReactNode, useState } from "react";
import { ReactComponent as RevealPassword } from "../../assets/showPassword.svg";
import { ReactComponent as HidePassword } from "../../assets/hidePassword.svg";
interface Props{
  type?:string,
  label:string,
  placeholder:string,
  error?:string| boolean,
  children:ReactNode,
  value:string,
  setValue:(evt:ChangeEvent<HTMLInputElement>)=>void,
}
const InputField = ({
  type,
  label,
  placeholder,
  error,
  children,
  value,
  setValue,
}:Props)=> {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="xl:mb-4">
      <label
        htmlFor={label}
        className="block mb-1 xl:mb-3 text-sm font-semibold text-gray-900 dark:text-defaultTextColor"
      >
        {label}
      </label>

      <div className="relative mb-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center gap-1 pl-3 pointer-events-none text-gray-500 dark:text-gray-400 text-sm">
            {children}
          </div>
          <input
            type={type === "password" && showPassword ? "text" : type}
            id={label}
            maxLength={type === "number" ? 9 : 25}
            pattern={type === "number" ? "[0-9]*" : "*"}
            className={`bg-[#fff] border border-[#cee5ea] focus:outline-none focus-within:bg-white focus:border-defaultGreen dark:focus:border-defaultGreen text-gray-900 text-sm rounded-lg  block w-full ${
              type === "number" ? "pl-20" : "pl-10"
            } p-2.5  dark:bg-[#3D404B] dark:border-[#3f4149]  dark:placeholder-gray-400 dark:text-defaultTextColor`}
            placeholder={placeholder}
            value={value}
            onChange={setValue}
          />
          {type === "password" &&
            (showPassword ? (
              <span
                className="absolute top-0 right-0 p-2 h-full text-sm font-medium rounded-r-lg cursor-pointer text-gray-500"
                onClick={(evt) => {
                  evt.preventDefault();
                  setShowPassword(false);
                }}
              >
                <HidePassword className="" />
              </span>
            ) : (
              <span
                className="absolute top-0 right-0 p-2 h-full text-sm font-medium rounded-r-lg cursor-pointer text-gray-500"
                onClick={(evt) => {
                  evt.preventDefault();
                  setShowPassword(true);
                }}
              >
                <RevealPassword />
              </span>
            ))}
        </div>
        {error && (
          <p className="absolute left-0 -bottom-4 text-xs text-red-600 dark:text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default InputField;
