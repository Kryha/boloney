import styled from "@emotion/styled";
import { color, margins } from "../../design";
import { Heading4 } from "../atoms/text";

interface LayoutProps {
  isToggled: boolean;
}

export const ChatSection = styled.section <LayoutProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${margins.small0};
  height: 40vh;
  width: 25vw;
  border-bottom: 1px solid ${color.darkGrey};
  border-left: 1px solid ${color.darkGrey};
  display: ${({ isToggled }) => (!isToggled && "none")};
  ${Heading4} {
    cursor: pointer;
    margin-left: ${margins.small3};
  }
`;
