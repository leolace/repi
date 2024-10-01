"use client";
import { getUser } from "@actions/session";
import React from "react";
import useSWR from "swr";

interface ISessionContext {
  isAuth: boolean;
}

const defaultSessionContext: ISessionContext = {
  isAuth: false,
};

export const SessionContext = React.createContext<ISessionContext>(
  defaultSessionContext
);

export const SessionContextContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuth, setIsAuth] = React.useState(false);

  return (
    <SessionContext.Provider value={{ isAuth }}>
      {children}
    </SessionContext.Provider>
  );
};
