import styled from "@emotion/styled";

import { LightningIcon, TimerIcon } from "../../assets/icons";
import { color, margins, zIndex } from "../../design";
import { GeneralText, Heading6, HorizontalDivider, Paragraph } from "../atoms";
import { Link } from "../buttons";
import { DieWrapper } from "../die/styles";

export const TopNavigationSection = styled.section`
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: flex-end;
  position: absolute;
  z-index: ${zIndex.normal};
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
  ${({ isActive }) =>
    isActive
      ? `  background: ${color.white};
          box-shadow: 0px 0px 28px rgb(0 0 0 / 10%);
        `
      : `background: ${color.lightGrey};`};

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

export const ChildrenContainer = styled(DropdownWrapper)<DropdownProps>`
  display: ${({ isHidden }) => isHidden && "none"};
  z-index: ${zIndex.onTop};
  background: ${color.lightGrey};
`;
interface MenuProps {
  isInMatch?: boolean;
}

export const MenuContainer = styled.div<MenuProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: ${color.white};
  box-shadow: 0px 0px 28px rgb(0 0 0 / 10%);
  ${({ isInMatch }) =>
    isInMatch
      ? ""
      : `
        ${HorizontalDivider} {
          display: none;
        }
        ${MatchStatsContainer} {
          display: none;
        }
  `};
`;

export const RulesContainer = styled.div`
  position: absolute;
  background: ${color.white};
  box-shadow: 0px 0px 28px rgb(0 0 0 / 10%);
  width: 25vw;
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

export const RulesLink = styled(Link)``;

interface LightningProps {
  size: string;
}

export const Lightning = styled(LightningIcon)<LightningProps>`
  width: ${({ size }): string => size || "clamp(32.97px, 2.82vw + 5.94px, 60px)"};
  height: ${({ size }): string => size || "clamp(32.97px, 2.82vw + 5.94px, 60px)"};
`;

export const MatchStateItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${margins.small0};
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
  height: 52px;
  gap: ${margins.small1};
  ${DieWrapper} {
    margin-top: 0.125em;
  }
  ${Lightning} {
    margin-top: 0.125em;
  }
`;
