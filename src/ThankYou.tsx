import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components/macro";
import { Heading } from "./components/Heading";

export const ThankYou = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const attendance = params.get("attendance");
  const id = params.get("id");

  const thankYouMessage =
    attendance === "attend"
      ? t("thankYouAttend")
      : attendance === "decline"
      ? t("thankYouDecline")
      : attendance === "hold"
      ? t("thankYouHold")
      : "";
  const handleBack = () => {
    navigate(`/invites/${id}`);
  };

  return (
    <Container>
      <Heading>Thank you</Heading>
      <Message dangerouslySetInnerHTML={{ __html: thankYouMessage }}></Message>
      <BackButton onClick={handleBack}>Back</BackButton>
    </Container>
  );
};

const Container = styled.div`
  padding: 90px 30px;
  background: url("/img/bg-5.jpg") no-repeat center;
  background-size: cover;
  color: #fff;
  text-align: center;
  min-height: 100vh;

  @media screen and (max-width: 480px) {
    padding: 60px 16px;
  }
`;

const Message = styled.div`
  font-size: 18px;
  line-height: 1.7;
  margin-bottom: 16px;
`;

const BackButton = styled.button`
  border: 1px solid #ef7e8f;
  background: transparent;
  color: #ef7e8f;
  font-size: 18px;
  width: 100%;
  padding: 8px 16px;
`;
