import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TimezoneSelect from "react-timezone-select";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ErrorObject, Page } from "../components";
import { CodeClipboard } from "../components/CodeClipboard";
import { MessageObject } from "../components/SuccessBanner";
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

  const timezone = useRecoilValue(timezoneState);
  const groupCode = useRecoilValue(groupCodeState);
  const isCreatingGroup = useRecoilValue(isCreatingGroupState);
  const existingUsers = useRecoilValue(existingUsersState);
  const expectedNumUsers = useRecoilValue(expectedNumUsersState);

  const setTimezone = useSetRecoilState(timezoneState);

  const [error, setError] = useState<ErrorObject>({});
  const [message, setMessage] = useState<MessageObject>({});

  const header = "About you";
  const codeText = "Your group";
  const subHeader = "Your information";
  const shareText = "Invite your friends to callalready.com and share this code with them."
  const waitingText = "Waiting on more friends:";
  const provideNicknameText = "Please provide a valid nickname.";
  const provideTimezoneText = "Please provide a timezone.";
  const submit = "Submit";
  const friendsFound = "We found your friends!";
  const groupCreation = "You've created a new group!";

  const numUsersRemaining = expectedNumUsers - existingUsers.length - 1;

  useEffect(() => {
    setMessage({message: isCreatingGroup ? groupCreation:  friendsFound });
  }, []);

  const onSubmitInfo = () => {

    if (!timezone) {
      setError({message: provideTimezoneText});
      return;
    }
    
    emitAnalytic("My info submitted");
    navigate(TIME_ROUTE);
  };

  return (
    <Page progress={3} iconClassNames={"fa-solid fa-clipboard"} headerText={header} mascot={MASCOTS.Happy} isLoading={false} error={error} setError={setError} message={message} setMessage={setMessage}>
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
            <table>
              {existingUsers.map((user: string) => {
                return <InfoText><i className="fa-solid fa-face-smile"></i>{"\t" + user}</InfoText>
              })}
              <tr>
                <td className={"reviewTitle"}>{waitingText}</td>
                <td className={"reviewData"}>{numUsersRemaining}</td>
              </tr>
            </table>
          )
        }
      </CardContainer>
      <CardContainer $isMobile={isMobile}>
        <SubHeader>{subHeader}</SubHeader>
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
