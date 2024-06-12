import { useAppContext } from "../../context";
import { useAppSelector } from "../../hooks";
import { UserProfileIcon } from "../../constants/userProfileImage";
const Avatar = () => {
  let { setIsPopupOpen, setIsMenuOpen } = useAppContext();
  const userProfile = useAppSelector((state) => state.userProfile);
  return (
    <>
      <div
        className="flex gap-2 items-center md:mx-0 text-white cursor-pointer"
        onClick={() => {
          setIsMenuOpen(false);
          setIsPopupOpen(true);
        }}
      >
        <span className="hidden md:inline">
          {userProfile.name ? (
            userProfile.name
          ) : (<div className="text-defaultBlack  dark:text-defaultTextColor">Admin</div>
          )}
            
        </span>
        {userProfile.userImage ? (
          <img
            src={userProfile.userImage}
            alt={userProfile.name}
            className="w-10 h-10 rounded-full border border-gray-500"
          />
        ) : (
          <img
            src={UserProfileIcon}
            alt="Profile.png"
            className="rounded-full w-10 h-10 "
          />
        )}
        
      </div>
    </>
  );
};

export default Avatar;
