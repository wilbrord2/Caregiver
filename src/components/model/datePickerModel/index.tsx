import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  admin?:boolean;
  isModelOpen: boolean;
  setIsModelOpen: (open: boolean) => void;
  handleDatePicker: (start: string, end: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
};

function DatePicker({
  admin,
  isModelOpen,
  setIsModelOpen,
  handleDatePicker,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) {
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  const handleDate = (myDate: Date | string) => {
    const originalDate = new Date(myDate);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0");
    const day = String(originalDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handlePickedDate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    handleDatePicker(handleDate(startDate), handleDate(endDate));
    setStartDate("");
    setEndDate("");
    setIsModelOpen(false);
  };
  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setStartDate("");
    setEndDate("");
    e.preventDefault();
    setIsModelOpen(false);
  };
  return (
    <div
      className={`${
        isModelOpen ? "block" : "hidden"
      } overflow-x-hidden overflow-y-hidden fixed top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-full bg-black/50 dark:bg-black/70 z-50`}
    >
      <div className={`${admin ? "w-[80%]":"w-[80%] md:w-[60%] lg:w-[30%]"}  relative pt-4 pb-8  top-1/4 border dark:border-defaultGray  bg-white dark:bg-defaultBlack rounded-md  dark:border-opacity-20 m-auto  items-center justify-evenly flex flex-col gap-4`}>
        <div className="w-full text-sm font-bold mb-2 items-center flex justify-center ">
          <h1>{t("crowdfund.datepicker.title")}</h1>
        </div>
        <div className="w-full items-center justify-evenly flex flex-col flex-wrap gap-8 ">
          <div className="w-[90%] items-center justify-around flex flex-row gap-2 ">
            <label htmlFor="from" className=" font-bold w-[20%]">
              {t("crowdfund.datepicker.from")}:
            </label>
            <input
              type="date"
              value={startDate}
              id="from"
              name="from"
              max={handleDate(new Date())}
              placeholder="dd-MM-yyyy"
              onChange={(e) => {
                setStartDate(e.target.value);
                endDate >= e.target.value ? setError(false) : setError(true);
              }}
              className="border text-center  rounded-lg py-2 px-4 w-[85%] 
            dark:bg-defaultBlack bg-slate-200 dark:border-defaultGray
            dark:text-defaultTextColor cursor-pointer outline-none ring-0"
            />
          </div>
          <div className="w-[90%] items-center  flex flex-row gap-2">
            <label htmlFor="to" className="font-bold w-[20%]">
              {t("crowdfund.datepicker.to")}:
            </label>
            <input
              type="date"
              id="to"
              name="to"
              value={endDate}
              max={handleDate(new Date())}
              placeholder="dd-MM-yyyy"
              onChange={(e) => {
                setEndDate(e.target.value);
                e.target.value <= startDate ? setError(true) : setError(false);
              }}
              className="border text-center rounded-lg py-2 px-4 w-[85%]
            dark:bg-defaultBlack  bg-slate-200 dark:border-defaultGray
            dark:text-defaultTextColor cursor-pointer outline-none ring-0"
            />
          </div>
        </div>
        <div
          className={
            error ? "text-red-600 text-center w-full text-sm pt-4" : "hidden"
          }
        >
          Starting date should be before End date
        </div>
        <div className="items-center pt-10 justify-center flex flex-row gap-8 w-full ">
          <button
            className="px-4 p-2 font-bold text-sm rounded-lg hover:bg-defaultTextColor  dark:hover:text-black"
            onClick={(e) => {
              handleClose(e);
              setError(false);
            }}
          >
            {t("crowdfund.datepicker.cancel")}{" "}
          </button>
          <button
            className="px-6 p-2 bg-defaultGreen text-white font-bold  rounded-full  disabled:cursor-not-allowed disabled:bg-opacity-20"
            onClick={(e) => handlePickedDate(e)}
            disabled={
              startDate !== "" && endDate !== "" && !error ? false : true
            }
          >
            {t("crowdfund.datepicker.apply")}{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
export default DatePicker;
