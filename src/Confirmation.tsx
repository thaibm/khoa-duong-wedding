import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { Loading } from "./components";
import { FormData } from "./components/GuestFormSection";
import { Heading } from "./components/Heading";
import { db } from "./firebaseApp";

type Props = {
  field: string;
  value: string;
};

const ConfirmationListItem: FC<Props> = ({ field, value }) => {
  return (
    <Row>
      <Field>{field}</Field>
      <Value>{value} </Value>
    </Row>
  );
};

const formatFormData = (data: FormData) => {
  return Object.keys(data)
    .map((key) => {
      return [key, data[key as keyof FormData]].join(": ");
    })
    .join("\n");
};

export const Confirmation = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>();
  const [isLoading, setLoading] = useState(false);

  const handleOk = async () => {
    const id = sessionStorage.getItem("id");
    if (!formData || !id) return;
    setLoading(true);
    try {
      await setDoc(doc(db, "responses", id), formData);
      await addDoc(collection(db, "emails"), {
        to: ["yurithinh.wedding@gmail.com"],
        message: {
          subject: `Response from ${formData.firstName} ${formData.lastName}`,
          text: formatFormData(formData),
        },
      });
    } finally {
      setLoading(false);
      navigate(`/thank-you?id=${id}&attendance=${formData.attendance}`);
      sessionStorage.removeItem("formData");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    const jsonData = sessionStorage.getItem("formData");
    if (jsonData) {
      setFormData(JSON.parse(jsonData));
    } else {
      navigate(-1);
    }
  }, [navigate]);

  if (!formData) return null;

  const {
    guestType,
    firstName,
    lastName,
    firstNameKana,
    lastNameKana,
    gender,
    phone,
    zip1,
    zip2,
    address,
    email,
    message,
    allergy,
    attendance,
    companionName1,
    companionName2,
    companionName3,
    companionName4,
  } = formData;

  const showCompanions =
    companionName1 || companionName2 || companionName3 || companionName4;
  const companions = [
    companionName1,
    companionName2,
    companionName3,
    companionName4,
  ].filter((x) => x);

  return (
    <Container>
      <Heading>{t("finalConfirmation")}</Heading>
      <ConfirmationListItem
        field={t("guestType")}
        value={
          guestType === "brideGuest"
            ? t("brideGuest")
            : guestType === "groomGuest"
            ? t("groomGuest")
            : ""
        }
      />
      <ConfirmationListItem
        field={t("name")}
        value={
          i18n.language === "en"
            ? `${firstName} ${lastName}`
            : `${lastName} ${firstName}`
        }
      />
      <ConfirmationListItem
        field={t("furigana")}
        value={
          i18n.language === "en"
            ? `${firstNameKana} ${lastNameKana}`
            : `${lastNameKana} ${firstNameKana}`
        }
      />
      <ConfirmationListItem
        field={t("gender")}
        value={
          gender === "male" ? t("male") : gender === "female" ? t("female") : ""
        }
      />
      <ConfirmationListItem field={t("phoneNumber")} value={phone} />
      <ConfirmationListItem field={t("zipCode")} value={`${zip1}-${zip2}`} />
      <ConfirmationListItem field={t("address")} value={address} />
      <ConfirmationListItem field={t("email")} value={email} />
      <ConfirmationListItem field={t("message")} value={message ?? ""} />
      <ConfirmationListItem field={t("allergy")} value={allergy ?? ""} />
      <ConfirmationListItem
        field={t("attendance")}
        value={
          attendance === "attend"
            ? t("attend")
            : attendance === "decline"
            ? t("decline")
            : attendance === "hold"
            ? t("hold")
            : ""
        }
      />
      {showCompanions && (
        <ConfirmationListItem
          field={t("companion")}
          value={companions.join("\n")}
        />
      )}

      <SubmitButton onClick={handleOk}>{t("ok")}</SubmitButton>
      <CancelButton onClick={handleCancel}>{t("cancel")}</CancelButton>
      {isLoading && <Loading />}
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

const Row = styled.div`
  padding: 18px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);

  &:last-of-type {
    border: none;
    margin-bottom: 20px;
  }
`;

const Field = styled.div`
  margin-right: 20px;
`;

const Value = styled.div`
  flex: 1;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
`;

const SubmitButton = styled.button`
  border: 1px solid #ef7e8f;
  background: transparent;
  color: #ef7e8f;
  font-size: 18px;
  width: 100%;
  padding: 8px 16px;
`;

const CancelButton = styled(SubmitButton)`
  color: #ddd;
  border-color: #ddd;
  margin-top: 10px;
`;
