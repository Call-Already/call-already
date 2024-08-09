import React from "react";
import TimezoneSelect, { type ITimezone } from "react-timezone-select";
import { useRecoilState } from "recoil";
import { timezoneState } from "../state";
import { Button, Header, PageContainer } from "../styles";
import { useIsMobile } from "../utils";

export function MyInfoPage() {
  const [timezone, setTimezone] = useRecoilState(timezoneState);
  const isMobile = useIsMobile();

  return (
    <PageContainer $isMobile={isMobile}>
      <Header>This is the MyInfo page</Header>
      <div className="select-wrapper">
        <TimezoneSelect value={timezone} onChange={setTimezone} />
      </div>
      <Button $primary></Button>
    </PageContainer>
  );
}
