import React, { useState } from "react";
// import 'dayjs/locale/ru';
import { DatePicker } from '@mantine/dates';
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { createGroup, CreateGroupProps } from "../gateways";
import { date1State, date2State, groupCodeState, selectedDaysState, selectedTimesState } from "../state";
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

  const [pickedDays, selectPickedDays] = useState<[Date | null, Date | null]>([null, null]);

  const [date1, setDate1] = useRecoilState(date1State);
  const [date2, setDate2] = useRecoilState(date2State);
  const setSelectedDays = useSetRecoilState(selectedDaysState);

  const header = "Your Group";
  const info = "Enter a room code below to join an existing group:";
  const submitText = "Join group";
  const info2 = "Create new group";

  const onJoinGroup = () => {
    setIsCreatingGroup(false);
    emitAnalytic("Group joined");
    navigate(MY_INFO_ROUTE);
  };

  function getDatesInRange(pickedDays: any) {

    if (pickedDays.length === 0) {
      throw new Error('Date range must include at least one date');
    }

    // Only one day from datepicker, return it in UTC format
    if (pickedDays.length === 1) {
      return [moment(pickedDays[0]).tz('UTC').startOf("day").format()];
    }

    // Tranform first day into moment
    // Format it as a short date
    const firstDate = pickedDays[0];
    const simpleFirstDay = moment(firstDate).format('l');

    // Transform second day into moment
    // Format it as a short date
    const lateDate = pickedDays[1];
    const simpleLastDay = moment(lateDate).format('l');
    
    // Loop through the days until the first day
    // becomes the second day, adding them to a 
    // date array in full UTC format.
    let simpleCurrentDay = simpleFirstDay;
    let utcCurrentDay = moment(simpleCurrentDay).tz('UTC').startOf("day").format();
    const utcDatesToReturn = [utcCurrentDay];
    while (simpleCurrentDay !== simpleLastDay) {
      simpleCurrentDay = moment(simpleCurrentDay).add(1, 'day').format('l');
      utcCurrentDay = moment(simpleCurrentDay).tz('UTC').startOf("day").format();
      utcDatesToReturn.push(utcCurrentDay);
    }

    // Return the UTC days array.
    return utcDatesToReturn;
  }

  async function onCreateGroup() {
    const selectedDays = getDatesInRange(pickedDays);
    setSelectedDays(selectedDays);
    console.log(selectedDays);
    // const day1 = moment(pickedDays[0]).tz('UTC').format();
    // const day2 = moment(pickedDays[1]).tz('UTC').format();
    // setSelectedDays([day1, day2]);

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

  // Parameters for date picker component.
  const defaultDate = moment(new Date()).add(2, 'day').toDate();
  const minDate = moment(new Date()).toDate();
  const maxDate = moment(new Date()).add(14, 'day').toDate();

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
        maxLevel={"month"}
        size="md"
        locale={"en"}
        value={pickedDays}
        onChange={selectPickedDays} />;

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
