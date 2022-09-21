import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export const float = keyframes`
0% {
  transform: translateY(0px);
}
50% {
  transform: translateY(-20px);
}
100% {
  transform: translateY(0px);
}
`;

export const HandWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -50px;
`;

export const Hand = styled.img`
  width: 210px;
  height: auto;
`;

export const Paint = styled.img``;

export const shadowAnimation = keyframes`
50% {
  margin: 0px;
  opacity: 0.1;
  width: 10vh;
}
100% {
  margin: 0px 20% 0px 20%;
  opacity: 0.7;
  width: 15vh;
}
`;


export const Shadow = styled.div`
  position: relative;
  height: 16px;
  width: 15vh;
  background: #999;
  border-radius: 100%;
  margin: 0px 20% 0px 20%;
  opacity: 0.7;
  animation: ${shadowAnimation} ease 4s infinite;
`;

export const HandContainer = styled.div`
  width: 30px;
  height: 60px;
  box-sizing: border-box;
  overflow: hidden;
  transform: translateY(0px);
  animation: ${float} 4s ease-in-out infinite;
  margin-left: -15px;
  margin-bottom: 30px;
  ${Hand} {
    width: 100%;
    height: auto;
    position: absolute;
  }
  ${Paint} {
    width: 100%;
    height: auto;
    position: absolute;
  }
`;
