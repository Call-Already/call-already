import { CircleSpinner } from "react-spinner-overlay";
import { InfoText, LoadingContainer, theme } from "../styles";

interface LoadingOverlayProps extends React.HTMLAttributes<HTMLElement> {
  isMobile: Boolean;
  isLoading: Boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({isMobile, isLoading}) => {
  
  const spinnerSize = isMobile ? 48 : 72;

  return (
    isLoading && 
      <LoadingContainer>
        <CircleSpinner size={spinnerSize} outerBorderOpacity={0.5} outerBorderWidth={6} color={theme.primary.background}/>
    </LoadingContainer>
    )
}
