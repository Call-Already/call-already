import { Header, ProgressBar, Clipboard, ProgressStep, Button } from "../styles";

interface CodeClipboardProps extends React.HTMLAttributes<HTMLElement> {
  groupCode: string;
}

export const CodeClipboard: React.FC<CodeClipboardProps> = ({groupCode}) => {
  
  const copyText = "Copy code";

  const onCopyCode = () => {
    navigator.clipboard.writeText(groupCode);
  };
  
  return (
    <>
      <Clipboard id="clipboard">{groupCode}</Clipboard>
      <Button onClick={onCopyCode}><i className="fa-solid fa-clipboard"></i>{"   " + copyText}</Button>
    </>
  )
}

"fa-solid fa-clipboard"