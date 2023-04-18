import styled from "@emotion/styled";
import { margins, spacing } from "../../design";
import { ChatInput } from "../../atoms";

export const ChatWrapperSection = styled.section`
  position: relative;
  ${ChatInput} {
    position: absolute;
    bottom: 0;
    margin: ${margins.small1};
    width: 100%;
    width: -moz-available;
    width: -webkit-fill-available;
    width: fill-available;
  }
`;

export const ChatInputContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5.63vh;
  padding: ${spacing.sm};
`;
