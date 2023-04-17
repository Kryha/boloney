import styled from "@emotion/styled";
import { margins, zIndex } from "../../design";
import { Heading6, TertiaryButtonBase } from "../atoms";

export const TurnActionHeading = styled(Heading6)`
  padding-top: ${margins.medium0};
`;

interface TurnActionHeaderProps {
  isBackButtonVisible: boolean;
}

export const TurnActionHeaderWrapper = styled.section<TurnActionHeaderProps>`
  ${TertiaryButtonBase} {
    display: ${({ isBackButtonVisible }) => (isBackButtonVisible ? "flex" : "none")};
    position: absolute;
    top: 0px;
    left: 1px;
    z-index: ${zIndex.modalBackground};
  }
`;
