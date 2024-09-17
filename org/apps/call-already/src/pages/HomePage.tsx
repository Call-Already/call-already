import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ErrorObject, Page } from "../components";
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
  InfoSubText,
  InfoText,
  QuoteText,
  SecondaryContainer,
  SmallHeader,
} from "../styles";
import { emitAnalytic, GROUP_ROUTE, MASCOTS, useIsMobile } from "../utils";
import { data } from "../assets/quotes";
import { generateRandomNumberFromDate } from "../utils/utils";
import moment from "moment";

export function HomePage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  type QuoteObject = {
    [key: string]: any;
  };

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
  const quoteText = `Quote of the day (${date})`;

  const generateDayHashQuote = () => {
    const randomNumber = generateRandomNumberFromDate();
    const quoteOfTheDay = data.Quotes[randomNumber];
    setQuote({
      quote: quoteOfTheDay.Quote,
      author: quoteOfTheDay.Author,
    });
  };

  useEffect(() => {
    generateDayHashQuote();

    setIsLoading(true);

    const getUserProps: GetUserProps = {
      Email: email,
    };
    console.log(getUserProps);

    getUser(getUserProps)
      .then((response) => {
        setIsLoading(false);

        setNumGroupsCreated(response.data.GroupsCreated);
        setNumGroupsJoined(response.data.GroupsJoined);
      })
      .catch((error) => {
        console.log(error);
        setError({ message: errorMessage });
      });
  }, []);

  const onGetStarted = () => {
    emitAnalytic("Flow started");
    navigate(GROUP_ROUTE);
  };

  const showStatistics = numGroupsCreated || numGroupsJoined;

  return (
    <Page
      progress={-1}
      iconClassNames={"fa-solid fa-house-user"}
      headerText={header}
      mascot={MASCOTS.Happy}
      isLoading={isLoading}
      error={error}
      setError={setError}
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
                <strong style={{ fontSize: 20 }}>{numGroupsCreated}</strong>{" "}
                {groupsCreated}
              </InfoText>
              <InfoText>
                <strong style={{ fontSize: 20 }}>{numGroupsJoined}</strong>{" "}
                {groupsJoined}
              </InfoText>
            </>
          ) : (
            <InfoText>{noActivityYet}</InfoText>
          )}
        </SecondaryContainer>
        <Button $primary onClick={onGetStarted}>
          {startACall}
        </Button>
      </CardContainer>
    </Page>
  );
}
