import React from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../components";
import {
  Button,
  CardContainer,
  Group,
  InfoText,
} from "../styles";
import {
  emitAnalytic,
  GROUP_ROUTE,
  OVERVIEW_ROUTE,
  useIsMobile,
} from "../utils";
import { MASCOTS } from "../utils/mascots";

export function WelcomePage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const header = "Welcome to CallAlready.com";
  const introText =
    "CallAlready.com is a free website for helping you reconnect with your friends around the world.";
  const introText2 =
    "Friends are sometimes on different schedules and in different timezones. We remove the pressure of connecting by picking the best time for you to call!";
  const introText3 =
    "Using the site is easy and only takes a minute. Learn more or click to get started!";
  const submitText = "Learn More";
  const submitText2 = "Get Started";

  const onLearnMore = () => {
    emitAnalytic("Flow started");
    navigate(OVERVIEW_ROUTE);
  };

  const onGetStarted = () => {
    emitAnalytic("Flow started");
    navigate(GROUP_ROUTE);
  };

  return (
    <Page progress={0} iconClassNames="fa-solid fa-earth-americas" headerText={header} mascot={MASCOTS.Happy}>
      <CardContainer $isMobile={isMobile}>
        <InfoText>{introText}</InfoText>
        <InfoText>{introText2}</InfoText>
        <InfoText>{introText3}</InfoText>
        <Button onClick={onLearnMore}>{submitText}</Button>
        <Button $primary onClick={onGetStarted}>
          {submitText2}
        </Button>
      </CardContainer>
    </Page>
  );
}
