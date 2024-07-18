import { FC } from "react";
import styled from "styled-components/macro";

type Props = {
  children: React.ReactNode;
};
export const Heading: FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  font-family: "Pinyon Script", cursive;
  font-size: 64px;
  margin-bottom: 80px;
  text-align: center;

  @media screen and (max-width: 480px) {
    font-size: 40px;
    margin-bottom: 40px;
  }

  /* &:before {
    display: inline-block;
    content: "";
    width: 100px;
    height: 6px;
    border: 1px solid #fff;
    border-left: 0;
    border-right: 0;
    margin-right: 14px;
    position: relative;
    top: -16px;
  }

  &:after {
    display: inline-block;
    content: "";
    width: 100px;
    height: 6px;
    border: 1px solid #fff;
    border-left: 0;
    border-right: 0;
    position: relative;
    top: -16px;
  } */
`;
