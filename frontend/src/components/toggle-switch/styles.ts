import styled from "@emotion/styled";
import { FieldSet } from "../../atoms";

export const ToggleSwitchFieldSet = styled(FieldSet)`
  padding: revert;
  max-height: none;
`;

export const ToggleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ToggleSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;
`;
