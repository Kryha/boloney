import styled from "@emotion/styled";

import { breakpoints, spacing } from "../design";

export type AlignContent =
  | "center"
  | "start"
  | "end"
  | "flex-start"
  | "flex-end"
  | "left"
  | "right"
  | "normal"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "stretch";

interface Props {
  alignItems?: AlignContent;
  justifyContent?: AlignContent;
  alignSelf?: string;
  gap?: string;
  mobileGap?: string;
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
    gap: ${({ mobileGap }): string => mobileGap ?? spacing.xs};
  }
`;

export const GeneralRow = styled(BaseColumn)<Props>`
  flex-direction: row;
`;
