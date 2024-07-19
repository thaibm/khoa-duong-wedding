// import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { db } from "../firebaseApp";
import { Heading } from "./Heading";
import { Heading2 } from "./Heading2";
import { InViewAnimation } from "./InViewAnimation";

export type FormData = {
  guestType: "groomGuest" | "brideGuest";
  firstName: string;
  lastName: string;
  firstNameKana: string;
  lastNameKana: string;
  gender: "male" | "female";
  phone: string;
  zip1: string;
  zip2: string;
  address: string;
  email: string;
  message?: string;
  allergy?: string;
  companionName1?: string;
  companionAllergy1?: string;
  companionName2?: string;
  companionAllergy2?: string;
  companionName3?: string;
  companionAllergy3?: string;
  companionName4?: string;
  companionAllergy4?: string;
  attendance: "attend" | "decline" | "hold";
};

export const fields = [
  "guestType",
  "firstName",
  "lastName",
  "firstNameKana",
  "lastNameKana",
  "gender",
  "phone",
  "zip1",
  "zip2",
  "address",
  "email",
  "message",
  "allergy",
  "companionName1",
  "companionAllergy1",
  "companionName2",
  "companionAllergy2",
  "companionName3",
  "companionAllergy3",
  "companionName4",
  "companionAllergy4",
  "attendance",
];

// type GetAddressResponse = {
//   allAddress: string;
// }[];

// const getAddressFromZipCode = async (zipCode: string) => {
//   const API_KEY = "KuH7g1jijGs4jn6Ian4PylGFFVZdyj5sjOjeh0p"; // 🥹
//   const res = await axios.get<GetAddressResponse>(
//     `https://apis.postcode-jp.com/api/v5/postcodes/${zipCode}`,
//     {
//       params: {
//         apikey: API_KEY,
//         fields: "allAddress",
//       },
//     }
//   );

//   return res.data ? res.data[0].allAddress : "";
// };

const RequiredLabel = () => {
  const { t } = useTranslation();

  return <Required>{t("required")}</Required>;
};

type FormState = "editing" | "sent";

