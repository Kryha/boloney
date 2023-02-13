import styled from "@emotion/styled";
import { SausageContainer } from "../spinner/styles";

export const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60px;
  position: absolute;
  top: 0;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  ${SausageContainer} {
    width: 100px;
    height: 100px;
  }
`;
