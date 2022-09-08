import styled from "@emotion/styled";

import { margins } from "../../design";

export const ErrorContainer = styled.div`
  margin-left: 40px;
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
  padding-top: 40px;
  gap: ${margins.small0};
`;


export const ImageContainer = styled.div`
  position: fixed;
  bottom: -5px;
  right: 40px;
`;
