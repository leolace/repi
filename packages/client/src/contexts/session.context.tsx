import { CompleteSelfUser } from "common";
import React, { useState } from "react";

interface ISessionContext {
  user: CompleteSelfUser | null;
  setUser: React.Dispatch<React.SetStateAction<null | CompleteSelfUser>>;
}

const defaultValue: ISessionContext = {
  user: null,
  setUser: () => {},
};

const SessionContext = React.createContext<ISessionContext>(defaultValue);

export function SessionProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<CompleteSelfUser | null>(null);

  const value = { user, setUser };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const session = React.useContext(SessionContext);

  return session;
}