export const GuestFormSection = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormState>("editing");
  const { register, handleSubmit, setValue, getValues } = useForm<FormData>({
    defaultValues: {
      attendance: "attend",
    },
  });
  const [companionCount, setCompanionCount] = useState(1);

  const handleAddCompanion = () => {
    setCompanionCount((count) => count + 1);
  };

  // const handleZipCodeBlur = async () => {
  //   try {
  //     const { zip1, zip2, address } = getValues();
  //     const zipCode = `${zip1}${zip2}`;
  //     if (zipCode.length === 7 && !address) {
  //       const addressFromApi = await getAddressFromZipCode(zipCode);
  //       if (addressFromApi) {
  //         setValue("address", addressFromApi);
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const onSubmit = handleSubmit(async (data) => {
    // if (!id) return;
    sessionStorage.setItem("formData", JSON.stringify(data));
    navigate("/confirmation");
    return;
  });

  const formSentMessage = useMemo(() => {
    if (formState !== "sent") return null;
    const { firstName, lastName, attendance } = getValues();
    let name = firstName;
    if (i18n.language === "ja") {
      name = lastName;
    }

    switch (attendance) {
      case "attend":
        return <p>{t("formSentAttend", { name })}</p>;
      case "decline":
        return <p>{t("formSentDecline", { name })}</p>;
      case "hold":
        return <p>{t("formSentHold", { name })}</p>;
      default:
        return null;
    }
  }, [formState, getValues, i18n.language, t]);

  useEffect(() => {
    async function loadGuest() {
      if (!id) return;

      let docRef = doc(db, "responses", id);
      let docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        for (let key in docSnap.data()) {
          if (fields.includes(key)) {
            setValue(key as keyof FormData, docSnap.data()[key]);
          }
        }
        setFormState("sent");
        setCompanionCount(4);
      }
    }

    loadGuest();
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      sessionStorage.setItem("id", id);
    }
  }, [id]);

  if (!id) {
    return null;
  }

  return (
    <Container>
      <InViewAnimation>
        <Heading>Presence or Absence</Heading>
      </InViewAnimation>
      <InViewAnimation>
        <Intro dangerouslySetInnerHTML={{ __html: t("formIntro") }} />
        <Heading2>{t("formTitle")}</Heading2>
      </InViewAnimation>
      <form
        onSubmit={onSubmit}
        style={{ display: formState === "sent" ? "none" : "block" }}
      >
        <FormWrapper>
          <FieldWrapper className="radioField">
            <Field>
              {t("guestType")} <RequiredLabel />
            </Field>
            <label>
              <input
                type="radio"
                value="groomGuest"
                {...register("guestType")}
              />
              {t("groomGuest")}
              <span className="checkmark" />
            </label>
            <label>
              <input
                type="radio"
                value="brideGuest"
                {...register("guestType")}
              />
              {t("brideGuest")}
              <span className="checkmark" />
            </label>
          </FieldWrapper>
          <FieldWrapper>
            <Field>
              {t("name")} <RequiredLabel />
            </Field>
            <NameInputs className="d-flex">
              <NameInputWrapper>
                <input
                  type="text"
                  {...register("lastName")}
                  placeholder={t("lastName") ?? ""}
                />
              </NameInputWrapper>
              <NameInputWrapper>
                <input
                  type="text"
                  {...register("firstName")}
                  placeholder={t("firstName") ?? ""}
                />
              </NameInputWrapper>
            </NameInputs>
          </FieldWrapper>
          {/* <FieldWrapper>
            <Field>
              {t("furigana")} <RequiredLabel />
            </Field>
            <NameInputs className="d-flex">
              <NameInputWrapper>
                <input
                  type="text"
                  {...register("lastNameKana")}
                  placeholder={t("furiganaLastName") ?? ""}
                />
              </NameInputWrapper>
              <NameInputWrapper>
                <input
                  type="text"
                  {...register("firstNameKana")}
                  placeholder={t("furiganaFirstName") ?? ""}
                />
              </NameInputWrapper>
            </NameInputs>
          </FieldWrapper> */}
          <FieldWrapper className="radioField">
            <Field>
              {t("gender")} <RequiredLabel />
            </Field>
            <label>
              <input type="radio" value="male" {...register("gender")} />
              {t("male")}
              <span className="checkmark" />
            </label>
            <label>
              <input type="radio" value="female" {...register("gender")} />
              {t("female")}
              <span className="checkmark" />
            </label>
          </FieldWrapper>
          {/* <FieldWrapper>
            <Field>
              {t("phoneNumber")} <RequiredLabel />
            </Field>
            <input type="tel" {...register("phone")} />
          </FieldWrapper> */}
          {/* <FieldWrapper>
            <Field>
              {t("zipCode")} <RequiredLabel />
            </Field>
            <ZipInputWrapper>
              <input
                type="tel"
                {...register("zip1")}
                onBlur={handleZipCodeBlur}
              />
            </ZipInputWrapper>
            &nbsp;-&nbsp;
            <ZipInputWrapper>
              <input
                type="tel"
                {...register("zip2")}
                onBlur={handleZipCodeBlur}
              />
            </ZipInputWrapper>
          </FieldWrapper> */}
          {/* <FieldWrapper>
            <Field>
              {t("address")} <RequiredLabel />
            </Field>
            <input
              type="text"
              {...register("address")}
              placeholder="東京都港区青山..."
            />
          </FieldWrapper> */}
          <FieldWrapper>
            <Field>
              {t("email")} <RequiredLabel />
            </Field>
            <input type="text" {...register("email")} />
          </FieldWrapper>
          <FieldWrapper>
            <Field>{t("message")}</Field>
            <FieldDescription>{t("messageFieldDescription")}</FieldDescription>
            <textarea
              rows={10}
              {...register("message")}
              placeholder={t("messageMaxLengthNotice") ?? ""}
            />
          </FieldWrapper>
          <FieldWrapper>
            <Field>{t("allergy")}</Field>
            <FieldDescription>{t("allergyFieldDescription")}</FieldDescription>
            <input type="text" {...register("allergy")} />
          </FieldWrapper>
          <FieldWrapper>
            <Field>{t("addCompanion")}</Field>
            <FieldDescription>
              {t("addCompanionFieldDescription")}
            </FieldDescription>
            <CompanionGroup>
              <input
                type="text"
                {...register("companionName1")}
                placeholder={t("companionName") ?? ""}
                style={{ marginBottom: 8 }}
              />
              <input
                type="text"
                {...register("companionAllergy1")}
                placeholder={t("companionAllergy") ?? ""}
              />
            </CompanionGroup>
            {companionCount > 1 && (
              <CompanionGroup>
                <input
                  type="text"
                  {...register("companionName2")}
                  placeholder={t("companionName") ?? ""}
                  style={{ marginBottom: 8 }}
                />
                <input
                  type="text"
                  {...register("companionAllergy2")}
                  placeholder={t("companionAllergy") ?? ""}
                />
              </CompanionGroup>
            )}
            {companionCount > 2 && (
              <CompanionGroup>
                <input
                  type="text"
                  {...register("companionName3")}
                  placeholder={t("companionName") ?? ""}
                  style={{ marginBottom: 8 }}
                />
                <input
                  type="text"
                  {...register("companionAllergy3")}
                  placeholder={t("companionAllergy") ?? ""}
                />
              </CompanionGroup>
            )}
            {companionCount > 3 && (
              <CompanionGroup>
                <input
                  type="text"
                  {...register("companionName4")}
                  placeholder={t("companionName") ?? ""}
                  style={{ marginBottom: 8 }}
                />
                <input
                  type="text"
                  {...register("companionAllergy4")}
                  placeholder={t("companionAllergy") ?? ""}
                />
              </CompanionGroup>
            )}
            {companionCount < 4 && (
              <AddCompanionButton type="button" onClick={handleAddCompanion}>
                {t("addMoreCompanions")}
              </AddCompanionButton>
            )}
          </FieldWrapper>
          <FieldWrapper className="attendance">
            <label>
              <input type="radio" value="attend" {...register("attendance")} />
              <span>{t("attend")}</span>
            </label>
            <label>
              <input type="radio" value="decline" {...register("attendance")} />
              <span>{t("decline")}</span>
            </label>
            <label>
              <input type="radio" value="hold" {...register("attendance")} />
              <span>{t("hold")}</span>
            </label>
          </FieldWrapper>
          <FieldWrapper>
            <SubmitButton>{t("confirm")}</SubmitButton>
          </FieldWrapper>
        </FormWrapper>
      </form>
      {formSentMessage}
      {formState === "sent" && (
        <div>
          <p>{t("formSentEdit")}</p>
          <SubmitButton onClick={() => setFormState("editing")}>
            {t("edit")}
          </SubmitButton>
        </div>
      )}
      <InViewAnimation>
        <ThankYouWrapper>
          <Heading>Thank you</Heading>
          <Ending>Hope we can share our happiness</Ending>
        </ThankYouWrapper>
      </InViewAnimation>
    </Container>
  );
};

