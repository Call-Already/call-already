import styled from 'styled-components';
import { StrictMode } from 'react';
import { CallAlreadyRouter } from './CallAlreadyRouter';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StrictMode>
      <CallAlreadyRouter />
    </StrictMode>
  );
}

export default App;
