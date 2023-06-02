import styled from "@emotion/styled";
import { BaseColumn, BaseRow } from "../../atoms";
import { color, zIndex } from "../../design";

interface Props {
  padding?: string;
}

export const MatchStateContainer = styled(BaseRow)`
  line-height: normal;
  position: relative;
  z-index: ${zIndex.inFront};
`;

export const DiceContainer = styled(BaseColumn)<Props>`
  background: ${color.grey};
  padding: ${({ padding }): string => padding || "0px"};
`;
