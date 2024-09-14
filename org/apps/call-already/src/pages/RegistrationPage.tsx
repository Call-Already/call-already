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
import { emitAnalytic, LOGIN_ROUTE, MASCOTS, useIsMobile, VERIFICATION_ROUTE } from "../utils";
import { register, RegisterProps } from "../gateways";

export function RegistrationPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const [error, setError] = useState<ErrorObject>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const header = "Register";
  const nickname = "Nickname";
  const email = "Email";
  const password = "Password";
  const createAccount = "Register";
  const passwordStrongerText = "Please create a stronger password";
  const loginOptionText = "Or visit here to log in.";

  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

  let schema = yup.object({
    Nickname: yup.string()
      .required("Nickname is required.")
      .min(2)
      .max(16)
      .matches(/^[a-zA-Z0-9]{2,16}$/, {
        message: "Please enter a valid nickname."
      }),
    Email: yup.string()
      .required("Email is required.")
      .email("Please provide a valid email address."),
    Password: yup.string()
      .required("Password is required.")
      .min(6)
      .max(24)
      .matches(passwordRules, {
        message: passwordStrongerText,
      }),
  });

  async function onSubmit(e: any) {
    e.preventDefault();

    const nickname: string = e.target.nickname.value;
    const email : string = e.target.email.value;
    const password : string = e.target.password.value;

    const formData : RegisterProps = {
      Nickname: nickname,
      Email: email,
      Password: password,
    };

    schema.validate(formData)
      .then(() => {
        setIsLoading(true);

        register(formData)
          .then(() => {
            setIsLoading(false);

            emitAnalytic("Registered");
            navigate(VERIFICATION_ROUTE);
          })
          .catch((error) => {
            setIsLoading(false);
            if (error.response) {
              const status = error.response.status;
              if (status === 400) {
                emitAnalytic("User already exists");
                setError({message: `User with email ${email} already exists.`});
              } else {
                emitAnalytic("Unable to register");
                setError({message: "There was an error registering."});
              }
            } else {
              emitAnalytic("Unable to register");
              setError({message: "There was an error registering."});
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
    <Page progress={-1} iconClassNames={"fa-solid fa-right-to-bracket"} headerText={header} mascot={MASCOTS.Writing} isLoading={isLoading} error={error} setError={setError}>
      <CardContainer $isMobile={isMobile}>
        <Form onSubmit={onSubmit}>
          <FormLabel htmlFor="nickname">{nickname}</FormLabel>
          <TextInput type={"text"} name="nickname" id="nickname"></TextInput>
          <FormLabel htmlFor="email">{email}</FormLabel>
          <TextInput type={"text"} name="email" id="email"></TextInput>
          <FormLabel htmlFor="password">{password}</FormLabel>
          <TextInput type={"password"} name="password" id="password"></TextInput>
          <Group>
            <Button $primary type="submit">{createAccount}</Button>
          </Group>
          <br/>
          <InfoText><a style={{color: "black"}} href={LOGIN_ROUTE}>{loginOptionText}</a></InfoText>
          <InfoText><i className="fa-brands fa-whatsapp"></i>  WhatsApp coming soon!</InfoText>
        </Form>
      </CardContainer>
    </Page>
  );
}
