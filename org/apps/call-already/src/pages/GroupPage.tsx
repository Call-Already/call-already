import React, { useState } from "react";
// TODO: Return to import more datepicker locales for localiztion.
// import 'dayjs/locale/en';
import { DatePicker } from "@mantine/dates";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { createGroup, CreateGroupProps } from "../gateways";
import { groupCodeState, selectedDaysState } from "../state";
import { isCreatingGroupState } from "../state";
import {
  Button,
  CardContainer,
  // CheckboxInput,
  // FormLabel,
  Header,
  InfoText,
  InputContainer,
  NumberInput,
  PageContainer,
  RoomCodeInput,
  SubHeader,
} from "../styles";
import {
  emitAnalytic,
  generateGroupCode,
  getDatesInRange,
  MY_INFO_ROUTE,
  useIsMobile,
} from "../utils";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import moment from "moment";
import { Banner, ErrorObject } from "../components";

export function GroupPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const setUserGroupCode = useSetRecoilState(groupCodeState);
  const setIsCreatingGroup = useSetRecoilState(isCreatingGroupState);
  const setSelectedDays = useSetRecoilState(selectedDaysState);

  const [error, setError] = useState<ErrorObject>({});

  // React state is only used temporarily while on the page.
  // When creating a group, the responses are saved to Recoil.
  const [pickedDays, selectPickedDays] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const header = "Your Group";
  const info = "Enter a room code below to join an existing group.";
  const submitText = "Join group";
  const info2 = "Create new group";

  // Parameters for date picker component.
  const defaultDate = moment(new Date()).add(2, "day").toDate();
  const minDate = moment(new Date()).toDate();
  const maxDate = moment(new Date()).add(14, "day").toDate();

  const onJoinGroup = () => {
    setIsCreatingGroup(false);
    const groupCodeValue = (
      document.getElementById("groupCode") as HTMLInputElement
    ).value;
    setError({message: "There was an error joining the group"});
    emitAnalytic("Group joined");
    // navigate(MY_INFO_ROUTE);
  };

  async function onCreateGroup() {
    const selectedDays = getDatesInRange(pickedDays);
    // Using only an agreeable amount of days to pick from.
    if (selectedDays.length === 0 || selectedDays.length > 3) {
      setError({message: "Please select between one and three days."});
      return;
    }
    setSelectedDays(selectedDays);

    const numUsersValue = (
      document.getElementById("numUsers") as HTMLInputElement
    ).value;
    const showUsersValue = false;
    //   document.getElementById("showUsers") as HTMLInputElement
    // ).value;
    setIsCreatingGroup(true);

    const groupCode = generateGroupCode(4);
    setUserGroupCode(groupCode);

    const createGroupProps: CreateGroupProps = {
      ID: groupCode,
      NumUsers: Number(numUsersValue),
      ShowUsers: Boolean(showUsersValue),
      CallDates: selectedDays,
    };
    const serverResponse = await createGroup(createGroupProps);
    if (serverResponse.status === 200) {
      emitAnalytic("Group created");
      navigate(MY_INFO_ROUTE);
    } else {
      emitAnalytic("Group creation failed");
      setError({message: "There was an error creating the group."});
    }
  }

  return (
    <PageContainer $isMobile={isMobile}>
      <Header>{header}</Header>
      {error.message && <Banner message={error.message} onClose={() => setError({})} />}
      <CardContainer $isMobile={isMobile}>
        <SubHeader>Join a group</SubHeader>
        <InfoText>{info}</InfoText>
        <RoomCodeInput id="groupCode" type="text" size={6} maxLength={4}></RoomCodeInput>
        <Button onClick={onJoinGroup}>{submitText}</Button>
      </CardContainer>
      <br />
      <InfoText>or</InfoText>
      <CardContainer $isMobile={isMobile}>
        <SubHeader>Create a new group</SubHeader>
        <InputContainer>
          <InfoText>Number of callers:</InfoText>
          <NumberInput id="numUsers" type="number" min={2} max={8} defaultValue={4}></NumberInput>
        </InputContainer>
        {/* <CheckboxInput id="showUsers" type="checkbox"></CheckboxInput>
        <InfoText>
          Show other callers' responses while picking times
        </InfoText> */}
        <InputContainer>
          <InfoText>Select a range of one to three days within the next two weeks for the call to take place.</InfoText>
        </InputContainer>
        <DatePicker
          type="range"
          allowSingleDateInRange
          defaultDate={defaultDate}
          firstDayOfWeek={0}
          minDate={minDate}
          maxDate={maxDate}
          maxLevel="month"
          size={isMobile ? "sm" : "md"}
          locale="en"
          value={pickedDays}
          onChange={selectPickedDays}
        />
        <Button $primary onClick={onCreateGroup}>
          {info2}
        </Button>
      </CardContainer>
    </PageContainer>
  );
}
