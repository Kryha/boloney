import styled from "@emotion/styled";
import { containerWidth, spacing } from "../../design";
import { BodyText, BaseRow } from "../../atoms";

export const MatchSettingsOverviewComponent = styled.section`
  padding: ${spacing.xl};
  height: 100%;
  width: ${containerWidth.xxxl};
  overflow-y: scroll;
`;

export const MatchInfoButtons = styled(BaseRow)`
  margin-top: ${spacing.md};
  margin-bottom: ${spacing.xl};
  width: ${containerWidth.xxxl};
`;

export const Percentage = styled(BodyText)`
  padding: ${spacing.xs} 0px ${spacing.xs} ${spacing.xs};
`;

export const PowerUpContainer = styled(BaseRow)`
  margin-bottom: ${spacing.ms};
`;
