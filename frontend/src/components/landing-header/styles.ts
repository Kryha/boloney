import styled from "@emotion/styled";

import { BaseIconWrapper, GeneralRow, TertiaryButtonBase } from "../../atoms";
import { color, containerWidth, mobileHeight, shadows, spacing, zIndex } from "../../design";

export const LandingHeaderWrapper = styled(GeneralRow)`
  position: fixed;
  background: ${color.lightGrey};
  box-shadow: ${shadows.xxs};
  width: ${containerWidth.fluid};
  z-index: ${zIndex.modal};
  justify-content: space-between;
  align-items: center;
  height: ${mobileHeight.md};
  left: 0;
  padding: ${spacing.s};
  transition: all 1s ease-in-out;
  ${BaseIconWrapper} {
    display: flex;
  }
`;

export const TextLogoWrapper = styled.div`
  height: 100%;
  cursor: pointer;
`;

export const LandingButton = styled.div`
  position: fixed;
  right: 0;
  z-index: ${zIndex.modal};
  transition: all 1s ease-in-out;
  ${TertiaryButtonBase} {
    height: ${mobileHeight.md};
    display: flex;
  }
`;
