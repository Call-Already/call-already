import React from "react";
import { StrictMode } from "react";
import { CallAlreadyRouter } from "./CallAlreadyRouter";
import { RecoilRoot } from "recoil";
import { initAnalytics } from "../utils/metrics";
import "../styles/global.css";

export function App() {
  initAnalytics();

  return (
    <StrictMode>
      <RecoilRoot>
        <CallAlreadyRouter />
      </RecoilRoot>
    </StrictMode>
  );
}

export default App;
