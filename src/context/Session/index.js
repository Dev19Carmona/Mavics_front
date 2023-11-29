import { createContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";

export const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [localSession, setLocalSession] = useState();
  const [check, setCheck] = useState(false)
  useEffect(() => {
    const handleCheck = () => {
      setCheck(!check)
    }
    
    const localSessionToken = localStorage.getItem("session");
    const isSession = JSON.parse(localStorage.getItem("isSession"));
    let sessionManagment = { expireSession: false };
    sessionManagment.isSession = isSession;
    const localSessionUser = jwt.decode(localSessionToken);
    const expireDateSessionUnix = localSessionUser?.exp;
    const nowInSeconds = Math.floor(Date.now() / 1000);
    if (localSessionToken !== null) {
      sessionManagment.localSessionUser = localSessionUser;
    }
    if (expireDateSessionUnix < nowInSeconds)
      sessionManagment.expireSession = true;
    else false;

    setLocalSession(sessionManagment);
    const sessionCheckInterval = setInterval(handleCheck, 300000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(sessionCheckInterval);
    };
  }, [check]);
  return (
    <LoginContext.Provider value={{ localSession }}>
      {children}
    </LoginContext.Provider>
  );
};
