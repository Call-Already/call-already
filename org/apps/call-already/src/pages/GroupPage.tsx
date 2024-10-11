import React, { useState } from "react";
// TODO: Return to import more datepicker locales for localiztion.
// import 'dayjs/locale/en';
import { DatePicker } from "@mantine/dates";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  createGroup,
  CreateGroupProps,
  validateGroup,
  ValidateGroupProps,
} from "../gateways";
import {
  callTypeState,
  emailState,
  existingUsersState,
  expectedNumUsersState,
  groupCodeState,
  selectedDaysState,
} from "../state";
import { isCreatingGroupState } from "../state";
import {
  Button,
  CardContainer,
  FormLabel,
  Group,
  // CheckboxInput,
  // FormLabel,
  InfoText,
  InputContainer,
  NumberInput,
  RoomCodeInput,
  SecondaryContainer,
  SmallHeader,
  SubHeader,
  TextInput,
} from "../styles";
import {
  CallTypes,
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
import { ErrorObject, Page } from "../components";

export function GroupPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const email = useRecoilValue(emailState);

  const setUserGroupCode = useSetRecoilState(groupCodeState);
  const setIsCreatingGroup = useSetRecoilState(isCreatingGroupState);
  const setSelectedDays = useSetRecoilState(selectedDaysState);
  const setExistingUsers = useSetRecoilState(existingUsersState);
  const setExpectedNumUsers = useSetRecoilState(expectedNumUsersState);
  const setCallType = useSetRecoilState(callTypeState);

  const [error, setError] = useState<ErrorObject>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
  const callTypeText = "How should we schedule your call?";
  const groupNameText = "(optional) Give your group a name"
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
      setError({ message: "Please enter a valid group code." });
      return;
    }

    // Validate that the group exists
    const validateGroupProps: ValidateGroupProps = {
      ID: groupCodeValue,
      Email: email,
    };

    setIsLoading(true);
    validateGroup(validateGroupProps)
      .then((response) => {
        setIsLoading(false);

        const data = response.data;
        setUserGroupCode(groupCodeValue);
        setExistingUsers(data.UserNicknames);
        setExpectedNumUsers(data.NumUsers);
        setSelectedDays(data.Dates);
        setCallType(data.CallType);
        emitAnalytic("Group joined");
        navigate(MY_INFO_ROUTE);
      })
      .catch((error) => {
        setIsLoading(false);

        if (error.response) {
          const status = error.response.status;
          if (status === 400) {
            setError({ message: `Group ${groupCodeValue} is already full.` });
            emitAnalytic("Group is already full");
          } else if (status === 404) {
            setError({ message: `Group ${groupCodeValue} does not exist.` });
            emitAnalytic("Group does not exist");
          } else {
            setError({ message: "There was an error joining the group." });
            emitAnalytic("Join group unavailable");
          }
        } else {
          setError({ message: "There was an error joining the group." });
        }
      });
  }

  async function onCreateGroup() {
    setIsCreatingGroup(true);

    const selectedDays = getDatesInRange(pickedDays);
    // Using only an agreeable amount of days to pick from.
    if (
      selectedDays[0] === "Invalid date" ||
      selectedDays.length === 0 ||
      selectedDays.length > 3
    ) {
      setError({ message: "Please select between one and three days." });
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

    const callTypeValue = (
      document.querySelector(
        `input[name="callType"]:checked`,
      ) as HTMLInputElement
    ).value;
    setCallType(callTypeValue);

    const groupNameValue = (
      document.getElementById("groupName") as HTMLInputElement
    ).value;
    if (groupNameValue && groupNameValue.length > 16) {
      setError({ message: "Please enter a shorter group name." });
      return;
    }

    const createGroupProps: CreateGroupProps = {
      ID: groupCode,
      GroupName: groupNameValue,
      Email: email,
      NumUsers: Number(numUsersValue),
      ShowUsers: Boolean(showUsersValue),
      Dates: selectedDays,
      CallType: callTypeValue,
    };

    setIsLoading(true);
    createGroup(createGroupProps)
      .then((response) => {
        setIsLoading(false);
        emitAnalytic("Group created");
        navigate(MY_INFO_ROUTE);
      })
      .catch((error) => {
        setIsLoading(false);
        emitAnalytic("Group creation failed");
        setError({ message: "There was an error creating the group." });
      });
  }

  return (
    <Page
      progress={0}
      iconClassNames={"fas fa-user-friends"}
      headerText={header}
      mascot={MASCOTS.Writing}
      isLoading={isLoading}
      error={error}
      setError={setError}
    >
      <CardContainer $isMobile={isMobile}>
        <SubHeader>Join a group</SubHeader>
        <InfoText>{info}</InfoText>
        <RoomCodeInput
          id="groupCode"
          type="text"
          size={6}
          maxLength={4}
        ></RoomCodeInput>
        <Button onClick={onJoinGroup}>{submitText}</Button>
      </CardContainer>
      <p style={{ margin: "0", fontWeight: "1000" }}>or</p>
      <CardContainer $isMobile={isMobile} id="startCall">
        <SubHeader>Create a new group</SubHeader>
        <InputContainer>
          <InfoText>Number of callers:</InfoText>
          <NumberInput
            id="numUsers"
            type="number"
            min={2}
            max={8}
            defaultValue={4}
          ></NumberInput>
        </InputContainer>
        {/* <CheckboxInput id="showUsers" type="checkbox"></CheckboxInput>
        <InfoText>
          Show other callers' responses while picking times
        </InfoText> */}
        <InfoText>
          Select <strong>one to three days</strong> within the next two weeks
          for the call. Calls scheduled in the next three to five days tend to
          be more successful.
        </InfoText>
        <SecondaryContainer $isMobile={isMobile}>
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
        </SecondaryContainer>
        <SmallHeader>{callTypeText}</SmallHeader>
        <Group $isMobile={isMobile}>
          <input
            type="radio"
            name="callType"
            id={CallTypes.IMPERFECT}
            value={CallTypes.IMPERFECT}
            defaultChecked={true}
          />
          <FormLabel htmlFor={CallTypes.IMPERFECT}>
            Include the most friends possible
          </FormLabel>
        </Group>
        <Group>
          <input
            type="radio"
            name="callType"
            id={CallTypes.PERFECT}
            value={CallTypes.PERFECT}
          />
          <FormLabel htmlFor={CallTypes.PERFECT}>
            Call time must work for everyone
          </FormLabel>
        </Group>
        <br />
        <FormLabel htmlFor="groupName">{groupNameText}</FormLabel>
        <TextInput type="text" name="groupName" id="groupName"></TextInput>
        <Button $primary onClick={onCreateGroup}>
          {info2}
        </Button>
      </CardContainer>
    </Page>
  );
}
