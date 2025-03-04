import { createContext, PropsWithChildren, useContext } from "react";
import { Spinner } from "@components/spinner";
import { ISessionContext } from "./types";
import { useSelfUserQuery } from "./queries";
import { useSessionToken } from "@hooks/session-token";

const SessionContext = createContext<ISessionContext>({} as ISessionContext);

export function SessionProvider({ children }: PropsWithChildren) {
  const { sessionToken, setSessionToken } = useSessionToken();
  const {
    data: user,
    isFetching: isFetchingUser,
    refetch: refetchUser,
  } = useSelfUserQuery(sessionToken);

  function logout() {
    setSessionToken("");
    window.location.assign("/inicio");
  }

  const value = {
    user,
    logout,
    refetchUser,
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
