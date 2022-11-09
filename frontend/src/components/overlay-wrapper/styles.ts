import styled from "@emotion/styled";
import { CloseIcon } from "../../assets";
import { color, margins } from "../../design";

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
  padding: ${margins.small4} 26px ${margins.small5} ${margins.medium0};
  gap: ${margins.small1};
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
