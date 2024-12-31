if (!process.env.NEXT_PUBLIC_SERVER_URL)
  throw new Error("SERVER_URL env not set.");

type ClientType<T> = Response & { data: T };

export const client = async <T>(
  path: string,
  { headers, ...options }: RequestInit = {}
): Promise<ClientType<T | ErrorResponse>> => {
  const defaultHeaders: Record<string, any> = {
    ...headers,
    "Content-Type": "application/json",
  };

  const request = await fetch(process.env.NEXT_PUBLIC_SERVER_URL! + path, {
    method: "GET",
    headers: defaultHeaders,
    ...options,
  });

  const data: T | ErrorResponse = await request.json();

  return { ...request, statusText: request.statusText, data, ok: request.ok };
};

export const authClient = async <T>(
  path: string,
  {
    headers,
    sessionToken,
    ...options
  }: RequestInit & { sessionToken: string }
): Promise<ClientType<T | ErrorResponse>> => {
  const defaultHeaders: Record<string, any> = {
    ...headers,
    "Content-Type": "application/json",
  };

  defaultHeaders.authorization = sessionToken;
  const request = await fetch(process.env.NEXT_PUBLIC_SERVER_URL! + path, {
    method: "GET",
    headers: defaultHeaders,
    ...options,
  });

  const data: T | ErrorResponse = await request.json();

  return { ...request, statusText: request.statusText, status: request.status, data, ok: request.ok };
};
