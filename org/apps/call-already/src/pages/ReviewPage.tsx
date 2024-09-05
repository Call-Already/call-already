import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { IconHeader, Progress } from "../components";
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
  Clipboard,
  CardContainer,
  FormLabel,
  InfoText,
  Mascot,
  PageContainer,
  TextInput,
} from "../styles";
import {
  CONFIRMATION_ROUTE,
  emitAnalytic,
  getFormattedDays,
  getFormattedLocalTimes,
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
  const createGroupText = "You are creating a group with code";
  const joinGroupText = "You are goining a group with code";
  const copyText = "Copy code";
  const nicknameText = "Nickname";
  const timezoneText = "Timezone";
  const selectedDaysText = "Days";
  const selectedTimesText = "Times";
  const emailLabel = "Enter your email to receive your call time:";
  const submitText = "Finish";

  const formattedDays = getFormattedDays(selectedDays);
  const formattedLocalTimes = getFormattedLocalTimes(selectedTimes, timezone.value);

  const onCopyCode = () => {
    navigator.clipboard.writeText(groupCode);
  };

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
      <Progress progress={4} />
      <IconHeader iconClassNames="fa-solid fa-magnifying-glass" text={header} />
      <CardContainer $isMobile={isMobile}>
        <InfoText>{isCreatingGroup ? createGroupText : joinGroupText}</InfoText>
        <Clipboard>{groupCode}</Clipboard>
        <Button onClick={onCopyCode}><i className="fa-solid fa-clipboard"></i>{"   " + copyText}</Button>
        <br />
        <table>
          <tr>
            <td>{nicknameText}</td>
            <td>{nickname}</td>
          </tr>
          <tr>
            <td>{timezoneText}</td>
            <td>{timezone.value}</td>
          </tr>
          <tr>
            <td>{selectedDaysText}</td>
            <td>
                {
                  formattedDays.map((day) => {
                    return <p>{day}</p>
                  })
                }
            </td>
          </tr>
          <tr>
            <td>{selectedTimesText}</td>
            <td>
                {
                  formattedLocalTimes.map((time) => {
                    return <p>{time}</p>
                  })
                }</td>
          </tr>
        </table>
        <br />
        <FormLabel htmlFor="email">{emailLabel}</FormLabel>
        <TextInput id="email" type="text"></TextInput>
        <Button $primary onClick={onSubmit}>
          {submitText}
        </Button>
      </CardContainer>
      <Mascot src={"/confused.png"} alt="logo" />
    </PageContainer>
  );
}
