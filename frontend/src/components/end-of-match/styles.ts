import styled from "@emotion/styled";

import { color, margins, screenSizes } from "../../design";
import { Heading2, Heading4, Heading6, Paragraph } from "../atoms";
import { PrimaryButtonWrapper } from "../buttons/styles";

export const EndOfMatchWrapper = styled.section`
  width: 100%;

  ${PrimaryButtonWrapper} {
    position: sticky;
    bottom: 0;
    left: 1px;
  }
`;

export const TitleSection = styled.section`
  margin-left: ${margins.large0};
  margin-bottom: ${margins.large0};
  ${Heading6} {
    text-transform: uppercase;
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
  background: ${({ isWinner }) => (isWinner ? color.white : "transparent")};
`;

export const LeaderboardStanding = styled(Heading2)`
  margin-left: 0.3em;
  margin-right: 0.3em;
`;

export const LeaderboardAvatar = styled.div`
  width: 6.25em;
  height: 6.25em;
`;

export const PlayerAvatar = styled.img`
  object-fit: contain;
  width: 80%;
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

export const Description = styled(Paragraph)`
  margin-top: ${margins.small1};
  color: ${color.darkGrey};
`;

// TODO: Improve the way styling is handled
export const MatchStatsButtonWrapper = styled(PrimaryButtonWrapper)`
  bottom: 0vh;
`;
