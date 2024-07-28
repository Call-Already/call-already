import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../state";
import { GROUP_ROUTE } from "../utils";
import { Button, Header, IconList, PageContainer, SubHeader } from "../styles";
import { useIsMobile } from "../utils";

export function OverviewPage() {
  const nickname = useRecoilValue(nicknameState);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const header = "How it Works";
  const step1 = "Setup a call with your friends";
  const details1 = "Create a new group and share the code with your friends. Or join an existing group using a code."
  const step2 = "Share your timezone and your availability";
  const details2 = "Pick one or a few days your group agrees upon. Provide as much availability as you can to find the best times.";
  const step3 =   "CallAlready.com picks a time for you!";
  const details3 = "After the group has finished responding to the survey, everyone receives a email with their best local time to join the call.";
  const submitText = "Start a Call";
  const onSubmit = () => {
    navigate(GROUP_ROUTE);
  }
  return (
    <PageContainer $isMobile={isMobile}>
      <Header>{header}</Header>
      <IconList $isMobile={isMobile}>
        <ol className="fa-ul">
          <li>
            <span className="fa-li">
              <i className="fa-solid fa-user-group fa-2x"></i>
            </span>
            <div>
              <h3>{step1}</h3>
              <p>{details1}</p>
            </div>
          </li>
          <li>
            <span className="fa-li">
              <i className="fa-solid fa-calendar-days fa-2x"></i>
            </span>
            <div>
              <h3>{step2}</h3>
              <p>{details2}</p>
            </div>
          </li>
          <li>
            <span className="fa-li">
              <i className="fa-solid fa-phone fa-2x"></i>
            </span>
            <div>
              <h3>{step3}</h3>
              <p>{details3}</p>
            </div>
          </li>
        </ol>
      </IconList>
      <Button $primary onClick={onSubmit}>{submitText}</Button>
    </PageContainer>
  );
}
