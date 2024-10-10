import React, { ChangeEvent, useEffect, useState } from "react";
import { PhoneInput } from "react-international-phone";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ErrorObject, MessageObject, Page } from "../components";
import { deleteUser, DeleteUserProps, getUser, GetUserProps, updateUser, UpdateUserProps } from "../gateways";
import { authTokenState, emailState, isOptedInToWhatsAppState, nicknameState, phoneNumberState } from "../state";
import { Button, CardContainer, DeleteButton, Form, FormLabel, Group, InfoSubText, InfoText, SecondaryContainer, SmallHeader, TextInput, theme, WhatsAppContainer } from "../styles";
import {
  emitAnalytic,
  useIsMobile,
  WELCOME_ROUTE,
} from "../utils";
import { MASCOTS } from "../utils/mascots";
import * as yup from "yup";
import { PhoneNumberUtil } from "google-libphonenumber";

export function SettingsPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const [message, setMessage] = useState<MessageObject>({});
  const [error, setError] = useState<ErrorObject>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [goodbyeText, setGoodbyeText] = useState("");
  const [phone, setPhone] = useState("");

  const userEmail = useRecoilValue(emailState);
  const nicknameValue = useRecoilValue(nicknameState);
  const isOptedInToWhatsAppValue = useRecoilValue(isOptedInToWhatsAppState);
  const setAuthTokenState = useSetRecoilState(authTokenState);
  const setPhoneNumberState = useSetRecoilState(phoneNumberState);
  const setNicknameState = useSetRecoilState(nicknameState);
  const setIsOptedInToWhatsAppState = useSetRecoilState(isOptedInToWhatsAppState);

  const header = "Settings";
  const email = "Email";
  const nickname = "Nickname";
  const submitText = "Update";
  const deleteAcctText = "Delete";
  const deleteAcct = `Delete account (type "goodbye")`;
  const deleteAcctInfo = "This will permanently remove your profile and any associated call history and contact information from Call Already.";
  const whatsAppHeader = "WhatsApp";
  const optInMessage = "Opt in to WhatsApp messaging";
  const logoutOptionText = "Log out";
  const whatsAppNumValidText = "Please enter a valid phone number or leave it blank.";

  const nicknameRegExp = /^[a-zA-Z0-9]{2,16}$/;

  let schema = yup.object({
    Nickname: yup
      .string()
      .required("Nickname is required.")
      .min(2)
      .max(16)
      .matches(nicknameRegExp, {
        message: "Please enter a valid nickname.",
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

  useEffect(() => {
    const getUserProps : GetUserProps = {
      Email: userEmail,
    };
    console.log("useEffect");
    setIsLoading(true);
    getUser(getUserProps)
      .then((response) => {
        setIsLoading(false);
        setNicknameState(response.data.Nickname);
        setPhone(response.data.PhoneNumber);
        setIsOptedInToWhatsAppState(response.data.IsOptedInToWhatsApp);
      })
      .catch((error) => {
        setIsLoading(false);
        emitAnalytic("Settings getUser failed");
        setError({
          message: `We could not retrieve your account details.`
        });
      });
  }, []);
  
  const onSubmit = (e: any) => {
    e.preventDefault();

    const validPhoneNumber = isPhoneValid(phone);

    if (phone.length > 4 && !validPhoneNumber) {
      setError({ message: whatsAppNumValidText });
      return;
    }

    const nicknameInput: string = e.target.nickname.value;
    const whatsAppOptInInput: boolean = e.target.whatsAppOptIn.checked;

    const updateUserProps : UpdateUserProps = {
      Email: userEmail,
      Nickname: nicknameInput,
      PhoneNumber: phone,
      IsOptedInToWhatsApp: whatsAppOptInInput,
    };

    schema.validate(updateUserProps)
      .then(() => {
        setIsLoading(true);
        updateUser(updateUserProps)
          .then((response) => {
            setIsLoading(false);
            emitAnalytic("Settings updated");
            setMessage({ message: "Your settings have been updated." });
            setError({});
            setNicknameState(nicknameInput);
            setIsOptedInToWhatsAppState(whatsAppOptInInput);
            setPhoneNumberState(phone);
          })
          .catch((error) => {
            setIsLoading(false);
            emitAnalytic("Update settings failed");
            setError({
              message: `Your account could not be updated. Please contact support.`
            });
            setMessage({});
          });
      })
      .catch((schemaError) => {
        if (schemaError.errors[0]) {
          setError({ message: schemaError.errors[0] });
        }
      });
  };

  const onDelete = () => {
    if (goodbyeText === "goodbye") {
      const deleteUserProps : DeleteUserProps = {
        Email: userEmail,
      };

    setIsLoading(true);
    deleteUser(deleteUserProps)
      .then(() => {
        setIsLoading(false);
        emitAnalytic("Account deleted");
        logOut();
      }).catch((error) => {
        setIsLoading(false);
        emitAnalytic("Account deletion failed");
        setError({
          message: `We could not delete your account. Please contact support.`,
        });
      });
    }
  };

  const logOut = () => {
    emitAnalytic("Log out");
    setAuthTokenState("");
    navigate(WELCOME_ROUTE);
  };

  const goodbyeTextUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setGoodbyeText(e.target.value);
  };

  const isDeleteEnabled = (text: string) => {
    return text === "goodbye" ? true : false;
  }

  return (
    <Page
      progress={-1}
      iconClassNames="fa-solid fa-gear"
      headerText={header}
      mascot={MASCOTS.Confused}
      error={error}
      setError={setError}
      isLoading={isLoading}
      message={message}
      setMessage={setMessage}
    >
      <CardContainer $isMobile={isMobile}>
        <Form onSubmit={onSubmit}>
          <FormLabel htmlFor="email">{email}</FormLabel>
          <TextInput defaultValue={userEmail} type={"text"} name="email" id="email" disabled style={{background: theme.general.light}}></TextInput>
          <br />
          <FormLabel htmlFor="nickname">{nickname}</FormLabel>
          <TextInput defaultValue={nicknameValue} type={"text"} name="nickname" id="nickname"></TextInput>
          <br />
          <FormLabel htmlFor="phoneNumber">
            <i className="fa-brands fa-whatsapp"></i>{`\t`}
            {whatsAppHeader}
          </FormLabel>
          <PhoneInput
            inputStyle={{width: "180px"}}
            name="phoneNumber"
            defaultCountry="usa"
            value={phone}
            onChange={(phone: string) => setPhone(phone)}
          />
          <div style={{display: "flex", alignItems: "stretch", gap: "1em", marginTop: "0.4em"}}>
            <InfoText style={{margin: "auto"}}>{optInMessage}</InfoText>
            <label className="switch">
              <input defaultChecked={isOptedInToWhatsAppValue} type="checkbox" name="whatsAppOptIn" />
              <span className="slider round"></span>
            </label>
          </div>
          <br />
          <FormLabel htmlFor="delete">{deleteAcct}</FormLabel>
          <Group $isMobile={isMobile}>
            <TextInput onInput={(event: React.ChangeEvent<HTMLInputElement>) => goodbyeTextUpdate(event)} style={{width: "11em"}} type={"text"} name="delete" id="delete"></TextInput>
            <DeleteButton $isEnabled={isDeleteEnabled(goodbyeText)} onClick={onDelete} disabled={!isDeleteEnabled(goodbyeText)}>
              {deleteAcctText}
            </DeleteButton>
          </Group>
          <InfoSubText style={{marginTop: "0.4em"}} $isMobile={isMobile}>{deleteAcctInfo}</InfoSubText>
          <Button $primary type="submit">
            {submitText}
          </Button>
          <br />
          <InfoText>
            <a style={{ color: "blue" }} href={""} onClick={logOut}>
              {logoutOptionText}
            </a>
          </InfoText>
        </Form>
      </CardContainer>
    </Page>
  );
}
