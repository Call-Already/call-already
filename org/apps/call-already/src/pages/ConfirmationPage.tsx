import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Header, InfoText, Mascot, PageContainer } from "../styles";
import { emitAnalytic, GROUP_ROUTE, useIsMobile } from "../utils";

export function ConfirmationPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const introText = "Thank you! Your responses have will be matched with your friends and we’ll let you the best time to call each other to your email.";
  const submitText = "Make another call";

  const onReturn = () => {
    emitAnalytic("Confirmed times");
    navigate(GROUP_ROUTE);
  };

  return (
    <PageContainer $isMobile={isMobile}>
      <Header>{"Your times have been confirmed!"}</Header>
      <Mascot src={"/mascot_call.png"} alt="logo" />
      <InfoText>{introText}</InfoText>
      <Button onClick={onReturn}>{submitText}</Button>
    </PageContainer>
  );
}
