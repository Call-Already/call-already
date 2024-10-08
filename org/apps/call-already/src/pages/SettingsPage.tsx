import React, { useEffect, useState } from "react";
import { PhoneInput } from "react-international-phone";
import { useNavigate } from "react-router-dom";
import { Page } from "../components";
import { Button, CardContainer, DeleteButton, FormLabel, Group, InfoSubText, InfoText, SecondaryContainer, SmallHeader, TextInput, theme, WhatsAppContainer } from "../styles";
import {
  emitAnalytic,
  HOME_ROUTE,
  OVERVIEW_ROUTE,
  useIsMobile,
  WELCOME_ROUTE,
} from "../utils";
import { MASCOTS } from "../utils/mascots";

export function SettingsPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");

  const header = "Settings";
  const email = "Email";
  const nickname = "Nickname";
  const submitText = "Update";
  const deleteAcctText = "Delete";
  const deleteAcct = `Delete account (type "goodbye")`;
  const deleteAcctInfo = "This will permanently remove your profile and any associated call history and contact information from Call Already.";
  const whatsAppHeader = "WhatsApp";
  const optInMessage = "Opt in to WhatsApp messaging";

  const onSubmit = () => {
    emitAnalytic("Settings updated");
    navigate(HOME_ROUTE);
  };

  const onDelete = () => {
    emitAnalytic("Account deleted");
    navigate(WELCOME_ROUTE);
  };

  return (
    <Page
      progress={-1}
      iconClassNames="fa-solid fa-gear"
      headerText={header}
      mascot={MASCOTS.Confused}
      isLoading={false}
    >
      <CardContainer $isMobile={isMobile}>
        <FormLabel htmlFor="email">{email}</FormLabel>
        <TextInput type={"text"} name="email" id="email" disabled style={{background: theme.general.light}}></TextInput>
        <br />
        <FormLabel htmlFor="nickname">{nickname}</FormLabel>
        <TextInput type={"text"} name="nickname" id="nickname"></TextInput>
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
            <input type="checkbox" name="whatsAppOptIn" />
            <span className="slider round"></span>
          </label>
        </div>
        <br />
        <FormLabel htmlFor="delete">{deleteAcct}</FormLabel>
        <Group $isMobile={isMobile}>
          <TextInput style={{width: "11em"}} type={"text"} name="delete" id="delete"></TextInput>
          <DeleteButton onClick={onDelete} disabled>
            {deleteAcctText}
          </DeleteButton>
        </Group>
        <InfoSubText style={{marginTop: "0.4em"}}$isMobile={isMobile}>{deleteAcctInfo}</InfoSubText>
        <Button $primary onClick={onSubmit}>
          {submitText}
        </Button>
      </CardContainer>
    </Page>
  );
}
