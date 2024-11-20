import { HTMLProps } from "react";

export interface InputProps extends Omit<HTMLProps<HTMLInputElement>, "size"> {
	size?: Sizes;
}
