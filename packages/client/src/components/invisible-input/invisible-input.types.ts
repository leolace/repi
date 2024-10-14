import { HTMLProps } from "react";

export interface InvisibleInputProps extends Omit<HTMLProps<HTMLInputElement>, "size"> {
	size?: Sizes;
}
