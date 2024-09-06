import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Page, Progress } from "../components";
import { CodeClipboard } from "../components/CodeClipboard";
import { groupCodeState } from "../state";
import { Button, CardContainer, Header, InfoText, Mascot, PageContainer } from "../styles";
import { emitAnalytic, GROUP_ROUTE, MASCOTS, useIsMobile } from "../utils";

export function ConfirmationPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const groupCode = useRecoilValue(groupCodeState);

  const header = "Responses confirmed"
  const introText =
    "Thank you! Your responses have been confirmed. Your times will be matched with your friends' and we'll let you the best time to call each other. A summary will be sent to your email.";
  const groupCodeReminder = "Remember to share the group code with your friends!";
  const submitText = "Make another call";

  const onReturn = () => {
    emitAnalytic("Confirmed times");
    navigate(GROUP_ROUTE);
  };

  return (
    <Page progress={6} iconClassNames={"fa-solid fa-circle-check"} headerText={header} mascot={MASCOTS.Happy}>
      <CardContainer $isMobile={isMobile}>
        <InfoText>{introText}</InfoText>
        <InfoText>{groupCodeReminder}</InfoText>
        <CodeClipboard groupCode={groupCode} />
        <Button $primary onClick={onReturn}>{submitText}</Button>
      </CardContainer>
    </Page>
  );
}
