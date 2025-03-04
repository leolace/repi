import { Text } from "@components";
import { IDropdownItem } from "../../types";
import { Link } from "react-router";

export function DropdownItem({ label, Icon, link, Component }: IDropdownItem) {
  const Wrapper = link ? Link : "div";
  return (
    <li className={"cursor-pointer hover:bg-gray-light"}>
      <Wrapper to={link || ""} className="flex gap-2 items-center p-2">
        {Icon && <Icon size="20px" />}
        {Component || <Text>{label}</Text>}
      </Wrapper>
    </li>
  );
}
