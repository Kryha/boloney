import styled from "@emotion/styled";

import { margins } from "../../design";

export const ErrorContainer = styled.div`
  margin-left: ${margins.large0};
  margin-top: 102px;
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 680px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-top: ${margins.large0};
  gap: ${margins.small0};
`;
