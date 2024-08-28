import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { postResponses } from "../gateways";
import { date1State, groupCodeState, isCreatingGroupState, nicknameState, selectedTimesState, timezoneState } from "../state";
import { Button, FormLabel, InfoText, Mascot, PageContainer, TextInput } from "../styles";
import { CONFIRMATION_ROUTE, getLocalizedTimeInputs, useIsMobile } from "../utils";

export function ReviewPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const groupCode = useRecoilValue(groupCodeState);
  const nickname = useRecoilValue(nicknameState);
  const timezone = useRecoilValue(timezoneState);
  const isCreatingGroup = useRecoilValue(isCreatingGroupState);
  const date1 = useRecoilValue(date1State);
  const selectedTimes = useRecoilValue(selectedTimesState);

  const header = "Review";
  const createGroupText = "You are creating a group with code:";
  const joinGroupText = "You are goining a group with code:";
  const emailLabel = "Enter your email to receive results:";
  const submitText = "Submit";

  async function onSubmit() {
    const serverResponse = await postResponses();
    console.log(serverResponse);
    navigate(CONFIRMATION_ROUTE);
  };

  return (
    <PageContainer $isMobile={isMobile}>
      <h1>{header}</h1>
      <Mascot src={"/writing.png"} alt="logo" />
      {
        isCreatingGroup ? 
        <InfoText>{`${createGroupText} ${groupCode}`}</InfoText> :
        <InfoText>{`${joinGroupText} ${groupCode}`}</InfoText>
      }
      <InfoText>{nickname}</InfoText>
      <InfoText>{timezone.value}</InfoText>
      <InfoText>{moment(date1).format('ll')}</InfoText>
      <InfoText>{selectedTimes}</InfoText>
      <InfoText>{getLocalizedTimeInputs(selectedTimes, timezone.value)}</InfoText>
      <FormLabel htmlFor="email">{emailLabel}</FormLabel>
      <TextInput id="email" type="text"></TextInput>
      <Button $primary onClick={onSubmit}>{submitText}</Button>
    </PageContainer>
  );
}
