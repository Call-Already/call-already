import { LoadingContainer } from "../styles";

interface LoadingOverlayProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({text}) => {
  
  return (
    <LoadingContainer>
      
    </LoadingContainer>
  )
}
