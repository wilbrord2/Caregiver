import ContextProvider from "./context";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}
export default App;
