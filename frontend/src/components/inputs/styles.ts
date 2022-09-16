import styled from "@emotion/styled";

import { color, fontSize, fontWeight, margins } from "../../design";
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
  font-weight: ${fontWeight.bolder};
  font-size: ${fontSize.small1};
  line-height: 24px;
  text-transform: uppercase;
  color: ${color.black};
  background: ${color.lightGrey};
  padding: 0px ${margins.small1};
`;

export const LabelContainer = styled.div`
  position: absolute;
  left: ${margins.medium0};
  top: -13px
`;

export const Error = styled(ErrorIcon)``;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: ${margins.small0};
  margin-left: ${margins.large0};
  margin-right: 4px;
  margin-top: ${margins.small2};
`;
