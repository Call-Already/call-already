import React, { useState } from "react";
// TODO: Return to import more datepicker locales for localiztion.
// import 'dayjs/locale/en';
import { DatePicker } from "@mantine/dates";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { createGroup, CreateGroupProps, validateGroup } from "../gateways";
import { existingUsersState, expectedNumUsersState, groupCodeState, selectedDaysState } from "../state";
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
  isValidGroupCode,
  MASCOTS,
  MY_INFO_ROUTE,
  useIsMobile,
} from "../utils";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import moment from "moment";
import { Banner, ErrorObject, Page } from "../components";

export function GroupPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const setUserGroupCode = useSetRecoilState(groupCodeState);
  const setIsCreatingGroup = useSetRecoilState(isCreatingGroupState);
  const setSelectedDays = useSetRecoilState(selectedDaysState);
  const setExistingUsers = useSetRecoilState(existingUsersState);
  const setExpectedNumUsers = useSetRecoilState(expectedNumUsersState);

  const [error, setError] = useState<ErrorObject>({});

  // React state is only used temporarily while on the page.
  // When creating a group, the responses are saved to Recoil.
  const [pickedDays, selectPickedDays] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const header = "Your Friends";
  const info = "Enter a room code below to join an existing group.";
  const submitText = "Join group";
  const info2 = "Create new group";
  const selectDaysTips = "Select one to three days within the next two weeks for the call. Days are in UTC (Coordinated Universal Time). Calls scheduled in the next three to five days tend to be more successful.";
  // Parameters for date picker component.
  const defaultDate = moment(new Date()).add(2, "day").toDate();
  const minDate = moment(new Date()).toDate();
  const maxDate = moment(new Date()).add(14, "day").toDate();

  async function onJoinGroup() {
    setIsCreatingGroup(false);
    const groupCodeValue = (
      document.getElementById("groupCode") as HTMLInputElement
    ).value.toUpperCase();

    // Validate the group code is a valid format.
    if (!isValidGroupCode(groupCodeValue)) {
      setError({message: "Please enter a valid group code."});
      return;
    }

    // Validate that the group exists
    const validateGroupProps = {
      ID: groupCodeValue,
    }

    validateGroup(validateGroupProps)
      .then((response) => {
        const data = response.data;
        setUserGroupCode(groupCodeValue);
        setExistingUsers(data.UserNicknames);
        setExpectedNumUsers(data.NumUsers);
        setSelectedDays(data.Dates);
        emitAnalytic("Group joined");
        navigate(MY_INFO_ROUTE);
      })
      .catch((error) => {
        const status = error.response.status;
        if (error.response) {
          if (status === 400) {
            setError({message: `Group ${groupCodeValue} does not exist.`});
            emitAnalytic("Group does not exist");
          } else {
            setError({message: "There was an error joining the group."});
            emitAnalytic("Join group unavailable");
          }
        } else {
          setError({message: "There was an error joining the group."});
        }
      });
  };

  async function onCreateGroup() {
    setIsCreatingGroup(true);

    const selectedDays = getDatesInRange(pickedDays);
    // Using only an agreeable amount of days to pick from.
    if (selectedDays[0] === 'Invalid date' || selectedDays.length === 0 || selectedDays.length > 3) {
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
    <Page progress={2} iconClassNames={"fas fa-user-friends"} headerText={header} mascot={MASCOTS.Writing}>
      {error.message && <Banner message={error.message} onClose={() => setError({})} />}
      <CardContainer $isMobile={isMobile}>
        <SubHeader>Join a group</SubHeader>
        <InfoText>{info}</InfoText>
        <RoomCodeInput id="groupCode" type="text" size={6} maxLength={4}></RoomCodeInput>
        <Button onClick={onJoinGroup}>{submitText}</Button>
      </CardContainer>
      <p style={{margin: "0", fontWeight: "1000"}}>or</p>
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
          <InfoText><i className="fa-solid fa-circle-info fa-sm"></i>{"\t" + selectDaysTips}</InfoText>
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
    </Page>
  );
}
