import { useCookies } from "react-cookie";

export function useSessionToken() {
  const [cookies, setCookies] = useCookies(["session-token"]);
  const setSessionToken = (token: string) =>
    setCookies("session-token", token, { path: "/" });
  const sessionToken: string = cookies["session-token"];

  return { setSessionToken, sessionToken };
}
