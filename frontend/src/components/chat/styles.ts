import styled from "@emotion/styled";
import { margins } from "../../design";
import { ChatInput } from "../atoms";

export const ChatWrapperSection = styled.section`
  position: relative;
  ${ChatInput} {
    position: absolute;
    bottom: 0;
    margin: ${margins.small1};
  }
`;
