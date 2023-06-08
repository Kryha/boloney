import styled from "@emotion/styled";
import { BaseColumn, BaseRow, BodyText, Legend, TooltipBlock } from "../../atoms";
import { spacing, containerWidth, color, MATCH_FORM_SIZE, MIN_TOOLTIP_WIDTH, zIndex } from "../../design";
import { InputContainer } from "../../molecules";

interface Props {
  zIndex?: number;
}

export const MatchFormContainer = styled(BaseRow)<Props>`
  position: relative;
  margin-top: ${spacing.ms};
  width: ${containerWidth.xxl};
  ${InputContainer} {
    margin-top: ${spacing.sm};
  }
  z-index: ${({ zIndex }) => (zIndex ? zIndex : "0")} !important;
  ${Legend} {
    z-index: ${zIndex.background};
  }
`;

export const MatchCheckboxContainer = styled.section`
  overflow: auto;
`;

export const MatchFieldContainer = styled.section`
  margin-top: ${spacing.md};
`;

export const MatchInformationBox = styled.div`
  width: ${containerWidth.fluid};
  ${BodyText} {
    margin: ${spacing.s} ${spacing.md} ${spacing.sm} ${spacing.md};
  }
`;

export const MatchTotalContainer = styled(BaseRow)`
  padding: ${spacing.sm} ${spacing.sm} ${spacing.sm} ${spacing.xs};
  border-top: 1px solid ${color.mediumGrey};
  border-right: 1px solid ${color.mediumGrey};
  position: sticky;
  bottom: 0;
  margin-left: -${MATCH_FORM_SIZE};
  width: ${containerWidth.fluid};
  overflow: hidden;
  background: ${color.lightGrey};
`;

export const MatchCreationWrapper = styled(BaseColumn)`
  margin-top: ${spacing.sm};
  margin-left: ${spacing.md};
`;

export const MatchBottomContainer = styled.section`
  margin-top: ${spacing.s};
  padding-left: ${spacing.sm};
  padding-right: ${spacing.sm};
`;

export const MatchButtonContainer = styled(BaseRow)`
  margin-top: ${spacing.sm};
  margin-bottom: ${spacing.xl};
  width: ${containerWidth.fluid};
`;

export const MatchConfirmationButton = styled.div`
  width: fit-content;
`;

export const MatchConfirmationWrapper = styled(BaseColumn)`
  margin-top: ${spacing.md};
  margin-left: ${spacing.md};
`;

export const HealDiceContainer = styled.div`
  width: ${containerWidth.fluid};
  ${TooltipBlock} {
    min-width: ${MIN_TOOLTIP_WIDTH};
  }
`;
