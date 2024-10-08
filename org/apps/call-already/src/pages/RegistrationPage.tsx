import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorObject, Page } from "../components";
import { PhoneInput } from 'react-international-phone';
import { PhoneNumberUtil } from 'google-libphonenumber';
import * as yup from "yup";
import "yup-phone";
import {
  CardContainer,
  TextInput,
  FormLabel,
  Group,
  Button,
  Form,
  InfoText,
  SmallHeader,
  SecondaryContainer,
  CheckboxInput,
  WhatsAppContainer,
} from "../styles";
import {
  emitAnalytic,
  LOGIN_ROUTE,
  MASCOTS,
  useIsMobile,
  VERIFICATION_ROUTE,
} from "../utils";
import { register, RegisterProps } from "../gateways";

import 'react-international-phone/style.css';

export function RegistrationPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const [error, setError] = useState<ErrorObject>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [consentWhatsApp, setConsentWhatsApp] = useState<Boolean>(false);
  const [phone, setPhone] = useState("");

  const header = "Register";
  const nickname = "Nickname";
  const email = "Email";
  const password = "Password";
  const createAccount = "Register";
  const passwordStrongerText = "Please create a stronger password";
  const loginOptionText = "Or visit here to log in.";
  const whatsAppHeader = "WhatsApp";
  const whatsAppText = "(Optional) Enter your WhatsApp number to receive call information directly in your chat.";
  const whatsAppConsentText = `I consent to receiving updates\nvia WhatsApp.`;
  const whatsAppNumValidText = "Please enter a valid phone number or leave it blank.";
  const mustConsentWhatsAppText = "Please consent to receiving WhatsApp messages.";

  const nicknameRegExp = /^[a-zA-Z0-9]{2,16}$/;
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

  let schema = yup.object({
    Nickname: yup
      .string()
      .required("Nickname is required.")
      .min(2)
      .max(16)
      .matches(nicknameRegExp, {
        message: "Please enter a valid nickname.",
      }),
    Email: yup
      .string()
      .required("Email is required.")
      .email("Please provide a valid email address."),
    Password: yup
      .string()
      .required("Password is required.")
      .min(6)
      .max(24)
      .matches(passwordRules, {
        message: passwordStrongerText,
      }),
  });

  const phoneUtil = PhoneNumberUtil.getInstance();

  const isPhoneValid = (phone: string) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };

  // Function for toggling night times display.
  const toggleWhatsAppConsent = () => {
    var checked = (
      document.getElementById("consentWhatsApp") as HTMLInputElement
    ).checked;

    setConsentWhatsApp(checked);
  }

  async function onSubmit(e: any) {
    e.preventDefault();

    const nickname: string = e.target.nickname.value;
    const email: string = e.target.email.value;
    const password: string = e.target.password.value;

    const validPhoneNumber = isPhoneValid(phone);

    if (phone.length > 4 && !validPhoneNumber) {
      setError({ message: whatsAppNumValidText });
      return;
    }

    if (validPhoneNumber && !consentWhatsApp) {
      setError({ message: mustConsentWhatsAppText });
      return;
    }

    const isOptedInToWhatsApp = validPhoneNumber && consentWhatsApp;

    const formData: RegisterProps = {
      Nickname: nickname,
      Email: email,
      Password: password,
      PhoneNumber: validPhoneNumber ? phone : "",
      IsOptedInToWhatsApp: isOptedInToWhatsApp
    };

    schema
      .validate(formData)
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
                setError({
                  message: `User with email ${email} already exists.`,
                });
              } else {
                emitAnalytic("Unable to register");
                setError({ message: "There was an error registering." });
              }
            } else {
              emitAnalytic("Unable to register");
              setError({ message: "There was an error registering." });
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
          <FormLabel htmlFor="nickname">{nickname}</FormLabel>
          <TextInput type={"text"} name="nickname" id="nickname"></TextInput>
          <FormLabel htmlFor="email">{email}</FormLabel>
          <TextInput type={"text"} name="email" id="email"></TextInput>
          <FormLabel htmlFor="password">{password}</FormLabel>
          <TextInput
            type={"password"}
            name="password"
            id="password"
          ></TextInput>
          <hr />
          <WhatsAppContainer $isMobile={isMobile}>
            <SmallHeader>
              <i className="fa-brands fa-whatsapp"></i>{`\t`}
              {whatsAppHeader}
            </SmallHeader>
            <InfoText>
              {whatsAppText}
            </InfoText>
            <PhoneInput
              inputStyle={{width: "180px"}}
              name="phoneNumber"
              defaultCountry="usa"
              value={phone}
              onChange={(phone: string) => setPhone(phone)}
            />
            <br />
            <Group $isMobile={isMobile} style={{gap: "0.2em"}}>
              <CheckboxInput
                onClick={toggleWhatsAppConsent}
                name="consentWhatsApp"
                id="consentWhatsApp"
                type="checkbox"></CheckboxInput>
              <InfoText>{whatsAppConsentText}</InfoText>
          </Group>
          </WhatsAppContainer>
          <Group>
            <Button $primary type="submit">
              {createAccount}
            </Button>
          </Group>
          <br />
          <InfoText>
            <a style={{ color: "blue" }} href={LOGIN_ROUTE}>
              {loginOptionText}
            </a>
          </InfoText>
        </Form>
      </CardContainer>
    </Page>
  );
}
