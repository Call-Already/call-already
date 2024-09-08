import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Banner, ErrorObject, Page } from "../components";
import { CodeClipboard } from "../components/CodeClipboard";
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
  CardContainer,
  FormLabel,
  InfoText,
  TextInput,
} from "../styles";
import {
  CONFIRMATION_ROUTE,
  emitAnalytic,
  getFormattedDays,
  getFormattedLocalTimes,
  MASCOTS,
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

  const [error, setError] = useState<ErrorObject>({});

  const header = "Review";
  const createGroupText = "You are creating a group with code:";
  const joinGroupText = "You are joining a group with code:";
  const nicknameText = "Nickname";
  const timezoneText = "Timezone";
  const selectedDaysText = "Days";
  const selectedTimesText = "Times";
  const emailLabel = "Enter your email to receive your call time:";
  const submitText = "Finish";

  const formattedDays = getFormattedDays(selectedDays);
  const formattedLocalTimes = getFormattedLocalTimes(selectedTimes, timezone.value);

  async function onSubmit() {
    const emailValue = (document.getElementById("email") as HTMLInputElement)
      .value;

    // Validate email here.

    if (emailValue === "") {
      setError({message: "Please enter a valid email."});
      return;
    }

    const props: PostResponsesProps = {
      ID: groupCode,
      Nickname: nickname,
      Email: emailValue,
      Timezone: timezone.value,
      SelectedTimes: selectedTimes,
      IsGroupCreator: isCreatingGroup,
    };

    postResponses(props)
      .then((response) => {
        emitAnalytic("Responses submitted");
        navigate(CONFIRMATION_ROUTE);
      })
      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 400) {
            setError({message: `Your responses could not be submitted.`});
            emitAnalytic("Bad post responses request");
          } else {
            setError({message: "There was an error submitting your responses."});
            emitAnalytic("Post responses unavailable");
          }
        } else {
          setError({message: "There was an error submitting your responses."});
        }
      });
  }

  return (
    <Page progress={5} iconClassNames={"fa-solid fa-magnifying-glass"} headerText={header} mascot={MASCOTS.Confused}>
      {error.message && <Banner message={error.message} onClose={() => setError({})} />}
      <CardContainer $isMobile={isMobile}>
        <InfoText>{isCreatingGroup ? createGroupText : joinGroupText}</InfoText>
        <CodeClipboard groupCode={groupCode} />
        <br />
        <table>
          <tr>
            <td className={"reviewTitle"}>{nicknameText}</td>
            <td className={"reviewData"}>{nickname}</td>
          </tr>
          <tr>
            <td className={"reviewTitle"}>{timezoneText}</td>
            <td className={"reviewData"}>{timezone.value}</td>
          </tr>
          <tr>
            <td className={"reviewTitle"}>{selectedDaysText}</td>
            <td className={"reviewData"}>
                {
                  formattedDays.map((day) => {
                    return <p>{day}</p>
                  })
                }
            </td>
          </tr>
          <tr>
            <td className={"reviewTitle"}>{selectedTimesText}</td>
            <td className={"reviewData"}>
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
    </Page>
  );
}
