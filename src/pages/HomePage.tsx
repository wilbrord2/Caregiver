import {useNavigate } from "react-router-dom";
import HeroSection from "../Components/Homepage/hero";
import TestimonialCard from "../Components/Homepage/testimonial";
import About_Us_image from "../assets/about-us-image.svg";
import registerImage from "../assets/register-image.svg";
import { user } from "../costants";
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <section>
      <HeroSection />
      <div className="homepageSection bg-bgPrimaryColor">
        <div className="p-4 md:p-10 w-full md:w-1/2">
          <img
            className=" w-full h-full"
            src={About_Us_image}
            alt="about-us image"
          />
        </div>
        <div className="w-full md:w-[40%] p-6 md:py-4 text-white flex flex-col gap-2 md:gap-8">
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
          <span className="font-medium">
            Ready to see the difference?{" "}
            <span className="underline font-bold cursor-pointer">
              {" "}
              Contact us today
            </span>{" "}
            to learn how we can help you.
          </span>
        </div>
      </div>
      <div className="homepageSection">
        <div className="w-full md:w-[40%] p-6 md:py-4 flex flex-col justify-center gap-2 md:gap-8">
          <span className="heading2 text-btnPrimary text-4xl">
            Register and Schedule a Discovery Call
          </span>
          <span className="font-light">
            Begin your journey to successful caregiver recruitment by
            registering on our platform. Once registered, schedule a discovery
            call. Our introduction call, led by Steve Gitore, will discuss your
            current recruitment needs and explain how 25x Caregivers Recruitment
            can amplify the quality and quantity of your caregiving staff.
          </span>
          <button
            onClick={() => navigate("/schedule")}
            className="btn-secondary w-full lg:w-1/2"
          >
            Schedule a discovery call
          </button>
        </div>
        <div className="p-4 md:p-10 w-full md:w-1/2">
          <img
            className=" w-full h-full"
            src={registerImage}
            alt="about-us image"
          />
        </div>
      </div>
      <div className="w-[90%] rounded-3xl p-4 md:px-20 md:py-16  my-10 mx-auto bg-gradient-to-b from-[#ED90CF] to-[#3C8CDE]">
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
