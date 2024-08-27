import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { groupCodeState } from "../state";
import { isCreatingGroup } from "../state/userState";
import { Button, Header, InfoText, PageContainer, RoomCodeInput } from "../styles";
import { emitAnalytic, generateGroupCode, MY_INFO_ROUTE, useIsMobile } from "../utils";

export function GroupPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const setUserGroupCode = useSetRecoilState(groupCodeState);
  const setIsCreatingGroup = useSetRecoilState(isCreatingGroup);

  const header = "Your Group";
  const info = "Enter a room code below to join an existing group:";
  const submitText = "Join group";
  const info2 = "Create new group"

  const onJoinGroup = () => {
    setIsCreatingGroup(false);
    emitAnalytic("Group joined");
    navigate(MY_INFO_ROUTE);
  }

  const onCreateGroup = () => {
    setIsCreatingGroup(true);
    const groupCode = generateGroupCode(4);
    setUserGroupCode(groupCode);
    // TODO: Check the backend for the existing group, and
    // pull down and save the group for some ongoing checks.
    // TODO: Create a group in the backend at this point,
    // so friends can fill out the survey at the same time.
    emitAnalytic("Group created");
    navigate(MY_INFO_ROUTE);
  }

  return (
    <PageContainer $isMobile={isMobile}>
      <Header>{header}</Header>
      <InfoText>{info}</InfoText>
      <RoomCodeInput type="text" size={6} maxLength={4}></RoomCodeInput>
      <Button onClick={onJoinGroup}>{submitText}</Button>
      <br/>
      <InfoText>or</InfoText>
      <Button $primary onClick={onCreateGroup}>{info2}</Button>
    </PageContainer>
  );
}
