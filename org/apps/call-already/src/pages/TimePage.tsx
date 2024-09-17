import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ErrorObject, Page, TimeButton } from "../components";
import { selectedDaysState, selectedTimesState, timezoneState } from "../state";
import {
  Button,
  CardContainer,
  CheckboxInput,
  Group,
  InfoText,
  palette,
  theme,
  TimeContainer,
  SmallHeader,
} from "../styles";
import {
  getLocalizedTimeInputs,
  getUniversalTimeInputs,
  useIsMobile,
  isDaytimeHours,
  emitAnalytic,
  REVIEW_ROUTE,
  MASCOTS,
} from "../utils";

export function TimePage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const selectedDays = useRecoilValue(selectedDaysState);
  const timezone = useRecoilValue(timezoneState);
  const setSelectedTimesState = useSetRecoilState(selectedTimesState);

  const [error, setError] = useState<ErrorObject>({});
  const [showNightTimes, setShowNightTimes] = useState<Boolean>(false);

  const header = "Select times";
  const infoText = "These are the times you're available for a call. Select as many as possible and let's make this thing happen!";
  const showNightText = "Show night times";

  // Load in the correct time ranges for the call
  // localized to the user and based on
  // Coordinated Universal Time UTC+0.
  const utcTimes = getUniversalTimeInputs(selectedDays);
  const localTimes = getLocalizedTimeInputs(utcTimes, timezone.value);

  const timeSelectors = [];
  const selectedTimes = new Set<string>();

  // Function for toggling the background of a TimeButton.
  const toggleTime = (utcTime: string) => {
    if (selectedTimes.has(utcTime)) {
      selectedTimes.delete(utcTime);
    } else {
      selectedTimes.add(utcTime);
    }

    const timeIsSelected = selectedTimes.has(utcTime);

    const button: HTMLElement | null = document.getElementById(`${utcTime}`);
    if (button !== null) {
      if (timeIsSelected) {
        button.style.background = theme.time.active;
      } else {
        button.style.background = theme.time.background;
      }
    }
  };

  // Function for toggling night times display.
  const toggleShowNightTimes = () => {
    var checked = (
      document.getElementById("showNightTimes") as HTMLInputElement
    ).checked;

    setShowNightTimes(checked);
  };

  // Create a list of time selector buttons.
  for (var i = 0; i < localTimes.length; i++) {
    // Key of the button is set to UTC time.
    const utcTime = utcTimes[i];
    // Title of the button is set to the local time.
    const localTime = moment(utcTime).tz(timezone.value).format("ha");
    // Determines the icon for the time button.
    const isDaytime = isDaytimeHours(localTime);
    const button = (
      <TimeButton
        key={utcTime}
        id={utcTime}
        onClick={() => toggleTime(utcTime)}
        isDaytime={isDaytime}
        title={localTime}
      />
    );
    timeSelectors.push(button);
  }

  const onSubmit = () => {
    const selectedTimesList = Array.from(selectedTimes);
    if (selectedTimesList.length > 0) {
      setSelectedTimesState(selectedTimesList);
      emitAnalytic("Times submitted");
      navigate(REVIEW_ROUTE);
    } else {
      setError({message: "Please provide at least one time you're available."});
    }
  };

  let currentDay = "";
  return (
    <Page progress={4} iconClassNames={"fa-solid fa-clock"} headerText={header} mascot={MASCOTS.Writing} isLoading={false} error={error} setError={setError}>
      <CardContainer $isMobile={isMobile}>
        <InfoText>{infoText}</InfoText>
        <Group>
          <CheckboxInput onClick={toggleShowNightTimes} id="showNightTimes" type="checkbox"></CheckboxInput>
          <InfoText>
            {showNightText}
          </InfoText> 
        </Group>
        <InfoText><strong>Showing times local to you in {timezone.value}</strong></InfoText>
        <TimeContainer>
        {
          timeSelectors.map((button) => {
          const localMoment = moment(button.key).tz(timezone.value);
          const localTime = localMoment.format("ha");
          const localDay = localMoment.format("ll");
          if (isDaytimeHours(localTime) || showNightTimes) {
            // A new day - label it with a header.
            if (localDay !== currentDay) {
              currentDay = localDay;
              return (
                <>
                  <SmallHeader>{localDay}</SmallHeader>
                  {button}
                </>
              );
            } else {
              return button;
            }
          } else {
            return <></>;
          }
        })}
        </TimeContainer>
        <Button onClick={onSubmit}>Submit</Button>
      </CardContainer>
    </Page>
  );
}
