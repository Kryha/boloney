import styled from "@emotion/styled";
import { BaseRow } from "../../atoms";
import { margins, zIndex } from "../../design";

export const NewMatchHandsWrapper = styled(BaseRow)`
  z-index: ${zIndex.behind};
  position: absolute;
  bottom: ${margins.large2};
  left: 0;
  width: 100vw;
`;

export const NewMatchHandsContainer = styled.section`
  position: absolute;
  bottom: ${margins.medium0};
  left: 0;
`;
