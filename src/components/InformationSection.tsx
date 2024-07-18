import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import Slider, { Settings } from "react-slick";
import styled from "styled-components/macro";
import { Heading } from "./Heading";
import { Heading2 } from "./Heading2";
import { InViewAnimation } from "./InViewAnimation";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { useDevice } from "../hooks/useDevice";

export const InformationSection = () => {
  const { t } = useTranslation();
  const device = useDevice();
  const theDate = new Date(
    "Thus July 25 2024 13:00:00 GMT+0900 (Japan Standard Time)"
  );

  const settings: Settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: device === "mobile" ? 1 : 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
  };

  const urls = [
    "/img/info-slide/slide-1.jpg",
    "/img/info-slide/slide-2.jpg",
    "/img/info-slide/slide-3.jpg",
    "/img/info-slide/slide-4.jpg",
    "/img/info-slide/slide-5.jpg",
    "/img/info-slide/slide-9.jpg",
    "/img/info-slide/slide-8.jpg",
    "/img/info-slide/slide-10.jpg",
  ];

  return (
    <>
      <Container>
        <InViewAnimation>
          <Heading>Information</Heading>
        </InViewAnimation>

        <InViewAnimation>
          <Heading2>{t("weddingCeremony")}</Heading2>
          <TheDate>
            <FormattedDate>{dayjs(theDate).format("YYYY.MM.DD")}</FormattedDate>
            <Day>Thus</Day>
          </TheDate>
          <DateWrapper>
            <Important>{t("ceremony")}/ 11:00</Important>
            <Small>{t("reception")}/ 10:45</Small>
          </DateWrapper>
          <DateWrapper>
            <Important>{t("dinner")}</Important>
            <Small>{t("celebration")}/ 11:15</Small>
          </DateWrapper>
          <AddToCalendarWrapper>
            <AddToCalendarButton
              name="Khoa & Duong's Wedding"
              options={["Apple", "Google"]}
              location="Tokyo, Minato-ku, Shirokanedai 4-19-16 2F Indigo Rios"
              startDate="2024-07-25"
              endDate="2024-07-25"
              startTime="11:00"
              endTime="16:00"
              timeZone="Asia/hanoi"
              label={t("addToCalendar") ?? "Add to Calendar"}
            />
          </AddToCalendarWrapper>
        </InViewAnimation>
      </Container>
      {/* <DressCodeSection>
        <InViewAnimation>
          <></>
          {/* <Heading>Dress Code</Heading>
          <div>
            <DressCode className="black">Black</DressCode>
            <DressCode className="gold">Gold</DressCode>
            <DressCode className="green">Green</DressCode>
            <DressCode className="brown">Brown</DressCode>
          </div>
          <DressCodeMessage
            dangerouslySetInnerHTML={{ __html: t("dressCode") }}
          ></DressCodeMessage>
          <H3>Gentlemen</H3>
          <DressCodeMessage
            dangerouslySetInnerHTML={{ __html: t("dressCodeGentlemen") }}
          ></DressCodeMessage>

          <H3>Ladies</H3>
          <DressCodeMessage
            dangerouslySetInnerHTML={{ __html: t("dressCodeLadies") }}
          ></DressCodeMessage> */}
      {/* </InViewAnimation>
      </DressCodeSection>  */}
      <Container>
        <InViewAnimation>
          {/* <Heading>Địa điểm cưới & time</Heading> */}
          <Small>
            {" "}
            <span
              dangerouslySetInnerHTML={{ __html: t("weddingLocation") }}
            ></span>{" "}
            {/* <br />
            {t("location")}
            <br /> */}
            {/* {t("phone")}/ 03-5447-6211
            <br /> */}
            <br />
          </Small>
          <Small>Location:</Small>
          <Link
            href="https://maps.app.goo.gl/X3wteCGgCc2RrLbW7?g_st=com.google.maps.preview.copy"
            target="_blank"
            rel="noreferrer"
          >
            https://maps.app.goo.gl/X3wteCGgCc2RrLbW7?g_st=com.google.maps.preview.copy
          </Link>
        </InViewAnimation>
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.290110544545!2d105.767623!3d21.0210749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454a687d25cd5%3A0xc3c8779573a9d2f5!2sAquaria%20Restaurant!5e0!3m2!1sen!2sjp!4v1721198616184!5m2!1sen!2sjp"
          width="600"
          height="300"
          style={{ border: 0, maxWidth: "100%", marginTop: 30 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <p style={{ margin: "30px 0" }}>{t("informationEnd")}</p>

        <Slider {...settings}>
          {urls.map((url, index) => (
            <div>
              <img
                key={`${index}`}
                src={url}
                alt="Background-thaibm"
                height={400}
                style={{ objectFit: "cover", width: "100%" }}
              />
            </div>
          ))}
        </Slider>
      </Container>
    </>
  );
};

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

const TheDate = styled.div`
  font-size: 43px;
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
    font-size: 48px;
  }
`;

const Day = styled.span`
  display: inline-block;
  margin-left: 16px;
`;

const Important = styled.div`
  font-size: 32px;
`;

const Small = styled.div`
  font-size: 19px;
  line-height: 1.8;
`;

const DateWrapper = styled.div`
  margin-bottom: 20px;
`;

const Link = styled.a`
  color: #fff;
`;

const DressCode = styled.div`
  display: inline-block;
  width: 25%;
  padding: 8px 16px;

  @media screen and (min-width: 481px) {
    width: 40%;
  }

  &.gold {
    background: url("/img/gold.png") no-repeat center / cover;
    color: #333;
  }

  &.black {
    background-color: #222;
  }

  &.green {
    background-color: #233623;
  }

  &.brown {
    background-color: rgb(51 31 26);
  }
`;

const DressCodeMessage = styled.div`
  font-size: 18px;
  line-height: 1.7;
  margin: 16px 0;
`;

const H3 = styled.div`
  margin: 16px 0 8px;
  font-size: 18px;
`;

const DressCodeSection = styled.div`
  background: url("/img/bg-thiepcuoi.jpg") no-repeat center / contain;
  padding: 90px 16px;
  color: #fff;
  text-align: center;
  height: 800px;
`;

const AddToCalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
