import styled from "@emotion/styled";

import { color, margins } from "../../design";

export const PipContainer = styled.span`
  display: block;
  align-self: center;
  justify-self: center;
  width: ${margins.small1};
  height: ${margins.small1};
  background: ${color.pureWhite};
  border-radius: ${margins.small0};
`;

export const FaceWrapper = styled.div`
  display: grid;
  grid-template-areas:
    "a . c"
    "e g f"
    "d . b";
  flex: 0 0 auto;
  padding: 2px;
  width: ${margins.large0};
  height: ${margins.large0};
  background-color: ${color.darkBlue};
  box-shadow: 0px 0px ${margins.small1} rgba(0, 0, 0, 0.02), 0px 0px  ${margins.small3} rgba(0, 0, 0, 0.1);
  border-radius: ${margins.small0};
  ${PipContainer}:nth-of-type(2) {
    grid-area: b;
  }
  ${PipContainer}:nth-of-type(3) {
    grid-area: c;
  }
  ${PipContainer}:nth-of-type(4) {
    grid-area: d;
  }
  ${PipContainer}:nth-of-type(5) {
    grid-area: e;
  }
  ${PipContainer}:nth-of-type(6) {
    grid-area: f;
  }
  ${PipContainer}:nth-of-type(odd):last-child {
	 grid-area: g;
  }
`;
