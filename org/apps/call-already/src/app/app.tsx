import styled from 'styled-components';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { WelcomePage } from '../pages';
import { StrictMode } from 'react';

const StyledApp = styled.div`
  // Your style here
`;

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
]);

export function App() {
  return (
    <StrictMode>
      <RouterProvider router={browserRouter} />
    </StrictMode>
  );
}

export default App;
