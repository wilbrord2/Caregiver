import { Icon } from "@iconify/react";
import { useState } from "react";

const CustomTooltip = ({ content }: { content: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <span
      tabIndex={0}
      data-tooltip={content}
      onClick={() => setIsOpen(!isOpen)}
      onBlur={() => setIsOpen(false)}
      className={`inline-flex items-center justify-center min-w-6 min-h-6 h-6 w-6 font-medium text-white dark:text-secondGray   bg-secondGray dark:bg-defaultGray rounded-full relative ${
        isOpen
          ? "before:scale-100 before:content-[attr(data-tooltip)]"
          : "before:scale-0 after:scale-0"
      } before:absolute before:-bottom-1 before:h-auto before:w-64 before:z-10 before:text-thirdGray  before:bg-defaultBlack/80 before:dark:text-secondGray before:dark:bg-black/90 before:-translate-x-1/2 before:translate-y-[calc(100%+0.375rem)]  before:left-1/2 before:p-3 before:rounded-lg after:absolute after:-bottom-1 after:h-auto after:z-10 after:-translate-x-1/2 after:translate-y-1.5 after:left-1/2 after:border-[6px] after:border-transparent  after:border-b-defaultBlack/80  after:dark:border-b-black/90

      `}
    >
      <Icon
        icon="bi:question"
        width="20"
        height="20"
        className="cursor-pointer text-inherit"
      />
    </span>
  );
};

export default CustomTooltip;
