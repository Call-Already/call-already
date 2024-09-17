import React from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Banner, ErrorObject, NavHome } from ".";
import { groupCodeState } from "../state";
import { InfoText, Mascot, PageContainer, PageHeader } from "../styles";
import { ROUTES, useIsMobile } from "../utils";
import { IconHeader } from "./IconHeader";
import { LoadingOverlay } from "./LoadingOverlay";
import { NavArrow } from "./NavArrow";
import { Progress } from "./Progress";
import { MessageObject, SuccessBanner } from "./SuccessBanner";

interface PageContainerProps extends React.HTMLAttributes<HTMLElement> {
  progress: number;
  iconClassNames: string;
  headerText: string;
  isLoading: Boolean;
  error?: ErrorObject;
  setError?: React.Dispatch<React.SetStateAction<ErrorObject>>;
  message?: MessageObject;
  setMessage?: React.Dispatch<React.SetStateAction<MessageObject>>;
  mascot: string;
}

export const Page: React.FC<PageContainerProps> = ({
  progress,
  iconClassNames,
  headerText,
  isLoading,
  error,
  setError,
  mascot,
  children,
  message,
  setMessage,
}) => {
  const isMobile = useIsMobile();
  const location = useLocation().pathname;

  const routeIndex = ROUTES.indexOf(location);
  const prevRouteIndex = routeIndex - 1;

  let prevRoute;
  if (prevRouteIndex >= 0) {
    prevRoute = ROUTES[prevRouteIndex];
  }

  const groupCode = useRecoilValue(groupCodeState);

  const groupCodeText = "Group code:";

  let hasFinishedGroupPage;
  if (progress) {
    hasFinishedGroupPage = progress > 2;
  } else {
    hasFinishedGroupPage = false;
  }

  return (
    <PageContainer $isMobile={isMobile}>
      <LoadingOverlay isMobile={isMobile} isLoading={isLoading} />
      {progress > 0 && prevRoute && <NavArrow prevRoute={prevRoute}></NavArrow>}
      {progress < 0 && <NavHome></NavHome>}
      <PageHeader>
        {groupCode && hasFinishedGroupPage && (
          <InfoText
            style={{ color: "#dddddd", marginBottom: "0.1em" }}
          >{`${groupCodeText} ${groupCode}`}</InfoText>
        )}
        {progress >= 0 && <Progress progress={progress} />}
        <IconHeader
          iconClassNames={`${iconClassNames} fa-md`}
          text={headerText}
        />
      </PageHeader>
      {error && setError && error.message && (
        <Banner message={error.message} onClose={() => setError({})} />
      )}
      {message && setMessage && message.message && (
        <SuccessBanner
          message={message.message}
          onClose={() => setMessage({})}
        />
      )}
      {children}
      <Mascot src={mascot} alt="logo" />
    </PageContainer>
  );
};
