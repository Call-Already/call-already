import React from "react";
import TimezoneSelect, { type ITimezone } from "react-timezone-select";
import { useRecoilState } from "recoil";
import { timezoneState } from "../state";
import { PageContainer } from "../styles";
import { useIsMobile } from "../utils";

export function MyInfoPage() {
  const isMobile = useIsMobile();

  const [timezone, setTimezone] = useRecoilState(timezoneState);

  return (
    <PageContainer $isMobile={isMobile}>
      <h1>This is the MyInfo page</h1>
      <div className="select-wrapper">
        <TimezoneSelect value={timezone} onChange={setTimezone} />
      </div>
    </PageContainer>
  );
}
