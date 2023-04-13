import styled from "@emotion/styled";
import { CheckboxContainer, DescriptionContainer } from "../checkbox/styles";

export const SoundToggleWrapper = styled.div`
  margin-top: 4px;
  ${CheckboxContainer} {
    width: 10vw;
  }
  ${DescriptionContainer} {
    padding: 0;
  }
`;
