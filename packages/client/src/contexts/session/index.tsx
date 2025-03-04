import { createContext, PropsWithChildren, useContext } from "react";
import { Spinner } from "@components/spinner";
import { ISessionContext } from "./types";
import { defaultSessionContext } from "./utils";
import { useSelfUserQuery } from "./queries";
import { useSessionToken } from "@hooks/session-token";

const SessionContext = createContext<ISessionContext>(defaultSessionContext);

export function SessionProvider({ children }: PropsWithChildren) {
  const { sessionToken, setSessionToken } = useSessionToken();
  const { data: user, isFetching: isFetchingUser } =
    useSelfUserQuery(sessionToken);

  function logout() {
    setSessionToken("");
    window.location.assign("/inicio");
  }

  const value = {
    user,
    logout,
  };

  return (
    <SessionContext.Provider value={value}>
      {isFetchingUser ? <Spinner /> : children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const session = useContext(SessionContext);

  return session;
}
