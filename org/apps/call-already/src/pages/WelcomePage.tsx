import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { nicknameState } from "../state";
import { emitAnalytic, OVERVIEW_ROUTE } from "../utils";

export function WelcomePage() {
  const setNickNameState = useSetRecoilState(nicknameState);
  const navigate = useNavigate();

  const onClick = () => {
    setNickNameState("Matty");
    emitAnalytic("Flow started");
    navigate(OVERVIEW_ROUTE);
  };

  return (
    <>
      <h1>This is the Welcome page</h1>
      <button onClick={onClick}>Set nickname</button>
    </>
  );
}
