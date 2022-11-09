import styled from "@emotion/styled";
import { CloseIcon } from "../../assets";
import { color } from "../../design";

export const OverlayWrapperSection = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`;

export const Close = styled(CloseIcon)``;

export const CloseButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 26px 20px 30px;
  gap: 8px;
  background: ${color.lightGrey};
  z-index: 11;
  cursor: pointer;
`;

export const CloseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
