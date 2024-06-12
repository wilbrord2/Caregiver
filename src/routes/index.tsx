import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "../pages/root";
import NotFoundPage from "../pages/notFound";
import commonRoutes from "./common";

import { ProtectedRoute } from "./routeProtection";
import usersRoutes from "./admin/users";
import AdminDashboard from "../pages/adminBoard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<NotFoundPage />}>
      {/* COMMON ROUTES */}
      {commonRoutes.map((route, id) => {
        if (!route.path)
          return <Route key={id} index element={<route.Component />} />;
        return (
          <Route key={id} path={route.path} element={<route.Component />} />
        );
      })}

      {/* Admin routes */}

      {/* USERS ROUTES */}
      {usersRoutes.map((route, id) => {
        if (!route.path)
          return (
            <Route
              key={id}
              path="admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard children={<route.Component />} />
                </ProtectedRoute>
              }
            />
          );
        return (
          <Route
            key={id}
            path={`admin/${route.path}`}
            element={
              <ProtectedRoute>
                <AdminDashboard children={<route.Component />} />
              </ProtectedRoute>
            }
          />
        );
      })}
    </Route>
  )
);

export default router;
