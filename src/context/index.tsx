import { PropsWithChildren, createContext, useContext, useState } from "react";
import { checkTheme } from "./checkTheme";
interface ContextValue {
  isDarkMode: boolean;
  setIsDarkMode: (arg: boolean) => void;
  onNavScroll: boolean;
  setNavOnscroll: (arg: boolean) => void;
}
const AppContext = createContext<ContextValue>({} as ContextValue);
const isDarkTheme = checkTheme();

function ContextProvider({ children }: PropsWithChildren) {
  const [isDarkMode, setIsDarkMode] = useState(isDarkTheme);
  const [onNavScroll, setNavOnscroll] = useState(false);
  return (
    <AppContext.Provider
      value={{
        onNavScroll,
        setNavOnscroll,
        isDarkMode,
        setIsDarkMode,
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
