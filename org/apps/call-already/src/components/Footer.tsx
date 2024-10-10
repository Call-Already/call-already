import { Group, CloseButton } from "@mantine/core";
import {
  FooterContainer,
  FooterTextArea,
  InfoText,
  Matty,
  theme,
} from "../styles";
import { useIsMobile } from "../utils";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  onClose: () => void;
}

export type MessageObject = {
  [key: string]: any;
};

export const Footer: React.FC<FooterProps> = ({ onClose }) => {
  const isMobile = useIsMobile();

  const aboutMeText = "Hi, I'm Matty Phillips! ";
  const websiteText =
    "I made Call Already to reconnect with my friends I met while traveling the world. I hope it helps you to do the same! Visit my website to learn more about me. Please consider donating so we can keep this site running.";

  return (
    <FooterContainer>
      <Matty src="/public/matty.png" />
      <FooterTextArea $isMobile={isMobile}>
        <InfoText>
          <strong>{aboutMeText}</strong>
          {websiteText}
        </InfoText>
        <Group style={{ display: "flex", justifyContent: "center" }}>
          <InfoText>
            <a style={{color: "blue"}} href="https://mattyphillips.com">mattyphillips.com</a>
          </InfoText>
          <InfoText>
            <a style={{color: "blue"}} href="https://www.paypal.com/donate/?business=H6PPX9THPVU6Y&no_recurring=0&currency_code=USD">
              PayPal
            </a>
          </InfoText>
        </Group>
      </FooterTextArea>
      <CloseButton
        style={{ alignSelf: "center", color: `${theme.footer.border}` }}
        mr={-6}
        onClick={() => onClose()}
      />
    </FooterContainer>
  );
};
