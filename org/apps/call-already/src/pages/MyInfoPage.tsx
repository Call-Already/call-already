import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimezoneSelect from "react-timezone-select";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Banner, ErrorObject, IconHeader, Progress } from "../components";
import { groupCodeState, isCreatingGroupState, nicknameState, timezoneState } from "../state";
import {
  Clipboard,
  Button,
  FormLabel,
  PageContainer,
  TextInput,
  Mascot,
  InfoText,
  CardContainer,
  InputContainer,
  SubHeader,
} from "../styles";
import { emitAnalytic, TIME_ROUTE, useIsMobile } from "../utils";

export function MyInfoPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const groupCode = useRecoilValue(groupCodeState);
  const isCreatingGroup = useRecoilValue(isCreatingGroupState);
  const setNickname = useSetRecoilState(nicknameState);
  const [timezone, setTimezone] = useRecoilState(timezoneState);

  const [error, setError] = useState<ErrorObject>({});

  const header = "About you";
  const subHeader = "My Information";
  const codeText = "Group Code";
  const shareText = "Invite your friends to callalready.com and share this code with them."
  const copyText = "Copy code";
  const provideNicknameText = "Please provide a nickname";
  const submit = "Submit";

  const onSubmitInfo = () => {
    const nicknameValue = (
      document.getElementById("nickname") as HTMLInputElement
    ).value;
    if (nicknameValue !== "") {
      setNickname(nicknameValue);
      emitAnalytic("My info submitted");
      navigate(TIME_ROUTE);
    } else {
      setError({message: provideNicknameText});
    }
  };

  const onCopyCode = () => {
    navigator.clipboard.writeText(groupCode);
  };

  return (
    <PageContainer $isMobile={isMobile}>
      <Progress progress={2} />
      <IconHeader iconClassNames="fa-solid fa-clipboard" text={header} />
      {error.message && <Banner message={error.message} onClose={() => setError({})} />}
      <Mascot src={"/writing.png"} alt="logo" />
      {
        // Show the group code card if the user is the group creator.
        isCreatingGroup &&
          <CardContainer $isMobile={isMobile}>
            <SubHeader>{codeText}</SubHeader>
            <InfoText>{shareText}</InfoText>
            <Clipboard id="clipboard">{groupCode}</Clipboard>
            <Button onClick={onCopyCode}><i className="fa-solid fa-clipboard"></i>{"   " + copyText}</Button>
          </CardContainer>
      }
      <CardContainer $isMobile={isMobile}>
        <SubHeader>{subHeader}</SubHeader>
        <InputContainer>
          <InfoText>Nickname</InfoText>
          <TextInput id="nickname" type="text"></TextInput>
        </InputContainer>
        <InputContainer>
          <FormLabel htmlFor="timezone">Timezone</FormLabel>
          <TimezoneSelect id="timezone" value={timezone} onChange={setTimezone} />
        </InputContainer>
        <Button $primary onClick={onSubmitInfo}>
          {submit}
        </Button>
      </CardContainer>
    </PageContainer>
  );
}
