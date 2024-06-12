import { useState, useEffect,FormEvent } from "react";
import { ReactComponent as CameraIcon } from "../../assets/camera.svg";
import { ReactComponent as FlagIconRW } from "../../assets/rw.svg";
import avatarIcon, {
  ReactComponent as AvatarIcon,
} from "../../assets/person.svg";
import InputField from "../InputField";
import { useAppContext } from "../../context";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks";

const ProfileView = () => {
  const { isPopupOpen, setIsPopupOpen } = useAppContext();
  const [image, setImage] = useState<File | undefined>(undefined);
  const [pictureError, setPictureError] = useState("");
  const [isPreviewingImage, setIsPreviewingImage] = useState(false);
  const [name, setName] = useState("");
  const userProfile = useAppSelector((state) => state.userProfile);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    setName(userProfile.name);
  }, [userProfile]);

  useEffect(() => {
    if (pictureError) {
      let timeId = setTimeout(() => {
        setPictureError("");
      }, 5000);

      return () => clearTimeout(timeId);
    }
  }, [pictureError]);

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    const userData =
      typeof image === "object"
        ? { name: name.trim(), userImage: image }
        : { name: name.trim() };
    setIsPreviewingImage(false);
    setIsPopupOpen(false);
  };

  return (
    <div
      className={`${
        isPopupOpen ? "flex" : "hidden"
      } overflow-x-hidden overflow-y-hidden fixed top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-full bg-black/50 z-50`}
    >
      <div className="relative w-80 md:w-96 h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-defaultBlack">
          <div className="relative w-full h-40 bg-defaultGreen rounded-t-lg">
            <p className="text-2xl pt-12 text-white text-center font-semibold">
              {t("crowdfund.user.profile")}
            </p>
            {pictureError && (
              <p className="w-32 min-w-fit mx-auto text-center text-xs mt-1 bg-red-500 rounded-md p-1">
                {pictureError}
              </p>
            )}
            <div className="absolute top-[calc(100%-3rem)] left-0 right-0 m-auto bg-gray-500 rounded-full w-24 h-24 border-2 border-white dark:border-defaultBlack">
              <img
                loading="lazy"
                decoding="async"
                src={
                  (isPreviewingImage
                    ? URL.createObjectURL(image!)
                    : userProfile.userImage) || avatarIcon
                }
                alt="avatar"
                className="w-full h-full rounded-full"
              />
              <label className="absolute bottom-1 right-1 flex items-center justify-center w-5 h-5 rounded-full bg-gray-600 hover:bg-gray-500 cursor-pointer">
                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  name=""
                  id=""
                  className="w-full hidden"
                  onChange={(evt) => {
                    let file = evt.target.files?.[0];
                    const maxFileSizeInMB = 2;
                    const maxFileSizeInKB = 1024 * 1024 * maxFileSizeInMB;
                    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

                    if (file && file.size > maxFileSizeInKB) {
                      setPictureError(
                        `Image must be ${maxFileSizeInMB}MB or less.`
                      );
                    } else if (file && !allowedExtensions.exec(file?.name)) {
                      setPictureError("Provide valid image file.");
                    } else {
                      setIsPreviewingImage(true);
                      setImage(file);
                      setPictureError("");
                    }
                  }}
                />
                <CameraIcon className="text-gray-100 w-3 h-3" />
              </label>
            </div>
            <span
              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 inline-flex justify-center items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
              onClick={() => setIsPopupOpen(false)}
            >
              &times;
            </span>
          </div>
          <div className="mt-16 pb-6 flex flex-col items-center">
            <div>
              <InputField
                label={t("homePage.nameLabel")}
                placeholder={t("homePage.namePlaceholder")}
                value={name}
                setValue={(evt) => setName(evt.target.value)}
              >
                <AvatarIcon className="w-5 h-5" />
              </InputField>
              <div>
                <span className="block mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {t("homePage.phoneInputLabel")}
                </span>
                <div className="relative mb-6">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center gap-1 pl-3 pointer-events-none text-gray-500 dark:text-gray-400 text-sm w-full">
                      <FlagIconRW className="w-5 h-5" /> +250
                    </div>
                    <span
                      className={`bg-[#DEEBEE] border border-[#cee5ea]  text-gray-500 dark:text-gray-400 text-sm rounded-lg  block w-full pl-20 p-2.5  dark:bg-[#3D404B] dark:border-[#3f4149] dark:placeholder-gray-400 cursor-not-allowed`}
                    >
                      {userProfile.phone.replace("250", "")}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-defaultGreen focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800  disabled:cursor-not-allowed disabled:bg-defaultGreen/70 disabled:dark:bg-defaultGreen/50 disabled:text-gray-400 disabled:dark:text-gray-600"
                onClick={handleSubmit}
                disabled={userProfile.userLoading || !name}
              >
                {" "}
                {userProfile.userLoading && (
                  <svg
                    className="inline animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {t("crowdfund.user.update")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
