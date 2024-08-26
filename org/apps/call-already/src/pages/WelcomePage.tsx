import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { nicknameState } from "../state";
import { Button, ButtonGroup, Header, InfoText, Mascot, PageContainer } from "../styles";
import { emitAnalytic, GROUP_ROUTE, OVERVIEW_ROUTE, useIsMobile } from "../utils";

export function WelcomePage() {
  const setNickNameState = useSetRecoilState(nicknameState);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const introText = "CallAlready.com is a free website for helping you reconnect with your friends around the world.";
  const introText2 = "Friends are sometimes on different schedules and in different timezones. We remove the pressure of connecting by picking the best time for you to call!"
  const introText3 = "Using the site is easy and only takes a minute. Learn more or click to get started!"
  const submitText = "Learn More";
  const submitText2 = "Get Started";

  const onLearnMore = () => {
    setNickNameState("Matty");
    emitAnalytic("Flow started");
    navigate(OVERVIEW_ROUTE);
  };

  const onGetStarted = () => {
    setNickNameState("Matty");
    emitAnalytic("Flow started");
    navigate(GROUP_ROUTE);
  };

  return (
    <PageContainer $isMobile={isMobile}>
      <Header>{"Welcome!"}</Header>
      <Mascot src={"/happy.png"} alt="logo" />
      <InfoText>{introText}</InfoText>
      <InfoText>{introText2}</InfoText>
      <InfoText>{introText3}</InfoText>
      <ButtonGroup>
        <Button onClick={onLearnMore}>{submitText}</Button>
        <Button $primary onClick={onGetStarted}>{submitText2}</Button>
      </ButtonGroup>
    </PageContainer>
  );
}
