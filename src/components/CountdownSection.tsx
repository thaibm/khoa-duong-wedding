import dayjs from "dayjs";
import Countdown from "react-countdown";
import styled from "styled-components/macro";
import { Heading } from "./Heading";
import { InViewAnimation } from "./InViewAnimation";

export const CountdownSection = () => {
  const theDate = new Date(
    "Thu July 25 2024 11:00:00 GMT+0900 (Japan Standard Time)"
  );

  return (
    <Container>
      <InViewAnimation>
        <Heading>Countdown</Heading>
      </InViewAnimation>
      <InViewAnimation delay={0.1}>
        <TheDate>
          <span>to</span>{" "}
          <FormattedDate>{dayjs(theDate).format("YYYY.MM.DD")}</FormattedDate>
        </TheDate>
      </InViewAnimation>
      <InViewAnimation delay={0.2}>
        <Countdown
          date={theDate}
          renderer={(props) => (
            <Remaining>
              <div>
                <Value>{props.days}</Value>
                <Label>Days</Label>
              </div>
              <div>
                <Value>{props.hours}</Value>
                <Label>Hours</Label>
              </div>
              <div>
                <Value>{props.minutes}</Value>
                <Label>Minutes</Label>
              </div>
              <div>
                <Value>{props.seconds}</Value>
                <Label>Seconds</Label>
              </div>
            </Remaining>
          )}
        />
      </InViewAnimation>
    </Container>
  );
};

const Container = styled.div`
  padding: 90px 30px;
  background: url("/img/bg-countdown2.jpg") no-repeat center;
  background-size: cover;
  color: #fff;
  text-align: center;
`;
const Remaining = styled.div`
  display: flex;
  max-width: 850px;
  margin: auto;
  justify-content: space-between;
  font-family: serif;

  @media screen and (max-width: 480px) {
    max-width: 100%;
  }
`;
const Label = styled.div`
  text-transform: uppercase;
  font-size: 23px;

  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;
const Value = styled.div`
  font-size: 100px;

  @media screen and (max-width: 480px) {
    font-size: 50px;
  }
`;

const TheDate = styled.div`
  font-size: 43px;
  font-family: serif;
  margin-bottom: 50px;

  @media screen and (max-width: 480px) {
    font-size: 32px;
    margin-bottom: 10px;
  }
`;

const FormattedDate = styled.span`
  font-size: 78px;
  display: inline-block;
  margin-left: 32px;

  @media screen and (max-width: 480px) {
    margin-left: 0;
    font-size: 36px;
  }
`;
