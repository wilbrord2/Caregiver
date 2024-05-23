import { RouterProvider } from "react-router-dom";
import router from "./routes";
import ContextProvider from "./context";
function App() {
  return (
    <ContextProvider>
      <section>
        <RouterProvider router={router} />
      </section>
    </ContextProvider>
  );
}

export default App;
