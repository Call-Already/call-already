import { Mascot, PageContainer, PageHeader } from "../styles";
import { useIsMobile } from "../utils";
import { IconHeader } from "./IconHeader";
import { Progress } from "./Progress";

interface PageContainerProps extends React.HTMLAttributes<HTMLElement> {
  progress: number;
  iconClassNames: string;
  headerText: string;
  mascot: string;
}

export const Page: React.FC<PageContainerProps> = ({progress, iconClassNames, headerText, mascot, children}) => {
  const isMobile = useIsMobile();

  return (
    <PageContainer $isMobile={isMobile}>
        <PageHeader>
          <Progress progress={progress} />
          <IconHeader iconClassNames={`${iconClassNames} fa-sm`} text={headerText} />
        </PageHeader>
        {children}
        <Mascot src={mascot} alt="logo" />
    </PageContainer>
  )
}
