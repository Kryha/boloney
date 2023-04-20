import styled from "@emotion/styled";

import { color, margins, screenSizes } from "../../design";
import { Heading2, Heading4, Heading6, BodyText } from "../../atoms";

export const EndOfMatchWrapper = styled.section`
  width: 100%;
  padding-bottom: 60px;
`;

export const TitleSection = styled.section`
  margin-left: ${margins.large0};
  margin-bottom: ${margins.large0};
  ${Heading6} {
    margin-bottom: ${margins.small4};
  }
`;

interface WrapperProps {
  place: number;
}

export const LeaderboardWrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 9.875em;

  border-top: ${({ place }) => (place === 1 ? 1 : 0)}px solid ${color.mediumGrey};
  border-bottom: 1px solid ${color.mediumGrey};
`;

interface DataWrapperProps {
  isWinner?: boolean;
}

export const DataWrapper = styled.div<DataWrapperProps>`
  width: 100%;
  padding-top: 2.375em;
  margin-bottom: ${margins.small5};
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background: ${({ isWinner }) => (isWinner ? color.cloudWhite : color.transparent)};
`;

export const LeaderboardStanding = styled(Heading2)`
  margin-left: 0.3em;
  margin-right: 0.3em;
`;

export const LeaderboardDetails = styled.div``;

export const Username = styled(Heading4)``;

interface DiceAndPowerUpsProps {
  screenWidth: number;
}

export const DiceAndPowerUps = styled.div<DiceAndPowerUpsProps>`
  height: ${margins.medium0};

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ screenWidth }) => (screenWidth < screenSizes.small ? margins.small0 : margins.small3)};
`;

export const BoldDescription = styled(BodyText)`
  display: inline;
`;

export const Description = styled(BoldDescription)`
  margin-top: ${margins.small1};
`;
