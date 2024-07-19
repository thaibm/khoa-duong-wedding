import { FC, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import Slider, { Settings } from "react-slick";

type Props = {
  urls: string[];
};

export const TopSlide: FC<Props> = ({ urls }) => {
  const ref = useRef<Slider>(null);
  const settings: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
  };

  useEffect(() => {
    const id = setTimeout(() => {
      ref.current?.slickNext();
    }, 4000);
    return () => clearTimeout(id);
  }, []);

  return (
    <SliderWrapper>
      <Slider {...settings} ref={ref}>
        {urls.map((url, index) => (
          <Slide key={`${index}`}>
            <img src={url} alt="Background" />
          </Slide>
        ))}
      </Slider>
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div`
  height: 100vh;
  background-color: #000;

  .slick-slide {
    position: absolute !important;
    top: 0;
    left: 0 !important;
    transition: opacity 2.5s, transform 6s !important;
    transform: scale(1, 1);
    opacity: 0 !important;
  }

  .slick-active {
    transform: scale(1.05, 1.05);
    opacity: 1 !important;
  }

  .slick-list {
    overflow: visible;
  }
`;

const Slide = styled.div`
  height: 100vh;

  img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }
`;
