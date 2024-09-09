import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorObject, Page } from "../components";
import {
  InfoText,
  CardContainer,
  TextInput,
  FormLabel,
} from "../styles";
import { emitAnalytic, MASCOTS, TIME_ROUTE, useIsMobile } from "../utils";
import { isValidNickname } from "../utils/validation";

export function LoginPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const [error, setError] = useState<ErrorObject>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const header = "Log in";
  const email = "Email";
  const password = "Password";
  const provideNicknameText = "Please provide a valid nickname.";
  const loginText = "Log in";
  const createAccountText = "Create account";

  const onSubmitInfo = () => {
    // const nicknameValue = (
    //   document.getElementById("nickname") as HTMLInputElement
    // ).value;

    emitAnalytic("Logged in");
    navigate(TIME_ROUTE);
  };

  return (
    <Page progress={0} iconClassNames={"fa-solid fa-right-to-bracket"} headerText={header} mascot={MASCOTS.Writing} isLoading={isLoading} error={error} setError={setError}>
      <CardContainer $isMobile={isMobile}>
        <FormLabel htmlFor="email">{email}</FormLabel>
        <TextInput type={"text"} id="email"></TextInput>
        <FormLabel htmlFor="password">{password}</FormLabel>
        <TextInput type={"text"} id="password"></TextInput>
      </CardContainer>
    </Page>
  );
}
