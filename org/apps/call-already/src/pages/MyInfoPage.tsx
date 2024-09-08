import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimezoneSelect from "react-timezone-select";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Banner, ErrorObject, IconHeader, Page, Progress } from "../components";
import { CodeClipboard } from "../components/CodeClipboard";
import { existingUsersState, expectedNumUsersState, groupCodeState, isCreatingGroupState, nicknameState, timezoneState } from "../state";
import {
  Button,
  FormLabel,
  TextInput,
  InfoText,
  CardContainer,
  InputContainer,
  SubHeader,
} from "../styles";
import { emitAnalytic, MASCOTS, TIME_ROUTE, useIsMobile } from "../utils";
import { isValidNickname } from "../utils/validation";

export function MyInfoPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const groupCode = useRecoilValue(groupCodeState);
  const isCreatingGroup = useRecoilValue(isCreatingGroupState);
  const existingUsers = useRecoilValue(existingUsersState);
  const expectedNumUsers = useRecoilValue(expectedNumUsersState);

  const setNickname = useSetRecoilState(nicknameState);

  const [timezone, setTimezone] = useRecoilState(timezoneState);

  const [error, setError] = useState<ErrorObject>({});

  const header = "About you";
  const codeText = "Your group";
  const subHeader = "Your information";
  const shareText = "Invite your friends to callalready.com and share this code with them."
  const waitingText = "Waiting on responses from some more of your friends:";
  const allHereText = "All of your friends are here!";
  const joinedText = "Welcome to the group!";
  const provideNicknameText = "Please provide a valid nickname.";
  const submit = "Submit";

  const numUsersRemaining = expectedNumUsers - existingUsers.length - 1;

  let usersRemainingMessage;
  if (numUsersRemaining > 0) {
    usersRemainingMessage = <InfoText>{`${waitingText} ${numUsersRemaining}`}</InfoText>
  } else {
    usersRemainingMessage = <InfoText>{allHereText}</InfoText>
  }

  const onSubmitInfo = () => {
    const nicknameValue = (
      document.getElementById("nickname") as HTMLInputElement
    ).value;

    if (isValidNickname(nicknameValue)) {
      setNickname(nicknameValue);
    } else {
      setError({message: provideNicknameText});
      return;
    }
    
    emitAnalytic("My info submitted");
    navigate(TIME_ROUTE);
  };

  return (
    <Page progress={3} iconClassNames={"fa-solid fa-clipboard"} headerText={header} mascot={MASCOTS.Happy} isLoading={false}>
      {error.message && <Banner message={error.message} onClose={() => setError({})} />}
      <CardContainer $isMobile={isMobile}>
        <SubHeader>{codeText}</SubHeader>
        {
          // Show the group code share clipboard if the user is the creator
          isCreatingGroup ? (
            <>
              <InfoText>{shareText}</InfoText>
              <CodeClipboard groupCode={groupCode}/>
            </>
          ) : (
            <>
              {existingUsers.map((user: string) => {
                return <InfoText><i className="fa-solid fa-face-smile"></i>{"\t" + user}</InfoText>
              })}
              {usersRemainingMessage}
              <InfoText style={{fontWeight: "1000"}}>{joinedText}</InfoText>
            </>
          )
        }
      </CardContainer>
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
    </Page>
  );
}
