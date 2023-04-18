import styled from "@emotion/styled";

import { containerWidth, containerHeight, shadows } from "../design";
import { BaseBlock } from "./block";

/**
 * This file is for Modals
 */

export const ModalBlock = styled(BaseBlock)`
  width: ${containerWidth.xxxl};
  height: ${containerHeight.xxxl};
  box-shadow: ${shadows.xl};
`;
