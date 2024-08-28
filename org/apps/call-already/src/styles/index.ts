import styled from "styled-components";

export const palette = {
  primary: {
    200: "#DDDDDD", // Grey
    300: "#000000", // Black
    400: "#FFFFFF", // White
    500: "#0026ff", // Blue
    600: "#001aad", // Darker blue
    700: "#28ad02", // Green
    800: "#1f8a00", // Darker green
  },
};

export const theme = {
  primary: {
    text: palette.primary[400],
    background: palette.primary[700],
    boxShadow: palette.primary[800],
    hover: palette.primary[800],
    active: palette.primary[700],
  },
  secondary: {
    text: palette.primary[400],
    background: palette.primary[500],
    boxShadow: palette.primary[600],
    hover: palette.primary[600],
    active: palette.primary[500],
  },
  time: {
    text: palette.primary[300],
    background: palette.primary[200],
    boxShadow: palette.primary[300],
    hover: palette.primary[800],
    active: palette.primary[700],
  },
};

export const PageContainer = styled.div<{ $isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
  width: ${(props) => (props.$isMobile ? "280px" : "880px")};
  background: ${palette.primary[400]};
  border-radius: 1em;
  padding: 1em 3em 1em 3em;
`;

export const Mascot = styled.img`
  width: 15%;
  height: 15%;
`;

export const IconList = styled.div<{ $isMobile?: boolean }>`
  display: flex;
  width: ${(props) => (props.$isMobile ? "300px" : "880px")};
`;

export const Header = styled.h1`
  align-text: center;
`;

export const SubHeader = styled.h2`
  align-text: center;
  margin-top: 0;
  margin-bottom: 0;
`;

export const InfoText = styled.p`
  text-align: center;
  margin-top: 0;
  margin-bottom: 1em;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Button = styled.button<{ $primary?: boolean }>`
  background: ${(props) =>
    props.$primary ? theme.primary.background : theme.secondary.background};
  color: ${theme.primary.text};
  box-shadow: 3px 3px
    ${(props) =>
      props.$primary ? theme.primary.boxShadow : theme.secondary.boxShadow};

  width: 10em;
  height: 2.5em;

  font-size: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  border: none;

  &:hover,
  &:focus {
    background: ${(props) =>
      props.$primary ? theme.primary.hover : theme.secondary.hover};
  }
  &:active {
    background: ${(props) =>
      props.$primary ? theme.primary.active : theme.secondary.active};
  }
`;

export const RoomCodeInput = styled.input`
  padding: 0.25em;
  border-radius: 0.5em;
  font-size: 1.5em;
  size: 6;
  text-transform: uppercase;
  text-align: center;
`;

export const Clipboard = styled.div`
  align-text: left;
  font-size: 2em;
  border-radius: 0.5em;
`;

export const FormLabel = styled.label`
  align-text: left;
  font-size: 1em;
`;

export const TextInput = styled.input`
  padding: 0.25em;
  align-text: left;
  border-radius: 0.5em;
  font-size: 1em;
  size: 16;
  text-align: left;
`;
