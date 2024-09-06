import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { groupCodeState } from "../state";
import { InfoText, Mascot, PageContainer, PageHeader } from "../styles";
import { CONFIRMATION_ROUTE, ROUTES, useIsMobile } from "../utils";
import { IconHeader } from "./IconHeader";
import { NavArrow } from "./NavArrow";
import { Progress } from "./Progress";

interface PageContainerProps extends React.HTMLAttributes<HTMLElement> {
  progress: number;
  iconClassNames: string;
  headerText: string;
  mascot: string;
}

export const Page: React.FC<PageContainerProps> = ({progress, iconClassNames, headerText, mascot, children}) => {
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

  const hasFinishedGroupPage = progress > 2;

  return (
    <PageContainer $isMobile={isMobile}>
        {prevRoute && <NavArrow prevRoute={prevRoute}></NavArrow>}
        <PageHeader>
          {groupCode && hasFinishedGroupPage && <InfoText style={{color: "#dddddd"}}>{`${groupCodeText} ${groupCode}`}</InfoText>}
          <Progress progress={progress} />
          <IconHeader iconClassNames={`${iconClassNames} fa-md`} text={headerText} />
        </PageHeader>
        {children}
        <Mascot src={mascot} alt="logo" />
    </PageContainer>
  )
}
