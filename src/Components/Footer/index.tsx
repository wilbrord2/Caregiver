import { useNavigate } from "react-router-dom";
import AppLogo from "../../assets/appLogo-white.svg";
import { Icon } from "@iconify/react";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-btnPrimary mt-4 px-10 lg:px-20 text-white">
      <div className="flex flex-col max-sm:pb-4 sm:flex-row justify-between w-full border-b">
        <div
          onClick={() => navigate("/homepage")}
          className="h-20 w-52 flex items-center cursor-pointer"
        >
          <img src={AppLogo} alt="caregiver image" />
        </div>
        <div className="flex flex-row gap-4 items-center cursor-pointer">
          <Icon icon="mdi:linkedin" width="35" height="35" color="white" />
          <Icon
            icon="fa-brands:github-square"
            width="35"
            height="35"
            color="white"
          />
          <Icon
            icon="mage:instagram-square"
            width="35"
            height="35"
            color="white"
          />
          <Icon
            icon="fa-brands:youtube-square"
            width="35"
            height="35"
            color="white"
          />
          <Icon
            icon="fa6-brands:square-x-twitter"
            width="35"
            height="35"
            color="white"
          />
        </div>
      </div>
      <div className="py-6 flex flex-col max-sm:space-y-4 sm:flex-row justify-between items-center">
        <span className="font-light">
          ©2024 <span className="font-medium">25x Caregiver Recruiting</span>,
          All Rights Reserved
        </span>
        <span>1 KN 3 Road, Le Prestige House, Rwanda</span>
      </div>
    </div>
  );
};

export default Footer;
