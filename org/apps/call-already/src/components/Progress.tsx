import { ProgressBar, ProgressStep } from "../styles";

const MAX_PROGRESS = 4;

interface ProgressProps extends React.HTMLAttributes<HTMLElement> {
  progress: number;
}

export const Progress: React.FC<ProgressProps> = ({ progress }) => {
  const progressSteps = [];
  for (var i = 0; i < progress; i++) {
    progressSteps.push(<ProgressStep key={`progress_${i}`} $complete />);
  }
  for (var j = progress; j < MAX_PROGRESS; j++) {
    progressSteps.push(<ProgressStep key={`progress_${j}`} />);
  }
  return <ProgressBar>{progressSteps}</ProgressBar>;
};
