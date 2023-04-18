import styled from "@emotion/styled";
import { zIndex, layoutWidth } from "../design";
import { PrimaryButtonWrapper } from "../molecules";

interface Props {
  bottomPosition?: string;
  leftPosition?: string;
  marginLeft?: string;
  marginBottom?: string;
}

export const BottomButtonWrapper = styled.section<Props>`
  ${PrimaryButtonWrapper} {
    position: fixed;
    bottom: ${({ bottomPosition }): string => bottomPosition ?? "11vh"};
    left: ${({ leftPosition }): string => leftPosition ?? layoutWidth.sm};
    margin-left: ${({ marginLeft }): string => marginLeft ?? "0px"};
    margin-bottom: ${({ marginBottom }): string => marginBottom ?? "1px"};
    z-index: ${zIndex.modal};
  }
`;
