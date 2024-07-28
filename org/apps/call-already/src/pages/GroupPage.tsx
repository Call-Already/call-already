import React from "react";
import { Header, InfoText, PageContainer } from "../styles";
import { useIsMobile } from "../utils";

export function GroupPage() {
  const isMobile = useIsMobile();

  return (
    <PageContainer $isMobile={isMobile}>
      <Header>This is the Group page</Header>
      <InfoText>Under construction!</InfoText>
    </PageContainer>
  );
}
