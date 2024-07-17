import React from "react";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../state";

export function OverviewPage() {
  const nickname = useRecoilValue(nicknameState);
  console.log(nickname);

  return (
    <>
      <h1>This is the Overview page, {nickname}</h1>
    </>
  );
}
