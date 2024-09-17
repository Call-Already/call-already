import styled from "styled-components";

export const palette = {
  primary: {
    200: "#DDDDDD", // Grey
    300: "#333333", // Black
    400: "#FFFFFF", // White
    500: "#0026ff", // Blue
    600: "#001aad", // Darker blue
    700: "#28ad02", // Green
    800: "#1f8a00", // Darker green
    900: "##808080", // Medium
    1000: "#caedff", // Lt Blue
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
  general: {
    white: palette.primary[400],
    light: palette.primary[200],
    md: palette.primary[900],
    dark: palette.primary[300],
  },
  footer: {
    background: palette.primary[1000],
    border: palette.primary[600],
  }
};

export const PageComponent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PageContainer = styled.div<{ $isMobile?: boolean }>`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
  width: ${(props) => (props.$isMobile ? "330px" : "880px")};
  background: ${palette.primary[400]};
  border-radius: 1em;
  padding: 3em 3em 0em 3em;
  gap: 1.5em;
`;

export const PageHeader = styled.div``;

export const CardContainer = styled.div<{ $isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${palette.primary[400]};
  border-radius: 3px;
  width: ${(props) => (props.$isMobile ? "310px" : "500px")};
  border: 1px solid ${palette.primary[300]};
  box-shadow: 3px 3px ${palette.primary[300]};
  padding: 1em;
`;

export const SecondaryContainer = styled.div<{ $isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${palette.primary[400]};
  border-radius: 3px;
  width: ${(props) => (props.$isMobile ? "310px" : "500px")};
  border: 1px dotted ${palette.primary[200]};
  box-shadow: 3px 3px ${palette.primary[200]};
  padding: 1em;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5em;
  margin-top: 0.5em;
`;

export const Mascot = styled.img`
  position: relative;
  margin-bottom: 0;
  bottom: -1px;
`;

export const Matty = styled.img`
  align-self: center;
  width: 120px;
  height: 120px;
`;

export const IconList = styled.div<{ $isMobile?: boolean }>`
  display: flex;
  width: ${(props) => (props.$isMobile ? "280px" : "450px")};
`;

export const Header = styled.h1`
  text-align: center;
  margin: 0px;
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

export const InfoSubText = styled.p<{ $isMobile?: boolean }>`
  color: ${theme.general.md};
  width: ${(props) => (props.$isMobile ? "280px" : "450px")};
  text-align: center;
  margin-top: 0;
  margin-bottom: 1em;
  font-size: 0.75em;
`;

export const Group = styled.div<{ $isMobile?: boolean }>`
  display: flex;
  width: ${(props) => (props.$isMobile ? "280px" : "400px")};
  justify-content: center;
  flex-direction: row;
  gap: 1em;
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
  margin-top: 1em;
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
  color: ${theme.general.dark}
  align-text: left;
  font-size: 2em;
  margin: 0px;
  padding: 0.25em 0.5em 0.25em 0.5em;
  background: ${theme.general.light};
  border-radius: 3px;
  border: 1px dotted ${theme.general.dark};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
`;

export const FormLabel = styled.label`
  text-align: center;
  font-size: 1em;
  margin-right: 0.5em;
`;

export const TextInput = styled.input`
  padding: 0.25em;
  align-text: left;
  border-radius: 0.5em;
  font-size: 1em;
  size: 12;
`;

export const NumberInput = styled.input`
  padding: 0.25em;
  align-text: left;
  border-radius: 0.5em;
  font-size: 1em;
  size: 16;
`;

export const CheckboxInput = styled.input`
  width: 1em;
  height: 1em;
  padding: 0.25em;
  border-radius: 0.5em;
  font-size: 1em;
  margin-right: 0.5em;
`;

export const ProgressBar = styled.div`
  margin: 0 auto 1em auto;
  display: flex;
  width: fit-content;
  gap: 0.5em;
  padding: 0.25em;
  border-radius: 2em;
  border: 1px solid ${theme.general.light};
  background: ${theme.general.white};
`;

export const ProgressStep = styled.div<{ $complete?: boolean }>`
  width: 0.5em;
  height: 0.5em;
  border-radius: 2em;
  text-align: center;
  display: table-cell;
  background: ${(props) => props.$complete ? 
    theme.primary.background : theme.general.light
  };
  color: ${(props) => props.$complete ? 
    theme.primary.text :
    theme.general.dark
  };
`;

export const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
  display: flex;
  font-weight: 1000;
  justify-content: center;
  align-items: center;
`;

export const LinkText = styled.a`
  color: ${theme.general.dark};
`;

export const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  }
`;

export const FooterContainer = styled.div`
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 1em;
  gap: 0.5em;
  background-color: red;
  background:  ${theme.footer.background};
  border-top: 3px solid ${theme.footer.border};
  text-align: center;
  box-shadow: 3px 3px ${theme.general.dark};
`;

export const FooterTextArea = styled.div<{ $isMobile?: boolean }>`
  width: ${(props) => (props.$isMobile ? "340px" : "600px")};
  color: ${theme.footer.border};
`;