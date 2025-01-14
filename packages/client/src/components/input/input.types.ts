export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
	size?: Sizes;
  label: string;
}
