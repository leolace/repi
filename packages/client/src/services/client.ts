if (!process.env.NEXT_PUBLIC_SERVER_URL)
  throw new Error("SERVER_URL env not set.");

// export const client = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
// });

// export const fetcher = (url: string) => client.get(url).then((res) => res.data);

export const client = async <T>(path: string, options?: RequestInit) => {
  const request = await fetch(process.env.NEXT_PUBLIC_SERVER_URL! + path, {
    method: "GET",
    ...options,
  });
  const data: T = await request.json();

  return { ...request, data };
};
