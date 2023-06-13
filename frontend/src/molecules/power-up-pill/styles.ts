import styled from "@emotion/styled";
import { BaseRow, CopyBlock } from "../../atoms";
import { zIndex } from "../../design";

export const PowerUpPillWrapper = styled(BaseRow)`
  position: relative;
  z-index: ${zIndex.modalBackground};
`;

export const PillCircleWrapper = styled(CopyBlock)`
  cursor: pointer;
`;
