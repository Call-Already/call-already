import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HOME_ROUTE, WELCOME_ROUTE } from "../utils";

interface NavHomeProps extends React.HTMLAttributes<HTMLElement> {
}

const NavButton = styled.button`
  position: absolute;
  top: 1em;
  left: 1em;
  background: none;
  border: none;
  border-radius: 2em;
`;

export const NavHome: React.FC<NavHomeProps> = () => {
  const navigate = useNavigate();

  return (
    <NavButton onClick={() => {navigate(HOME_ROUTE)}}>
      <i className="fa-solid fa-home fa-xl" style={{color: "#dddddd"}}></i>
    </NavButton>
  )
}
