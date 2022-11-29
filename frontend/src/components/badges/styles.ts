import styled from "@emotion/styled";
import { margins, color } from "../../design";

export const BadgeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${margins.small1};
  padding-right: ${margins.small1};
  padding-left: ${margins.small1};
  padding-top: ${margins.small0};
  padding-bottom: ${margins.small0};
  background-color: ${color.pureWhite};
  width: 6.5625em;
  position: absolute;
`;
