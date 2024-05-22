import HeroImage1 from "../../assets/hero-image.svg";
import HeroImage2 from "../../assets/caregiver-image-1.jpg";
import {useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-2">
      <div className="w-full lg:w-1/2  flex flex-col py-4 px-10 lg:px-20 ">
        <h1 className="heading1">
          Stop wasting time,
          <br /> Trying to find applicants
        </h1>
        <span className="pt-2 pb-6 font-medium text-xl">
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
            Schedule a discovery cal
          </button>
          <span className="text-sm">
            - Let&apos;s enhance your staffing strategy together.
          </span>
        </div>
      </div>
      <div className="hidden lg:block w-1/2">
        <img className="w-full h-full" src={HeroImage1} alt="customer-image" />
      </div>
      <div className="block lg:hidden w-full">
        <img className="w-full h-full" src={HeroImage2} alt="customer-image" />
      </div>
    </div>
  );
};

export default HeroSection;
