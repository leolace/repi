import { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
	tag?: Tags;
	size?: Sizes;
	weight?: Weights;
};

export interface CardSubtitleProps extends HTMLAttributes<HTMLParagraphElement> {};
