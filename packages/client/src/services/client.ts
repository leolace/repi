if (!process.env.NEXT_PUBLIC_SERVER_URL)
  throw new Error("SERVER_URL env not set.");

// export const client = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
// });

// export const fetcher = (url: string) => client.get(url).then((res) => res.data);

type ClientType<T> = Response & { data: T };

export const client = async <T>(
  path: string,
  { headers, ...options }: RequestInit = {}
): Promise<ClientType<T | ErrorResponse>> => {
  const request = await fetch(process.env.NEXT_PUBLIC_SERVER_URL! + path, {
    method: "GET",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data: T | ErrorResponse = await request.json();

  return { ...request, statusText: request.statusText, data, ok: request.ok };
};
