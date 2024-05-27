import HeroImage1 from "../../assets/hero-image.svg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[90%] mx-auto flex flex-col lg:flex-row items-center justify-between gap-2">
      <div className="w-full lg:w-1/2  flex flex-col p-4 ">
        <h1 className="heading1">
          Stop wasting time,
          <br /> Trying to find applicants
        </h1>
        <span className="pt-2 pb-6 font-medium text-xl text-btnPrimary">
          25x your Caregiver Recruiting today!
        </span>
        <div className="flex flex-col gap-4 font-sans">
          <span>
            Our recruitment strategy ensures a 25x higher turnout of qualified
            candidates, setting a new standard in caregiving staffing.
          </span>
          <button
            onClick={() => navigate("/schedule")}
            className="btn-secondary w-full md:w-1/2"
          >
            Schedule a discovery call
          </button>
          <span className="text-sm text-defaultOrange">
            - Let&apos;s enhance your staffing strategy together.
          </span>
        </div>
      </div>
      <div className="w-full h-full lg:w-1/2 flex items-start bg-defaultOrange">
        <img className="" src={HeroImage1} alt="customer-image" />
      </div>
    </div>
  );
};

export default HeroSection;
