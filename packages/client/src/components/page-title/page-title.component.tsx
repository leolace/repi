import { PageTitleProps } from "./page-title.types";
import { Text } from "@components";

export const PageTitle = ({
  title,
  subtitle,
  subtitleSize = "md",
  titleSize = "xl"
}: PageTitleProps) => {

  return (
    <div>
      <Text tag="h1" size={titleSize} weight="semibold">
        {title}
      </Text>
      {subtitle && <Text size={subtitleSize}>{subtitle}</Text>}
    </div>
  );
};
