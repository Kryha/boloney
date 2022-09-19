import styled from "@emotion/styled";
import { TimerIcon } from "../../assets/icons";
import { color, margins } from "../../design";
import { Paragraph } from "../atoms";

export const TopNavigationSection = styled.section`
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: flex-end;
  position: absolute;
`;

export const Divider = styled.div`
  height: 50px;
  width: 1px;
  background: ${color.mediumGrey};
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
  padding: 13.4px ${margins.small3} 13.4px ${margins.small2};
  gap: ${margins.small0};
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

export const DropdownContainer = styled.div``;

export const DropdownWrapper = styled.div`
  background: ${color.lightGrey};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px;
`;

interface DropdownProps {
  isHidden: boolean;
}

export const ChildrenContainer = styled.div<DropdownProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px;
  display: ${({ isHidden }) => isHidden && "none"};
`;
