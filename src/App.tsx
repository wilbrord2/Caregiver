import { RouterProvider } from "react-router-dom";
import router from "./routes"
function App() {
  return (
   <section>
 <RouterProvider router={router}/>
   </section>
  );
}

export default App;
