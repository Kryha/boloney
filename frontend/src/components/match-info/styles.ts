import styled from "@emotion/styled";
import { color, margins } from "../../design";
import { Row, GeneralText, BaseIconWrapper } from "../atoms";
import { DiceIconWrapper } from "../icons";
import { ButtonInfoWrap } from "../tooltip";

export const MatchInfoOverview = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${margins.small2} ${margins.small5};
  background: ${color.lightGrey};
`;

export const MatchInfoHeader = styled(Row)`
  gap: 6px;
  align-items: center;
  ${ButtonInfoWrap} {
    margin-left: 0px;
    max-height: 23px;
  }
`;

export const MatchInfoDescription = styled(Row)`
  gap: 5px;
  min-height: 23px;
  align-items: center;
  justify-content: center;
  ${GeneralText} {
    color: ${color.black};
    :first-letter {
      text-transform: none;
    }
  }
  ${BaseIconWrapper} {
    margin-top: 4px;
  }
  ${DiceIconWrapper} {
    margin-top: 4px;
  }
`;

export const HandImageWrapper = styled(MatchInfoDescription)`
  margin-top: 4px;
`;
