import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ErrorObject, MessageObject, Page } from "../components";
import { getUser, GetUserProps } from "../gateways";
import {
  authTokenState,
  emailState,
  nicknameState,
  numGroupsCreatedState,
  numGroupsJoinedState,
} from "../state";
import {
  Button,
  CardContainer,
  Group,
  HomeOptionsContainer,
  InfoSubText,
  InfoText,
  QuoteText,
  SecondaryContainer,
  SmallHeader,
  theme,
} from "../styles";
import { emitAnalytic, GROUP_ROUTE, MASCOTS, OVERVIEW_ROUTE, SETTINGS_ROUTE, useIsMobile, WELCOME_ROUTE } from "../utils";
import { data } from "../assets/quotes";
import { generateRandomNumberFromDate } from "../utils/utils";
import moment from "moment";

export function HomePage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  type QuoteObject = {
    [key: string]: any;
  };

  const [message, setMessage] = useState<MessageObject>({});
  const [error, setError] = useState<ErrorObject>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quote, setQuote] = useState<QuoteObject>({});

  const email = useRecoilValue(emailState);
  const nickname = useRecoilValue(nicknameState);
  const numGroupsCreated = useRecoilValue(numGroupsCreatedState);
  const numGroupsJoined = useRecoilValue(numGroupsJoinedState);

  const setNumGroupsCreated = useSetRecoilState(numGroupsCreatedState);
  const setNumGroupsJoined = useSetRecoilState(numGroupsJoinedState);
  const setAuthTokenState = useSetRecoilState(authTokenState);

  const date = moment(new Date()).format("ll");

  const header = `Welcome ${nickname}!`;
  const errorMessage = "There was an error retrieving your account information";
  const yourCallGroups = "Your call groups";
  const groupsCreated = "group(s) created";
  const groupsJoined = "group(s) joined";
  const noActivityYet = "You haven't created or joined any call groups yet.";
  const startACall = "Start new call";
  const joinCall = "Join a call";
  const quoteText = `Quote of the day (${date})`;
  const successfullyVerifiedMessage = "Your email has been verified!";
  const successfullyLoggedInMessage = "You have successfully been logged in.";
  const learn = "Learn";
  const settings = "Settings";
  const logOutText = "Log Out";

  const generateDayHashQuote = () => {
    const randomNumber = generateRandomNumberFromDate();
    const quoteOfTheDay = data.Quotes[randomNumber];
    setQuote({
      quote: quoteOfTheDay.Quote,
      author: quoteOfTheDay.Author,
    });
  };

  useEffect(() => {
    if (location.state && location.state.isVerified) {
      setMessage({ message: successfullyVerifiedMessage });
    }
    if (location.state && location.state.justLoggedIn) {
      setMessage({ message: successfullyLoggedInMessage });
    }

    generateDayHashQuote();

    setIsLoading(true);

    const getUserProps: GetUserProps = {
      Email: email,
    };

    getUser(getUserProps)
      .then((response) => {
        setIsLoading(false);

        setNumGroupsCreated(response.data.GroupsCreated);
        setNumGroupsJoined(response.data.GroupsJoined);
      })
      .catch((error) => {
        setIsLoading(false);
        
        console.log(error);
        setError({ message: errorMessage });
      });
  }, []);

  const onJoinCall = () => {
    emitAnalytic("Go to join call");
    navigate(GROUP_ROUTE);
  };

  const onStartCall = () => {
    emitAnalytic("Go to start call");
    navigate(`${GROUP_ROUTE}#startCall`);
  };

  const logOut = () => {
    emitAnalytic("Log out");
    setAuthTokenState("");
    navigate(WELCOME_ROUTE);
  };

  const showStatistics = numGroupsCreated || numGroupsJoined;

  return (
    <Page
      progress={-2}
      iconClassNames={"fa-solid fa-house-user"}
      headerText={header}
      mascot={MASCOTS.Happy}
      isLoading={isLoading}
      error={error}
      setError={setError}
      message={message}
      setMessage={setMessage}
    >
      <CardContainer $isMobile={isMobile}>
        <Group $isMobile={isMobile}>
          <Button onClick={onJoinCall}>{joinCall}</Button>
          <Button $primary onClick={onStartCall}>
            {startACall}
          </Button>
        </Group>
        <Group $isMobile={isMobile} style={{marginTop: "0.75em", marginBottom: "0.75em"}}>
          <HomeOptionsContainer onClick={() => navigate(OVERVIEW_ROUTE)} $color={theme.secondary.hover}>
            <i className="fa-solid fa-pencil fa-xs"></i>{`\t`}
            {learn}
          </HomeOptionsContainer>
          <HomeOptionsContainer onClick={() => navigate(SETTINGS_ROUTE)} $color={theme.secondary.hover}>
            <i className="fa-solid fa-gear fa-xs"></i>{`\t`}
            {settings}
          </HomeOptionsContainer>
          <HomeOptionsContainer onClick={() => logOut()}$color={theme.secondary.hover}>
            <i className="fa-solid fa-right-from-bracket fa-xs"></i>{`\t`}
            {logOutText}
          </HomeOptionsContainer>
        </Group>
        <SmallHeader style={{marginBottom: "-0.5em"}}>{yourCallGroups}</SmallHeader>
        {showStatistics ? (
          <>
            <InfoText style={{marginBottom: "-0.5em"}}>
              <i className="fa-solid fa-square-plus"></i>{`\t`}
              <strong style={{ fontSize: 30 }}>{numGroupsCreated}</strong>{`\t`}
              {groupsCreated}
            </InfoText>
            <InfoText>
              <i className="fa-solid fa-users"></i>{`\t`}
              <strong style={{ fontSize: 30 }}>{numGroupsJoined}</strong>{`\t`}
              {groupsJoined}
            </InfoText>
          </>
        ) : (
          <InfoText>{noActivityYet}</InfoText>
        )}
        {quote && quote.quote && (
          <SecondaryContainer $isMobile={isMobile}>
            <InfoText>{quoteText}</InfoText>
            <QuoteText><i style={{marginRight: "0.25em"}} className="fa-solid fa-quote-left"></i>{`\t`}{quote.quote}{`\t`}<i style={{marginLeft: "0.5em"}} className="fa-solid fa-quote-right"></i></QuoteText>
            <InfoText style={{marginBottom: "-0.25em"}}>{`—${quote.author}`}</InfoText>
          </SecondaryContainer>
        )}
      </CardContainer>
    </Page>
  );
}
