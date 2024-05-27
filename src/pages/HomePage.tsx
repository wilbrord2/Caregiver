import { useNavigate } from "react-router-dom";
import HeroSection from "../Components/Homepage/hero";
import TestimonialCard from "../Components/Homepage/testimonial";
import About_Us_image from "../assets/about-us-image.svg";
import registerImage from "../assets/register-image.png";
import ArrowIcon from "../assets/arrow-icon.svg";
import { data, services, user } from "../costants";
import CountUp from "react-countup";
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <section>
      <HeroSection />
      <div className="flex items-center flex-wrap gap-2 justify-evenly mx-auto my-10 w-full sm:w-[90%] ">
        {data.map((item, id) => (
          <div
            key={id}
            className="flex items-center space-y-4 flex-col text-btnPrimary"
          >
            <span className="font-bold text-5xl font-display">
              <CountUp delay={1} duration={5} end={item.total}/>
              {item.icon}
            </span>
            <span className="font-semibold">{item.description}</span>
          </div>
        ))}
      </div>

      <div className="w-full sm:w-[90%] homepageSection bg-btnPrimary">
        <div className="p-4 md:p-10 w-full md:w-1/2">
          <img
            className="w-full h-full"
            src={About_Us_image}
            alt="about-us image"
          />
        </div>
        <div className="w-full md:w-1/2 p-6 md:py-4 text-white flex flex-col gap-2 md:gap-2">
          <span className="heading2 ">
            Why Choose 25x Caregiver Recruitment?
          </span>
          <span className="font-light">
            At 25x Caregivers Recruitment, we pride ourselves on our ability to
            supply healthcare providers with a substantially higher volume of
            qualified caregiver applications. Our unique approach to recruitment
            ensures a 25-fold increase in candidate turnout, allowing you to
            quickly and efficiently enhance your caregiving team with top-tier
            talent.
          </span>
          <span className="font-medium text-defaultOrange">
            Ready to see the difference?{" "}
            <span className="underline font-bold cursor-pointer">
              {" "}
              Contact us today
            </span>{" "}
            to learn how we can help you.
          </span>
        </div>
      </div>

      <div className="pt-10 lg:pt-20">
        <div className="max-sm:hidden relative -z-10 top-4 border border-dashed  w-full block border-defaultOrange"></div>
        <div className=" flex items-center max-sm:pl-4 justify-start max-sm:flex-wrap gap-2 sm:justify-evenly mx-auto w-full sm:w-[90%] ">
          {services.map((item, id) => (
            <div
              key={id}
              className="flex items-center sm:space-y-4 max-sm:flex-row gap-2 flex-col text-btnPrimary"
            >
              <span className="w-5 h-5 sm:w-8 sm:h-8 rounded-full border border-btnPrimary flex items-center justify-center">
                <div className="w-3 h-3 sm:w-5 sm:h-5 bg-btnPrimary  rounded-full block">
                  {" "}
                </div>
              </span>
              <span className="font-semibold max-sm:w-full w-3/4 text-center">
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="homepageSection">
        <div className="w-full md:w-[40%] p-6 md:py-4 flex flex-col justify-center gap-2 md:gap-4">
          <span className="heading2 text-btnPrimary text-4xl">
            Register and Schedule a Discovery Call
          </span>
          <span className="font-normal text-[#666666]">
            Begin your journey to successful caregiver recruitment by
            registering on our platform. Once registered, schedule a discovery
            call. Our introduction call, led by Steve Gitore, will discuss your
            current recruitment needs and explain how 25x Caregivers Recruitment
            can amplify the quality and quantity of your caregiving staff.
          </span>
          <button
            onClick={() => navigate("/schedule")}
            className="flex gap-2 items-center font-bold text-btnPrimary text-lg hover:opacity-40"
          >
            Schedule a discovery call{" "}
            <img className="w-8 h-8" src={ArrowIcon} alt="arrow icon" />
          </button>
        </div>
        <div className="p-4  w-full md:w-1/2">
          <img
            className=" w-full h-full"
            src={registerImage}
            alt="about-us image"
          />
        </div>
      </div>

      <div className="w-full sm:w-full p-4 md:px-20 md:py-16  my-10 mx-auto bg-btnPrimary">
        <h1 className="heading2 text-white">What Users Think</h1>
        <div className="mt-8">
          <TestimonialCard user={user} />
        </div>
      </div>

      <div className="flex items-center justify-center my-10">
        <div className="w-full md:w-1/2 p-4">
          <h1 className="heading2 text-btnPrimary  text-center">
            Want to hear more from us? <br />
            Subscribe to our newsletter
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-4 ">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your e-mail address"
              className="py-2 pl-4  rounded-md bg-white border outline-none w-full md:w-1/2  focus:border-teal-400"
            />
            <button className="btn-secondary ">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
