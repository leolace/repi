import React from "react";
import { TextProps } from "./text.types";

export const Text = ({
  children,
  tag = "p",
  size = "md",
	weight = "regular",
  className = "",
  ...props
}: TextProps) => {
  const TextComponent = ({ ...componentProps }: Omit<TextProps, "tag">) =>
    React.createElement(tag.toString(), { ...componentProps });

  const textSizes: Record<Sizes, string> = {
    sm: "",
		base: "text-base",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl font-semibold",
    "2xl": "text-5xl font-semibold",
  };

	const textWeights: Record<Weights, string> = {
		regular: "font-normal",
		medium: "font-medium",
		semibold: "font-semibold",
		bold: "font-bold"
	};

  return (
    <TextComponent className={`${className} ${textSizes[size]} ${textWeights[weight]}`} {...props}>
      {children}
    </TextComponent>
  );
};
