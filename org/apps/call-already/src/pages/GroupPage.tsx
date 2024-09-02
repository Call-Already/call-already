import React, { useState } from "react";
// TODO: Return to import more datepicker locales for localiztion.
// import 'dayjs/locale/en';
import { DatePicker } from '@mantine/dates';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { createGroup, CreateGroupProps } from "../gateways";
import { groupCodeState, selectedDaysState } from "../state";
import { isCreatingGroupState } from "../state";
import {
  Button,
  CheckboxInput,
  FormLabel,
  Header,
  InfoText,
  NumberInput,
  PageContainer,
  RoomCodeInput,
} from "../styles";
import {
  emitAnalytic,
  generateGroupCode,
  getDatesInRange,
  MY_INFO_ROUTE,
  useIsMobile,
} from "../utils";

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import moment from "moment";

export function GroupPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const setUserGroupCode = useSetRecoilState(groupCodeState);
  const setIsCreatingGroup = useSetRecoilState(isCreatingGroupState);
  const setSelectedDays = useSetRecoilState(selectedDaysState);

  // React state is only used temporarily while on the page.
  // When creating a group, the responses are saved to Recoil.
  const [pickedDays, selectPickedDays] = useState<[Date | null, Date | null]>([null, null]);

  const header = "Your Group";
  const info = "Enter a room code below to join an existing group:";
  const submitText = "Join group";
  const info2 = "Create new group";
  
  // Parameters for date picker component.
  const defaultDate = moment(new Date()).add(2, 'day').toDate();
  const minDate = moment(new Date()).toDate();
  const maxDate = moment(new Date()).add(14, 'day').toDate();

  const onJoinGroup = () => {
    setIsCreatingGroup(false);
    emitAnalytic("Group joined");
    navigate(MY_INFO_ROUTE);
  };

  async function onCreateGroup() {
    const selectedDays = getDatesInRange(pickedDays);
    setSelectedDays(selectedDays);

    const numUsersValue = (document.getElementById("numUsers") as HTMLInputElement).value;
    const showUsersValue = (document.getElementById("showUsers") as HTMLInputElement).value;
    setIsCreatingGroup(true);

    const groupCode = generateGroupCode(4);
    setUserGroupCode(groupCode);

    const createGroupProps : CreateGroupProps = {
      ID: groupCode,
      NumUsers: Number(numUsersValue),
      ShowUsers: Boolean(showUsersValue),
      CallDates: selectedDays
    };
    const serverResponse = await createGroup(createGroupProps);
    if (serverResponse.status === 200) {
      emitAnalytic("Group created");
      navigate(MY_INFO_ROUTE);
    } else {
      // Handle post responses failure.
      console.log(serverResponse);
    }
  };

  return (
    <PageContainer $isMobile={isMobile}>
      <Header>{header}</Header>
      <InfoText>{info}</InfoText>
      <RoomCodeInput type="text" size={6} maxLength={4}></RoomCodeInput>
      <Button onClick={onJoinGroup}>{submitText}</Button>
      <br />
      <InfoText>or</InfoText>
      <FormLabel htmlFor="numUsers">Number of callers</FormLabel>
      <NumberInput id="numUsers" type="number"></NumberInput>
      <FormLabel htmlFor="showUsers">Show other callers when picking times</FormLabel>
      <CheckboxInput id="showUsers" type="checkbox"></CheckboxInput>
      <FormLabel htmlFor="date">Call Date</FormLabel>
      <InfoText>Please select one to three days in the next two weeks.</InfoText>
      <DatePicker type="range"
        allowSingleDateInRange
        defaultDate={defaultDate}
        firstDayOfWeek={0}
        minDate={minDate}
        maxDate={maxDate}
        maxLevel="month"
        size="md"
        locale="en"
        value={pickedDays}
        onChange={selectPickedDays} />
      <Button $primary onClick={onCreateGroup}>
        {info2}
      </Button>
    </PageContainer>
  );
}
