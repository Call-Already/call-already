import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorObject, Page } from "../components";
import * as yup from 'yup';
import {
  CardContainer,
  TextInput,
  FormLabel,
  Group,
  Button,
  Form,
  InfoText,
} from "../styles";
import { emitAnalytic, MASCOTS, REGISTRATION_ROUTE, useIsMobile, WELCOME_ROUTE } from "../utils";
import { LoginProps, loginUser } from "../gateways";
import { useSetRecoilState } from "recoil";
import { authTokenState, emailState, isVerifiedState, nicknameState } from "../state";

export function LoginPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const [error, setError] = useState<ErrorObject>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setNickname = useSetRecoilState(nicknameState);
  const setEmail = useSetRecoilState(emailState);
  const setIsVerified = useSetRecoilState(isVerifiedState);
  const setAuthToken = useSetRecoilState(authTokenState);

  const header = "Log in";
  const email = "Email";
  const password = "Password";
  const logIn = "Log in";
  const registrationOptionText = "Or visit here to register.";

  let schema = yup.object({
    Email: yup.string()
      .required("Email is required.")
      .email("Please provide a valid email address."),
    Password: yup.string()
      .required("Password is required.")
      .min(6)
      .max(24)
  });

  async function onSubmit(e: any) {
    e.preventDefault();

    const email : string = e.target.email.value;
    const password : string = e.target.password.value;

    const formData : LoginProps = {
      Email: email,
      Password: password,
    };

    schema.validate(formData)
      .then(() => {

        setIsLoading(true);
        loginUser(formData)
          .then((response) => {
            setIsLoading(false);

            console.log(response);

            setNickname(response.data.User.Nickname);
            setEmail(response.data.User.Email);
            setIsVerified(response.data.User.IsVerified);
            setAuthToken(response.data.Token);

            emitAnalytic("Logged in");
            navigate(WELCOME_ROUTE);
          })
          .catch((error) => {
            setIsLoading(false);

            if (error.response) {
              const status = error.response.status;
              if (status === 400) {
                setError({message: `Email does not exist.`});
                emitAnalytic("Email does not exist");
              } else if (status === 404) {
                setError({message: `Email and password do not match.`});
                emitAnalytic("Email and password do not match");
              } else {
                setError({message: "There was an error logging you in."});
                emitAnalytic("Error logging in");
              }
            } else {
              setError({message: "There was an error logging you in."});
              emitAnalytic("Error logging in");
            }
          })
      })
      .catch((schemaError) => {
        if (schemaError.errors[0]) {
          setError({message: schemaError.errors[0]});
        }
      })
  };

  return (
    <Page progress={0} iconClassNames={"fa-solid fa-right-to-bracket"} headerText={header} mascot={MASCOTS.Writing} isLoading={isLoading} error={error} setError={setError}>
      <CardContainer $isMobile={isMobile}>
        <Form onSubmit={onSubmit}>
          <FormLabel htmlFor="email">{email}</FormLabel>
          <TextInput type={"text"} name="email" id="email"></TextInput>
          <FormLabel htmlFor="password">{password}</FormLabel>
          <TextInput type={"password"} name="password" id="password"></TextInput>
          <Group>
            <Button $primary type="submit">{logIn}</Button>
          </Group>
          <br />
          <InfoText><a style={{color: "black"}}href={REGISTRATION_ROUTE}>{registrationOptionText}</a></InfoText>
        </Form>
      </CardContainer>
    </Page>
  );
}
