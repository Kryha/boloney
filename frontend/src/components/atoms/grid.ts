import styled from "@emotion/styled";
import { breakpoints, spacing } from "../../design";

export type AlignProps = "stretch" | "center" | "start" | "end";

interface Props {
  alignItems?: AlignProps;
  justifyContent?: string;
  alignSelf?: string;
  gap?: string;
}

/**
 * This file is for flex items
 */

export const BaseColumn = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }): string => (alignItems ? alignItems : "start")};
  padding: 0px;
  justify-content: ${({ justifyContent }): string => (justifyContent ? justifyContent : "normal")};
  align-self: ${({ alignSelf }): string => (alignSelf ? alignSelf : "auto")};
  gap: ${({ gap }): string => (gap ? gap : "0px")};
`;

export const BaseRow = styled(BaseColumn)<Props>`
  flex-direction: row;

  @media (max-width: ${breakpoints.md}) {
    flex-direction: column;
    gap: ${spacing.md};
  }
`;

export const GeneralRow = styled(BaseColumn)<Props>`
  flex-direction: row;
`;
