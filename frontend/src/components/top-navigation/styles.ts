import styled from "@emotion/styled";

import { color, layoutHeight, margins, zIndex } from "../../design";
import { Link } from "../../molecules";
import { NavigationLocation } from "../../types";
import { HorizontalDivider, GeneralText, Heading6, BodyText, BaseIcon, TertiaryButtonBase } from "../../atoms";
import { DiceIconWrapper, LightningIcon } from "../icons";

export const EllipsisIcon = styled(BaseIcon)`
  margin-top: 5px;
`;

export const TopNavigationSection = styled.section`
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: flex-end;
  position: absolute;
  z-index: ${zIndex.modalBackground};
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
  ${BodyText} {
    color: ${({ isHovered }) => isHovered && `${color.mediumGrey}`};
  }
`;

interface ButtonContainerProps {
  isActive?: boolean;
  isInMatch?: boolean;
}

export const ButtonContainer = styled.div<ButtonContainerProps>`
  ${({ isActive }) =>
    isActive
      ? `  background: ${color.cloudWhite};
          box-shadow: 0px 0px 28px rgb(0 0 0 / 10%);
        `
      : `background: ${color.lightGrey};`};

  z-index: ${({ isActive }) => (isActive ? zIndex.onTop : zIndex.behind)};
  ${TertiaryButtonBase} {
    max-height: ${({ isInMatch }) => (isInMatch ? layoutHeight.sm : "auto")};
  }
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

export const ChildrenContainer = styled(DropdownWrapper)<DropdownProps>`
  display: ${({ isHidden }) => isHidden && "none"};
  z-index: ${zIndex.onTop};
  background: ${color.lightGrey};
`;
interface MenuProps {
  location: NavigationLocation;
}

export const MenuContainer = styled.div<MenuProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: ${color.cloudWhite};
  box-shadow: 0px 0px 28px rgb(0 0 0 / 10%);
  ${({ location }) =>
    location === "default"
      ? ""
      : `
      ${HorizontalDivider} {
        display: none;
      }
`};
  ${({ location }) =>
    location !== "match"
      ? ""
      : `
        ${MatchStatsContainer} {
          display: none;
        }
  `};
`;

export const RulesContainer = styled.div`
  position: absolute;
  background: ${color.cloudWhite};
  box-shadow: 0px 0px 28px rgb(0 0 0 / 10%);
  width: 25vw;
  right: 0;
  padding: 20px;
  overflow-y: scroll;
  height: 94.5vh;
`;

export const RulesSection = styled.section`
  margin-bottom: 60px;
`;

export const RulesSectionTitle = styled(Heading6)`
  margin-bottom: ${margins.small1};
`;

export const RulesLink = styled(Link)``;

export const ParagraphNoMargin = styled(BodyText)`
  margin-bottom: 0;
`;

export const ParagraphReducedMargin = styled(BodyText)`
  list-style-type: circle;
  margin-bottom: 0.5em;
`;

export const ParagraphBulletPoint = styled(ParagraphReducedMargin)`
  margin-left: 0.6em;
`;

export const MatchStateItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${margins.small0};
  justify-content: flex-end;
  ${GeneralText} {
    padding: ${margins.small0};
  }
  ${GeneralText}:first-letter {
    text-transform: none;
  }
`;

export const MatchStateVerticalDivider = styled.div`
  height: 13px;
  width: 1px;
  margin: ${margins.small0};
  background: ${color.black};
`;

export const MatchStatsContainer = styled.div`
  display: flex;
  background: ${color.grey};
  flex-direction: row;
  align-items: center;
  padding: ${margins.small2};
  ${DiceIconWrapper} {
    padding-left: ${margins.small1};
  }
  height: 5.5vh;
  gap: ${margins.small1};
  ${GeneralText} {
    color: ${color.black};
  }
  ${LightningIcon} {
    margin-top: 0.125em;
  }
`;
