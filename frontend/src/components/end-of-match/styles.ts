import styled from "@emotion/styled";

import { color, margins } from "../../design";
import { Heading2, Heading4, Paragraph } from "../atoms";
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

export const WinnerBadge = styled.div``;

export const DataWrapper = styled.div`
  width: 100%;
  margin-top: 2.375em;
  margin-bottom: ${margins.small5};

  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const LeaderboardStanding = styled(Heading2)`
  color: ${color.white};
  margin-left: ${margins.small5};
  margin-right: ${margins.small5};
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
  margin-top: ${margins.small2};
`;

export const Description = styled(Paragraph)`
  color: ${color.darkGrey};
`;

export const DescriptionBold = styled(Paragraph)`
  color: ${color.darkGrey};
  font-weight: bold;
`;
