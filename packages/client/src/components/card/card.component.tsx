import React from "react";
import { CardProps, CardSubtitleProps, CardTitleProps } from "./card.types";
import { Text } from "@components";

export const Card = ({ children, className = "", ...props }: CardProps) => {
  return (
    <div className={`p-5 border rounded-md bg-white ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  tag = "h1",
  size = "lg",
  weight = "medium",
  className,
  ...props
}: CardTitleProps) => {
  return (
    <Text
      tag={tag}
      size={size}
      weight={weight}
      className={`${className}`}
      {...props}
    >
      {children}
    </Text>
  );
};

export const CardSubtitle = ({ className, ...props }: CardSubtitleProps) => {
  return <Text className={`${className}`} {...props}></Text>;
};
