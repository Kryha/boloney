import styled from "styled-components";

import { color } from "../../design";

export const PipContainer = styled.span`
  display: block;
  align-self: center;
  justify-self: center;
  width: 10px;
  height: 10px;
  background: #FFFFFF;
  border-radius: 8px;
`;

export const FaceWrapper = styled.div`
  display: grid;
  grid-template-areas:
    "a . c"
    "e g f"
    "d . b";

  flex: 0 0 auto;
  padding: 2px;
  width: 40px;
  height: 40px;

  background-color: ${color.darkBlue};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.02), 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  ${PipContainer}:nth-child(2) {
    grid-area: b;
  }
  ${PipContainer}:nth-child(3) {
    grid-area: c;
  }
  ${PipContainer}:nth-child(4) {
    grid-area: d;
  }
  ${PipContainer}:nth-child(5) {
    grid-area: e;
  }
  ${PipContainer}:nth-child(6) {
    grid-area: f;
  }
  ${PipContainer}:nth-child(odd):last-child {
	 grid-area: g;
  }
`;


// .pip:nth-child(2) {
// 	grid-area: b;
// }
// .pip:nth-child(3) {
// 	grid-area: c;
// }
// .pip:nth-child(4) {
// 	grid-area: d;
// }
// .pip:nth-child(5) {
// 	grid-area: e;
// }
// .pip:nth-child(6) {
// 	grid-area: f;
// }
// /* This selects the last pip of odd-valued dice (1, 3, 5) and positions the pip in the center */
// .pip:nth-child(odd):last-child {
// 	grid-area: g;
// }
