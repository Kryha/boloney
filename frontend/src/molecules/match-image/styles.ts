import styled from "@emotion/styled";
import { BaseRow } from "../../atoms";
import { images, layoutWidth } from "../../design";

export const MatchImageWrapper = styled(BaseRow)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: ${layoutWidth.lg};
  height: ${images.match};
`;
