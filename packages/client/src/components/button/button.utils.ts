export const buttonTypes: Record<Types, string> = {
  primary:
    "bg-primary text-white ring-1 ring-primary hover:bg-primary-dark disabled:hover:bg-primary",
  secondary:
    "text-carbon ring-1 ring-gray bg-white disabled:hover:bg-secondary",
  tertiary:
    "text-carbon ring-0 ring-gray-light bg-transparent hover:bg-gray-light focus:shadow-none disabled:ring-1 disabled:hover:bg-transparent",
  danger:
    "text-white bg-red-500 ring-1 ring-red-500 hover:bg-danger-dark disabled:hover:bg-danger",
  dangerOutline:
    "text-red-500 ring-1 ring-red-500 hover:bg-danger-dark disabled:hover:bg-danger",
};

export const buttonBaseStyles =
  "px-3 py-1 outline-0 rounded font-semibold focus:shadow-pressed cursor-pointer";

export const disabledStyle = "disabled:opacity-75 disabled:cursor-not-allowed";

export const isLoadingStyle = (loading?: boolean) =>
  loading ? "opacity-75 cursor-wait" : "";
