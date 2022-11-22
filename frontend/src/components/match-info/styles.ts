import styled from "@emotion/styled";
import { RaisedHandIcon } from "../../assets";
import { color, margins } from "../../design";
import { GeneralText, Row } from "../atoms";
import { Lightning } from "../icons/styles";

export const MatchInfoOverview = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${margins.small2} ${margins.small5};
  background: ${color.lightGrey};
`;

export const MatchInfoHeader = styled(Row)`
  gap: 6px;
`;

export const RaisedHand = styled(RaisedHandIcon)``;

export const MatchInfoDescription = styled(Row)`
  gap: 5px;
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
    margin-top: 3px;
  }
`;
