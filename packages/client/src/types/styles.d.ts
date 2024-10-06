enum TagsEnum {
  p,
  span,
  div,
  h1,
  h2,
  h3,
}

enum SizesEnum {
  sm,
  md,
  base,
  lg,
  xl,
  "2xl",
}

enum WeightEnum {
  regular,
	medium,
  semibold,
  bold,
}

type Sizes = keyof typeof SizesEnum;
type Tags = keyof typeof TagsEnum;
type Weights = keyof typeof WeightEnum;
