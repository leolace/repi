import { HTMLAttributes } from "react";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  tag?: Tags;
	size?: Sizes;
	weight?: Weights;
}
