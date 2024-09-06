import { Header, ProgressBar, ProgressStep } from "../styles";

interface IconHeaderProps extends React.HTMLAttributes<HTMLElement> {
  iconClassNames: string;
  text: string;
}

export const IconHeader: React.FC<IconHeaderProps> = ({iconClassNames, text}) => {
  return (
    <Header><i className={iconClassNames}></i><div style={{width: "0.5em"}}></div>{text}</Header>
  )
}
