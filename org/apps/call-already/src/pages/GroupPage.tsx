import React from "react";
import { Header, InfoText, Mascot, PageContainer } from "../styles";
import { useIsMobile } from "../utils";

export function GroupPage() {
  const isMobile = useIsMobile();

  return (
    <PageContainer $isMobile={isMobile}>
      <Header>This is the Group page</Header>
      <Mascot src={"/mascot_think.png"} alt="logo" />
      <InfoText>Under construction!</InfoText>
    </PageContainer>
  );
}
