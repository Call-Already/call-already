import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { OverviewPage } from '../pages';

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <OverviewPage />,
  },
]);

export function CallAlreadyRouter() {
  return (
    <RouterProvider router={browserRouter} />
  )
}