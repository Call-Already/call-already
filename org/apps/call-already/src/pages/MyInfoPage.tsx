import React from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import TimezoneSelect from "react-timezone-select";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { groupCodeState, nicknameState, timezoneState } from "../state";
import { date1State, date2State } from "../state/userState";
import { Clipboard, Button, FormLabel, Header, PageContainer, TextInput, Mascot } from "../styles";
import { emitAnalytic, TIME_ROUTE, useIsMobile } from "../utils";

import "react-datepicker/dist/react-datepicker.css";

export function MyInfoPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const groupCode = useRecoilValue(groupCodeState);
  const setNickname = useSetRecoilState(nicknameState);
  const [timezone, setTimezone] = useRecoilState(timezoneState);

  const [date1, setDate1] = useRecoilState(date1State);
  const [date2, setDate2] = useRecoilState(date2State);

  const header = "My Information";
  const codeText = "Your group code:";
  const copyText = "Copy code";
  const submit = "Submit";

  const onSubmitInfo = () => {
    setNickname("");
    console.log(date1);
    console.log(date2);
    emitAnalytic("My info submitted");
    navigate(TIME_ROUTE);
  }

  const onCopyCode = () => {navigator.clipboard.writeText(groupCode)}

  return (
    <PageContainer $isMobile={isMobile}>
      <Header>{header}</Header>
      <Mascot src={"/writing.png"} alt="logo" />
      <FormLabel htmlFor="clipboard">{codeText}</FormLabel>
      <Clipboard id="clipboard">{groupCode}</Clipboard>
      <Button onClick={onCopyCode}>{copyText}</Button>
      <FormLabel htmlFor="nickname">Nickname</FormLabel>
      <TextInput id="nickname" type="text"></TextInput>
      <FormLabel htmlFor="timezone">Timezone</FormLabel>
      <TimezoneSelect id="timezone" value={timezone} onChange={setTimezone} />

      <FormLabel htmlFor="date">Call Date</FormLabel>
      <DatePicker id="date" selected={date1} onChange={(date) => setDate1(date)} />
      <DatePicker selected={date2} onChange={(date) => setDate2(date)} />

      <Button $primary onClick={onSubmitInfo}>{submit}</Button>
    </PageContainer>
  );
}
