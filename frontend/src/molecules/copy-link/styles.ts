import styled from "@emotion/styled";
import { BaseRow, CopyBlock } from "../../atoms";
import { layoutHeight, opacity, spacing, zIndex } from "../../design";

interface CopyProps {
  isCopied: boolean;
}

export const LinkCopiedBlock = styled(CopyBlock)`
  position: absolute;
  opacity: ${opacity.hidden};
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: center;
  z-index: ${zIndex.background};
  transition: opacity 0.15s ease-in-out, top 0.15s ease-in-out;
  padding: ${spacing.xs} ${spacing.s};
`;

export const CopyLinkWrapper = styled(BaseRow)<CopyProps>`
  cursor: pointer;
  position: relative;
  width: fit-content;
  ${({ isCopied }) =>
    isCopied
      ? `
        ${LinkCopiedBlock} {
          opacity: ${opacity.visible};
          top: -${layoutHeight.sm};
        }
      `
      : ""};
`;
