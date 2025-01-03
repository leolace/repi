export const isErrorResponseData = (
  value: unknown
): value is ErrorResponseData => {
  return (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    "path" in value &&
    "status" in value
  );
};

export const isErrorResponse = (value: unknown): value is ErrorResponse => {
  return (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    isErrorResponseData((value as ErrorResponse).data)
  );
};
