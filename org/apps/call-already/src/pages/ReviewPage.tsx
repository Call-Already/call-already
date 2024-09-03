import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { postResponses, PostResponsesProps } from "../gateways";
import {
  groupCodeState,
  isCreatingGroupState,
  nicknameState,
  selectedDaysState,
  selectedTimesState,
  timezoneState,
} from "../state";
import {
  Button,
  FormLabel,
  InfoText,
  Mascot,
  PageContainer,
  TextInput,
} from "../styles";
import {
  CONFIRMATION_ROUTE,
  emitAnalytic,
  getLocalizedTimeInputs,
  useIsMobile,
} from "../utils";

export function ReviewPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const groupCode = useRecoilValue(groupCodeState);
  const nickname = useRecoilValue(nicknameState);
  const timezone = useRecoilValue(timezoneState);
  const isCreatingGroup = useRecoilValue(isCreatingGroupState);
  const selectedDays = useRecoilValue(selectedDaysState);
  const selectedTimes = useRecoilValue(selectedTimesState);

  const header = "Review";
  const createGroupText = "You are creating a group with code:";
  const joinGroupText = "You are goining a group with code:";
  const emailLabel = "Enter your email to receive results:";
  const submitText = "Submit";

  async function onSubmit() {
    const emailValue = (document.getElementById("email") as HTMLInputElement)
      .value;
    const props: PostResponsesProps = {
      ID: groupCode,
      Nickname: nickname,
      Email: emailValue,
      Timezone: timezone.value,
      SelectedTimes: selectedTimes,
      IsGroupCreator: isCreatingGroup,
    };
    const serverResponse = await postResponses(props);
    if (serverResponse.status === 200) {
      emitAnalytic("Responses submitted");
      navigate(CONFIRMATION_ROUTE);
    } else {
      // Handle post responses failure.
      console.log(serverResponse);
    }
  }

  return (
    <PageContainer $isMobile={isMobile}>
      <h1>{header}</h1>
      <Mascot src={"/writing.png"} alt="logo" />
      {isCreatingGroup ? (
        <InfoText>{`${createGroupText} ${groupCode}`}</InfoText>
      ) : (
        <InfoText>{`${joinGroupText} ${groupCode}`}</InfoText>
      )}
      <InfoText>{nickname}</InfoText>
      <InfoText>{timezone.value}</InfoText>
      <InfoText>{selectedDays}</InfoText>
      <InfoText>
        {getLocalizedTimeInputs(selectedTimes, timezone.value)}
      </InfoText>
      <FormLabel htmlFor="email">{emailLabel}</FormLabel>
      <TextInput id="email" type="text"></TextInput>
      <Button $primary onClick={onSubmit}>
        {submitText}
      </Button>
    </PageContainer>
  );
}
