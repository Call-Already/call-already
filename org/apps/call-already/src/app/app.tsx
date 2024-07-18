import styled from "styled-components";
import { StrictMode } from "react";
import { CallAlreadyRouter } from "./CallAlreadyRouter";
import { RecoilRoot } from "recoil";
import mixpanel from 'mixpanel-browser';

mixpanel.init('c429828f09fb8a51b70524f0dba6e05f', {debug: true, track_pageview: true, persistence: 'localStorage'});

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StrictMode>
      <RecoilRoot>
        <CallAlreadyRouter />
      </RecoilRoot>
    </StrictMode>
  );
}

export default App;
