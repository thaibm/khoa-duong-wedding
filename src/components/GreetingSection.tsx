import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";
import { InViewAnimation } from "./InViewAnimation";

export const GreetingSection = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <InViewAnimation>
        <Photo src="/img/photo-1.jpg" />
      </InViewAnimation>
      <InViewAnimation delay={0.1}>
        <Text>
          <p
            dangerouslySetInnerHTML={{
              __html: t("intro"),
            }}
          />
        </Text>
      </InViewAnimation>
    </Container>
  );
};

const Container = styled.div`
  padding: 90px 30px;
  background: url("/img/bg-5.jpg") no-repeat center;
  background-size: cover;
  text-align: center;

  @media screen and (max-width: 480px) {
    padding: 60px 16px;
  }
`;

const Photo = styled.img`
  max-width: 100%;
  margin-bottom: 40px;
`;

const Text = styled.div`
  max-width: 1075px;
  margin: auto;
  color: #fff;
  font-size: 18px;
  line-height: 1.7;
`;
