import { CompleteSelfUser } from "common";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

interface ISessionContext {
  user: CompleteSelfUser | null;
  setUser: React.Dispatch<React.SetStateAction<null | CompleteSelfUser>>;
  token: string | undefined;
  setToken: (token: string) => void;
}

const defaultValue: ISessionContext = {
  user: null,
  setUser: () => {},
  token: undefined,
  setToken: () => {},
};

const SessionContext = React.createContext<ISessionContext>(defaultValue);

export function SessionProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<CompleteSelfUser | null>(null);

  const [cookies, setCookies] = useCookies(["token"]);
  const token = cookies.token;
  const setToken = (token: string) => setCookies("token", token, { path: "/" });

  const value = { user, setUser, token, setToken };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const session = React.useContext(SessionContext);

  return session;
}
