import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../state";
import { GROUP_ROUTE } from "../utils";
import { Button, Header, PageContainer } from "../styles";

export function OverviewPage() {
  const nickname = useRecoilValue(nicknameState);
  console.log(nickname);
  const navigate = useNavigate();

  const header = "How it Works";
  const step1 = "Create a new call group or join an existing one using a room code";
  const step2 = "Choose the times you're available to call your friends, then share the room code with them";
  const step3 = "After everyone has finished, everyone receives a email with the best time to call each other!"
  const submitText = "Get Started";

  const onSubmit = () => {
    navigate(GROUP_ROUTE);
  }

  return (
    <PageContainer>
      <Header>{header}</Header>
      <ul className="fa-ul">
        <li><span className="fa-li"><i className="fa-solid fa-user-group"></i></span>{step1}</li>
        <li><span className="fa-li"><i className="fa-solid fa-calendar-days"></i></span>{step2}</li>
        <li><span className="fa-li"><i className="fa-solid fa-phone"></i></span>{step3}</li>
      </ul>
      <Button $primary onClick={onSubmit}>{submitText}</Button>
    </PageContainer>
  );
}
