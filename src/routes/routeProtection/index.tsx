import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { setIsSessionEnd } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken: string = JSON.parse(
      localStorage.getItem("access_token") as string
    );
    setIsSessionEnd(false);
    if (!accessToken) {
      navigate("/");
    }
  }, []);
  return <>{children}</>;
};

export const ProtectedRouteState = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state === null) {
      navigate("/");
    }
  });
  return <>{children}</>;
};
