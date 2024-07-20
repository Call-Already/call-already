import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../state";
import { GROUP_ROUTE } from "../utils";

export function OverviewPage() {
  const nickname = useRecoilValue(nicknameState);
  console.log(nickname);
  const navigate = useNavigate();

  const header = "How it Works";
  const step1 = "Create a new call group or join an existing one using a room code";
  const step2 = "Share the room with your friends and choose the times you're available to call them";
  const step3 = "After everyone has finished, everyone receives a email with the best time to call each other!"
  const submitText = "Get Started";

  const onSubmit = () => {
    navigate(GROUP_ROUTE);
  }

  return (
    <>
      <h1>{header}</h1>
      <ol>
        <li>{step1}</li>
        <li>{step2}</li>
        <li>{step3}</li>
      </ol>
      <button onClick={onSubmit}>{submitText}</button>
    </>
  );
}
