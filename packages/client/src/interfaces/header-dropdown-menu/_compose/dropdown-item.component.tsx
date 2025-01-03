import { Text } from "@components";
import { MenuOption } from "../dropdown-header-menu.types";
import { isClickableMenuOption } from "../dropdown-header-menu.utils";
import { Link } from "@remix-run/react";

export function DropdownItem(menuOption: MenuOption) {
  if (isClickableMenuOption(menuOption)) {
    const { Icon, name, onClick } = menuOption;
    return (
      <li
        onClick={onClick}
        className={`cursor-pointer hover:bg-gray-light flex gap-2 items-center p-2 ${menuOption.style || ""}`}
      >
        <Icon size="20px" />
        <Text>{name}</Text>
      </li>
    );
  }

  const { Icon, name, link } = menuOption;
  return (
    <li className="cursor-pointer hover:bg-gray-light">
      <Link to={link} className="flex gap-2 items-center p-2">
        <Icon size="20px" />
        <Text>{name}</Text>
      </Link>
    </li>
  );
}
