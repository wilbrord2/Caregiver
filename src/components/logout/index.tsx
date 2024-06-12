import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoutIcon } from "../../assets/logout.svg";
import { useDispatch } from "react-redux";
import { clearToken } from "../../store/features/authSlice";
import { logout } from "../../store/features/userProfileSlice";
import { useAppContext } from "../../context";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setIsMenuOpen, setIsDarkMode, setIsSessionEnd, setIsServerError } =
    useAppContext();

  const handleLogout = () => {
    setIsDarkMode(false);
    setIsSessionEnd(true);
    setIsServerError(false);
    localStorage.removeItem("access_token");
    dispatch(clearToken());
    dispatch(logout());
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <div
      className="flex gap-3 items-center  text-defaultBlack dark:text-defaultTextColor text-base font-semibold p-1 pl-6 md:pl-4 hover:bg-gray-200 dark:hover:bg-gray-500 cursor-pointer"
      onClick={handleLogout}
    >
      <LogoutIcon className="w-8 text-red-800" />
      <p>Logout</p>
    </div>
  );
};

export default Logout;
