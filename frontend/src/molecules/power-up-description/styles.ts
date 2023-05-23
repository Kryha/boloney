import styled from "@emotion/styled";
import { spacing } from "../../design";
import { GeneralContentWrapper } from "../../atoms";

export const DescriptionContainer = styled.div`
  flex: 11;
  padding: 0px 0px ${spacing.xs} ${spacing.xs};
`;

export const PowerUpDescriptionWrapper = styled(GeneralContentWrapper)`
  margin-left: ${spacing.s};
  margin-top: 0px;
`;
