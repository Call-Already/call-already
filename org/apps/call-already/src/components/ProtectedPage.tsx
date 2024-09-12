
import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth";
import { LOGIN_ROUTE } from "../utils";

interface Props extends React.HTMLAttributes<HTMLElement> {}

export const ProtectedPage: React.FC<Props> = ({ children }) => {

  const token = useContext(AuthContext);

  console.log(token);
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