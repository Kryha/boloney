import styled from "@emotion/styled";
import { CloseIcon } from "../../assets";
import { color, margins, zIndex } from "../../design";

export const ToastWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: ${margins.small5};
  gap: ${margins.small1};
  position: absolute;
  width: clamp(541.2px, 57.23vw + -8.2px, 1090.6px);
  height: clamp(114.18px, 12.07vw + -1.73px, 230.09px);
  background: ${color.white};
  box-shadow: 0px 2px ${margins.small1} rgba(0, 0, 0, 0.2);
  border-radius: ${margins.small2};
  z-index: ${zIndex.inFront};
`;

export const ToastImage = styled.img`
  object-fit: contain;
  width: clamp(132px, 13.96vw + -2px, 266px);
  height: auto;
`;

export const CloseButton = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  right: ${margins.small5};
`;

export const ToastDescriptionContainer = styled.div`
  width: clamp(353.76px, 37.41vw + -5.36px, 712.88px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: ${margins.small1};
  overflow: scroll;
  height: 100%;
  .bold {
    font-weight: bold;
    background-color: transparent;
    color: ${color.black};
  }
`;

export const MultipleToastWrapper = styled.section`
  position: absolute;
  width: clamp(541.2px, 57.23vw + -8.2px, 1090.6px);
  height: clamp(114.18px, 12.07vw + -1.73px, 230.09px);
  left: ${margins.small5};
  bottom: ${margins.large3};
`;

export const MultipleToast = styled.div`
  position: absolute;
  width: 96%;
  height: 14px;
  left: clamp(8px, 1.02vw + 3.91px, 17px);
  top: -14px;
  background: ${color.white};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px 10px 0px 0px;
  z-index: 1;
`;
