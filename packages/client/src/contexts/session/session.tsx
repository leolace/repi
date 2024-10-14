"use client";
import { getUser } from "@actions/session";
import React from "react";
import useSWR from "swr";

interface ISessionContext {
  isAuth: boolean;
	logoHovered: boolean;
	setLogoHovered: React.Dispatch<boolean>;
}

const defaultSessionContext: ISessionContext = {
  isAuth: false,
	logoHovered: false,
	setLogoHovered: () => {}
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
	const [logoHovered, setLogoHovered] = React.useState(false);

  return (
    <SessionContext.Provider value={{ isAuth, logoHovered, setLogoHovered }}>
      {children}
    </SessionContext.Provider>
  );
};
