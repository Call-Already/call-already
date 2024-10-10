import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../styles";
import { HOME_ROUTE, SETTINGS_ROUTE } from "../utils";

interface NavSettingsProps extends React.HTMLAttributes<HTMLElement> {}

const NavButton = styled.button`
  position: absolute;
  top: 1em;
  right: 1em;
  background: none;
  border: none;
  border-radius: 2em;
`;

export const NavSettings: React.FC<NavSettingsProps> = () => {
  const navigate = useNavigate();

  return (
    <NavButton
      onClick={() => {
        navigate(SETTINGS_ROUTE);
      }}
    >
      <i className="fa-solid fa-gear fa-xl" style={{ color: theme.primary.nav }}></i>
    </NavButton>
  );
};
