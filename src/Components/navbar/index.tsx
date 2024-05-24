import { useNavigate } from "react-router-dom";
import AppLogo from "../../assets/appLogo.svg";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);
  const changeNavbar = () => {
    if (window.scrollY >= 40) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeNavbar);
  return (
    <div
      className={`${
        navbar ? "bg-[#F7F7F7] ease-in " : ""
      }  sticky top-0 w-full flex flex-row items-center justify-between px-10 lg:px-20 z-50`}
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
