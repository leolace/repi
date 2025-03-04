import { Triangle } from "lucide-react";
import React, { MouseEvent } from "react";
import { assembleOpenClasses, baseClass } from "./utils";
import { DropdownProps } from "./types";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import { DropdownItem } from "./_compose/item";

export const DropdownHeaderMenu = ({
  showDropdown,
  setShowDropdown,
  items,
}: DropdownProps) => {
  const dropdownContainerRef = React.useRef<null | HTMLDivElement>(null);
  const isOpenClasses = assembleOpenClasses(showDropdown);

  function handleClick({ target }: MouseEvent) {
    if (target instanceof HTMLAnchorElement) return setShowDropdown(false);

    if (
      target instanceof HTMLElement &&
      !dropdownContainerRef.current?.contains(target)
    )
      return setShowDropdown(false);
  }

  return (
    <>
      <Triangle
        fill="#212121"
        size="0.75rem"
        strokeWidth="0.5px"
        className={twMerge("bottom-0", baseClass, isOpenClasses)}
      />
      <div
        className={twMerge(
          "ring-1 ring-gray min-w-[12rem] top-14 rounded flex flex-col gap-5 bg-gray-light-2",
          baseClass,
          isOpenClasses,
        )}
        ref={dropdownContainerRef}
      >
        <nav className="flex flex-col">
          {items.map((group, index) => (
            <ul key={index} className="border-b-gray border-b">
              {group.map((item, index) => (
                <DropdownItem {...item} key={index} />
              ))}
            </ul>
          ))}
        </nav>
      </div>
      {showDropdown &&
        createPortal(
          <div
            className="absolute w-full h-full left-0 top-0 z-1"
            onClick={handleClick}
          />,
          document.body,
        )}
    </>
  );
};
