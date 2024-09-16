import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ErrorObject, Page } from "../components";
import { CodeClipboard } from "../components/CodeClipboard";
import { postResponses, PostResponsesProps } from "../gateways";
import {
  emailState,
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
  InfoText,
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
  const email = useRecoilValue(emailState);
  const timezone = useRecoilValue(timezoneState);
  const isCreatingGroup = useRecoilValue(isCreatingGroupState);
  const selectedDays = useRecoilValue(selectedDaysState);
  const selectedTimes = useRecoilValue(selectedTimesState);

  const [error, setError] = useState<ErrorObject>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const header = "Review";
  const createGroupText = "You are creating a group with code:";
  const joinGroupText = "You are joining a group with code:";
  const nicknameText = "Nickname";
  const timezoneText = "Timezone";
  const selectedDaysText = "Days";
  const selectedTimesText = "Times";
  const submitText = "Finish";

  const formattedDays = getFormattedDays(selectedDays);
  const formattedLocalTimes = getFormattedLocalTimes(selectedTimes, timezone.value);

  async function onSubmit() {
    const props: PostResponsesProps = {
      ID: groupCode,
      Nickname: nickname,
      Email: email,
      Timezone: timezone.value,
      SelectedTimes: selectedTimes,
      IsGroupCreator: isCreatingGroup,
    };

    setIsLoading(true);
    postResponses(props)
      .then((response) => {
        setIsLoading(false);
        emitAnalytic("Responses submitted");
        navigate(CONFIRMATION_ROUTE);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          const status = error.response.status;
          if (status === 400) {
            setError({message: `Your responses could not be submitted.`});
            emitAnalytic("Bad post responses request");
          } else if (status === 404) {
            setError({message: `Group ${groupCode} does not exist.`});
            emitAnalytic("Group does not exist from review page");
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
    <Page progress={5} iconClassNames={"fa-solid fa-magnifying-glass"} headerText={header} mascot={MASCOTS.Confused} isLoading={isLoading} error={error} setError={setError}>
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
        <Button $primary onClick={onSubmit}>
          {submitText}
        </Button>
      </CardContainer>
    </Page>
  );
}
