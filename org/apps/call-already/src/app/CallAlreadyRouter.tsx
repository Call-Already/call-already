import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedPage } from "../components/ProtectedPage";
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
  HomePage,
} from "../pages";
import { SettingsPage } from "../pages/SettingsPage";
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
  HOME_ROUTE,
  SETTINGS_ROUTE,
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
    element: <VerificationPage />,
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
    path: HOME_ROUTE,
    element: (
      <ProtectedPage>
        <HomePage />,
      </ProtectedPage>
    ),
  },
  {
    path: SETTINGS_ROUTE,
    element: (
      <ProtectedPage>
        <SettingsPage />,
      </ProtectedPage>
    ),
  },
  {
    path: GROUP_ROUTE,
    element: (
      <ProtectedPage>
        <GroupPage />,
      </ProtectedPage>
    ),
  },
  {
    path: MY_INFO_ROUTE,
    element: (
      <ProtectedPage>
        <MyInfoPage />,
      </ProtectedPage>
    ),
  },
  {
    path: TIME_ROUTE,
    element: (
      <ProtectedPage>
        <TimePage />,
      </ProtectedPage>
    ),
  },
  {
    path: REVIEW_ROUTE,
    element: (
      <ProtectedPage>
        <ReviewPage />,
      </ProtectedPage>
    ),
  },
  {
    path: CONFIRMATION_ROUTE,
    element: (
      <ProtectedPage>
        <ConfirmationPage />,
      </ProtectedPage>
    ),
  },
  {
    path: "*",
    element: <WelcomePage />,
  },
]);

export function CallAlreadyRouter() {
  return <RouterProvider router={browserRouter} />;
}
