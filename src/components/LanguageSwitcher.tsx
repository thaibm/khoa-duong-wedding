import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div>
      <Button
        onClick={() => i18n.changeLanguage("ja")}
        isActive={i18n.language === "ja"}
      >
        日本語
      </Button>
      <Button
        onClick={() => i18n.changeLanguage("en")}
        isActive={i18n.language === "en"}
      >
        English
      </Button>
    </div>
  );
};

const Button = styled.a<{ isActive: boolean }>`
  display: inline-block;
  padding: 8px 16px;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  margin-right: 16px;
  background-color: ${({ isActive }) =>
    isActive ? "rgba(255,255,255,0.3)" : "transparent"};

  &:last-child {
    margin-right: 0;
  }
`;
