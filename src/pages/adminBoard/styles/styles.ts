const paginationStyles = {
    activePagination: "!bg-defaultGreen  focus:outline-none active:outline-none ",
    activePaginationLink:
      " !bg-defaultGreen text-white active:outline-none focus:border-none focus:border-opacity-0",
    next: " rounded-r-md bg-[#CAD0D7] font-bold text-center dark:bg-gray-700 px-[2px] flex items-center",
    previous:
      " rounded-l-md bg-[#CAD0D7] font-bold text-center dark:bg-gray-700 px-[2px] flex items-center",
    listContainer:
      "absolute my-12 w-full border border-secondGray dark:border-defaultGray rounded-md bg-white dark:bg-defaultBlack overflow-hidden  shadow-md",
    listItem:
      "hover:bg-secondGray dark:hover:bg-defaultGray p-1 px-2 text-sm cursor-pointer",
    selectedItem: "bg-secondGray dark:bg-defaultGray",
    link: "block p-3 md:p-2 font-semibold text-sm",
    active:
      "block p-3 md:p-2 font-semibold text-sm rounded-md bg-green-200 dark:bg-defaultGreen ",
    showList: "block",
    hideList: "hidden",
  };
  
  export default paginationStyles;