import styled from "@emotion/styled";
import { RaisedHandIcon, RoundIcon } from "../../assets";
import { color, margins } from "../../design";
import { GeneralText, Row } from "../atoms";
import { Lightning } from "../icons/styles";
import { ButtonInfoWrap } from "../tooltip/styles";

export const MatchInfoOverview = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${margins.small2} ${margins.small5};
  background: ${color.lightGrey};
`;

export const MatchInfoHeader = styled(Row)`
  gap: 6px;
  ${ButtonInfoWrap} {
    margin-left: 0px;
    max-height: 23px;
  }
`;

export const RaisedHand = styled(RaisedHandIcon)``;

export const Round = styled(RoundIcon)``;

export const MatchInfoDescription = styled(Row)`
  gap: 5px;
  height: 23px;
  ${GeneralText} {
    color: ${color.black};
    text-transform: none !important;
  }
  ${Lightning} {
    path {
      stroke: ${color.black};
    }
  }
  ${RaisedHand} {
    margin-top: 4px;
  }
  ${Round} {
    margin-top: 3px;
  }
`;
