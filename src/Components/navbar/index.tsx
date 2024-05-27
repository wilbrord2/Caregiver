import { useNavigate } from "react-router-dom";
import AppLogo from "../../assets/appLogo.svg";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-white sticky top-0 w-full flex flex-row items-center justify-between px-10 lg:px-20 z-50`}
    >
      <div
        onClick={() => navigate("/")}
        className="h-20 w-44 flex items-center cursor-pointer"
      >
        <img src={AppLogo} alt="caregiver image" />
      </div>

      <div className="hidden md:flex items-center">
        <div onClick={() => navigate("/schedule")} className="btn-secondary">
          <button>Schedule Call</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
