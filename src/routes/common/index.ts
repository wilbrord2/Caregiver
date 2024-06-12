import ErrorPage from "../../components/errorMessage";
import ForgetPassword from "../../pages/resetPassword/forgetPassword";
import ResetPassword from "../../pages/resetPassword/resetPassword";
import Login from "../../pages/signin";
import Verify from "../../pages/verify";
import VerifyEmail from "../../pages/verify/verifyEmail";
import type RouteType from "../../types/routeType";

const commonRoutes: RouteType[] = [
  { path: "error", Component: ErrorPage },
  { Component: Login },
  { path: "verify-phone", Component: Verify },
  { path: "verify-email", Component: VerifyEmail },
  { path: "forgot-password", Component: ForgetPassword },
  { path: "change-password", Component: ResetPassword },
];

export default commonRoutes;
