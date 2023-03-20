import styled from "@emotion/styled";
import { ellipsis, GeneralText, Heading4 } from "../atoms";
import { margins } from "../../design";

export const Waiting = styled(GeneralText)`
  &:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ${ellipsis} steps(4, end) 900ms infinite;
    animation: ${ellipsis} steps(4, end) 900ms infinite;
    content: "...";
    width: 0px;
  }
`;

export const LobbyPlayerStatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${margins.small1} ${margins.small1} ${margins.small1} 0.875em;
  position: absolute;
  bottom: 0;
  ${Heading4} {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 12vw;
    :first-letter {
      text-transform: lowercase;
    }
  }
`;
