import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";
import { Heading } from "./Heading";
import { Heading2 } from "./Heading2";
import { InViewAnimation } from "./InViewAnimation";

export const HostSection = () => {
  const { t } = useTranslation();
  return (
    <>
      <Banner />
      <Container>
        <InViewAnimation>
          <Heading>Giới thiệu</Heading>
        </InViewAnimation>
        <InViewAnimation>
          <Heading2>Chú rể</Heading2>
          <Name>{t("groomName")}</Name>
          <Message style={{ marginBottom: 20 }}>
            {t("groomBirth")}
            <br />
            <span dangerouslySetInnerHTML={{ __html: t("groomIntro") }} />
          </Message>
        </InViewAnimation>
        <InViewAnimation>
          <Heading2>Cô dâu</Heading2>
          <Name>{t("brideName")}</Name>
          <Message style={{ marginBottom: 20 }}>
            {t("brideBirth")}
            <br />
            <span dangerouslySetInnerHTML={{ __html: t("brideIntro") }} />
          </Message>
        </InViewAnimation>
        <InViewAnimation>
          <Heading2>{t("fromBothOfUs")}</Heading2>
          <Message
            dangerouslySetInnerHTML={{ __html: t("messageFromBoth") }}
          ></Message>
        </InViewAnimation>
      </Container>
    </>
  );
};

const Banner = styled.div`
  height: 300px;
  background: url("/img/host.jpg") no-repeat center / cover;

  @media screen and (min-width: 481px) {
    height: 50vh;
  }
`;

const Container = styled.div`
  padding: 90px 30px;
  background: url("/img/bg-5.jpg") no-repeat center;
  background-size: cover;
  color: #fff;
  text-align: center;

  @media screen and (max-width: 480px) {
    padding: 60px 16px;
  }
`;

const Name = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Message = styled.div`
  font-size: 18px;
  line-height: 1.7;
`;
