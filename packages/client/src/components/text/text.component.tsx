import React from "react";
import { TextProps } from "./text.types";
import { mapTextSizes } from "@utils";

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

	const textWeights: Record<Weights, string> = {
		regular: "font-normal",
		medium: "font-medium",
		semibold: "font-semibold",
		bold: "font-bold"
	};
	
  return (
    <TextComponent className={`${mapTextSizes[size]} ${textWeights[weight]} ${className}`} {...props}>
      {children}
    </TextComponent>
  );
};
