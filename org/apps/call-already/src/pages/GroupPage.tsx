import React, { useState } from "react";
// import 'dayjs/locale/ru';
import { DatePicker } from '@mantine/dates';
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { createGroup, CreateGroupProps } from "../gateways";
import { date1State, date2State, groupCodeState } from "../state";
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
  MY_INFO_ROUTE,
  useIsMobile,
} from "../utils";

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { closeOnEscape } from "@mantine/core";
import moment from "moment";

export function GroupPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const setUserGroupCode = useSetRecoilState(groupCodeState);
  const setIsCreatingGroup = useSetRecoilState(isCreatingGroupState);

  const [date1, setDate1] = useRecoilState(date1State);
  const [date2, setDate2] = useRecoilState(date2State);

  const header = "Your Group";
  const info = "Enter a room code below to join an existing group:";
  const submitText = "Join group";
  const info2 = "Create new group";

  const onJoinGroup = () => {
    setIsCreatingGroup(false);
    emitAnalytic("Group joined");
    navigate(MY_INFO_ROUTE);
  };

  async function onCreateGroup() {
    const numUsersValue = (document.getElementById("numUsers") as HTMLInputElement).value;
    const showUsersValue = (document.getElementById("showUsers") as HTMLInputElement).value;
    setIsCreatingGroup(true);
    const groupCode = generateGroupCode(4);
    setUserGroupCode(groupCode);
    // TODO: Check the backend for the existing group, and
    // pull down and save the group for some ongoing checks.
    // TODO: Create a group in the backend at this point,
    // so friends can fill out the survey at the same time.
    const createGroupProps : CreateGroupProps = {
      ID: groupCode,
      NumUsers: Number(numUsersValue),
      ShowUsers: Boolean(showUsersValue),
      CallDates: [date1]
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

  const defaultDate = moment(new Date()).add(2, 'day').toDate();
  const minDate = moment(new Date()).toDate();
  const maxDate = moment(new Date()).add(14, 'day').toDate();
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  const onDatesChange = (dates: [Date | null, Date | null]) => {
    console.log(dates);
    setValue(dates);
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
        value={value}
        minDate={minDate}
        maxDate={maxDate}
        maxLevel={"month"}
        size="md"
        locale={"ru"}
        onChange={onDatesChange} />;

      {/* <DatePicker
        id="date"
        selected={date1}
        onChange={(date) => setDate1(date)}
      />
      <DatePicker selected={date2} onChange={(date) => setDate2(date)} /> */}
      <Button $primary onClick={onCreateGroup}>
        {info2}
      </Button>
    </PageContainer>
  );
}
