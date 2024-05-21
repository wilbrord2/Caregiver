import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Login";
import Schedule from "../pages/Schedule";

import RouteType from "../types/routerTypes";

export const authRoutes: RouteType[] = [
  { Component: LoginPage },
  { path: "homepage", Component: HomePage },
  { path: "schedule", Component: Schedule },
];
export const commonRoutes: RouteType[] = [
  { Component: LoginPage },
  { path: "homepage", Component: HomePage },
  { path: "schedule", Component: Schedule },
];
