import styled from "@emotion/styled";

import { color, margins } from "../../design";
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

export const DiceAndPowerUps = styled.div`
  height: ${margins.medium0};

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${margins.small1};
`;

export const DescriptionWrapper = styled.div`
  display: inline-flex;
  margin-top: ${margins.small1};
`;

export const Description = styled(Paragraph)`
  color: ${color.darkGrey};
`;

export const DescriptionBold = styled(Paragraph)`
  color: ${color.darkGrey};
  font-weight: bold;
`;
