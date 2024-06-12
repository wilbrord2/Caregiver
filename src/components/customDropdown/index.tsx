import { useEffect, useState } from "react";
import styles from "./styles";
import { ReactComponent as ArrowDown } from "../../assets/down.svg";
import { useTranslation } from "react-i18next";
import isNumeric from "../../helpers/isNumeric";

interface Props {
  name: string;
  month?: number;
  type?: string;
  filterName?: string;
  listItems: (string | number)[];
  handleClick: (item: string | number) => void;
}

function CustomDropdown({
  name,
  month,
  type,
  filterName,
  listItems,
  handleClick,
}: Props) {
  const { t } = useTranslation();
  const [isListOpen, setIsListOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<string | number>(name);

  useEffect(() => {
    if (month) setCurrentItem(name);
  }, [month]);

  return (
    <div
      tabIndex={-1}
      className={`${
        type === "transaction" || type === "pledges"
          ? "min-w-[60%]"
          : `${
              type === "loans"
                ? "w-[50%]"
                : `${
                    type === "admin"
                      ? "w-auto"
                      : `${
                          type === "searchAdmin"
                            ? "max-sm:w-[40%] 2xl:w-[50%] bg-defaultTextColor dark:bg-slate-600 border-0 rounded-l-md rounded-r-none"
                            : "w-32"
                        }`
                  }`
            }`
      } relative border border-secondGray dark:border-defaultGray rounded-md`}
      onBlur={() => setIsListOpen(false)}
    >
      <span
        className={styles.btn}
        onClick={() => {
          setIsListOpen((prev) => !prev);
        }}
      >
        <div className={styles.currentLanguage}>
          {currentItem === "Clear" || currentItem === "Select Custom date" ? (
            filterName ? (
              filterName
            ) : (
              t(`crowdfund.graph.${filterName}`)
            )
          ) : isNumeric(currentItem) ? (
            currentItem
          ) : listItems[0] === "Oldest-Newest" ? (
            <>
              {" "}
              <span className="text-[#5C6370]">Sort: </span>
              <span>{currentItem}</span>{" "}
            </>
          ) : listItems[0] === "None" ? (
            <>
              {" "}
              <span className="text-[#5C6370]">Filter By: </span>
              <span>{currentItem}</span>{" "}
            </>
          ) : (
            currentItem
          )}
        </div>
        <ArrowDown
          className={`duration-150 w-4 h-4 ${isListOpen && "rotate-180"}`}
        />
      </span>
      <div
        className={`${styles.listContainer} ${
          isListOpen ? styles.showList : styles.hideList
        }`}
      >
        <ul
          className={`${
            type === "transaction" || type === "pledges"
              ? "max-h-full"
              : "max-h-52"
          } overflow-auto`}
        >
          {listItems.map((item) => {
            return (
              <li
                key={item}
                className={`${styles.listItem} ${
                  currentItem === item && styles.selectedItem
                }`}
                onClick={(evt) => {
                  evt.preventDefault();
                  evt.stopPropagation();
                  handleClick(item);
                  setCurrentItem(item);
                  setIsListOpen(false);
                }}
              >
                {isNumeric(item) || type === "admin" || type === "searchAdmin"
                  ? item
                  : item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default CustomDropdown;
