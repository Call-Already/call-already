import moment from "moment";
import React from "react";
import { useRecoilValue } from "recoil";
import { date1State, date2State, timezoneState } from "../state";
import { Header, PageContainer, TimeButton } from "../styles";
import { getLocalizedTimeInputs, getUniversalTimeInputs, useIsMobile } from "../utils";
import { isDaytimeHours } from "../utils/utils";

export function TimePage() {
  const isMobile = useIsMobile();

  const date1 = useRecoilValue(date1State);
  const date2 = useRecoilValue(date2State);
  const timezone = useRecoilValue(timezoneState);

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
    console.log(selectedTimes);
  };

  // Create a list of time selector buttons.
  for (var i = 0; i < localTimes.length; i++) {
    const utcTime = utcTimes[i];
    const localTime = localTimes[i];
    const button = <TimeButton 
      key={utcTime}
      onClick={() => onTimeSelected(utcTime)}>
      {moment(localTime).tz(timezone.value).format('ha')}
    </TimeButton>;
    timeSelectors.push(button);
  }

  return (
    <PageContainer $isMobile={isMobile}>
      <Header>{header}</Header>
      {
        timeSelectors.map((button) => {
          const localTime = moment(button.key).tz(timezone.value).format('ha');
          if (isDaytimeHours(localTime)) {
            return button;
          } else {
            return <></>;
          }
        })
      }
    </PageContainer>
  );
}
