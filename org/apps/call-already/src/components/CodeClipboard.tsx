import {
  Header,
  ProgressBar,
  Clipboard,
  ProgressStep,
  Button,
  Group,
  InviteContainer,
} from "../styles";
import { useIsMobile } from "../utils";

interface CodeClipboardProps extends React.HTMLAttributes<HTMLElement> {
  groupCode: string;
}

export const CodeClipboard: React.FC<CodeClipboardProps> = ({ groupCode }) => {
  const isMobile = useIsMobile();

  const copyText = "Copy code";
  const copyInvite = "Copy invite";

  const inviteText = `I'm inviting you to a call on callalready.com!\nGroup code: ${groupCode}\nJoin my group, enter your timezone and availability, and receive the best time for us to reconnect via Email or WhatsApp.`;

  const onCopyCode = () => {
    navigator.clipboard.writeText(groupCode);
  };

  const onCopyInvite = () => {
    navigator.clipboard.writeText(inviteText);
  };

  return (
    <>
      <Clipboard id="clipboard" style={{marginBottom: "0.5em"}}>{groupCode}</Clipboard>
      <InviteContainer $isMobile={isMobile}>
        {inviteText}
      </InviteContainer>
      <Group $isMobile={isMobile}>
        <Button onClick={onCopyCode}>
          <i className="fa-solid fa-clipboard"></i>
          {"   " + copyText}
        </Button>
        <Button onClick={onCopyInvite}>
          <i className="fa-solid fa-envelope"></i>
          {"   " + copyInvite}
        </Button>
      </Group>
    </>
  );
};
