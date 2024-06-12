import React, { ChangeEvent } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

interface Props {
  transactionList?: boolean;
  setSearchValue: (searchValue: string) => void;
  searchValue: string;
  handleCleanSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
}
const SearchBox = ({
  setSearchValue,
  searchValue,
  handleSearch,
  handleCleanSearch,
  transactionList,
}: Props) => {
  const { t } = useTranslation();
  const styles =
    "bg-gray-50 border border-gray-300 rounded-xl dark:bg-defaultGray dark:border-gray-600 dark:placeholder-gray-400 dark:text-defaultTextColor";
  return (
    <div
      className={`${
        transactionList
          ? "mt-3 flex gap-1 flex-row items-center max-sm:w-full "
          : "flex gap-1 flex-row items-center w-1/2 max-lg:w-4/5 max-sm:w-full"
      }${styles}`}
    >
      <input
        type="text"
        id="searchGroup"
        className="focus:outline-none w-full bg-gray-50 py-1 pl-4 text-gray-900 text-sm rounded-xl dark:bg-defaultGray dark:border-gray-600 dark:placeholder-gray-400 dark:text-defaultTextColor"
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
        className="bg-defaultGreen hover:bg-green-900 cursor-pointer px-1 rounded-e-xl text-center"
        onClick={() => handleSearch()}
      >
        <Icon
          icon="fe:search"
          width="30"
          height="30"
          className="px-1 text-white"
        />
      </span>
    </div>
  );
};

export default SearchBox;
