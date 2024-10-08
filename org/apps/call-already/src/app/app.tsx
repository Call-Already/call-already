import React from "react";
import { StrictMode } from "react";
import { CallAlreadyRouter } from "./CallAlreadyRouter";
import { RecoilRoot } from "recoil";
import { initAnalytics } from "../utils/metrics";
import "../styles/global.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { Authorization } from "../auth/Authorization";

const theme = createTheme({
  /** Your theme override here */
});

export function App() {
  initAnalytics();

  return (
    <StrictMode>
      <RecoilRoot>
        <MantineProvider theme={theme} cssVariablesSelector="html">
          <Authorization>
            <CallAlreadyRouter />
          </Authorization>
        </MantineProvider>
      </RecoilRoot>
    </StrictMode>
  );
}

export default App;
