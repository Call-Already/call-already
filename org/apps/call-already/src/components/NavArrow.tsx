import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../styles";

interface NavArrowProps extends React.HTMLAttributes<HTMLElement> {
  prevRoute: string;
}

const NavButton = styled.button`
  position: absolute;
  top: 1em;
  left: 1em;
  background: none;
  border: none;
  border-radius: 2em;
`;

export const NavArrow: React.FC<NavArrowProps> = ({ prevRoute }) => {
  const navigate = useNavigate();

  return (
    <NavButton
      onClick={() => {
        navigate(prevRoute);
      }}
    >
      <i
        className="fa-solid fa-arrow-left fa-xl"
        style={{ color: theme.primary.nav }}
      ></i>
    </NavButton>
  );
};
