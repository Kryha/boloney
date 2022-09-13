import styled from "@emotion/styled";

import { color } from "../../design";
import { ErrorIcon } from "../../assets/icons";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  isolation: isolate;
  position: relative;
  flex: 1;
`;

export const InputLabel = styled.h3`
  font-family: ibm-plex-mono;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-transform: uppercase;
  color: ${color.black};
  background: #D5D5D5;
  padding: 0px 10px;
`;

export const LabelContainer = styled.div`
  position: absolute;
  left: 30px;
  top: -13px
`;

export const Error = styled(ErrorIcon)``;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  margin-left: 40px;
  margin-right: 4px;
  margin-top: 16px;
`;
