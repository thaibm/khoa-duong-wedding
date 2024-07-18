import { FC } from "react";
import styled from "styled-components/macro";

type Props = {
  children: React.ReactNode;
};
export const Heading2: FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  text-align: center;
  margin-bottom: 30px;
  margin-top: 50px;
  font-size: 25px;

  &:after {
    display: block;
    content: "";
    margin-top: 8px;
    height: 18px;
    background: url("/img/h2-bg-bottom.png") no-repeat center;
    background-size: contain;
  }
`;
