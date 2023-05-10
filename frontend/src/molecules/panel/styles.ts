import styled from "@emotion/styled";
import { color } from "../../design";

interface Props {
  isMultiplePanels?: boolean;
}

export const PanelWrapper = styled.div<Props>`
  ${({ isMultiplePanels }) =>
    isMultiplePanels
      ? `
        border: 1px solid ${color.mediumGrey};
        border-bottom: none;
      `
      : `border: 1px solid ${color.mediumGrey}`};
`;
