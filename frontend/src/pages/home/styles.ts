import styled from "@emotion/styled";
import { ButtonInfoWrap } from "../../components";

import { margins } from "../../design";

export const MatchSelectContainer = styled.section``;

export const ButtonContainer = styled.section`
  display: flex;
  justify-content: flex-end;

  margin-top: ${margins.large0};
  margin-bottom: ${margins.large2};

  width: 100%;
  ${ButtonInfoWrap} {
    margin-right: ${margins.small1};
  }
`;
