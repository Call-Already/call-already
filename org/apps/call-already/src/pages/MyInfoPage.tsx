import React from "react";
import TimezoneSelect, { type ITimezone } from "react-timezone-select";
import { useRecoilState } from "recoil";
import { timezoneState } from "../state";

export function MyInfoPage() {
  const [timezone, setTimezone] = useRecoilState(timezoneState);

  return (
    <>
      <h1>This is the MyInfo page</h1>
      <div className="select-wrapper">
        <TimezoneSelect value={timezone} onChange={setTimezone} />
      </div>
    </>
  );
}
