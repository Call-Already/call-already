import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ConfirmationPage,
  GroupPage,
  MyInfoPage,
  OverviewPage,
  ReviewPage,
  TimePage,
  VerificationPage,
  RegistrationPage,
  LoginPage,
  WelcomePage,
} from "../pages";
import {
  CONFIRMATION_ROUTE,
  GROUP_ROUTE,
  MY_INFO_ROUTE,
  OVERVIEW_ROUTE,
  REVIEW_ROUTE,
  TIME_ROUTE,
  WELCOME_ROUTE,
  REGISTRATION_ROUTE,
  VERIFICATION_ROUTE,
  LOGIN_ROUTE,
} from "../utils";

const browserRouter = createBrowserRouter([
  {
    path: REGISTRATION_ROUTE,
    element: <RegistrationPage />,
  },
  {
    path: LOGIN_ROUTE,
    element: <LoginPage />,
  },
  {
    path: VERIFICATION_ROUTE,
    element: <VerificationPage />
  },
  {
    path: OVERVIEW_ROUTE,
    element: <OverviewPage />,
  },
  {
    path: WELCOME_ROUTE,
    element: <WelcomePage />,
  },
  {
    path: GROUP_ROUTE,
    element: <GroupPage />,
  },
  {
    path: MY_INFO_ROUTE,
    element: <MyInfoPage />,
  },
  {
    path: TIME_ROUTE,
    element: <TimePage />,
  },
  {
    path: REVIEW_ROUTE,
    element: <ReviewPage />,
  },
  {
    path: CONFIRMATION_ROUTE,
    element: <ConfirmationPage />,
  },
]);

export function CallAlreadyRouter() {
  return <RouterProvider router={browserRouter} />;
}
