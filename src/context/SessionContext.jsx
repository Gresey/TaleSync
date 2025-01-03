import React, { createContext, useState, useContext } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <SessionContext.Provider value={{ token, setToken }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
