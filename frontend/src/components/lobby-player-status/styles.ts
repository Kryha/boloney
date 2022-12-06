import styled from "@emotion/styled";
import { ellipsis, Heading4 } from "../atoms";
import { color, fontWeight, margins } from "../../design";

export const Waiting = styled.div`
  font-family: ibm-plex-mono;
  font-weight: ${fontWeight.light};
  font-size: clamp(0.88rem, 0.21vw + 0.75rem, 1rem);
  line-height: clamp(1.38rem, 0.21vw + 1.25rem, 1.5rem);
  letter-spacing: -0.01em;
  color: ${color.black};
  :first-letter {
    text-transform: capitalize;
  }
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
  }
`;
