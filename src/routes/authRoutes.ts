import HomePage from "../pages/HomePage";
import Schedule from "../pages/Schedule";
import RouteType from "../types/routerTypes";


export const commonRoutes: RouteType[] = [
  { Component: HomePage },
  { path: "schedule", Component: Schedule },
];
