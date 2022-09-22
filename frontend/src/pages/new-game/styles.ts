import styled from "@emotion/styled";

import { margins } from "../../design";

export const NewGameContainer = styled.div``;

export const PlayersDiceContainer = styled.div`
  display: flex;
  padding: 0px;
  margin-top: ${margins.medium0};
`;

export const FieldContainer = styled.div`
  margin-top: ${margins.medium0};
`;

export const BottomContainer = styled.div`
  margin-top: ${margins.small3};
  padding-left: ${margins.large0};
  padding-right: ${margins.large0};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-top: ${margins.large0};
  margin-bottom: ${margins.large2};

  width: 100%;
`;
