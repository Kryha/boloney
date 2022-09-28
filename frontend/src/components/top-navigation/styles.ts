import styled from "@emotion/styled";

import { TimerIcon } from "../../assets/icons";
import { color, fontWeight, margins, zIndex } from "../../design";
import { Heading6, Paragraph } from "../atoms";
import { Link } from "../buttons";
import { LinkContainer } from "../buttons/styles";

export const TopNavigationSection = styled.section`
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: flex-end;
  position: absolute;
`;

export const Timer = styled(TimerIcon)`
  margin-top: 2px;
`;

interface TimerProps {
  isHovered: boolean;
}

export const CountdownTimer = styled.div<TimerProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13.4px ${margins.small5} 13.4px ${margins.small4};
  gap: ${margins.small1};
  height: 100%;
  :hover {
    background: ${color.darkGrey};
  }
  ${Paragraph} {
    color: ${({ isHovered }) => isHovered && `${color.mediumGrey}`};
  }
  ${Timer} {
    path {
      fill: ${({ isHovered }) => isHovered && `${color.mediumGrey}`};
    }
  }
`;

interface ButtonContainerProps {
  isActive?: boolean;
}

export const ButtonContainer = styled.div<ButtonContainerProps>`
  background: ${color.lightGrey};
  border: 1px solid ${({ isActive }) => (isActive ? color.black : color.lightGrey)};

  z-index: ${({ isActive }) => (isActive ? zIndex.onTop : zIndex.behind)};
`;

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px;
`;

interface DropdownProps {
  isHidden: boolean;
}

export const ChildrenContainer = styled(DropdownWrapper) <DropdownProps>`
  display: ${({ isHidden }) => isHidden && "none"};
  z-index: ${zIndex.onTop};
  background: ${color.lightGrey};
`;

export const MenuContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: ${color.lightGrey};
`;

export const RulesContainer = styled.div`
  position: absolute;
  background: ${color.lightGrey};
  width: 100%;
  right: 0;
  padding: 20px;
  overflow-y: scroll;
  height: 100vh;
`;

export const RulesSection = styled.section`
  margin-bottom: 60px;
`;

export const RulesSectionTitle = styled(Heading6)`
  text-transform: uppercase;
  margin-bottom: ${margins.small1};
`;
interface TextProps {
  customColor?: string;
}

export const RulesSectionContent = styled.section<TextProps>`
  font-family: ibm-plex-mono;
  font-weight: ${fontWeight.bolder};
  font-size: clamp(0.88rem, 0.21vw + 0.75rem, 1rem);
  line-height: clamp(1.38rem, 0.21vw + 1.25rem, 1.5rem);
  color: ${({ customColor }): string => customColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
  counter-reset: css-counter 0;
  ${Heading6}{
    counter-increment: css-counter 1;
  }
  ${Heading6}:after {
    content: counter(css-counter, decimal-leading-zero) ""; /* Apply counter before children's content. */
  }
  ${Paragraph} {
    margin-bottom: ${margins.medium0};
  }
  ${LinkContainer} {
    margin-top: ${margins.small3};
  }
`;

export const RulesList = styled.ol`
  ${RulesSectionContent}:not(:last-child) {
    margin-bottom: ${margins.small2};
  }
  margin-bottom: ${margins.small1};
`;

export const RulesLink = styled(Link)`
`;
