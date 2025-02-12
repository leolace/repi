if (!process.env.PUBLIC_API_ENDPOINT) throw new Error("SERVER_URL env not set.");

export type ClientType<T> = Response & { data: T };

export const client = async <T>(
  path: string,
  { headers, ...options }: RequestInit = {}
): Promise<ClientType<T | ErrorResponseData>> => {
    
  const request = await fetch(process.env.PUBLIC_API_ENDPOINT! + path, {
    method: "GET",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    ...options
  });

  const data: T = await request.json();
  const response: ClientType<T> = Object.assign(request, { data });

  return response;
};

export const authClient = async <T>(
  path: string,
  {
    sessionToken,
    ...options
  }: RequestInit & { sessionToken: string }
): Promise<ClientType<T | ErrorResponseData>> => {
  const defaultHeaders: Record<string, string> = Object.assign({ ...options.headers }, { "Content-Type": "application/json" });

  defaultHeaders.authorization = sessionToken;
  const request = await fetch(process.env.PUBLIC_API_ENDPOINT! + path, {
    method: "GET",
    headers: defaultHeaders,
    ...options
  });

  const data: T = await request.json();
  const response: ClientType<T> = Object.assign(request, { data });

  return response;
};
