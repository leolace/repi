import { useEffect, useRef, useState } from "react";
import { IDropdownHeaderMenuHookProps } from "./dropdown-header-menu.types";

export function useDropdownHeaderMenu({
  showDropdown,
  setShowDropdown,
}: IDropdownHeaderMenuHookProps) {
  const dropdownContainerRef = useRef<null | HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const isOpenClass = open
    ? "opacity-100 z-10 translate-y-0"
    : "opacity-0 -translate-y-1/4 -z-10";

  useEffect(() => {
    if (showDropdown) setOpen(showDropdown);
  }, [showDropdown]);

  useEffect(() => {
    const handleClick = ({ target }: MouseEvent) => {
      if (target instanceof HTMLAnchorElement) 
        return setShowDropdown(false);
      
      if (
        target instanceof HTMLElement &&
        !dropdownContainerRef.current?.contains(target)
      ) 
        return setShowDropdown(false);
      
    };
    document.addEventListener("click", handleClick);

    function preventSroll(e: Event) {
      e.preventDefault();
      e.stopPropagation();
    }
    window.addEventListener("wheel", preventSroll, { passive: false });

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("wheel", preventSroll);
    };
  }, [dropdownContainerRef]);

  return { dropdownContainerRef, isOpenClass };
}
