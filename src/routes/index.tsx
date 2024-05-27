import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { commonRoutes } from "./authRoutes";
import Root from "../pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {commonRoutes.map((route, id) => {
        if (!route.path)
          return (
            <Route
              key={id}
              index
              element={<Root children={<route.Component />} />}
            />
          );
        return (
          <Route
            key={id}
            path={route.path}
            element={<Root children={<route.Component />} />}
          />
        );
      })}
    </Route>
  )
);

export default router;
