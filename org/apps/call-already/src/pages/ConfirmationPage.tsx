import React from "react";
import { useNavigate } from "react-router-dom";
import { Page, Progress } from "../components";
import { Button, CardContainer, Header, InfoText, Mascot, PageContainer } from "../styles";
import { emitAnalytic, GROUP_ROUTE, MASCOTS, useIsMobile } from "../utils";

export function ConfirmationPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const header = "Responses confirmed"
  const introText =
    "Thank you! Your responses have been confirmed. Your times will be matched with your friends' and we'll let you the best time to call each other. A summary will be sent to your email.";
  const submitText = "Make another call";

  const onReturn = () => {
    emitAnalytic("Confirmed times");
    navigate(GROUP_ROUTE);
  };

  return (
    <Page progress={6} iconClassNames={"fa-solid fa-circle-check"} headerText={header} mascot={MASCOTS.Happy}>
      <CardContainer $isMobile={isMobile}>
        <InfoText>{introText}</InfoText>
        <Button onClick={onReturn}>{submitText}</Button>
      </CardContainer>
    </Page>
  );
}
