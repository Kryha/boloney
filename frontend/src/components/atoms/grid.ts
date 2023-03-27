import styled from "@emotion/styled";
import { breakpoints, margins } from "../../design";

export type AlignProps = "stretch" | "center" | "start" | "end";

interface Props {
  alignItems?: AlignProps;
}

/**
 * This file is for flex items
 */

export const BaseRow = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: ${({ alignItems }): string => (alignItems ? alignItems : "start")};
  padding: 0px;

  @media (max-width: ${breakpoints.md}) {
    flex-direction: column;
    gap: ${margins.small1};
  }
`;

export const BaseColumn = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }): string => (alignItems ? alignItems : "start")};
  padding: 0px;
`;
