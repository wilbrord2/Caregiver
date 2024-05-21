import AppLogo from "../../assets/appLogo.svg";

const Navbar = () => {
  // bg-[#F7F7F7]
  return (
    <div className="fixed bg-[#F7F7F7] w-full flex flex-row items-center justify-between  px-10 lg:px-20">
      <div className="h-20 w-52 flex items-center">
        <img src={AppLogo} alt="caregiver image" />
      </div>

      <div className="hidden md:flex items-center gap-4 flex-row">
        <div className="btn-primary">
          <button>Contact Us</button>
        </div>
        <div className="btn-secondary">
          <button>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
