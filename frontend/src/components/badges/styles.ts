import styled from "@emotion/styled";
import { margins, color, zIndex } from "../../design";

export const BadgeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${margins.small1};
  padding-right: ${margins.small1};
  padding-left: ${margins.small1};
  padding-top: ${margins.small0};
  padding-bottom: ${margins.small0};
  background-color: ${color.white};
  position: absolute;
  z-index: ${zIndex.inFront};
`;
