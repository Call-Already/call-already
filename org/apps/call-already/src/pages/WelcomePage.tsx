import React from "react";
import { useSetRecoilState } from "recoil";
import { nicknameState } from "../state";
import mixpanel from 'mixpanel-browser';

export function WelcomePage() {
  const setNickNameState = useSetRecoilState(nicknameState);

  const onChange = () => {
    setNickNameState("Matty");
    mixpanel.track("Flow started");
  };

  return (
    <>
      <h1>This is the Welcome page</h1>
      <button onClick={onChange}>Set nickname</button>
    </>
  );
}
