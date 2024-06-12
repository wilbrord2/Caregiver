import { Icon } from "@iconify/react";
import React, { useState } from "react";

const TooltipComponent = ({
  content,
  left,
  right,
  lastChild,
}: {
  content: string;
  left?: string;
  right?: string;
  lastChild?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <span
      tabIndex={0}
      data-tip={content}
      onClick={() => setIsOpen(!isOpen)}
      onBlur={() => setIsOpen(false)}
      className={`inline-flex items-center justify-center font-medium text-sm text-white dark:text-secondGray bg-secondGray dark:bg-defaultGray 
       rounded-full min-w-6 min-h-6 w-6 h-6 ${
         isOpen
           ? "tooltip tooltip-open"
           : "tooltip hover:before:opacity-0  hover:after:hidden "
       } ${left ? left : right} ${
        lastChild ? "md:tooltip-left" : "md:tooltip-bottom"
      }  before:w-60 sm:before:w-64 before:text-thirdGray  before:bg-defaultBlack/85 before:dark:text-secondGray before:dark:bg-black/90`}
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

export default TooltipComponent;
