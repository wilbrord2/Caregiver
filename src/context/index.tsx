import { PropsWithChildren, createContext, useContext, useState } from "react";
import { checkTheme } from "./checkTheme";
interface ContextValue {
  isDarkMode: boolean;
  setIsDarkMode: (arg: boolean) => void;
}
const AppContext = createContext<ContextValue>({} as ContextValue);
const isDarkTheme = checkTheme();

function ContextProvider({ children }: PropsWithChildren) {
  const [isDarkMode, setIsDarkMode] = useState(isDarkTheme);

  return (
    <AppContext.Provider
      value={{
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
