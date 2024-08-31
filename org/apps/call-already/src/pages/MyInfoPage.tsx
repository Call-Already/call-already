import React from "react";
import { useNavigate } from "react-router-dom";
import TimezoneSelect from "react-timezone-select";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { groupCodeState, nicknameState, timezoneState } from "../state";
import {
  Clipboard,
  Button,
  FormLabel,
  Header,
  PageContainer,
  TextInput,
  Mascot,
} from "../styles";
import { emitAnalytic, TIME_ROUTE, useIsMobile } from "../utils";

export function MyInfoPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const groupCode = useRecoilValue(groupCodeState);
  const setNickname = useSetRecoilState(nicknameState);
  const [timezone, setTimezone] = useRecoilState(timezoneState);

  const header = "My Information";
  const codeText = "Your group code:";
  const copyText = "Copy code";
  const submit = "Submit";

  const onSubmitInfo = () => {
    const nicknameValue = (document.getElementById("nickname") as HTMLInputElement).value;
    setNickname(nicknameValue);
    emitAnalytic("My info submitted");
    navigate(TIME_ROUTE);
  };

  const onCopyCode = () => {
    navigator.clipboard.writeText(groupCode);
  };

  return (
    <PageContainer $isMobile={isMobile}>
      <Header>{header}</Header>
      <Mascot src={"/writing.png"} alt="logo" />
      <FormLabel htmlFor="clipboard">{codeText}</FormLabel>
      <Clipboard id="clipboard">{groupCode}</Clipboard>
      <Button onClick={onCopyCode}>{copyText}</Button>
      <FormLabel htmlFor="nickname">Nickname</FormLabel>
      <TextInput id="nickname" type="text"></TextInput>
      <FormLabel htmlFor="timezone">Timezone</FormLabel>
      <TimezoneSelect id="timezone" value={timezone} onChange={setTimezone} />
      <Button $primary onClick={onSubmitInfo}>
        {submit}
      </Button>
    </PageContainer>
  );
}