const Container = styled.div`
  padding: 90px 8px;
  background: url("/img/bg-form.jpg") no-repeat center;
  background-size: cover;
  color: #fff;

  .medium-font-size {
    font-size: 24px;
    margin: 8px 0;
  }
`;

const NameInputs = styled.div`
  .App.en & {
    flex-direction: row-reverse;
    justify-content: flex-end;
  }
`;

const NameInputWrapper = styled.div`
  width: 45%;
  margin-right: 8px;

  &:last-child {
    margin-right: 0;
  }

  .App.en & {
    margin-right: 0;

    &:last-child {
      margin-right: 8px;
    }
  }
`;

// const ZipInputWrapper = styled.div`
//   display: inline-block;
//   width: 35%;
// `;

const Intro = styled.div`
  line-height: 1.2;
  text-align: center;
  font-size: 18px;
  line-height: 1.7;
`;

const FormWrapper = styled.div`
  background: #fff;
  color: #333;
  margin: auto;
  width: 70%;
`;

const FieldWrapper = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eee;

  &.attendance {
    display: flex;
    justify-content: center;

    input {
      display: none;

      &:checked + span {
        background: url("/img/attendance-button.png") no-repeat center center /
          contain;
        color: #fff;
      }
    }

    span {
      width: 88px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &.radioField {
    label {
      position: relative;
      padding-left: 32px;
      padding-right: 16px;
      padding-top: 8px;
      padding-bottom: 8px;

      input[type="radio"] {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }

      .checkmark {
        position: absolute;
        top: 8px;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
        border-radius: 50%;
      }

      &:hover input ~ .checkmark {
        background-color: #ccc;
      }

      input:checked ~ .checkmark {
        background-color: #2196f3;
      }

      .checkmark:after {
        content: "";
        position: absolute;
        display: none;
      }

      input:checked ~ .checkmark:after {
        display: block;
      }

      .checkmark:after {
        top: 9px;
        left: 9px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: white;
      }
    }
  }
`;

const Field = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const FieldDescription = styled.div`
  margin-bottom: 4px;
  font-size: 80%;
`;

const CompanionGroup = styled.div`
  margin-bottom: 16px;
`;

const Required = styled.span`
  background: #ef7e8f;
  padding: 1px 5px;
  font-size: 80%;
  margin-left: 8px;
  color: #fff;
`;

const SubmitButton = styled.button`
  border: 1px solid #ef7e8f;
  background: transparent;
  color: #ef7e8f;
  font-size: 18px;
  width: 100%;
  padding: 8px 16px;
`;

const ThankYouWrapper = styled.div`
  margin-top: 32px;
`;

const AddCompanionButton = styled.button`
  border: 1px solid #ef7e8f;
  background: transparent;
  color: #ef7e8f;
  font-size: 14px;
  padding: 4px 8px;
`;

const Ending = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-family: sans-serif;
  font-size: 14px;
`;
