import React from "react";
import "./App.css";
import {
  CountdownSection,
  GreetingSection,
  GuestFormSection,
  HostSection,
  InformationSection,
  LanguageSwitcher,
  TopAnimatedText,
  TopSlide,
} from "./components";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();

  return (
    <div className={`App ${i18n.language}`}>
      <Hero>
        <TopSlide urls={["/img/bg-0.jpg", "/img/bg-1.jpg", "/img/bg-2.jpg", "/img/bg-3.jpg", "/img/bg-4.jpg"]} />
        {/* <SkyWrapper>
          <Sky />
        </SkyWrapper> */}
        <TopAnimatedText />
        {/* <LanguageSwitcherWrapper>
          <LanguageSwitcher />
        </LanguageSwitcherWrapper> */}
      </Hero>
      <GreetingSection />
      <HostSection />
      <CountdownSection />
      <InformationSection />
      <GuestFormSection />
    </div>
  );
}

export default App;

const Hero = styled.div`
  position: relative;
  overflow: hidden;
`;

const LanguageSwitcherWrapper = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 5vh 0;
`;
