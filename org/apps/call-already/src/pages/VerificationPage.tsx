import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ErrorObject, Page } from "../components";
import { verifyEmail, VerifyEmailProps } from "../gateways";
import { emailState, isVerifiedState, nicknameState } from "../state";
import { CardContainer, InfoText } from "../styles";
import { emitAnalytic, GROUP_ROUTE, MASCOTS, useIsMobile, WELCOME_ROUTE } from "../utils";

export function VerificationPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Used to pull the email verification params.
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<ErrorObject>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setNickname = useSetRecoilState(nicknameState);
  const setEmail = useSetRecoilState(emailState);
  const setIsVerified = useSetRecoilState(isVerifiedState);

  const header = "Verify your email";
  const infoText = "We have sent a verification link to the email you provided.";
  const infoText2 = "Click the link to verify your email, or return to the login page."

  const onReturn = () => {
    emitAnalytic("Confirmed times");
    navigate(GROUP_ROUTE);
  };

  useEffect(() => {
    if (searchParams) {
      const Email = searchParams.get("Email");
      const UserID = searchParams.get("UserID");

      if (Email && UserID) {
        const verifyEmailProps : VerifyEmailProps = {
          Email,
          UserID
        }

        setIsLoading(true);
        verifyEmail(verifyEmailProps)
          .then((response) => {
            setIsLoading(false);

            setNickname(response.data.Nickname);
            setEmail(response.data.Email);
            setIsVerified(response.data.IsVerified);

            navigate(WELCOME_ROUTE);
          })
          .catch((error) => {
            emitAnalytic("Unable to verify email");
            setError({message: "There was an error verifyng your email."});
          })
      }
    }
  }, []);

  return (
    <Page progress={0} iconClassNames={"fa-solid fa-envelope"} headerText={header} mascot={MASCOTS.Happy} isLoading={isLoading} error={error} setError={setError}>
      <CardContainer $isMobile={isMobile}>
        <InfoText>{infoText}</InfoText>
        <InfoText>{infoText2}</InfoText>
      </CardContainer>
    </Page>
  );
}
