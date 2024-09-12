import React, { createContext, useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../state";

interface AuthorizationProps extends React.HTMLAttributes<HTMLElement> {
}

export const AuthContext = createContext("");

export const Authorization: React.FC<AuthorizationProps> = ({children}) => {
  const [token, setToken] = useState("");
  const authToken = useRecoilValue(authTokenState);

  useEffect(() => {
    setToken(authToken);
  }, [authToken]);

  return (
    <AuthContext.Provider value={token}>
      {children}
    </AuthContext.Provider>
  );
};
