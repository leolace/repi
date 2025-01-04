type ClientType<T> = Response & { data: T | ErrorResponseData };

export function useClient() {
  async function client<T>(
    path: string,
    { headers, ...options }: RequestInit = {}
  ): Promise<ClientType<T | ErrorResponseData>> {
    const defaultHeaders: Record<string, any> = {
      ...headers,
      "Content-Type": "application/json",
    };

    const request = await fetch(window.ENV.API_ENDPOINT + path, {
      method: "GET",
      headers: defaultHeaders,
      ...options,
    });

    const data: T | ErrorResponseData = await request.json();
    const response: ClientType<T> = Object.assign(request, { data });

    return response;
  }

  return { client };
}
