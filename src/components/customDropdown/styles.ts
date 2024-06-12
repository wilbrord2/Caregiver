const styles = {
  currentLanguage: "flex-1 md:text-left",
  btn: "flex text-sm p-2 gap-1 justify-between items-center w-full cursor-pointer",
  image: "bg-defaultGreen rounded-full w-9 h-9",
  showList: "block",
  hideList: "hidden",
  listContainer:
    "absolute z-10 right-0 my-2 w-full min-w-fit border border-secondGray dark:border-defaultGray rounded-md bg-white dark:bg-defaultBlack overflow-hidden  shadow-md",
  listContainer2:
    "absolute z-1 border border-secondGray dark:border-defaultGray rounded-md bg-white dark:bg-defaultBlack overflow-hidden shadow-md",
  listItem:
    "hover:bg-secondGray dark:hover:bg-defaultGray p-1 px-3 text-sm cursor-pointer",
  selectedItem: "bg-secondGray dark:bg-defaultGray",
  link: "block p-3 md:p-2 font-semibold text-sm",
  active:
    "block p-3 md:p-2 font-semibold text-sm rounded-md bg-green-200 dark:bg-defaultGreen ",
};

export default styles;
