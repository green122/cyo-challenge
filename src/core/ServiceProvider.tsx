import React, { useContext, useEffect, useState } from "react";
import * as auth from "../services/auth.service";

const dependencies = {
  auth,
  signed: false,
};

const DepContext = React.createContext(dependencies);

export const AuthProvider: React.FC = ({ children }) => {
  const [signed, setSignedIn] = useState(auth.isSignedIn());

  useEffect(() => {
    const subscription = auth.subscribeToAuthChange(setSignedIn);

    return auth.unsubscribeToAuthChange(subscription);
  }, []);

  return (
    <DepContext.Provider value={{ ...dependencies, signed }}>
      {children}
    </DepContext.Provider>
  );
};

export const useGetDep = (key: keyof typeof dependencies) => {
  const container = useContext(DepContext);
  return container[key];
};

export const useGetIsSignedIn = () => useGetDep("signed");
