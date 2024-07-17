import React from "react";
import { useSetRecoilState } from "recoil";
import { nicknameState } from "../state";

export function WelcomePage() {
  const setNickNameState = useSetRecoilState(nicknameState);

  const onChange = () => {
    setNickNameState("Matty");
  };

  return (
    <>
      <h1>This is the Welcome page</h1>
      <button onClick={onChange}>Set nickname</button>
    </>
  );
}
