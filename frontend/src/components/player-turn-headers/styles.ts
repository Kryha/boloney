import styled from "@emotion/styled";
import { margins } from "../../design";
import { Heading6 } from "../atoms";
import { SecondaryButtonContainer } from "../buttons/styles";

export const TurnActionHeading = styled(Heading6)`
  padding-top: ${margins.medium0};
`;

interface TurnActionHeaderProps {
  isBackButtonVisible: boolean;
}

export const TurnActionHeaderWrapper = styled.section<TurnActionHeaderProps>`
  ${SecondaryButtonContainer} {
    display: ${({ isBackButtonVisible }) => (isBackButtonVisible ? "flex" : "none")};
  }
  user-select: none;
`;
