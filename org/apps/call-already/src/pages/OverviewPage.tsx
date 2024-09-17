import React from "react";
import { useNavigate } from "react-router-dom";
import { GROUP_ROUTE, HOME_ROUTE, MASCOTS } from "../utils";
import {
  Button,
  CardContainer,
  Header,
  IconList,
  Mascot,
  PageContainer,
} from "../styles";
import { useIsMobile } from "../utils";
import { Page } from "../components";

export function OverviewPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const header = "How it Works";
  const step1 = "Set up a friend group";
  const details1 =
    "Create a new group and share the code with friends, or join an existing group using a code.";
  const step2 = "Share your preferences";
  const details2 =
    "Choose a few days your group agrees on and provide as much availability as possible to find the best times.";
  const step3 = "We pick a time for you!";
  const details3 =
    "Once the group completes the survey, everyone will receive an email with their optimal local time for the call.";
  const submitText = "Start a Call";
  const onSubmit = () => {
    navigate(HOME_ROUTE);
  };
  return (
    <Page
      progress={-1}
      iconClassNames={"fa-solid fa-circle-question"}
      headerText={header}
      mascot={MASCOTS.Confused}
      isLoading={false}
    >
      <CardContainer $isMobile={isMobile}>
        <IconList $isMobile={isMobile}>
          <ol className="fa-ul">
            <li>
              <span className="fa-li">
                <i className="fa-solid fa-user-group fa-xl"></i>
              </span>
              <div>
                <h3>{step1}</h3>
                <p>{details1}</p>
              </div>
            </li>
            <li>
              <span className="fa-li">
                <i className="fa-solid fa-calendar-days fa-xl"></i>
              </span>
              <div>
                <h3>{step2}</h3>
                <p>{details2}</p>
              </div>
            </li>
            <li>
              <span className="fa-li">
                <i className="fa-solid fa-phone fa-xl"></i>
              </span>
              <div>
                <h3>{step3}</h3>
                <p>{details3}</p>
              </div>
            </li>
          </ol>
        </IconList>
        <Button $primary onClick={onSubmit}>
          {submitText}
        </Button>
      </CardContainer>
    </Page>
  );
}
