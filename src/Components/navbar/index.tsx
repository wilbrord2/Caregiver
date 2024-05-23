import { useNavigate } from "react-router-dom";
import AppLogo from "../../assets/appLogo.svg";
import { useAppContext } from "../../context";

const Navbar = () => {
  const navigate = useNavigate();
  const { onNavScroll } = useAppContext();
  return (
    <div
      className={`${
        onNavScroll ? "bg-[#F7F7F7]" : ""
      } fixed w-full flex flex-row items-center justify-between px-10 lg:px-20`}
    >
      <div
        onClick={() => navigate("/homepage")}
        className="h-20 w-52 flex items-center cursor-pointer"
      >
        <img src={AppLogo} alt="caregiver image" />
      </div>

      <div className="hidden md:flex items-center gap-4 flex-row">
        <div className="btn-primary">
          <button>Contact Us</button>
        </div>
        <div onClick={() => navigate("/schedule")} className="btn-secondary">
          <button>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
