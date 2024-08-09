import React from "react";
import { Header, PageContainer } from "../styles";
import { useIsMobile } from "../utils";

export function ConfirmationPage() {
  const isMobile = useIsMobile();

  return (
    <PageContainer $isMobile={isMobile}>
      <Header>This is the Confirmation page</Header>
    </PageContainer>
  );
}
