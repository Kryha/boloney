import styled from "@emotion/styled";
import { CheckboxContainer, CheckContainer, DescriptionContainer } from "../checkbox/styles";

export const SoundToggleWrapper = styled.div`
  margin-top: 4px;
  ${CheckboxContainer} {
    width: 10vw;
  }
  ${CheckContainer} {
    height: 30px;
  }
  ${DescriptionContainer} {
    padding: 0;
  }
`;
