import styled from "@emotion/styled";

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
  color: #292929;
  background: #D5D5D5;
  padding: 0px 10px;
`;

export const LabelContainer = styled.div`
  position: absolute;
  left: 30px;
  top: -13px
`;
