
import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AuthContext } from "../auth";
import { authTokenState } from "../state";
import { LOGIN_ROUTE } from "../utils";

interface Props extends React.HTMLAttributes<HTMLElement> {}

export const ProtectedPage: React.FC<Props> = ({ children }) => {

  var token = useContext(AuthContext);

  if (!token) {
    token = useRecoilValue(authTokenState);
  }

  if (token) {
    return (
      <>
        {children}
      </>
    );
  } else {
    return <Navigate to={LOGIN_ROUTE} />
  }
}