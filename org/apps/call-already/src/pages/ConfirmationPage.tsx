import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Footer, MessageObject, Page } from "../components";
import { CodeClipboard } from "../components/CodeClipboard";
import { groupCodeState } from "../state";
import { Button, CardContainer, InfoText } from "../styles";
import { emitAnalytic, HOME_ROUTE, MASCOTS, useIsMobile } from "../utils";

export function ConfirmationPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const groupCode = useRecoilValue(groupCodeState);

  const [message, setMessage] = useState<MessageObject>({
    message: "Show footer",
  });

  const header = "Responses confirmed";
  const introText =
    "Thank you! We have confirmed your responses. We’ll match your availability with your friends' schedules and provide you with the optimal time to call each other. A summary will be sent to your email shortly.";
  const groupCodeReminder =
    "Remember to share the group code with your friends!";
  const submitText = "Home";

  const onReturn = () => {
    emitAnalytic("Confirmed times");
    navigate(HOME_ROUTE);
  };

  return (
    <>
      <Page
        progress={4}
        iconClassNames={"fa-solid fa-circle-check"}
        headerText={header}
        mascot={MASCOTS.Happy}
        isLoading={false}
      >
        <CardContainer $isMobile={isMobile}>
          <InfoText>{introText}</InfoText>
          <InfoText>{groupCodeReminder}</InfoText>
          <CodeClipboard groupCode={groupCode} />
          <Button $primary onClick={onReturn}>
            <i className="fa-solid fa-home"></i>{`\t`}
            {submitText}
          </Button>
        </CardContainer>
      </Page>
      {message.message && <Footer onClose={() => setMessage({})} />}
    </>
  );
}
