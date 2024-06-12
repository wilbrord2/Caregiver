const styles = {
  active:
    "flex items-center gap-2 p-2 pl-6 font-semibold bg-gray-200 dark:bg-gray-600 ",
  btn: "button" as const,
  menuBtnContainer: "lg:hidden flex gap-6 items-center",
  menuBtn:
    "inline-flex items-center p-2 text-sm text-gray-500 rounded-full lg:hidden bg-gray-100 focus:outline-none",
  menuIcon: "w-6 h-6",
  closeIcon: "w-8 h-8",
  closeBtn:
    "inline-flex items-center py-3 px-4 text-sm  text-black dark:text-defaultTextColor ",
  scrReaderOnly: "sr-only",
  mobileView: "lg:hidden",
  linksContainer:
    "flex justify-end text-sm  fixed top-0 left-0 right-0 bottom-0 w-full h-full  bg-opacity-45 dark:bg-opacity-15 bg-blend-overlay duration-500 bg-black dark:bg-white ",
  onMenuOpen: "translate-x-0",
  onMenuClose: "translate-x-full",
  closeBtnContainer: "text-end lg:hidden",
  mobileLinks: "flex flex-col",
  desktopView: "hidden lg:flex flex-wrap items-center",
  desktopLinks:
    "flex flex-row items-center mt-0 text-sm font-medium mr-4 lg:mr-10 gap-6 lg:gap-12",
  helpCenterTheme: "bg-white dark:bg-defaultBlack dark:text-white",
  landigPageTheme: "bg-defaultGreen",
  helpCenterText: "dark:text-white text-black",
  landingPageText: "text-white",
  link: "flex gap-2 py-1.5 items-center pl-6 hover:bg-gray-200 dark:hover:bg-gray-500",
  // link: "block bg-white p-2 rounded-full",
  search: "w-5 h-5",
};

export default styles;
