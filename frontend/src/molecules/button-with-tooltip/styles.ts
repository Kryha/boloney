import styled from "@emotion/styled";
import { FlexDirection, BaseRow } from "../../atoms";

interface Props {
  flexDirection?: FlexDirection;
}

export const ButtonWithTooltipWrapper = styled(BaseRow)<Props>`
  flex-direction: ${({ flexDirection }): string => flexDirection || "row"};
`;
