import styled from "styled-components";
import { StrictMode } from "react";
import { CallAlreadyRouter } from "./CallAlreadyRouter";
import { RecoilRoot } from "recoil";

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
