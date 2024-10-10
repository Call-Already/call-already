import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ErrorObject, MessageObject, Page } from "../components";
import { getUser, GetUserProps } from "../gateways";
import {
  emailState,
  nicknameState,
  numGroupsCreatedState,
  numGroupsJoinedState,
} from "../state";
import {
  Button,
  CardContainer,
  Group,
  InfoSubText,
  InfoText,
  QuoteText,
  SecondaryContainer,
  SmallHeader,
} from "../styles";
import { emitAnalytic, GROUP_ROUTE, MASCOTS, OVERVIEW_ROUTE, useIsMobile } from "../utils";
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

  const date = moment(new Date()).format("ll");

  const header = `Welcome ${nickname}!`;
  const errorMessage = "There was an error retrieving your account information";
  const yourCallGroups = "Your call groups";
  const groupsCreated = "group(s) created";
  const groupsJoined = "group(s) joined";
  const noActivityYet = "You haven't created or joined any call groups yet.";
  const startACall = "Start a call";
  const learnMore = "Learn more";
  const quoteText = `Quote of the day (${date})`;
  const successfullyVerifiedMessage = "Your email has been verified!";
  const successfullyLoggedInMessage = "You have successfully been logged in.";

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

  const onLearnMore = () => {
    emitAnalytic("Flow started");
    navigate(OVERVIEW_ROUTE);
  };

  const onGetStarted = () => {
    emitAnalytic("Flow started");
    navigate(GROUP_ROUTE);
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
        {quote && quote.quote && (
          <SecondaryContainer $isMobile={isMobile}>
            <InfoSubText>{quoteText}</InfoSubText>
            <QuoteText>{quote.quote}</QuoteText>
            <InfoText>{`—${quote.author}`}</InfoText>
          </SecondaryContainer>
        )}
        <SmallHeader>{yourCallGroups}</SmallHeader>
        <SecondaryContainer $isMobile={isMobile}>
          {showStatistics ? (
            <>
              <InfoText>
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
        </SecondaryContainer>
        <Group $isMobile={isMobile}>
          <Button onClick={onLearnMore}>{learnMore}</Button>
          <Button $primary onClick={onGetStarted}>
            {startACall}
          </Button>
        </Group>
      </CardContainer>
    </Page>
  );
}
