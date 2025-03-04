export const baseClass =
  "left-1/2 -translate-x-1/2 absolute transition duration-300";

export function assembleOpenClasses(showDropdown: boolean) {
  return showDropdown
    ? "opacity-100 z-10 translate-y-0"
    : "opacity-0 -translate-y-1/4 -z-10";
}
