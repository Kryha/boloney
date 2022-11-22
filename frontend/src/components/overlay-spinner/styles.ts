import styled from "@emotion/styled";

export const OverlayWrapperSection = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`;

export const SpinnerWrapper = styled.div`
  position: fixed;
  flex-direction: row;
  align-content: center;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
