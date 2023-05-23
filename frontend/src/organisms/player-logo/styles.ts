import styled from "@emotion/styled";
import { BaseIconWrapper, GeneralRow } from "../../atoms";
import { breakpoints, color, containerHeight, layoutWidth, lobbySizes, spacing } from "../../design";
import { PanelWrapper } from "../../molecules";

export const PlayerLogoWrapper = styled(GeneralRow)`
  width: ${lobbySizes.lg};
  height: ${lobbySizes.sm};
  overflow: hidden;
  border-top: 1px solid ${color.mediumGrey};
  ${PanelWrapper} {
    border-top: none;
  }
`;

export const PlayerLogoContainer = styled.div`
  width: ${layoutWidth.xl};
  height: ${lobbySizes.sm};
  padding: ${spacing.sm} ${spacing.s};

  @media (min-width: ${breakpoints.lg}) and (max-height: ${breakpoints.sm}) {
    ${BaseIconWrapper} {
      display: flex;
      align-self: center;
      justify-content: center;
      width: auto;
      height: ${containerHeight.fluid};
      > svg {
        display: flex;
        justify-content: center;
        align-self: center;
        width: auto;
        height: ${containerHeight.fluid};
      }
    }
  }
`;
