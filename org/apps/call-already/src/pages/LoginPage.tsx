import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorObject, Page } from "../components";
import * as yup from "yup";
import {
  CardContainer,
  TextInput,
  FormLabel,
  Group,
  Button,
  Form,
  InfoText,
  InfoSubText,
  SmallHeader,
  SecondaryContainer,
} from "../styles";
import {
  emitAnalytic,
  HOME_ROUTE,
  MASCOTS,
  REGISTRATION_ROUTE,
  useIsMobile,
  WELCOME_ROUTE,
} from "../utils";
import { LoginProps, loginUser } from "../gateways";
import { useSetRecoilState } from "recoil";
import {
  authTokenState,
  emailState,
  isVerifiedState,
  nicknameState,
} from "../state";

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
  const disclaimerHeader = "Thanks for keeping us healthy!";
  const disclaimer1 = "We only require keeping an account in order to keep our email channels healthy from spam folders and bounces, which would deny us email access.";
  const disclaimer2 = "Your email will only be used to communicate call times to you. Will not share it, use it for promotional purposes or otherwise misuse it.";

  let schema = yup.object({
    Email: yup
      .string()
      .required("Email is required.")
      .email("Please provide a valid email address."),
    Password: yup.string().required("Password is required.").min(6).max(24),
  });

  async function onSubmit(e: any) {
    e.preventDefault();

    const email: string = e.target.email.value;
    const password: string = e.target.password.value;

    const formData: LoginProps = {
      Email: email,
      Password: password,
    };

    schema
      .validate(formData)
      .then(() => {
        setIsLoading(true);
        loginUser(formData)
          .then((response) => {
            setIsLoading(false);

            setNickname(response.data.User.Nickname);
            setEmail(response.data.User.Email);
            setIsVerified(response.data.User.IsVerified);
            setAuthToken(response.data.Token);

            emitAnalytic("Logged in");
            navigate(HOME_ROUTE, {
              state: {
                justLoggedIn: true,
              },
            });
          })
          .catch((error) => {
            setIsLoading(false);

            if (error.response) {
              const status = error.response.status;
              if (status === 400) {
                setError({ message: `Email ${email} does not exist.` });
                emitAnalytic("Email does not exist");
              } else if (status === 403) {
                setError({ message: "Please verify your email address." });
                emitAnalytic("Email is not verified");
              } else if (status === 404) {
                setError({ message: `Email and password do not match.` });
                emitAnalytic("Email and password do not match");
              } else {
                setError({ message: "There was an error logging you in." });
                emitAnalytic("Error logging in");
              }
            } else {
              setError({ message: "There was an error logging you in." });
              emitAnalytic("Error logging in");
            }
          });
      })
      .catch((schemaError) => {
        if (schemaError.errors[0]) {
          setError({ message: schemaError.errors[0] });
        }
      });
  }

  return (
    <Page
      progress={-1}
      iconClassNames={"fa-solid fa-right-to-bracket"}
      headerText={header}
      mascot={MASCOTS.Writing}
      isLoading={isLoading}
      error={error}
      setError={setError}
    >
      <CardContainer $isMobile={isMobile}>
        <Form onSubmit={onSubmit}>
          <FormLabel htmlFor="email">{email}</FormLabel>
          <TextInput type={"text"} name="email" id="email"></TextInput>
          <FormLabel htmlFor="password">{password}</FormLabel>
          <TextInput
            type={"password"}
            name="password"
            id="password"
          ></TextInput>
          <Group>
            <Button $primary type="submit">
              {logIn}
            </Button>
          </Group>
        </Form>
        <InfoText>
          <a style={{ color: "blue" }} href={REGISTRATION_ROUTE}>
            {registrationOptionText}
          </a>
        </InfoText>
        <SecondaryContainer $isMobile={isMobile}>
          <SmallHeader>
            <i className="fa-solid fa-users"></i>{`\t`}
            {disclaimerHeader}
          </SmallHeader>
          <InfoSubText $isMobile={isMobile}>
            {disclaimer1}
          </InfoSubText>
          <InfoSubText $isMobile={isMobile}>
            {disclaimer2}
          </InfoSubText>
      </SecondaryContainer>
      </CardContainer>
    </Page>
  );
}
