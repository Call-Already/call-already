import moment, { utc } from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Banner, ErrorObject, IconHeader, Progress, TimeButton } from "../components";
import { selectedDaysState, selectedTimesState, timezoneState } from "../state";
import {
  Button,
  CardContainer,
  CheckboxInput,
  Group,
  Header,
  InfoText,
  PageContainer,
  palette,
} from "../styles";
import {
  getLocalizedTimeInputs,
  getUniversalTimeInputs,
  useIsMobile,
  isDaytimeHours,
  emitAnalytic,
  REVIEW_ROUTE,
} from "../utils";

export function TimePage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const selectedDays = useRecoilValue(selectedDaysState);
  const timezone = useRecoilValue(timezoneState);
  const setSelectedTimesState = useSetRecoilState(selectedTimesState);

  const [error, setError] = useState<ErrorObject>({});

  const header = "Select times";

  // Load in the correct time ranges for the call
  // localized to the user and based on
  // Coordinated Universal Time UTC+0.
  const utcTimes = getUniversalTimeInputs(selectedDays);
  const localTimes = getLocalizedTimeInputs(utcTimes, timezone.value);

  const timeSelectors = [];
  const selectedTimes = new Set<string>();

  const onTimeSelected = (utcTime: string) => {
    if (selectedTimes.has(utcTime)) {
      selectedTimes.delete(utcTime);
    } else {
      selectedTimes.add(utcTime);
    }
  };

  // Function for toggling the background of a TimeButton.
  const toggleColor = (utcTime: string) => {
    const button: HTMLElement | null = document.getElementById(`${utcTime}`);
    if (button !== null) {
      if (button.style.background !== palette.primary[200]) {
        button.style.background = palette.primary[300];
      } else {
        button.style.background = palette.primary[200];
      }
    }
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
        onClick={() => {
          onTimeSelected(utcTime);
          toggleColor(utcTime);
        }}
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
    <PageContainer $isMobile={isMobile}>
      <Progress progress={3} />
      <IconHeader iconClassNames="fa-solid fa-clock" text={header} />
      {error.message && <Banner message={error.message} onClose={() => setError({})} />}
      <InfoText>Showing times local to you in {timezone.value}</InfoText>
      <CardContainer $isMobile={isMobile}>
        <Group>
          <CheckboxInput id="showNightTimes" type="checkbox"></CheckboxInput>
          <InfoText>
            Show night times
          </InfoText> 
        </Group>
        {timeSelectors.map((button) => {
          const localMoment = moment(button.key).tz(timezone.value);
          const localTime = localMoment.format("ha");
          const localDay = localMoment.format("ll");
          if (isDaytimeHours(localTime)) {
            if (localDay !== currentDay) {
              currentDay = localDay;
              return (
                <>
                  <p>{localDay}</p>
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
        <Button onClick={onSubmit}>Submit</Button>
      </CardContainer>
    </PageContainer>
  );
}
