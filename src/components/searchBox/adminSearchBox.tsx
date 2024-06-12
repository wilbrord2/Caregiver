import React, { ChangeEvent } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

interface Props {
  transactionList?: boolean;
  setSearchValue: (searchValue: string) => void;
  searchValue: string;
  handleCleanSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  disabled: boolean;
  inputType: string;
}
const AdminSearchBox = ({
  setSearchValue,
  searchValue,
  handleSearch,
  handleCleanSearch,
  disabled,
  inputType,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row items-center max-sm:w-[70%]  2xl:w-[80%] bg-gray-50  dark:bg-defaultGray  dark:placeholder-gray-400 dark:text-defaultTextColor">
      <input
        type={inputType}
        id="searchGroup"
        className="focus:outline-none h-full w-full py-2 pl-2 text-gray-900 text-sm bg-inherit rounded-lg dark:bg-defaultGray dark:border-gray-600 dark:placeholder-gray-400 dark:text-defaultTextColor"
        placeholder="Search..."
        onChange={(e) => {
          let value = e.target.value;
          setSearchValue(value);
          handleCleanSearch(e);
        }}
        onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : "")}
        value={searchValue}
        required
      />
      <span
        className={` h-full  px-1 rounded-e-md text-center ${
          disabled
            ? "cursor-not-allowed bg-defaultGreen/60"
            : "cursor-pointer bg-defaultGreen hover:bg-green-900"
        }`}
        onClick={() => !disabled && handleSearch()}
      >
        <Icon
          icon="fe:search"
          width="30"
          height="100%"
          className="px-1 text-white rounded-e-lg"
        />
      </span>
    </div>
  );
};

export default AdminSearchBox;
