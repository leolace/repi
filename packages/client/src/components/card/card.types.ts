import { HTMLAttributes } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement>;

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
	tag?: Tags;
	size?: Sizes;
	weight?: Weights;
};

export type CardSubtitleProps = HTMLAttributes<HTMLParagraphElement>;
