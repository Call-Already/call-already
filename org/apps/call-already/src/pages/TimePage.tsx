import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TimeButton } from "../components";
import { date1State, date2State, selectedTimesState, timezoneState } from "../state";
import { Button, Header, InfoText, PageContainer } from "../styles";
import { getLocalizedTimeInputs, getUniversalTimeInputs, useIsMobile, isDaytimeHours, emitAnalytic, REVIEW_ROUTE } from "../utils";

export function TimePage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const date1 = useRecoilValue(date1State);
  const date2 = useRecoilValue(date2State);
  const timezone = useRecoilValue(timezoneState);
  const setSelectedTimesState = useSetRecoilState(selectedTimesState);

  const header = "Select times";

  // Load in the correct time ranges for the call
  // localized to the user and based on
  // Coordinated Universal Time UTC+0.
  const utcTimes = getUniversalTimeInputs(date1);
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

  const toggleColor = (utcTime: string) => {
    const button : HTMLElement | null = document.getElementById(`${utcTime}`);
    if (button !== null) {
      if (button.style.background !== "green") {
        button.style.background = "green";
      } else {
        button.style.background = "white";
      }
    }
  }

  // Create a list of time selector buttons.
  for (var i = 0; i < localTimes.length; i++) {
    const utcTime = utcTimes[i];
    const localTime = localTimes[i];
    const button = <TimeButton key={utcTime}
      id={utcTime}
      onClick={() => {
        onTimeSelected(utcTime)
        toggleColor(utcTime)
      }}
      title={moment(localTime).tz(timezone.value).format('ha')} />
    timeSelectors.push(button);
  }

  const onSubmit = () => {
    setSelectedTimesState(selectedTimes);
    emitAnalytic("Times submitted");
    navigate(REVIEW_ROUTE);
  };

  let currentDay = "";
  return (
    <PageContainer $isMobile={isMobile}>
      <Header>{header}</Header>
      <InfoText>Showing times local to you in {timezone.value}</InfoText>
      {
        timeSelectors.map((button) => {
          const localMoment = moment(button.key).tz(timezone.value);
          const localTime = localMoment.format('ha');
          const localDay = localMoment.format('ll');
          if (isDaytimeHours(localTime)) {
            if (localDay !== currentDay) {
              currentDay = localDay;
              return (
                <>
                  <p>{localDay}</p>
                  {button}
                </>
              )
            } else {
              return button;
            }
          } else {
            return <></>;
          }
        })
      }
      <Button onClick={onSubmit}>Submit</Button>
    </PageContainer>
  );
}
