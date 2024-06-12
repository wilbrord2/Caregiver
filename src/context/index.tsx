import { PropsWithChildren, createContext, useContext, useState } from "react";
import checkTheme from "../helpers/checkThemePreferrence";
import checkLanguage from "../helpers/checkLanguage";

interface ContextValue {
  activeLink: string;
  setActiveLink: (arg: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (arg: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (arg: boolean) => void;
  language: string | undefined;
  setLanguage: (arg?: string) => void;
  dropDownLinks: string;
  setDropDownLinks: (arg: string) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (arg: boolean) => void;
  isSessionEnd: boolean;
  setIsSessionEnd: (arg: boolean) => void;
  isServerError: boolean;
  setIsServerError: (arg: boolean) => void;

}

const AppContext = createContext<ContextValue>({} as ContextValue);

const isDarkTheme = checkTheme();

function ContextProvider({ children }: PropsWithChildren) {
  const [activeLink, setActiveLink] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(isDarkTheme);
  const [isSessionEnd, setIsSessionEnd] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [language, setLanguage] = useState(checkLanguage());
  const [dropDownLinks, setDropDownLinks] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <AppContext.Provider
      value={{
        activeLink,
        setActiveLink,
        isMenuOpen,
        setIsMenuOpen,
        isDarkMode,
        setIsDarkMode,
        language,
        setLanguage,
        dropDownLinks,
        setDropDownLinks,
        isPopupOpen,
        setIsPopupOpen,
        isSessionEnd,
        setIsSessionEnd,
        isServerError,
        setIsServerError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
export default ContextProvider;
