import styled from "@emotion/styled";
import { containerWidth } from "../../design";

export const ToggleSwitchFieldSetWrapper = styled.div`
  width: ${containerWidth.fluid};
  > fieldset {
    position: relative;
    padding: revert;
    max-height: none;
  }
`;
