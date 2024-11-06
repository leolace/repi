enum HtmlTagsEnum {
  P = "p",
  SPAN = "span",
  DIV = "div",
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
}

enum SizesEnum {
  SM = "sm",
  MD = "md",
  BASE = "base",
  LG = "lg",
  XL = "xl",
  "2XL" = "2xl",
	"3XL" = "3xl",
}

enum WeightsEnum {
  REGULAR = "regular",
	MEDIUM = "medium",
  SEMIBOLD = "semibold",
  BOLD = "bold",
}

enum TypesEnum {
	PRIMARY = "primary",
	SECONDARY = "secondary",
	TERTIARY = "tertiary",
}

type Sizes = `${SizesEnum}`;
type Tags = `${HtmlTagsEnum}`;
type Weights = `${WeightsEnum}`;
type Types = `${TypesEnum}`;
