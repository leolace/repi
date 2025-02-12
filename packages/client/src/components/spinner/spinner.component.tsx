import { SpinnerProps } from "./types";

export const Spinner = ({ color = "primary" }: SpinnerProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className={`max-w-8 max-h-8 min-w-4 min-h-4 border-2 border-${color} border-t-transparent border-solid rounded-full animate-spin`}></div>
    </div>
  );
};
