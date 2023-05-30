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

export type PositionContent = "absolute" | "relative" | "fixed" | "sticky" | "inherit" | "initial" | "unset";

interface Props {
  alignItems?: AlignContent;
  justifyContent?: AlignContent;
  alignSelf?: string;
  gap?: string;
  mobileGap?: string;
}

/**
 * This component is for flex items with flex flex-direction set to column
 * @param {string} alignItems - aligns items along the cross axis
 * @param {string} justifyContent - aligns items along the main axis
 * @param {string} alignSelf - aligns a single item along the cross axis
 * @param {string} gap - sets the gap between items
 * @param {string} mobileGap - sets the gap between items on mobile
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

/**
 * This component is for flex items with flex flex-direction set to row
 * @param {string} alignItems - aligns items along the cross axis
 * @param {string} justifyContent - aligns items along the main axis
 * @param {string} alignSelf - aligns a single item along the cross axis
 * @param {string} gap - sets the gap between items
 * @param {string} mobileGap - sets the gap between items on mobile
 */
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

interface GridProps {
  alignItems?: AlignContent;
  justifyItems?: AlignContent;
  gap?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
}

/**
 * Base for a grid
 * @param {string} alignItems - aligns items along the cross(column) axis
 * @param {string} justifyItems - aligns items along the main(row) axis
 * @param {string} gap - sets the gap between items (row-gap column-gap)
 * @param {string} gridTemplateColumns - sets the template for the columns
 * @param {string} gridTemplateRows - sets the template for the rows
 */

export const BaseGrid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: ${({ gridTemplateColumns }): string => gridTemplateColumns ?? "1fr"};
  grid-template-rows: ${({ gridTemplateRows }): string => gridTemplateRows ?? "1fr"};
  align-items: ${({ alignItems }): string => alignItems ?? "start"};
  justify-items: ${({ justifyItems }): string => justifyItems ?? "start"};
  gap: ${({ gap }): string => gap ?? "0px"};
`;
