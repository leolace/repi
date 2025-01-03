interface ErrorResponseData {
  error: string;
  path: string;
  status: number;
}

interface ErrorResponse {
  data: ErrorResponseData;
}

interface Window {
  ENV: Record<string, string | undefined>;
}
